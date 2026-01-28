import { useEffect } from 'react';
import { Trophy, RotateCcw, Home } from 'lucide-react';
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
    history.unshift(historyEntry);
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
    if (percentage === 100) return 'Perfect score! You know your member states!';
    if (percentage >= 90) return 'Excellent work, delegate!';
    if (percentage >= 70) return 'Great job! Keep practicing!';
    if (percentage >= 50) return 'Good effort! Room for improvement.';
    return 'Keep studying those member states!';
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
        <div className={`rounded-xl p-8 text-center mb-8 border-2 theme-transition ${
          isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'
        }`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
          }`}>
            <Trophy className="w-8 h-8 text-[#009EDB]" />
          </div>

          <h2 className={`text-2xl font-bold mb-2 theme-transition ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Quiz Complete!
          </h2>

          <p className={`text-sm mb-6 theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {getScoreMessage()}
          </p>

          {/* Score Display */}
          <div className={`inline-flex items-baseline gap-2 mb-6 p-4 rounded-xl ${
            isDark ? 'bg-[#0f0f1a]' : 'bg-gray-50'
          }`}>
            <span className={`text-5xl font-bold ${getScoreColor()}`}>
              {score}
            </span>
            <span className={`text-2xl theme-transition ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              / {totalQuestions}
            </span>
            <span className={`text-lg ml-2 font-medium ${getScoreColor()}`}>
              ({percentage}%)
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <button
              onClick={onHome}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-[#1a1a2e] text-gray-300 hover:bg-[#252542] border border-[#009EDB]/20'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-[#009EDB]/20'
              }`}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div>
          <div className={`flex items-center gap-3 mb-6 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            <span className="font-mono text-lg font-bold">||</span>
            <h3 className={`text-lg font-bold theme-transition ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Answer Review
            </h3>
            <span className="font-mono text-lg font-bold">||</span>
          </div>

          <div className="space-y-3">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  answer.isCorrect
                    ? isDark ? 'bg-green-500/5 border-green-500/30' : 'bg-green-50 border-green-200'
                    : isDark ? 'bg-red-500/5 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold ${
                    answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {answer.isCorrect ? '✓' : '✗'}
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

                    <p className={`text-xs theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Official: {answer.question.correctAnswer.officialName}
                    </p>

                    {!answer.isCorrect && (
                      <p className="text-xs text-red-500 mt-1">
                        Your answer: {answer.question.type === 'flagToName'
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
