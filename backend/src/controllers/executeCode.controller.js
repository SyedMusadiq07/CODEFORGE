import { db } from '../libs/db.js';
import {
  getLanguageName,
  pollBatchResults,
  submitBatch,
} from '../libs/problem.libs.js';

// 🧠 Helper function to delay between polls
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 🌟 Main Controller: Handles execution, evaluation & saving results
export const executeCode = async (req, res) => {
  const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
  const userId = req.user.id;

  try {
    // ✅ 1. Validate inputs
    if (
      !Array.isArray(stdin) ||
      stdin.length === 0 ||
      !Array.isArray(expected_outputs) ||
      expected_outputs.length !== stdin.length
    ) {
      return res.status(400).json({ error: 'Invalid or missing test cases' });
    }

    // 📦 2. Create submissions for each input
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
      base64_encoded: false,
      wait: false,
    }));

    // 🚀 3. Submit code to Judge0 in batch
    const submitResponse = await submitBatch(submissions);
    const tokens = submitResponse.map((res) => res.token);

    // ⏳ 4. Poll results until all are finished
    const results = await pollBatchResults(tokens);

    // 🧩 5. Process results
    let allPassed = true;
    const detailedResults = results.map((result, i) => {
      const stdout = result.stdout?.trim() || '';
      const expected_output = expected_outputs[i]?.trim() || '';
      const passed = stdout === expected_output;

      if (!passed) allPassed = false;

      return {
        testCase: i + 1,
        passed,
        stdout,
        expected: expected_output,
        stderr: result.stderr || null,
        compile_output: result.compile_output || null,
        status: result.status?.description || 'Unknown',
        memory: result.memory ? `${result.memory} KB` : null,
        time: result.time ? `${result.time} s` : null,
      };
    });

    // 💾 6. Store submission summary
    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getLanguageName(language_id),
        stdin: JSON.stringify(stdin),
        stdout: JSON.stringify(detailedResults.map((r) => r.stdout)),
        stderr: JSON.stringify(detailedResults.map((r) => r.stderr)),
        compileOutput: JSON.stringify(detailedResults.map((r) => r.compile_output)),
        status: allPassed ? 'Accepted' : 'Wrong Answer',
        memory: JSON.stringify(detailedResults.map((r) => r.memory)),
        time: JSON.stringify(detailedResults.map((r) => r.time)),
      },
    });

    // 🏆 7. Mark problem as solved if all passed
    if (allPassed) {
      await db.problemSolved.upsert({
        where: { userId_problemId: { userId, problemId } },
        update: {},
        create: { userId, problemId },
      });
    }

    // 🧪 8. Save individual test case results
    const testCaseResults = detailedResults.map((r) => ({
      submissionId: submission.id,
      testCase: r.testCase,
      passed: r.passed,
      stdout: r.stdout,
      expected: r.expected,
      stderr: r.stderr,
      compileOutput: r.compile_output,
      status: r.status,
      memory: r.memory,
      time: r.time,
    }));

    await db.testCaseResult.createMany({ data: testCaseResults });

    // 🔍 9. Fetch full submission with related test cases
    const submissionWithTestCases = await db.submission.findUnique({
      where: { id: submission.id },
      include: { testCases: true },
    });

    // 📤 10. Respond
    res.status(200).json({
      success: true,
      message: 'Code executed successfully',
      submission: submissionWithTestCases,
    });
  } catch (error) {
    console.error('❌ Error executing code:', error.message);
    res.status(500).json({ error: 'Failed to execute code' });
  }
};
