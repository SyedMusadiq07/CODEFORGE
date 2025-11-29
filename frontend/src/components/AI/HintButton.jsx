import { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Lightbulb, Loader2, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const HintButton = ({ problemId }) => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [hints, setHints] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const getHint = async (level) => {
    // If already fetched, just show it
    if (hints[level]) {
      setCurrentLevel(level);
      setShowHint(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await aiService.getHint(problemId, level);
      setHints((prev) => ({
        ...prev,
        [level]: response.data.hint,
      }));
      setCurrentLevel(level);
      setShowHint(true);
      toast.success(`Hint Level ${level} unlocked!`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hint Buttons */}
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((level) => (
          <button
            key={level}
            onClick={() => getHint(level)}
            disabled={isLoading}
            className={`btn btn-sm ${
              hints[level] ? 'btn-success' : 'btn-outline btn-primary'
            }`}
          >
            {isLoading && currentLevel === level ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lightbulb className="w-4 h-4" />
            )}
            Hint Level {level}
            {level < 3 && <ChevronRight className="w-3 h-3" />}
          </button>
        ))}
      </div>

      {/* Hint Display */}
      {showHint && hints[currentLevel] && (
        <div className="alert alert-info shadow-lg">
          <div className="flex-col items-start w-full">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5" />
              <span className="font-semibold">Hint Level {currentLevel}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm">{hints[currentLevel]}</p>
            {currentLevel < 3 && (
              <button
                onClick={() => getHint(currentLevel + 1)}
                className="btn btn-sm btn-ghost mt-2"
              >
                Need more help? Get Level {currentLevel + 1} hint
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HintButton;
