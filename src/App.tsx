import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import BrowseDistrosPage from './components/BrowseDistrosPage';
import Question from './components/Question';
import LiveSidebar from './components/LiveSidebar';
import './App.css';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>Seite nicht gefunden</p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '0.5rem',
          fontWeight: '500',
        }}
      >
        Zur Startseite
      </Link>
    </div>
  );
}

const ResultsPage = lazy(() => import('./components/ResultsPage'));

function App() {
  return (
    <QuizProvider>
      <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/fragen"
              element={
                <div className="quiz-layout">
                  <Question />
                  <LiveSidebar />
                </div>
              }
            />
            <Route path="/ergebnis" element={
              <Suspense fallback={<div className="loading-fallback">Laden...</div>}>
                <ResultsPage />
              </Suspense>
            } />
            <Route path="/distros" element={<BrowseDistrosPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </QuizProvider>
  );
}

export default App;
