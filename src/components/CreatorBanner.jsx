import { useTheme } from '../context/ThemeContext';

const CreatorBanner = () => {
  const { isDark } = useTheme();

  return (
    <div className={`w-full py-1.5 text-center text-xs font-mono theme-transition ${
      isDark
        ? 'bg-[#1a1a2e] border-b border-[#8B5CF6]/20'
        : 'bg-[#8B5CF6]/5 border-b border-[#8B5CF6]/10'
    }`}>
      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {'> '}created by{' '}
      </span>
      <a
        href="https://ravjothbrar.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#8B5CF6] hover:text-[#7C3AED] hover:underline font-medium transition-colors"
      >
        Ravjoth Brar
      </a>
    </div>
  );
};

export default CreatorBanner;
