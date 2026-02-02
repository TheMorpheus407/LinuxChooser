import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);
  }

  handleRestart = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.href = import.meta.env.BASE_URL;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h1 className="error-title">Etwas ist schiefgelaufen</h1>
            <p className="error-message">
              Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.
            </p>
            {this.state.error && (
              <details className="error-details">
                <summary>Technische Details</summary>
                <pre>{this.state.error.message}</pre>
              </details>
            )}
            <button className="error-restart-button" onClick={this.handleRestart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Neu starten
            </button>
          </div>
          <style>{`
            .error-boundary {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: var(--spacing-lg, 1.5rem);
              background-color: var(--bg-primary, #0f0f0f);
            }

            .error-boundary-content {
              max-width: 500px;
              width: 100%;
              text-align: center;
              padding: var(--spacing-2xl, 3rem);
              background: var(--bg-card, #16213e);
              border-radius: var(--radius-xl, 1rem);
              border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
            }

            .error-icon {
              display: flex;
              justify-content: center;
              margin-bottom: var(--spacing-lg, 1.5rem);
              color: var(--error, #ef4444);
            }

            .error-title {
              font-size: var(--font-size-2xl, 1.5rem);
              font-weight: 700;
              color: var(--text-primary, #ffffff);
              margin-bottom: var(--spacing-md, 1rem);
            }

            .error-message {
              font-size: var(--font-size-base, 1rem);
              color: var(--text-secondary, #e0e0e0);
              margin-bottom: var(--spacing-xl, 2rem);
              line-height: 1.6;
            }

            .error-details {
              text-align: left;
              margin-bottom: var(--spacing-xl, 2rem);
              padding: var(--spacing-md, 1rem);
              background: var(--bg-secondary, #1a1a2e);
              border-radius: var(--radius-md, 0.5rem);
            }

            .error-details summary {
              cursor: pointer;
              font-size: var(--font-size-sm, 0.875rem);
              color: var(--text-muted, #a0a0a0);
              margin-bottom: var(--spacing-sm, 0.5rem);
            }

            .error-details pre {
              font-size: var(--font-size-xs, 0.75rem);
              color: var(--error, #ef4444);
              overflow-x: auto;
              white-space: pre-wrap;
              word-break: break-word;
              margin: 0;
            }

            .error-restart-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: var(--spacing-sm, 0.5rem);
              padding: var(--spacing-md, 1rem) var(--spacing-xl, 2rem);
              background: var(--accent-gradient, linear-gradient(135deg, #7c3aed 0%, #4361ee 100%));
              color: white;
              font-size: var(--font-size-base, 1rem);
              font-weight: 600;
              border: none;
              border-radius: var(--radius-full, 9999px);
              cursor: pointer;
              transition: transform 150ms ease, box-shadow 150ms ease;
              box-shadow: var(--shadow-glow, 0 0 20px rgba(124, 58, 237, 0.3));
            }

            .error-restart-button:hover {
              transform: scale(1.02);
              box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
            }

            .error-restart-button:focus-visible {
              outline: 2px solid var(--accent-primary, #7c3aed);
              outline-offset: 2px;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
