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

          {/* Terminal-style header */}
          <div className={`font-mono text-sm mb-6 ${isDark ? 'text-[#009EDB]/60' : 'text-[#009EDB]/70'}`}>
            {'# '}why.md
          </div>

          {/* Page Title */}
          <div className={`flex items-center gap-3 mb-8 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            <span className="font-mono text-xl font-bold">##</span>
            <h1 className={`text-3xl md:text-4xl font-bold theme-transition ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Why This Exists
            </h1>
          </div>

          {/* Content in markdown style */}
          <div className={`space-y-8 leading-relaxed theme-transition ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`} style={{ fontSize: '1.05rem' }}>

            {/* Section: What is MUN */}
            <div className="accent-border-left space-y-4">
              <p className="terminal-line">
                <strong className={`${isDark ? 'text-white' : 'text-gray-900'}`}>Model United Nations (MUN)</strong> is a massive global education simulation of the real UN, with over <span className="text-[#009EDB] font-semibold">400,000 students</span> annually taking part.
              </p>
              <p className="terminal-line">
                In MUN conferences, students act as delegates — representatives of their given country.
              </p>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Section: The Problem */}
            <div className="space-y-4">
              <div className={`font-mono text-sm ${isDark ? 'text-[#009EDB]/60' : 'text-[#009EDB]/70'}`}>
                {'### '}the_problem
              </div>
              <div className="accent-border-left space-y-4">
                <p className="terminal-line">
                  During <strong className={`${isDark ? 'text-white' : 'text-gray-900'}`}>The Hague International MUN Conference (THIMUN)</strong>, I noticed that some students inadvertently use informal or abbreviated names for Member States.
                </p>
                <p className="terminal-line">
                  The <span className="text-[#009EDB] font-semibold">UN Protocol and Liaison Service</span> maintains specific official nomenclature for all 193 member states, and using correct names demonstrates respect for national sovereignty and adherence to diplomatic protocol.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Section: The Solution */}
            <div className="space-y-4">
              <div className={`font-mono text-sm ${isDark ? 'text-[#009EDB]/60' : 'text-[#009EDB]/70'}`}>
                {'### '}the_solution
              </div>
              <div className="accent-border-left space-y-4">
                <p className="terminal-line">
                  Hence, <span className="text-[#009EDB] font-semibold">Master the Member States</span> was created to bridge this knowledge gap, helping MUN delegates memorise the official names through interactive quizzes that challenge and teach proper UN nomenclature.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="section-divider"></div>

            {/* Final note - styled like a blockquote */}
            <div className={`p-6 rounded-lg border-l-4 border-[#009EDB] ${
              isDark ? 'bg-[#1a1a2e]/50' : 'bg-[#009EDB]/5'
            }`}>
              <p className={`font-mono text-sm mb-3 ${isDark ? 'text-[#009EDB]/60' : 'text-[#009EDB]/70'}`}>
                {'> '}note.md
              </p>
              <p className={`italic ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I hope you enjoy this fun and informative quiz that taught many MUN delegates that the official UN name for <span className={`font-semibold not-italic ${isDark ? 'text-white' : 'text-gray-900'}`}>"Bolivia"</span> is <span className="text-[#009EDB] font-semibold not-italic">"Plurinational State of Bolivia"</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyPage;
