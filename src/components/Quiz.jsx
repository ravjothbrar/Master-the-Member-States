import { useState } from 'react';
import { ChevronRight, Check, X, Flag, Type } from 'lucide-react';
import FlagImage from './FlagImage';
import { useTheme } from '../context/ThemeContext';

const Quiz = ({ questions, onComplete }) => {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelectAnswer = (option, optionIndex) => {
    if (isAnswered) return;

    setSelectedAnswer({ option, index: optionIndex });
    setIsAnswered(true);

    const isCorrect = currentQuestion.type === 'flagToName'
      ? option.isCorrect
      : option.code === currentQuestion.correctAnswer.code;

    if (isCorrect) {
      setScore(score + 1);
    }

    setAnswers([...answers, {
      question: currentQuestion,
      selectedAnswer: option,
      isCorrect,
    }]);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      onComplete({
        score: score,
        totalQuestions: questions.length,
        answers,
      });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  };

  const getOptionClass = (option, index) => {
    const baseClass = 'w-full p-4 rounded-lg text-left transition-all duration-300 flex items-center gap-3 border-2';

    if (!isAnswered) {
      return `${baseClass} ${
        isDark
          ? 'bg-[#1a1a2e] border-[#009EDB]/20 hover:border-[#009EDB]/60 hover:bg-[#252542]'
          : 'bg-white border-[#009EDB]/10 hover:border-[#009EDB]/50 hover:bg-[#009EDB]/5'
      } cursor-pointer`;
    }

    // For flagToName questions
    if (currentQuestion.type === 'flagToName') {
      const isCorrect = option.isCorrect;
      const isSelected = selectedAnswer?.index === index;

      if (isCorrect) {
        return `${baseClass} border-green-500 ${isDark ? 'bg-green-500/10' : 'bg-green-50'} animate-pulse-correct`;
      }
      if (isSelected && !isCorrect) {
        return `${baseClass} border-red-500 ${isDark ? 'bg-red-500/10' : 'bg-red-50'} animate-shake`;
      }
      return `${baseClass} ${isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/10' : 'bg-gray-50 border-gray-200'} opacity-50`;
    }

    // For nameToFlag questions
    const isCorrect = option.code === currentQuestion.correctAnswer.code;
    const isSelected = selectedAnswer?.option?.code === option.code;

    if (isCorrect) {
      return `${baseClass} border-green-500 ${isDark ? 'bg-green-500/10' : 'bg-green-50'} animate-pulse-correct`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 ${isDark ? 'bg-red-500/10' : 'bg-red-50'} animate-shake`;
    }
    return `${baseClass} ${isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/10' : 'bg-gray-50 border-gray-200'} opacity-50`;
  };

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition page-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${
              isDark ? 'bg-[#009EDB]/10 text-[#009EDB]' : 'bg-[#009EDB]/5 text-[#009EDB]'
            }`}>
              Score: {score}
            </span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1a1a2e]' : 'bg-gray-200'}`}>
            <div
              className="h-full bg-gradient-to-r from-[#009EDB] to-[#0077B3] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className={`rounded-xl p-6 md:p-8 border-2 theme-transition ${
          isDark ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'
        }`}>
          {/* Question Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              currentQuestion.type === 'flagToName'
                ? isDark ? 'bg-[#009EDB]/20 text-[#009EDB]' : 'bg-[#009EDB]/10 text-[#009EDB]'
                : isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
            }`}>
              {currentQuestion.type === 'flagToName' ? (
                <>
                  <Flag className="w-3 h-3" />
                  Flag → Name
                </>
              ) : (
                <>
                  <Type className="w-3 h-3" />
                  Name → Flag
                </>
              )}
            </span>
          </div>

          {/* Question Content */}
          {currentQuestion.type === 'flagToName' ? (
            <>
              <p className={`text-lg mb-4 theme-transition ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                What is the <span className="text-[#009EDB] font-semibold">official UN name</span> of this member state?
              </p>
              <div className="flex justify-center mb-6">
                <FlagImage
                  code={currentQuestion.correctAnswer.code}
                  size="w320"
                  alt="Flag"
                  className="w-48 md:w-56 h-auto rounded-lg flag-shadow"
                />
              </div>
            </>
          ) : (
            <>
              <p className={`text-lg mb-2 theme-transition ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Which flag belongs to this member state?
              </p>
              <div className={`text-xl md:text-2xl font-bold mb-6 text-center py-4 px-6 rounded-lg theme-transition ${
                isDark ? 'bg-[#0f0f1a] text-white' : 'bg-gray-50 text-gray-900'
              }`}>
                {currentQuestion.correctAnswer.officialName}
              </div>
            </>
          )}

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(option, index)}
                disabled={isAnswered}
                className={getOptionClass(option, index)}
              >
                {currentQuestion.type === 'flagToName' ? (
                  <>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-[#009EDB]/10 text-[#009EDB]' : 'bg-[#009EDB]/5 text-[#009EDB]'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className={`flex-1 text-sm font-medium theme-transition ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {option.name}
                    </span>
                    {isAnswered && option.isCorrect && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {isAnswered && selectedAnswer?.index === index && !option.isCorrect && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </>
                ) : (
                  <>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isDark ? 'bg-[#009EDB]/10 text-[#009EDB]' : 'bg-[#009EDB]/5 text-[#009EDB]'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <FlagImage
                      code={option.code}
                      size="w80"
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="w-12 h-8 object-cover rounded flag-shadow"
                    />
                    <span className="flex-1" />
                    {isAnswered && option.code === currentQuestion.correctAnswer.code && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {isAnswered && selectedAnswer?.option?.code === option.code && option.code !== currentQuestion.correctAnswer.code && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="mt-6 flex flex-col items-center animate-fade-in">
              {currentQuestion.type === 'flagToName' && !selectedAnswer?.option?.isCorrect && (
                <p className={`text-sm mb-3 text-center theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Correct answer: <span className="text-green-500 font-medium">{currentQuestion.correctAnswer.officialName}</span>
                </p>
              )}
              {currentQuestion.type === 'nameToFlag' && selectedAnswer?.option?.code !== currentQuestion.correctAnswer.code && (
                <p className={`text-sm mb-3 text-center theme-transition ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Correct answer: <span className="text-green-500 font-medium">{currentQuestion.correctAnswer.shortName}</span>
                </p>
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
              >
                {currentIndex + 1 >= questions.length ? 'View Results' : 'Next Question'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
