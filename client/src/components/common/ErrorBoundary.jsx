import { Component } from "react";

/**
 * Global Error Boundary
 * Catches runtime UI crashes
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
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
          <div className="max-w-md text-center space-y-4">
            <h1 className="text-3xl font-bold text-white">
              Something went wrong
            </h1>
            <p className="text-slate-400">
              An unexpected error occurred. Please refresh the page.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-4 rounded-xl px-6 py-3
                bg-linear-to-r from-blue-600 to-purple-600
                text-white font-medium
              "
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
