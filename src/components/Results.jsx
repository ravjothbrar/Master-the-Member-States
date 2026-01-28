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
        {/* File header */}
        <div className={`font-mono text-sm mb-6 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          <span className={`${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>#</span> results.json
        </div>

        {/* Score Card */}
        <div className={`rounded-lg p-8 text-center mb-8 border theme-transition ${
          isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'
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
            <span className="text-[#009EDB]">{'>'}</span> status: {getScoreMessage()}
          </p>

          {/* Score Display - JSON style */}
          <div className={`rounded-lg p-6 mb-6 border text-left font-mono text-sm theme-transition ${
            isDark ? 'bg-[#0f0f1a] border-[#009EDB]/20' : 'bg-gray-50 border-[#009EDB]/10'
          }`}>
            <div className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{'{'}</div>
            <div className="pl-4 space-y-1">
              <div>
                <span className="text-[#009EDB]">"score"</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>: </span>
                <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>,</span>
              </div>
              <div>
                <span className="text-[#009EDB]">"total"</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>: </span>
                <span className={`${isDark ? 'text-white' : 'text-gray-900'}`}>{totalQuestions}</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>,</span>
              </div>
              <div>
                <span className="text-[#009EDB]">"percentage"</span>
                <span className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>: </span>
                <span className={`${getScoreColor()}`}>{percentage}%</span>
              </div>
            </div>
            <div className={`${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{'}'}</div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRestart}
              className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="font-mono">./retry</span>
            </button>
            <button
              onClick={onHome}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-all duration-300 ${
                isDark
                  ? 'bg-[#0f0f1a] border border-[#009EDB]/20 text-gray-300 hover:border-[#009EDB]/50 hover:text-[#009EDB]'
                  : 'bg-gray-50 border border-[#009EDB]/20 text-gray-700 hover:border-[#009EDB]/50 hover:text-[#009EDB]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="font-mono">cd ~</span>
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div>
          <div className={`font-mono text-sm mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <span className={`${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>##</span> review.md
          </div>

          <div className={`flex items-center gap-3 mb-6`}>
            <div className={`h-px flex-1 max-w-[40px] ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
            <h3 className={`text-lg font-bold tracking-wide uppercase ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
              Answer Review
            </h3>
            <div className={`h-px flex-1 ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
          </div>

          <div className="space-y-2">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  answer.isCorrect
                    ? isDark ? 'bg-green-500/5 border-green-500/30' : 'bg-green-50 border-green-200'
                    : isDark ? 'bg-red-500/5 border-red-500/30' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 font-mono text-xs font-bold ${
                    answer.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {answer.isCorrect ? '✓' : '×'}
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
                      <span className="text-[#009EDB]">official:</span> {answer.question.correctAnswer.officialName}
                    </p>

                    {!answer.isCorrect && (
                      <p className="text-xs text-red-500 mt-1 font-mono">
                        <span className="opacity-70">your_answer:</span> {answer.question.type === 'flagToName'
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
