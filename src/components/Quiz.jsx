import { useState, useEffect } from 'react';
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

  const handleSelectAnswer = (option) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option.code === currentQuestion.correctAnswer.code;
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

  const getOptionClass = (option) => {
    const baseClass = 'w-full p-4 rounded-lg border-2 text-left transition-all duration-200 flex items-center gap-3';

    if (!isAnswered) {
      return `${baseClass} border-gray-200 hover:border-[#009EDB] hover:bg-[#009EDB]/5 cursor-pointer`;
    }

    const isCorrect = option.code === currentQuestion.correctAnswer.code;
    const isSelected = option.code === selectedAnswer?.code;

    if (isCorrect) {
      return `${baseClass} border-green-500 bg-green-50 animate-pulse-correct`;
    }
    if (isSelected && !isCorrect) {
      return `${baseClass} border-red-500 bg-red-50 animate-shake`;
    }
    return `${baseClass} border-gray-200 opacity-50`;
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-[#E6F4FA] py-6 md:py-8">
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
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#009EDB] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          {/* Question Type Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.type === 'flagToName'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {currentQuestion.type === 'flagToName' ? (
                <>
                  <Flag className="w-3 h-3" />
                  Flag to Name
                </>
              ) : (
                <>
                  <Type className="w-3 h-3" />
                  Name to Flag
                </>
              )}
            </span>
          </div>

          {/* Question Content */}
          {currentQuestion.type === 'flagToName' ? (
            <>
              <p className="text-gray-700 mb-4">
                What is the <strong>official UN name</strong> of this member state?
              </p>
              <div className="flex justify-center mb-6">
                <img
                  src={getFlagUrl(currentQuestion.correctAnswer.code, 'w320')}
                  alt="Flag"
                  className="w-48 md:w-64 h-auto rounded-md flag-shadow"
                  loading="eager"
                />
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                Which flag belongs to:
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center py-4 px-6 bg-gray-50 rounded-lg">
                {currentQuestion.correctAnswer.officialName}
              </p>
            </>
          )}

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={option.code}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={getOptionClass(option)}
              >
                {currentQuestion.type === 'flagToName' ? (
                  <>
                    <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1 text-sm md:text-base font-medium text-gray-800">
                      {option.officialName}
                    </span>
                    {isAnswered && option.code === currentQuestion.correctAnswer.code && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {isAnswered && option.code === selectedAnswer?.code && option.code !== currentQuestion.correctAnswer.code && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </>
                ) : (
                  <>
                    <img
                      src={getFlagUrl(option.code, 'w80')}
                      alt={`Option ${String.fromCharCode(65 + index)}`}
                      className="w-12 h-8 object-cover rounded flag-shadow"
                    />
                    <span className="flex-1 text-sm md:text-base font-medium text-gray-800">
                      {option.shortName}
                    </span>
                    {isAnswered && option.code === currentQuestion.correctAnswer.code && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {isAnswered && option.code === selectedAnswer?.code && option.code !== currentQuestion.correctAnswer.code && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </>
                )}
              </button>
            ))}
          </div>

          {/* Next Button */}
          {isAnswered && (
            <div className="mt-6 flex flex-col items-center">
              {selectedAnswer?.code !== currentQuestion.correctAnswer.code && (
                <p className="text-sm text-gray-600 mb-3">
                  Correct answer: <strong className="text-green-600">{currentQuestion.correctAnswer.officialName}</strong>
                </p>
              )}
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#009EDB] hover:bg-[#0077B3] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
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
