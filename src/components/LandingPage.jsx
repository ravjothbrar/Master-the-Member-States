import { ArrowRight, Github, Flag, CheckCircle, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// UN Logo Image Component with shimmer effect
const UNEmblem = () => {
  const { isDark } = useTheme();

  return (
    <div className="un-emblem-container rounded-lg p-2 cursor-pointer select-none overflow-hidden relative">
      <img
        src={`${import.meta.env.BASE_URL}un-emblem.png`}
        alt="UN Emblem"
        className="un-emblem-image w-48 sm:w-56 md:w-64 lg:w-72 h-auto"
        style={{
          filter: isDark ? 'invert(1) brightness(0.8)' : 'none'
        }}
      />
    </div>
  );
};

const LandingPage = ({ onStartQuiz }) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-[calc(100vh-64px)] theme-transition ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'
    }`}>
      {/* Hero Section */}
      <section className="page-transition">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side - Text content */}
            <div className="flex-1 max-w-2xl">
              <div className={`font-mono text-sm mb-4 theme-transition ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
                // Model United Nations Study Tool
              </div>

              <h1 className={`text-4xl md:text-5xl lg:text-5xl font-bold leading-[1.1] mb-6 theme-transition ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Learn the Official Names of{' '}
                <span className="text-[#009EDB] relative inline-block">
                  UN Member States
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-[#009EDB] to-transparent"></span>
                </span>
              </h1>

              <p className={`text-lg mb-8 leading-relaxed theme-transition ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                An interactive quiz tool for Model UN delegates to master the official nomenclature
                used by the UN Protocol and Liaison Service.
              </p>

              <button
                onClick={onStartQuiz}
                className="group inline-flex items-center gap-3 px-6 py-3.5 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded-lg transition-all duration-300 hover-glow"
              >
                <span className="font-mono text-sm opacity-80">{'>>'}</span>
                <span>Start Quiz</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right side - UN Emblem */}
            <div className="hidden md:flex flex-shrink-0">
              <UNEmblem />
            </div>
          </div>
        </div>
      </section>

      {/* Accent divider */}
      <div className="section-divider max-w-5xl mx-auto"></div>

      {/* Mission Section */}
      <section className="page-transition">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-3xl">
            <div className={`flex items-center gap-3 mb-6 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
              <span className="font-mono text-lg font-bold">||</span>
              <h2 className={`text-xl font-bold tracking-wide uppercase`}>
                Project Mission
              </h2>
              <span className="font-mono text-lg font-bold">||</span>
            </div>

            <div className={`accent-border-left space-y-4 leading-relaxed theme-transition ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`} style={{ fontSize: '1.05rem' }}>
              <p className="terminal-line">
                In Model United Nations conferences, delegates represent member states and engage in diplomatic discourse.
                However, many participants inadvertently use informal or abbreviated names for countries—such as "UK"
                instead of "United Kingdom of Great Britain and Northern Ireland."
              </p>

              <p className="terminal-line">
                The <span className="text-[#009EDB] font-semibold">UN Protocol and Liaison Service</span> maintains
                specific official nomenclature for all 193 member states. Using correct names demonstrates respect
                for national sovereignty and adherence to diplomatic protocol.
              </p>

              <p className="terminal-line">
                <span className="text-[#009EDB] font-semibold">Master the Member States</span> was created to bridge
                this knowledge gap, helping MUN delegates memorise the official names through interactive quizzes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accent divider */}
      <div className="section-divider max-w-5xl mx-auto"></div>

      {/* How It Works */}
      <section className="page-transition">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className={`flex items-center gap-3 mb-10 ${isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'}`}>
            <span className="font-mono text-lg font-bold">||</span>
            <h2 className={`text-xl font-bold tracking-wide uppercase`}>
              How It Works
            </h2>
            <span className="font-mono text-lg font-bold">||</span>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Flag,
                title: 'Choose Your Mode',
                desc: 'Select Flag to Name, Name to Flag, or Mixed mode. Pick 10, 20, 50, or all 193 member states.'
              },
              {
                icon: CheckCircle,
                title: 'Test Your Knowledge',
                desc: 'Questions are designed with tricky informal names as options. Can you identify the official UN spelling?'
              },
              {
                icon: BarChart3,
                title: 'Review & Improve',
                desc: 'Get instant feedback on each question. Review all answers at the end to learn from mistakes.'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 transition-all duration-300 hover-glow ${
                    isDark
                      ? 'bg-[#1a1a2e]/50 border-[#009EDB]/20 hover:border-[#009EDB]/50'
                      : 'bg-white border-[#009EDB]/10 hover:border-[#009EDB]/40'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
                  }`}>
                    <Icon className="w-6 h-6 text-[#009EDB]" />
                  </div>

                  <h3 className={`font-bold mb-2 theme-transition ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed theme-transition ${
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t theme-transition ${
        isDark ? 'border-[#009EDB]/10 bg-[#0a0a14]' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className={`text-sm theme-transition ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              Data sourced from the{' '}
              <a
                href="https://protocol.un.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#009EDB] hover:underline transition-colors"
              >
                UN Protocol and Liaison Service
              </a>
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://ravjothbrar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm transition-all duration-300 px-3 py-1.5 rounded border-2 ${
                  isDark
                    ? 'text-gray-400 border-[#8B5CF6]/50 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6]'
                    : 'text-gray-600 border-[#8B5CF6]/40 hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/5 hover:border-[#8B5CF6]'
                }`}
              >
                <span>Created by Ravjoth Brar</span>
              </a>
              <a
                href="https://github.com/ravjothbrar/Master-the-Member-States"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm transition-all duration-300 px-3 py-1.5 rounded ${
                  isDark
                    ? 'text-gray-400 hover:text-[#009EDB] hover:bg-[#009EDB]/10'
                    : 'text-gray-600 hover:text-[#009EDB] hover:bg-[#009EDB]/5'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
