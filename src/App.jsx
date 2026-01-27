import { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import QuizConfig from './components/QuizConfig';
import Quiz from './components/Quiz';
import Results from './components/Results';
import { generateQuestions } from './data/memberStates';

// App states
const VIEWS = {
  LANDING: 'landing',
  CONFIG: 'config',
  QUIZ: 'quiz',
  RESULTS: 'results',
};

function App() {
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

  return (
    <div className="min-h-screen bg-white">
      <Header />

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
        <Results results={results} onRestart={handleRestart} onHome={handleGoHome} />
      )}
    </div>
  );
}

export default App;
