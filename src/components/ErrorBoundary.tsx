import { Component, type ErrorInfo, type ReactNode } from "react";

interface State {
  failed: boolean;
}

/** Keeps one broken component from blanking the whole site. */
export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="wrap py-24">
        <h1 className="text-3xl font-bold">Something went wrong.</h1>
        <p className="mt-3 text-ink-soft">Reload the page to try again.</p>
        <button type="button" className="btn btn-solid mt-6" onClick={() => window.location.reload()}>
          Reload
        </button>
      </div>
    );
  }
}
