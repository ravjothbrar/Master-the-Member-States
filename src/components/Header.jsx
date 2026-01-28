import { useState } from 'react';
import { Globe, Moon, Sun, Users, History } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onHomeClick, onHistoryClick, currentView }) => {
  const { isDark, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className={`sticky top-0 z-50 border-b theme-transition ${
      isDark
        ? 'bg-[#0f0f1a]/95 backdrop-blur-sm border-[#009EDB]/30'
        : 'bg-white/95 backdrop-blur-sm border-[#009EDB]/20'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`flex items-center gap-3 group px-3 py-2 -ml-3 rounded-lg transition-all duration-300 ${
              isHovered
                ? isDark
                  ? 'bg-[#009EDB]/15'
                  : 'bg-[#009EDB]/10'
                : ''
            }`}
          >
            <div className={`relative w-8 h-8 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'scale-110' : ''
            }`}>
              {/* Globe icon - shows by default */}
              <Globe
                className={`w-7 h-7 text-[#009EDB] absolute transition-all duration-300 ${
                  isHovered ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
                }`}
                strokeWidth={1.5}
              />
              {/* MUN icon - shows on hover */}
              <Users
                className={`w-7 h-7 text-[#009EDB] absolute transition-all duration-300 ${
                  isHovered ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
                }`}
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className={`text-lg font-semibold tracking-tight leading-tight transition-all duration-300 ${
                isHovered
                  ? 'text-[#009EDB]'
                  : isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Master the Member States
              </span>
              <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors duration-300 ${
                isDark ? 'text-[#009EDB]/70' : 'text-[#009EDB]/80'
              }`}>
                {'>'} MUN Study Tool
              </span>
            </div>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            {/* History Tab */}
            <button
              onClick={onHistoryClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                currentView === 'history'
                  ? 'bg-[#009EDB] text-white'
                  : isDark
                    ? 'text-gray-400 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
                    : 'text-gray-600 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
              }`}
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Results</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all duration-300 ${
                isDark
                  ? 'text-gray-400 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
                  : 'text-gray-600 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
