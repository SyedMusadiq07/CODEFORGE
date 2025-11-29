import { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Target, Loader2, TrendingUp, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AIRecommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const fetchRecommendations = async () => {
    setIsOpen(true);
    setIsLoading(true);

    try {
      const response = await aiService.getRecommendations(userId);
      setRecommendations(response.data.recommendations || []);
      toast.success('Personalized recommendations ready!');
    } catch (error) {
      toast.error(error.message);
      console.error('Recommendations error:', error);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setRecommendations([]);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'badge-success',
      medium: 'badge-warning',
      hard: 'badge-error',
    };
    return colors[difficulty?.toLowerCase()] || 'badge-neutral';
  };

  const handleProblemClick = (problemId) => {
    navigate(`/problem/${problemId}`);
    closeModal();
  };

  return (
    <>
      <button
        onClick={fetchRecommendations}
        className="btn btn-accent btn-sm gap-2"
      >
        <Target className="w-4 h-4" />
        Get Recommendations
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[85vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                AI-Powered Problem Recommendations
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
                <p className="text-base-content/60">
                  Analyzing your progress and generating personalized recommendations...
                </p>
              </div>
            ) : recommendations.length > 0 ? (
              <div className="space-y-4 overflow-y-auto max-h-[65vh]">
                {/* Recommendations Info */}
                <div className="alert alert-info">
                  <Target className="w-5 h-5" />
                  <div>
                    <p className="text-sm">
                      Based on your solving patterns and skill level, here are problems
                      that will help you grow!
                    </p>
                  </div>
                </div>

                {/* Problem Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="card bg-base-200 hover:bg-base-300 cursor-pointer transition-all"
                      onClick={() => rec.problemId && handleProblemClick(rec.problemId)}
                    >
                      <div className="card-body p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="badge badge-primary">#{idx + 1}</span>
                              {rec.difficulty && (
                                <span className={`badge ${getDifficultyColor(rec.difficulty)}`}>
                                  {rec.difficulty}
                                </span>
                              )}
                              {rec.tags && rec.tags.length > 0 && (
                                <div className="flex gap-1 flex-wrap">
                                  {rec.tags.slice(0, 3).map((tag, i) => (
                                    <span key={i} className="badge badge-outline badge-sm">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <h4 className="font-semibold text-base mb-2">
                              {rec.title || rec.name || 'Recommended Problem'}
                            </h4>
                            <p className="text-sm text-base-content/70 mb-3">
                              {rec.reason || rec.description || 'This problem will help strengthen your skills.'}
                            </p>
                            {rec.whyRecommended && (
                              <div className="bg-accent/10 p-3 rounded-lg border border-accent/30">
                                <p className="text-xs font-semibold text-accent mb-1">
                                  Why this problem?
                                </p>
                                <p className="text-sm">{rec.whyRecommended}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-base-content/60 py-12">
                <Target className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>No recommendations available at the moment.</p>
                <p className="text-sm mt-2">
                  Solve more problems to get personalized recommendations!
                </p>
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

export default AIRecommendations;
