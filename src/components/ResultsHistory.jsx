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
      case 'flagToName': return 'flag→name';
      case 'nameToFlag': return 'name→flag';
      case 'mixed': return 'mixed';
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
          className={`inline-flex items-center gap-2 mb-8 text-sm font-medium transition-all duration-300 px-3 py-1.5 -ml-3 rounded ${
            isDark
              ? 'text-gray-400 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
              : 'text-gray-600 hover:text-[#009EDB] hover:bg-[#009EDB]/5'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono">{'<'} back</span>
        </button>

        {/* File header */}
        <div className={`font-mono text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <span className={`${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>#</span> history.log
        </div>

        {/* Title */}
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-3`}>
            <div className={`h-px flex-1 max-w-[40px] ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
            <h1 className={`text-xl font-bold tracking-wide uppercase ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
              Quiz History
            </h1>
            <div className={`h-px w-[40px] ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
          </div>

          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className={`flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded transition-all duration-300 ${
                isDark
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-red-500 hover:bg-red-50'
              }`}
            >
              <Trash2 className="w-3 h-3" />
              rm -rf ./history
            </button>
          )}
        </div>

        {/* Stats Overview */}
        {history.length > 0 && (
          <div className={`p-4 rounded-lg border mb-8 font-mono text-sm ${
            isDark ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'
          }`}>
            <div className={`text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {'// '}stats
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {totalQuizzes}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <Target className="w-3 h-3 inline mr-1 text-[#009EDB]" />
                  total
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {averageScore}%
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <Clock className="w-3 h-3 inline mr-1 text-[#009EDB]" />
                  average
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(bestScore)}`}>
                  {bestScore}%
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  <Trophy className="w-3 h-3 inline mr-1 text-[#009EDB]" />
                  best
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <div className={`text-center py-16 rounded-lg border theme-transition ${
            isDark
              ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20'
              : 'bg-white border-[#009EDB]/10'
          }`}>
            <div className={`font-mono text-sm mb-4 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
              {'// '}empty
            </div>
            <Trophy className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`font-mono text-sm theme-transition ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <span className="text-[#009EDB]">{'>'}</span> No quiz history yet
            </p>
            <p className={`text-xs mt-2 theme-transition ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Complete a quiz to see your results here
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className={`font-mono text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              {'// '}entries: {history.length}
            </div>
            {history.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isDark
                    ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20 hover:border-[#009EDB]/50'
                    : 'bg-white border-[#009EDB]/10 hover:border-[#009EDB]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center font-mono ${
                      isDark ? 'bg-[#0f0f1a] border border-[#009EDB]/20' : 'bg-gray-50 border border-[#009EDB]/10'
                    }`}>
                      <span className={`text-xl font-bold ${getScoreColor(result.percentage)}`}>
                        {result.percentage}%
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium font-mono theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <span className="text-[#009EDB] opacity-70">[</span>
                        {result.score}/{result.totalQuestions}
                        <span className="text-[#009EDB] opacity-70">]</span>
                        <span className={`ml-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>correct</span>
                      </p>
                      <div className={`flex items-center gap-3 text-xs font-mono theme-transition ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                        <span className={`px-1.5 py-0.5 rounded ${isDark ? 'bg-[#009EDB]/10 text-[#009EDB]' : 'bg-[#009EDB]/5 text-[#009EDB]'}`}>
                          {getModeLabel(result.mode)}
                        </span>
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
