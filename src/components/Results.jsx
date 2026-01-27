import { useEffect } from 'react';
import { Trophy, RotateCcw, Home, CheckCircle, XCircle, Flag } from 'lucide-react';
import confetti from 'canvas-confetti';
import FlagImage from './FlagImage';

const Results = ({ results, onRestart, onHome }) => {
  const { score, totalQuestions, answers } = results;
  const percentage = Math.round((score / totalQuestions) * 100);

  useEffect(() => {
    // Trigger confetti for good scores
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
    if (percentage === 100) return { text: 'Perfect Score! Outstanding!', color: 'text-green-600' };
    if (percentage >= 90) return { text: 'Excellent! Almost perfect!', color: 'text-green-600' };
    if (percentage >= 70) return { text: 'Great job! Well done!', color: 'text-blue-600' };
    if (percentage >= 50) return { text: 'Good effort! Keep practicing!', color: 'text-yellow-600' };
    return { text: 'Keep studying! You\'ll improve!', color: 'text-orange-600' };
  };

  const scoreMessage = getScoreMessage();

  const getScoreColor = () => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-[#E6F4FA] py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 text-center mb-8">
          <div className="w-16 h-16 bg-[#009EDB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#009EDB]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Quiz Complete!
          </h2>

          <p className={`text-lg font-medium mb-6 ${scoreMessage.color}`}>
            {scoreMessage.text}
          </p>

          {/* Score Display */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className={`text-5xl md:text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600">
              {percentage}% Correct
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onRestart}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#009EDB] hover:bg-[#0077B3] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={onHome}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#009EDB] text-gray-700 hover:text-[#009EDB] font-semibold rounded-lg transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Flag className="w-5 h-5 text-[#009EDB]" />
            Answer Review
          </h3>

          <div className="space-y-4">
            {answers.map((answer, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {answer.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <FlagImage
                        code={answer.question.correctAnswer.code}
                        size="w40"
                        alt={answer.question.correctAnswer.shortName}
                        className="w-8 h-5 object-cover rounded flag-shadow"
                      />
                      <span className="font-medium text-gray-900 text-sm">
                        {answer.question.correctAnswer.shortName}
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Official Name:</span>{' '}
                      {answer.question.correctAnswer.officialName}
                    </p>

                    {!answer.isCorrect && (
                      <p className="text-sm text-red-600">
                        <span className="font-medium">Your answer:</span>{' '}
                        {answer.question.type === 'flagToName'
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
