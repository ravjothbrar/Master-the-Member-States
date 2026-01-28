import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Trash2, Calendar, Target, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ResultsHistory = ({ onBack }) => {
  const { isDark } = useTheme();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all quiz history?')) {
      localStorage.removeItem('quizHistory');
      setHistory([]);
    }
  };

  const deleteResult = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    localStorage.setItem('quizHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 70) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getModeLabel = (mode) => {
    switch (mode) {
      case 'flagToName': return 'Flag → Name';
      case 'nameToFlag': return 'Name → Flag';
      case 'mixed': return 'Mixed';
      default: return mode;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate stats
  const totalQuizzes = history.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(history.reduce((acc, h) => acc + h.percentage, 0) / totalQuizzes)
    : 0;
  const bestScore = totalQuizzes > 0
    ? Math.max(...history.map(h => h.percentage))
    : 0;

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition page-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className={`flex items-center gap-2 text-sm font-medium px-3 py-2 -ml-3 rounded-lg transition-all duration-300 mb-8 ${
            isDark
              ? 'text-gray-400 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
              : 'text-gray-600 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-3 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            <span className="font-mono text-lg font-bold">||</span>
            <h1 className={`text-2xl font-bold tracking-wide theme-transition ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Quiz History
            </h1>
            <span className="font-mono text-lg font-bold">||</span>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {/* Stats Overview */}
        {history.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className={`p-4 rounded-lg border-2 text-center theme-transition ${
              isDark
                ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20'
                : 'bg-white border-[#009EDB]/10'
            }`}>
              <Target className="w-5 h-5 text-[#009EDB] mx-auto mb-2" />
              <p className={`text-2xl font-bold theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {totalQuizzes}
              </p>
              <p className={`text-xs theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Quizzes Taken
              </p>
            </div>
            <div className={`p-4 rounded-lg border-2 text-center theme-transition ${
              isDark
                ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20'
                : 'bg-white border-[#009EDB]/10'
            }`}>
              <Clock className="w-5 h-5 text-[#009EDB] mx-auto mb-2" />
              <p className={`text-2xl font-bold theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {averageScore}%
              </p>
              <p className={`text-xs theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Average Score
              </p>
            </div>
            <div className={`p-4 rounded-lg border-2 text-center theme-transition ${
              isDark
                ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20'
                : 'bg-white border-[#009EDB]/10'
            }`}>
              <Trophy className="w-5 h-5 text-[#009EDB] mx-auto mb-2" />
              <p className={`text-2xl font-bold theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {bestScore}%
              </p>
              <p className={`text-xs theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Best Score
              </p>
            </div>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className={`text-center py-16 rounded-lg border-2 theme-transition ${
            isDark
              ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20'
              : 'bg-white border-[#009EDB]/10'
          }`}>
            <Trophy className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-lg font-medium mb-2 theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              No quiz history yet
            </p>
            <p className={`text-sm theme-transition ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Complete a quiz to see your results here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover-glow ${
                  isDark
                    ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20 hover:border-[#009EDB]/50'
                    : 'bg-white border-[#009EDB]/10 hover:border-[#009EDB]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                      isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
                    }`}>
                      <span className={`text-xl font-bold ${getScoreColor(result.percentage)}`}>
                        {result.percentage}%
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="text-[#009EDB] font-mono mr-2">{'>>'}</span>
                        {result.score}/{result.totalQuestions} correct
                      </p>
                      <div className={`flex items-center gap-3 text-sm theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span>{getModeLabel(result.mode)}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(result.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteResult(index)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDark
                        ? 'text-gray-500 hover:text-red-400 hover:bg-red-500/10'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsHistory;
