import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import QuizConfig from './components/QuizConfig';
import Quiz from './components/Quiz';
import Results from './components/Results';
import ResultsHistory from './components/ResultsHistory';
import WhyPage from './components/WhyPage';
import { generateQuestions } from './data/memberStates';
import { useTheme } from './context/ThemeContext';

// App states
const VIEWS = {
  LANDING: 'landing',
  CONFIG: 'config',
  QUIZ: 'quiz',
  RESULTS: 'results',
  HISTORY: 'history',
  WHY: 'why',
};

function App() {
  const { isDark } = useTheme();
  const [currentView, setCurrentView] = useState(VIEWS.LANDING);
  const [quizConfig, setQuizConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState(null);

  const handleStartQuizConfig = () => {
    setCurrentView(VIEWS.CONFIG);
  };

  const handleStartQuiz = (config) => {
    setQuizConfig(config);
    const generatedQuestions = generateQuestions(config.questionCount, config.mode);
    setQuestions(generatedQuestions);
    setCurrentView(VIEWS.QUIZ);
  };

  const handleQuizComplete = (quizResults) => {
    setResults(quizResults);
    setCurrentView(VIEWS.RESULTS);
  };

  const handleRestart = () => {
    // Restart with same config
    if (quizConfig) {
      const generatedQuestions = generateQuestions(quizConfig.questionCount, quizConfig.mode);
      setQuestions(generatedQuestions);
      setResults(null);
      setCurrentView(VIEWS.QUIZ);
    }
  };

  const handleGoHome = () => {
    setCurrentView(VIEWS.LANDING);
    setQuizConfig(null);
    setQuestions([]);
    setResults(null);
  };

  const handleViewHistory = () => {
    setCurrentView(VIEWS.HISTORY);
  };

  const handleViewWhy = () => {
    setCurrentView(VIEWS.WHY);
  };

  return (
    <div className={`min-h-screen theme-transition ${isDark ? 'bg-[#0f0f1a]' : 'bg-[#fafafa]'}`}>
      <Header
        onHomeClick={handleGoHome}
        onHistoryClick={handleViewHistory}
        onWhyClick={handleViewWhy}
        currentView={currentView}
      />

      {currentView === VIEWS.LANDING && (
        <LandingPage onStartQuiz={handleStartQuizConfig} />
      )}

      {currentView === VIEWS.CONFIG && (
        <QuizConfig onStartQuiz={handleStartQuiz} onBack={handleGoHome} />
      )}

      {currentView === VIEWS.QUIZ && questions.length > 0 && (
        <Quiz questions={questions} onComplete={handleQuizComplete} />
      )}

      {currentView === VIEWS.RESULTS && results && (
        <Results
          results={results}
          quizConfig={quizConfig}
          onRestart={handleRestart}
          onHome={handleGoHome}
        />
      )}

      {currentView === VIEWS.HISTORY && (
        <ResultsHistory onBack={handleGoHome} />
      )}

      {currentView === VIEWS.WHY && (
        <WhyPage onBack={handleGoHome} />
      )}
    </div>
  );
}

export default App;
