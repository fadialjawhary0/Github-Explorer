'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-12 text-center min-h-screen-minus-navbar">
          <div className="mb-4 rounded-full bg-red-100 dark:bg-red-900/20 p-4">
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>

          <h3 className="mb-2 text-lg font-semibold text-foreground">Something went wrong</h3>

          <p className="text-sm text-muted-foreground mb-4 max-w-md">We encountered an unexpected error. This might be a temporary issue.</p>

          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-muted rounded-md text-left max-w-2xl">
              <summary className="cursor-pointer text-sm font-medium">Error Details (Development Only)</summary>
              <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                {this.state.error.message}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
