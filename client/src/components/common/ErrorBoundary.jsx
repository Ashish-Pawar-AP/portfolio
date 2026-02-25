import { Component } from "react";

/**
 * Global Error Boundary
 * Fully Theme-Based
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden transition-colors duration-500"
          style={{
            backgroundColor: "rgb(var(--bg-primary))",
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-[140px]"
            style={{
              backgroundColor: "rgba(var(--accent-primary),0.15)",
            }}
          />
          <div
            className="absolute bottom-0 -right-40 h-96 w-96 rounded-full blur-[140px]"
            style={{
              backgroundColor: "rgba(var(--accent-secondary),0.15)",
            }}
          />

          <div
            className="relative max-w-md text-center space-y-6 p-10 rounded-3xl backdrop-blur-2xl shadow-2xl transition-all duration-500"
            style={{
              backgroundColor: "rgba(var(--bg-secondary),0.7)",
              border: "1px solid rgb(var(--border-color))",
            }}
          >
            <h1
              className="text-3xl font-bold"
              style={{
                color: "rgb(var(--text-primary))",
              }}
            >
              Something went wrong
            </h1>

            <p
              className="text-sm md:text-base"
              style={{
                color: "rgb(var(--text-secondary))",
              }}
            >
              An unexpected error occurred. Please refresh the page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl px-6 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background:
                  "linear-gradient(to right, rgb(var(--accent-primary)), rgb(var(--accent-secondary)))",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
