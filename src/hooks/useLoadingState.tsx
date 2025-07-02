
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/sonner';

interface UseLoadingStateOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeWithLoading = useCallback(async <T,>(
    operation: () => Promise<T>,
    customOptions?: UseLoadingStateOptions
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      
      const successMessage = customOptions?.successMessage || options.successMessage;
      if (successMessage) {
        toast.success(successMessage);
      }
      
      return result;
    } catch (err) {
      const errorMessage = customOptions?.errorMessage || options.errorMessage || 
        (err instanceof Error ? err.message : 'An error occurred');
      
      setError(errorMessage);
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [options.successMessage, options.errorMessage]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    executeWithLoading,
    clearError
  };
};
