import { useState } from 'react';
import { ChevronRight, Check, X, Flag, Type } from 'lucide-react';
import { getFlagUrl } from '../data/memberStates';

const Quiz = ({ questions, onComplete }) => {
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

    // For flagToName, check if option.isCorrect; for nameToFlag, check code match
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
    const baseClass = 'w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ease-out flex items-center gap-3 transform';

    if (!isAnswered) {
      return `${baseClass} border-gray-200 hover:border-[#009EDB] hover:bg-[#009EDB]/5 hover:scale-[1.02] hover:shadow-md cursor-pointer active:scale-[0.98]`;
    }

    // For flagToName questions
    if (currentQuestion.type === 'flagToName') {
      const isCorrect = option.isCorrect;
      const isSelected = selectedAnswer?.index === index;

      if (isCorrect) {
        return `${baseClass} border-green-500 bg-green-50 animate-pulse-correct scale-[1.02]`;
      }
      if (isSelected && !isCorrect) {
        return `${baseClass} border-red-500 bg-red-50 animate-shake`;
      }
      return `${baseClass} border-gray-200 opacity-50`;
    }

    // For nameToFlag questions
    const isCorrect = option.code === currentQuestion.correctAnswer.code;
    const isSelected = selectedAnswer?.option?.code === option.code;

    if (isCorrect) {
      return `${baseClass} border-green-500 bg-green-50 animate-pulse-correct scale-[1.02]`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-50 animate-shake`;
    }
    return `${baseClass} border-gray-200 opacity-50`;
  };

  return (
    <div className="min-h-[calc(100vh-88px)] bg-gradient-to-b from-white to-[#E6F4FA] py-6 md:py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-[#009EDB]">
              Score: {score}/{currentIndex + (isAnswered ? 1 : 0)}
            </span>
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#009EDB] to-[#0077B3] transition-all duration-700 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 transition-all duration-300">
          {/* Question Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              currentQuestion.type === 'flagToName'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {currentQuestion.type === 'flagToName' ? (
                <>
                  <Flag className="w-3.5 h-3.5" />
                  Flag to Name
                </>
              ) : (
                <>
                  <Type className="w-3.5 h-3.5" />
                  Name to Flag
                </>
              )}
            </span>
          </div>

          {/* Question Content */}
          {currentQuestion.type === 'flagToName' ? (
            <>
              <p className="text-gray-700 mb-4 text-lg">
                What is the <strong className="text-[#009EDB]">official UN name</strong> of this member state?
              </p>
              <div className="flex justify-center mb-6">
                <img
                  src={getFlagUrl(currentQuestion.correctAnswer.code, 'w320')}
                  alt="Flag"
                  className="w-48 md:w-64 h-auto rounded-lg flag-shadow transition-transform duration-300 hover:scale-105"
                  loading="eager"
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2 text-lg">
                Which flag belongs to this member state?
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                {currentQuestion.correctAnswer.officialName}
              </p>
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
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shadow-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-sm md:text-base font-medium text-gray-800">
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
                    <span className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shadow-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <img
                      src={getFlagUrl(option.code, 'w80')}
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="w-14 h-9 object-cover rounded-md flag-shadow"
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
                <p className="text-sm text-gray-600 mb-3 text-center">
                  Correct answer: <strong className="text-green-600">{currentQuestion.correctAnswer.officialName}</strong>
                </p>
              )}
              {currentQuestion.type === 'nameToFlag' && selectedAnswer?.option?.code !== currentQuestion.correctAnswer.code && (
                <p className="text-sm text-gray-600 mb-3 text-center">
                  The correct flag was for <strong className="text-green-600">{currentQuestion.correctAnswer.shortName}</strong>
                </p>
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#009EDB] to-[#0077B3] hover:from-[#0077B3] hover:to-[#005A8C] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
