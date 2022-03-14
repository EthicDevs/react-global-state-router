import React from "react";

type ErrorBoundaryProps = {
  hasError: boolean;
  error: Error | null;
};

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          {this.state.error && <p>{(this.state.error as Error).message}</p>}
        </>
      );
    }
    return this.props.children;
  }
}
