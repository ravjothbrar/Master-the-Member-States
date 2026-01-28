import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const WhyPage = ({ onBack }) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      <div className="page-transition">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
          {/* Back button */}
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
            <span className={`${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>#</span> why.md
          </div>

          {/* Page Title */}
          <div className={`flex items-center gap-3 mb-8`}>
            <div className={`h-px flex-1 max-w-[40px] ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
            <h1 className={`text-2xl font-bold tracking-wide uppercase ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
              Why This Exists
            </h1>
            <div className={`h-px flex-1 ${isDark ? 'bg-[#009EDB]/30' : 'bg-[#009EDB]/20'}`}></div>
          </div>

          {/* Content in markdown style */}
          <div className={`space-y-6 leading-relaxed theme-transition ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`} style={{ fontSize: '1.05rem' }}>

            {/* Section: What is MUN */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'}`}>
              <div className={`font-mono text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {'// '}context
              </div>
              <p className="terminal-line mb-3">
                <strong className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Model United Nations (MUN)</strong> is a massive global education simulation of the real UN, with over{' '}
                <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDark ? 'bg-[#009EDB]/20 text-[#009EDB]' : 'bg-[#009EDB]/10 text-[#009EDB]'}`}>400,000 students</code>{' '}
                annually taking part.
              </p>
              <p className="terminal-line">
                In MUN conferences, students act as delegates — representatives of their given country.
              </p>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Section: The Problem */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'}`}>
              <div className={`font-mono text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {'// '}the_problem
              </div>
              <p className="terminal-line mb-3">
                During <strong className={`${isDark ? 'text-white' : 'text-gray-900'}`}>The Hague International MUN Conference (THIMUN)</strong>, I noticed that some students inadvertently use informal or abbreviated names for Member States.
              </p>
              <p className="terminal-line">
                The <span className="text-[#009EDB] font-semibold">UN Protocol and Liaison Service</span> maintains specific official nomenclature for all 193 member states, and using correct names demonstrates respect for national sovereignty and adherence to diplomatic protocol.
              </p>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Section: The Solution */}
            <div className={`p-5 rounded-lg border ${isDark ? 'bg-[#1a1a2e]/30 border-[#009EDB]/20' : 'bg-white border-[#009EDB]/10'}`}>
              <div className={`font-mono text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {'// '}the_solution
              </div>
              <p className="terminal-line">
                Hence, <span className="text-[#009EDB] font-semibold">Master the Member States</span> was created to bridge this knowledge gap, helping MUN delegates memorise the official names through interactive quizzes that challenge and teach proper UN nomenclature.
              </p>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Final note - styled like a blockquote */}
            <div className={`p-5 rounded-lg border-l-4 border-[#009EDB] ${
              isDark ? 'bg-[#1a1a2e]/50 border-r border-t border-b border-r-[#009EDB]/10 border-t-[#009EDB]/10 border-b-[#009EDB]/10' : 'bg-[#009EDB]/5'
            }`}>
              <div className={`font-mono text-xs mb-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                {'> '}note
              </div>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I hope you enjoy this fun and informative quiz that taught many MUN delegates that the official UN name for{' '}
                <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDark ? 'bg-[#1a1a2e] text-white' : 'bg-gray-100 text-gray-900'}`}>"Bolivia"</code>{' '}
                is{' '}
                <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${isDark ? 'bg-[#009EDB]/20 text-[#009EDB]' : 'bg-[#009EDB]/10 text-[#009EDB]'}`}>"Plurinational State of Bolivia"</code>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPage;
