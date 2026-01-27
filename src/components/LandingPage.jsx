import { BookOpen, Target, Award, ArrowRight, Github } from 'lucide-react';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-[calc(100vh-88px)] bg-gradient-to-b from-white to-[#E6F4FA] scroll-smooth">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-[#009EDB]/10 text-[#009EDB] text-sm font-medium rounded-full mb-4 animate-fade-in">
            Model United Nations Study Tool
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Learn the Official Names of<br />
            <span className="text-[#009EDB]">UN Member States</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master the correct diplomatic nomenclature used by the United Nations Protocol and Liaison Service.
          </p>
        </div>

        <button
          onClick={onStartQuiz}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#009EDB] to-[#0077B3] hover:from-[#0077B3] hover:to-[#005A8C] text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-100"
        >
          Start Learning
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </section>

      {/* Mission Section - 15% bigger text */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Project Mission
          </h3>

          <div className="space-y-5 text-gray-700 leading-relaxed text-lg md:text-xl">
            <p>
              In Model United Nations conferences, delegates represent member states and engage in diplomatic discourse.
              However, many participants inadvertently use informal or abbreviated names for countries—such as "UK" instead
              of "United Kingdom of Great Britain and Northern Ireland," or "Bolivia" instead of "Plurinational State of Bolivia."
            </p>
            <p>
              The <strong className="text-[#009EDB]">UN Protocol and Liaison Service</strong> maintains specific official nomenclature for all 193 member
              states. Using correct names demonstrates respect for national sovereignty and adherence to diplomatic protocol.
            </p>
            <p>
              <strong className="text-[#009EDB]">Master the Member States</strong> was created to bridge this knowledge gap, helping MUN delegates memorise
              the official names of member states through interactive quizzes designed to challenge and teach proper UN nomenclature.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid - 25% bigger and more prominent */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#009EDB]/30">
            <div className="w-20 h-20 bg-gradient-to-br from-[#009EDB]/20 to-[#009EDB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
              <BookOpen className="w-10 h-10 text-[#009EDB]" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-xl">Choose Your Quiz</h4>
            <p className="text-gray-600 text-base leading-relaxed">
              Select from Flag to Name, Name to Flag, or Mixed mode with customizable question counts (10, 20, 50, or all 193).
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#009EDB]/30">
            <div className="w-20 h-20 bg-gradient-to-br from-[#009EDB]/20 to-[#009EDB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
              <Target className="w-10 h-10 text-[#009EDB]" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-xl">Test Your Knowledge</h4>
            <p className="text-gray-600 text-base leading-relaxed">
              Questions are designed to trick you with common informal names—can you spot the correct official UN spelling?
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-[#009EDB]/30">
            <div className="w-20 h-20 bg-gradient-to-br from-[#009EDB]/20 to-[#009EDB]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform duration-300 hover:scale-110">
              <Award className="w-10 h-10 text-[#009EDB]" />
            </div>
            <h4 className="font-bold text-gray-900 mb-3 text-xl">Track Progress</h4>
            <p className="text-gray-600 text-base leading-relaxed">
              Get instant feedback, see your score summary, and review all answers to identify areas for improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Footer with GitHub Pages badge */}
      <footer className="max-w-4xl mx-auto px-4 py-10 text-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-500 text-sm">
            Built for MUN delegates worldwide. Data sourced from the{' '}
            <a
              href="https://protocol.un.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009EDB] hover:underline transition-colors duration-300"
            >
              UN Protocol and Liaison Service
            </a>.
          </p>

          {/* GitHub Pages Badge */}
          <a
            href="https://github.com/ravjothbrar/Master-the-Member-States"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Github className="w-4 h-4" />
            Hosted on GitHub Pages
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
