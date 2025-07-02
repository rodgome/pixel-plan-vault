
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 m-4">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <AlertTriangle className="h-12 w-12 text-red-400" />
            <div>
              <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
              <p className="text-slate-300 mb-4">
                An error occurred while loading this component. Please try refreshing or contact support if the problem persists.
              </p>
              {this.state.error && (
                <details className="text-left bg-slate-900/50 p-3 rounded border border-slate-600 mb-4">
                  <summary className="cursor-pointer text-sm text-slate-400">Error Details</summary>
                  <pre className="mt-2 text-xs text-red-300 whitespace-pre-wrap">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
            <Button 
              onClick={this.handleRetry}
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
