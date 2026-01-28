import { useState } from 'react';
import { Play, ArrowLeft, Flag, Type, Shuffle, Star } from 'lucide-react';
import { memberStates } from '../data/memberStates';
import { useTheme } from '../context/ThemeContext';

const QuizConfig = ({ onStartQuiz, onBack }) => {
  const { isDark } = useTheme();
  const [questionCount, setQuestionCount] = useState('20');
  const [mode, setMode] = useState('mixed');

  const handleStart = () => {
    onStartQuiz({
      questionCount,
      mode,
    });
  };

  const questionOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20', recommended: true },
    { value: '50', label: '50' },
    { value: 'all', label: `${memberStates.length}` },
  ];

  const modeOptions = [
    { value: 'flagToName', label: 'Flag to Name', icon: Flag, description: 'See a flag, identify the official name' },
    { value: 'nameToFlag', label: 'Name to Flag', icon: Type, description: 'See a name, identify the correct flag' },
    { value: 'mixed', label: 'Mixed Mode', icon: Shuffle, description: 'Random combination of both types', recommended: true },
  ];

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition page-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
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
          <span className={`${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>#</span> config.yaml
        </div>

        {/* Title */}
        <div className={`flex items-center gap-3 mb-8`}>
          <div className={`h-px flex-1 max-w-[40px] ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
          <h1 className={`text-xl font-bold tracking-wide uppercase ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            Configure Quiz
          </h1>
          <div className={`h-px flex-1 ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
        </div>

        {/* Config Card */}
        <div className={`p-6 rounded-lg border ${isDark ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'}`}>
          {/* Question Count */}
          <div className="mb-8">
            <label className={`block text-sm font-medium mb-3 theme-transition ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span className={`font-mono mr-2 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>questions:</span>
              <span className="font-normal opacity-70">Number of questions</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {questionOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setQuestionCount(option.value)}
                  className={`relative px-4 py-3 rounded text-sm font-mono font-medium transition-all duration-300 ${
                    questionCount === option.value
                      ? 'bg-[#009EDB] text-white hover-glow'
                      : isDark
                        ? 'bg-[#0f0f1a] text-gray-300 hover:bg-[#252542] border border-[#009EDB]/20 hover:border-[#009EDB]/50'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-[#009EDB]/20 hover:border-[#009EDB]/50'
                  }`}
                >
                  {option.label}
                  {option.recommended && (
                    <span className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                      questionCount === option.value ? 'bg-white' : 'bg-[#009EDB]'
                    }`} />
                  )}
                </button>
              ))}
            </div>
            <p className={`text-xs mt-3 font-mono theme-transition ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              <Star className="w-3 h-3 inline mr-1 text-[#009EDB]" />
              {'// '}20 recommended for balanced practice
            </p>
          </div>

          {/* Divider */}
          <div className={`h-px mb-8 ${isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/10'}`}></div>

          {/* Quiz Mode */}
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-3 theme-transition ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`}>
              <span className={`font-mono mr-2 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>mode:</span>
              <span className="font-normal opacity-70">Quiz type</span>
            </label>
            <div className="space-y-2">
              {modeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = mode === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setMode(option.value)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg text-left transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#009EDB] text-white hover-glow'
                        : isDark
                          ? 'bg-[#0f0f1a] hover:bg-[#252542] border border-[#009EDB]/20 hover:border-[#009EDB]/50'
                          : 'bg-gray-50 hover:bg-gray-100 border border-[#009EDB]/20 hover:border-[#009EDB]/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isSelected
                        ? 'bg-white/20'
                        : isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isSelected ? 'text-white' : 'text-[#009EDB]'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`font-medium theme-transition ${
                          isSelected ? 'text-white' : isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          <span className={`font-mono text-sm mr-2 ${isSelected ? 'opacity-70' : 'opacity-50'}`}>{'>'}</span>
                          {option.label}
                        </p>
                        {option.recommended && (
                          <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-[#009EDB]/10 text-[#009EDB]'
                          }`}>
                            default
                          </span>
                        )}
                      </div>
                      <p className={`text-sm theme-transition ${
                        isSelected ? 'text-white/70' : isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="group w-full flex items-center justify-center gap-3 px-6 py-4 mt-6 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
        >
          <span className="font-mono opacity-80">$</span>
          <Play className="w-5 h-5" />
          <span>./run-quiz</span>
        </button>
      </div>
    </div>
  );
};

export default QuizConfig;
