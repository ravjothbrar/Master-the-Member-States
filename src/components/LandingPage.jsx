import { ArrowRight, Github, Flag, CheckCircle, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LandingPage = ({ onStartQuiz }) => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-[calc(100vh-64px)] transition-colors duration-300 ${
      isDark ? 'bg-[#0f0f1a]' : 'bg-white'
    }`}>
      {/* Hero Section */}
      <section className={`border-b transition-colors duration-300 ${
        isDark ? 'border-[#009EDB]/10' : 'border-gray-100'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Learn the Official Names of{' '}
              <span className="text-[#009EDB]">UN Member States</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 max-w-2xl transition-colors duration-300 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              An interactive quiz tool for Model UN delegates to master the official nomenclature used by the United Nations Protocol and Liaison Service.
            </p>
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#009EDB] hover:bg-[#0077B3] text-white font-medium rounded transition-all duration-200"
            >
              Start Quiz
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Mission Section - 5% smaller text */}
      <section className={`border-b transition-colors duration-300 ${
        isDark ? 'border-[#009EDB]/10' : 'border-gray-100'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-3xl">
            <h2 className={`text-sm font-medium uppercase tracking-wider mb-4 ${
              isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'
            }`}>
              Project Mission
            </h2>
            <div className={`space-y-4 leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-gray-300' : 'text-gray-700'
            }`} style={{ fontSize: '1.05rem' }}>
              <p>
                In Model United Nations conferences, delegates represent member states and engage in diplomatic discourse.
                However, many participants inadvertently use informal or abbreviated names for countries—such as "UK" instead
                of "United Kingdom of Great Britain and Northern Ireland," or "Bolivia" instead of "Plurinational State of Bolivia."
              </p>
              <p>
                The <span className="text-[#009EDB] font-medium">UN Protocol and Liaison Service</span> maintains specific official nomenclature for all 193 member
                states. Using correct names demonstrates respect for national sovereignty and adherence to diplomatic protocol.
              </p>
              <p>
                <span className="text-[#009EDB] font-medium">Master the Member States</span> was created to bridge this knowledge gap, helping MUN delegates memorise
                the official names through interactive quizzes that challenge and teach proper UN nomenclature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`border-b transition-colors duration-300 ${
        isDark ? 'border-[#009EDB]/10' : 'border-gray-100'
      }`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
          <h2 className={`text-sm font-medium uppercase tracking-wider mb-10 ${
            isDark ? 'text-[#009EDB]' : 'text-[#009EDB]'
          }`}>
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${
                isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
              }`}>
                <Flag className="w-5 h-5 text-[#009EDB]" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Choose Your Mode
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Select Flag to Name, Name to Flag, or Mixed mode. Pick 10, 20, 50, or all 193 member states.
              </p>
            </div>

            <div>
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${
                isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
              }`}>
                <CheckCircle className="w-5 h-5 text-[#009EDB]" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Test Your Knowledge
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Questions are designed with tricky informal names as options. Can you identify the official UN spelling?
              </p>
            </div>

            <div>
              <div className={`w-10 h-10 rounded flex items-center justify-center mb-4 ${
                isDark ? 'bg-[#009EDB]/10' : 'bg-[#009EDB]/5'
              }`}>
                <BarChart3 className="w-5 h-5 text-[#009EDB]" />
              </div>
              <h3 className={`font-semibold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Review & Improve
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Get instant feedback on each question. Review all answers at the end to learn from mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-sm transition-colors duration-300 ${
            isDark ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Data sourced from the{' '}
            <a
              href="https://protocol.un.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009EDB] hover:underline"
            >
              UN Protocol and Liaison Service
            </a>
          </p>

          <a
            href="https://github.com/ravjothbrar/Master-the-Member-States"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm transition-colors duration-300 ${
              isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
