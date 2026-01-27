import { useState } from 'react';
import { Settings, Play, ArrowLeft, Flag, Type, Shuffle } from 'lucide-react';
import { memberStates } from '../data/memberStates';

const QuizConfig = ({ onStartQuiz, onBack }) => {
  const [questionCount, setQuestionCount] = useState('10');
  const [mode, setMode] = useState('flagToName');

  const handleStart = () => {
    onStartQuiz({
      questionCount,
      mode,
    });
  };

  const questionOptions = [
    { value: '10', label: '10 Questions' },
    { value: '20', label: '20 Questions' },
    { value: '50', label: '50 Questions' },
    { value: 'all', label: `All ${memberStates.length} States` },
  ];

  const modeOptions = [
    { value: 'flagToName', label: 'Flag to Name', icon: Flag, description: 'See a flag, identify the official name' },
    { value: 'nameToFlag', label: 'Name to Flag', icon: Type, description: 'See a name, identify the correct flag' },
    { value: 'mixed', label: 'Mixed Mode', icon: Shuffle, description: 'Random combination of both types' },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-[#E6F4FA] py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-[#009EDB] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        {/* Config Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#009EDB]/10 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-[#009EDB]" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Configure Your Quiz
            </h2>
          </div>

          {/* Question Count */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Number of Questions
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {questionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuestionCount(option.value)}
                  className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                    questionCount === option.value
                      ? 'border-[#009EDB] bg-[#009EDB]/5 text-[#009EDB]'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Mode */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Quiz Mode
            </label>
            <div className="space-y-3">
              {modeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setMode(option.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      mode === option.value
                        ? 'border-[#009EDB] bg-[#009EDB]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      mode === option.value ? 'bg-[#009EDB]/10' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        mode === option.value ? 'text-[#009EDB]' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <p className={`font-medium ${
                        mode === option.value ? 'text-[#009EDB]' : 'text-gray-900'
                      }`}>
                        {option.label}
                      </p>
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#009EDB] hover:bg-[#0077B3] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Play className="w-5 h-5" />
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizConfig;
