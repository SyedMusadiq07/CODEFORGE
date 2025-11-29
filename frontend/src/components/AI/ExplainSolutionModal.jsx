import { useState } from 'react';
import { Lightbulb, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

const ExplainSolutionModal = ({ problemId }) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const fetchExplanation = async () => {
    setIsOpen(true);
    setIsLoading(true);
    setIsStreaming(true);
    setExplanation(''); // Clear previous explanation

    try {
      // Get auth token from cookies
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      const baseURL = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8080/api/v1'
        : '/api/v1';

      const response = await fetch(
        `${baseURL}/ai/explain/${problemId}/stream?language=JAVASCRIPT`,
        {
          headers: {
            'Cookie': `token=${token}`,
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch explanation');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      setIsLoading(false); // Stop initial loading spinner

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          setIsStreaming(false);
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.text) {
                // Append new text chunk
                setExplanation(prev => prev + data.text);
              }
              
              if (data.done) {
                setIsStreaming(false);
                toast.success('Explanation complete!');
              }
              
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              if (e.message !== 'Unexpected end of JSON input') {
                console.error('Parse error:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error('Explanation error:', error);
      setIsOpen(false);
      setIsStreaming(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setExplanation('');
  };

  return (
    <>
      <button
        onClick={fetchExplanation}
        className="btn btn-info btn-sm gap-2"
        disabled={isLoading || isStreaming}
      >
        {isLoading || isStreaming ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Lightbulb className="w-4 h-4" />
        )}
        Explain Solution
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-info" />
                Solution Explanation
                {isStreaming && (
                  <span className="loading loading-dots loading-sm text-info"></span>
                )}
              </h3>
              <button
                onClick={closeModal}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-base-content/60">Connecting to AI...</p>
              </div>
            ) : explanation || isStreaming ? (
              <div className="prose prose-sm max-w-none overflow-y-auto max-h-[65vh] bg-base-200 p-6 rounded-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      return inline ? (
                        <code className="bg-base-300 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    h2: ({ children }) => (
                      <h2 className="text-xl font-bold mt-6 mb-3 text-primary border-b border-base-300 pb-2">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg font-semibold mt-4 mb-2 text-secondary">
                        {children}
                      </h3>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        {children}
                      </ol>
                    ),
                    p: ({ children }) => (
                      <p className="mb-3 leading-relaxed text-base-content">
                        {children}
                      </p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-accent">
                        {children}
                      </strong>
                    ),
                  }}
                >
                  {explanation}
                </ReactMarkdown>
                {isStreaming && (
                  <div className="flex items-center gap-2 mt-4 text-info">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Generating...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-base-content/60 py-12">
                <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No explanation available</p>
              </div>
            )}

            <div className="modal-action">
              <button onClick={closeModal} className="btn">
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={closeModal}></div>
        </div>
      )}
    </>
  );
};

export default ExplainSolutionModal;
