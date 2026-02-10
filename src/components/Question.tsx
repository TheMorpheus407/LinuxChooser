import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../hooks/useQuiz';
import { useRef, useEffect, useCallback, useState } from 'react';

export default function Question() {
  const navigate = useNavigate();
  const questionTitleRef = useRef<HTMLHeadingElement>(null);
  const optionsGridRef = useRef<HTMLDivElement>(null);
  const [showMinAnswersWarning, setShowMinAnswersWarning] = useState(false);
  const {
    answers,
    currentQuestionIndex,
    totalQuestions,
    visibleQuestions,
    currentQuestion,
    setAnswer,
    nextQuestion,
    prevQuestion,
    skipQuestion,
    calculateResults,
    hasEnoughAnswersForResults,
    answeredCount,
    minAnswersRequired,
  } = useQuiz();

  // Focus management - move focus to question title when question changes
  useEffect(() => {
    if (questionTitleRef.current) {
      questionTitleRef.current.focus();
    }
  }, [currentQuestionIndex]);

  // Derive warning visibility: only show if explicitly triggered AND not enough answers
  // This replaces the previous useEffect pattern that called setState synchronously
  const shouldShowWarning = showMinAnswersWarning && !hasEnoughAnswersForResults;

  // Keyboard navigation handler for arrow keys in radio/checkbox groups (WCAG compliance)
  // Must be defined before any conditional returns to follow Rules of Hooks
  const handleOptionsKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = event;
    const navigableKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

    if (!navigableKeys.includes(key)) {
      return;
    }

    const optionsGrid = optionsGridRef.current;
    if (!optionsGrid) return;

    const options = Array.from(optionsGrid.querySelectorAll<HTMLButtonElement>('[role="radio"], [role="checkbox"]'));
    if (options.length === 0) return;

    const currentIndex = options.findIndex(option => option === document.activeElement);
    if (currentIndex === -1) return;

    event.preventDefault();

    let nextIndex: number;

    switch (key) {
      case 'ArrowDown':
      case 'ArrowRight':
        // Move to next option, wrap to first if at end
        nextIndex = (currentIndex + 1) % options.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        // Move to previous option, wrap to last if at beginning
        nextIndex = (currentIndex - 1 + options.length) % options.length;
        break;
      case 'Home':
        // Move to first option
        nextIndex = 0;
        break;
      case 'End':
        // Move to last option
        nextIndex = options.length - 1;
        break;
      default:
        return;
    }

    options[nextIndex].focus();
  }, []);

  // Handle case where currentQuestion is null (e.g., browser back/forward navigation)
  if (!currentQuestion) {
    return (
      <div className="question-page">
        <motion.div
          className="question-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <h2 className="question-title">Quiz nicht gestartet</h2>
          <p className="question-description" style={{ marginBottom: '2rem' }}>
            Das Quiz wurde noch nicht gestartet oder die Sitzung ist abgelaufen.
            Bitte starte das Quiz von der Startseite aus.
          </p>
          <motion.button
            className="next-button"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Zur Startseite
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentAnswer = answers.get(currentQuestion.id);
  const selectedOptions = currentAnswer?.selectedOptions || [];

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (optionId === 'none') {
      setAnswer(currentQuestion.id, ['none']);
      return;
    }

    if (selectedOptions.includes('none')) {
      setAnswer(currentQuestion.id, [optionId]);
      return;
    }

    if (currentQuestion.type === 'single') {
      setAnswer(currentQuestion.id, [optionId]);
      return;
    }

    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    setAnswer(currentQuestion.id, newSelection);
  };

  const handleNext = () => {
    if (currentQuestionIndex >= visibleQuestions.length - 1) {
      // Last question - check if enough answers before going to results
      if (!hasEnoughAnswersForResults) {
        setShowMinAnswersWarning(true);
        return;
      }
      calculateResults();
      navigate('/ergebnis');
    } else {
      nextQuestion();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0) {
      navigate('/');
    } else {
      prevQuestion();
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex >= visibleQuestions.length - 1) {
      // Last question - check if enough answers before going to results
      if (!hasEnoughAnswersForResults) {
        setShowMinAnswersWarning(true);
        return;
      }
      calculateResults();
      navigate('/ergebnis');
    } else {
      skipQuestion();
    }
  };

  const canProceed = currentQuestion.type === 'multiple' || selectedOptions.length > 0;
  const isRadio = currentQuestion.type === 'single';

  return (
    <div className="question-page">
      {/* Progress bar with ARIA attributes */}
      <div className="progress-container">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Fortschritt: Frage ${currentQuestionIndex + 1} von ${totalQuestions}`}
        >
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="progress-text" aria-hidden="true">
          Frage {currentQuestionIndex + 1} von {totalQuestions}
        </span>
      </div>

      {/* Back button */}
      <motion.button
        className="back-button"
        onClick={handleBack}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        aria-label={currentQuestionIndex === 0 ? 'Zurück zur Startseite' : 'Zurück zur vorherigen Frage'}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
        Zurück
      </motion.button>

      {/* Question content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          className="question-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          role="group"
          aria-labelledby={`question-title-${currentQuestion.id}`}
        >
          <h2
            id={`question-title-${currentQuestion.id}`}
            className="question-title"
            ref={questionTitleRef}
            tabIndex={-1}
          >
            {currentQuestion.text}
          </h2>
          {currentQuestion.description && (
            <p className="question-description" id={`question-desc-${currentQuestion.id}`}>
              {currentQuestion.description}
            </p>
          )}

          <div
            ref={optionsGridRef}
            className="options-grid"
            role={isRadio ? 'radiogroup' : 'group'}
            aria-labelledby={`question-title-${currentQuestion.id}`}
            aria-describedby={currentQuestion.description ? `question-desc-${currentQuestion.id}` : undefined}
            onKeyDown={handleOptionsKeyDown}
          >
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <motion.button
                  key={option.id}
                  className={`option-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleOptionSelect(option.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role={isRadio ? 'radio' : 'checkbox'}
                  aria-checked={isSelected}
                  aria-describedby={option.description ? `option-desc-${option.id}` : undefined}
                >
                  <div className="option-content">
                    <span className="option-label">{option.text}</span>
                    {option.description && (
                      <span className="option-description" id={`option-desc-${option.id}`}>
                        {option.description}
                      </span>
                    )}
                  </div>
                  <div className={`option-checkbox ${isRadio ? 'radio' : ''}`} aria-hidden="true">
                    {isSelected && (
                      <motion.svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        aria-hidden="true"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </motion.svg>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Minimum answers warning */}
      <AnimatePresence>
        {shouldShowWarning && (
          <motion.div
            className="min-answers-warning"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            role="alert"
            aria-live="polite"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="warning-icon" aria-hidden="true">
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            </svg>
            <div className="warning-content">
              <strong>Bitte beantworte mehr Fragen</strong>
              <p>
                Du hast erst {answeredCount} {answeredCount === 1 ? 'Frage' : 'Fragen'} beantwortet.
                Beantworte mindestens {minAnswersRequired} Fragen, um eine aussagekraeftige Empfehlung zu erhalten.
              </p>
            </div>
            <button
              className="warning-dismiss"
              onClick={() => setShowMinAnswersWarning(false)}
              aria-label="Hinweis schliessen"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="question-navigation">
        {!currentQuestion.required && (
          <motion.button
            className="skip-button"
            onClick={handleSkip}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Überspringen
          </motion.button>
        )}

        <motion.button
          className={`next-button ${canProceed ? '' : 'disabled'}`}
          onClick={handleNext}
          disabled={!canProceed}
          whileHover={canProceed ? { scale: 1.05 } : {}}
          whileTap={canProceed ? { scale: 0.95 } : {}}
          aria-disabled={!canProceed}
        >
          {currentQuestionIndex >= visibleQuestions.length - 1 ? 'Ergebnis anzeigen' : 'Weiter'}
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
