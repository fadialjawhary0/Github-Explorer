import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <AlertCircle className="h-16 w-16 text-red-500" />

        <h3 className="text-lg font-semibold text-foreground">Something went wrong</h3>

        <p className="text-sm text-muted-foreground max-w-md">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 text-sm text-foreground hover:text-foreground/90
          border border-border bg-background hover:bg-button-hover hover:text-accent-foreground rounded-md px-4 py-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4 text-blue-500" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
