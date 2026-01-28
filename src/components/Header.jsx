import { Globe, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onHomeClick }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      isDark
        ? 'bg-[#1a1a2e] border-[#009EDB]/20'
        : 'bg-white border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={onHomeClick}
            className="flex items-center gap-2.5 group"
          >
            <div className={`p-1.5 rounded transition-colors duration-300 ${
              isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
            }`}>
              <Globe
                className="w-7 h-7 text-[#009EDB] transition-transform duration-300 group-hover:rotate-12"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-col items-start">
              <span className={`text-lg font-semibold tracking-tight leading-tight transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Master the Member States
              </span>
              <span className={`text-[10px] uppercase tracking-widest ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                MUN Study Tool
              </span>
            </div>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
