import { useEffect } from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import FlagImage from './FlagImage';
import { useTheme } from '../context/ThemeContext';

const Results = ({ results, quizConfig, onRestart, onHome }) => {
  const { isDark } = useTheme();
  const { score, totalQuestions, answers } = results;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Save to localStorage on mount
  useEffect(() => {
    const historyEntry = {
      score,
      totalQuestions,
      percentage,
      mode: quizConfig?.mode || 'mixed',
      date: new Date().toISOString(),
    };

    const savedHistory = localStorage.getItem('quizHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.unshift(historyEntry); // Add to beginning
    // Keep only last 50 results
    const trimmedHistory = history.slice(0, 50);
    localStorage.setItem('quizHistory', JSON.stringify(trimmedHistory));
  }, [score, totalQuestions, percentage, quizConfig]);

  useEffect(() => {
    if (percentage >= 70) {
      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ['#009EDB', '#0077B3', '#FFD700', '#FFFFFF'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [percentage]);

  const getScoreMessage = () => {
    if (percentage === 100) return 'Perfect score!';
    if (percentage >= 90) return 'Excellent work!';
    if (percentage >= 70) return 'Great job!';
    if (percentage >= 50) return 'Good effort!';
    return 'Keep practicing!';
  };

  const getScoreColor = () => {
    if (percentage >= 70) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition page-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Score Card */}
        <div className={`rounded-lg p-8 text-center mb-8 border-2 theme-transition ${
          isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/30' : 'bg-white border-[#009EDB]/20'
        }`}>
          <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
          }`}>
            <Trophy className="w-7 h-7 text-[#009EDB]" />
          </div>

          <h2 className={`text-2xl font-bold mb-1 theme-transition ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Quiz Complete
          </h2>

          <p className={`text-sm mb-6 font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {'>>'} {getScoreMessage()}
          </p>

          {/* Score Display */}
          <div className={`rounded-lg p-6 mb-6 border-2 theme-transition ${
            isDark ? 'bg-[#0f0f1a] border-[#009EDB]/20' : 'bg-gray-50 border-[#009EDB]/10'
          }`}>
            <div className={`text-5xl font-bold mb-1 ${getScoreColor()}`}>
              {score}/{totalQuestions}
            </div>
            <p className={`text-sm font-mono ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {percentage}% correct
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRestart}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={onHome}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-[#1a1a2e] border-2 border-[#009EDB]/20 text-gray-300 hover:border-[#009EDB]/50 hover:text-[#009EDB]'
                  : 'bg-white border-2 border-[#009EDB]/20 text-gray-700 hover:border-[#009EDB]/50 hover:text-[#009EDB]'
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div>
          <div className={`flex items-center gap-3 mb-4 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            <span className="font-mono text-lg font-bold">||</span>
            <h3 className="text-lg font-bold tracking-wide uppercase">
              Answer Review
            </h3>
            <span className="font-mono text-lg font-bold">||</span>
          </div>

          <div className="space-y-2">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  answer.isCorrect
                    ? isDark ? 'bg-green-500/10 border-green-500/30' : 'bg-green-50 border-green-200'
                    : isDark ? 'bg-red-500/10 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-3 h-3 text-white" />
                    ) : (
                      <XCircle className="w-3 h-3 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FlagImage
                        code={answer.question.correctAnswer.code}
                        size="w40"
                        alt={answer.question.correctAnswer.shortName}
                        className="w-6 h-4 object-cover rounded"
                      />
                      <span className={`font-medium text-sm theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {answer.question.correctAnswer.shortName}
                      </span>
                    </div>

                    <p className={`text-xs font-mono theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {answer.question.correctAnswer.officialName}
                    </p>

                    {!answer.isCorrect && (
                      <p className="text-xs text-red-500 mt-1 font-mono">
                        {'>'} Your answer: {answer.question.type === 'flagToName'
                          ? answer.selectedAnswer.name
                          : answer.selectedAnswer.shortName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
