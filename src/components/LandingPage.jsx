import { BookOpen, Target, Award, ArrowRight } from 'lucide-react';

const LandingPage = ({ onStartQuiz }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-white to-[#E6F4FA]">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-8">
          <span className="inline-block px-4 py-1.5 bg-[#009EDB]/10 text-[#009EDB] text-sm font-medium rounded-full mb-4">
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
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#009EDB] hover:bg-[#0077B3] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Start Learning
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Project Mission
          </h3>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              In Model United Nations conferences, delegates represent member states and engage in diplomatic discourse.
              However, many participants inadvertently use informal or abbreviated names for countries—such as "UK" instead
              of "United Kingdom of Great Britain and Northern Ireland," or "Bolivia" instead of "Plurinational State of Bolivia."
            </p>
            <p>
              The <strong>UN Protocol and Liaison Service</strong> maintains specific official nomenclature for all 193 member
              states. Using correct names demonstrates respect for national sovereignty and adherence to diplomatic protocol.
            </p>
            <p>
              <strong>Master the Member States</strong> was created to bridge this knowledge gap, helping MUN delegates memorise
              the official names of member states through interactive flag-based quizzes.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="w-14 h-14 bg-[#009EDB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-[#009EDB]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Choose Your Quiz</h4>
            <p className="text-gray-600 text-sm">
              Select from Flag to Name, Name to Flag, or Mixed mode with customizable question counts.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="w-14 h-14 bg-[#009EDB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-7 h-7 text-[#009EDB]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Test Your Knowledge</h4>
            <p className="text-gray-600 text-sm">
              Answer multiple-choice questions with instant feedback on each response.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-center">
            <div className="w-14 h-14 bg-[#009EDB]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7 text-[#009EDB]" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
            <p className="text-gray-600 text-sm">
              See your score summary and identify areas for improvement.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>
          Built for MUN delegates worldwide. Data sourced from the{' '}
          <a
            href="https://protocol.un.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#009EDB] hover:underline"
          >
            UN Protocol and Liaison Service
          </a>.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
