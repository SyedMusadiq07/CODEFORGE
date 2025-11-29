import { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Bug, Loader2, X } from 'lucide-react';
import toast from 'react-hot-toast';

const DebugButton = ({ problemId, code, language, errorMessage }) => {
  const [debugAnalysis, setDebugAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleDebug = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first!');
      return;
    }

    if (!errorMessage) {
      toast.error('No error detected. Run your code first!');
      return;
    }

    setIsLoading(true);
    setShowAnalysis(true);

    try {
      const response = await aiService.debugCode(problemId, code, language, errorMessage);
      setDebugAnalysis(response.data);
      toast.success('Debug analysis ready!');
    } catch (error) {
      toast.error(error.message);
      console.error('Debug error:', error);
      setShowAnalysis(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeAnalysis = () => {
    setShowAnalysis(false);
    setDebugAnalysis(null);
  };

  return (
    <>
      <button
        onClick={handleDebug}
        disabled={isLoading || !errorMessage}
        className="btn btn-error btn-sm gap-2"
        title={!errorMessage ? 'No errors detected' : 'Debug with AI'}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Bug className="w-4 h-4" />
        )}
        Debug with AI
      </button>

      {/* Analysis Modal */}
      {showAnalysis && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl max-h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Bug className="w-5 h-5 text-error" />
                AI Debug Analysis
              </h3>
              <button
                onClick={closeAnalysis}
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                <p className="text-base-content/60">Analyzing your code...</p>
              </div>
            ) : debugAnalysis ? (
              <div className="space-y-4 overflow-y-auto max-h-[60vh]">
                {/* Error Message */}
                <div className="alert alert-error">
                  <Bug className="w-5 h-5" />
                  <div>
                    <h4 className="font-semibold">Error Detected</h4>
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                </div>

                {/* Analysis */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Analysis</h4>
                  <div className="whitespace-pre-wrap text-sm">
                    {debugAnalysis.analysis}
                  </div>
                </div>

                {/* Suggestions */}
                {debugAnalysis.suggestions && (
                  <div className="bg-success/10 p-4 rounded-lg border border-success/30">
                    <h4 className="font-semibold text-success mb-2">Suggestions</h4>
                    <div className="whitespace-pre-wrap text-sm">
                      {debugAnalysis.suggestions}
                    </div>
                  </div>
                )}

                {/* Fixed Code (if provided) */}
                {debugAnalysis.fixedCode && (
                  <div className="bg-base-300 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Suggested Fix</h4>
                    <pre className="text-sm overflow-x-auto">
                      <code>{debugAnalysis.fixedCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-base-content/60 py-8">
                No analysis available
              </div>
            )}

            <div className="modal-action">
              <button onClick={closeAnalysis} className="btn">
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={closeAnalysis}></div>
        </div>
      )}
    </>
  );
};

export default DebugButton;
