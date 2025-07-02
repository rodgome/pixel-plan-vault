
import { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from '@/components/ui/sonner';

interface PersistedStateOptions<T> {
  key: string;
  defaultValue: T;
  version?: number;
  migrate?: (oldData: any, oldVersion: number) => T;
}

export const usePersistedState = <T,>({
  key,
  defaultValue,
  version = 1,
  migrate
}: PersistedStateOptions<T>) => {
  const [state, setState] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const loadedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load initial data
  useEffect(() => {
    if (loadedRef.current) return;
    
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const stored = localStorage.getItem(key);
        if (stored) {
          const parsed = JSON.parse(stored);
          
          // Handle version migration
          if (parsed.version && parsed.version !== version && migrate) {
            const migratedData = migrate(parsed.data, parsed.version);
            setState(migratedData);
          } else {
            setState(parsed.version ? parsed.data : parsed);
          }
        }
        loadedRef.current = true;
      } catch (error) {
        console.warn(`Failed to load persisted state for key "${key}":`, error);
        setError(`Failed to load saved data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setState(defaultValue);
        loadedRef.current = true;
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [key, defaultValue, version, migrate]);

  // Clear any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Debounced persistence to prevent rapid writes
  const persistData = useCallback((newState: T) => {
    try {
      const dataToStore = {
        version,
        data: newState,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn(`Failed to persist state for key "${key}":`, error);
      toast.error('Failed to save changes');
    }
  }, [key, version]);

  // Optimistic update with debounced persistence
  const setStateWithPersistence = useCallback((updater: React.SetStateAction<T>) => {
    setState(prev => {
      const newState = typeof updater === 'function'
        ? (updater as (prevState: T) => T)(prev)
        : updater;

      // Debounce persistence to prevent flickering
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => persistData(newState), 100);

      return newState;
    });
  }, [persistData]);

  // Export functionality with loading state
  const exportData = useCallback(async () => {
    try {
      const exportData = {
        version,
        data: state,
        exportedAt: new Date().toISOString(),
        appName: 'VAULT Financial Dashboard'
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `vault-dashboard-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      toast.error('Failed to export data');
    }
  }, [state, version]);

  // Import functionality with validation
  const importData = useCallback((file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          
          // Validate import structure
          if (imported.data && imported.version) {
            let dataToImport = imported.data;
            
            // Handle migration if needed
            if (imported.version !== version && migrate) {
              dataToImport = migrate(imported.data, imported.version);
            }
            
            setState(dataToImport);
            persistData(dataToImport);
            
            toast.success('Data imported successfully!');
            resolve(true);
          } else {
            console.error('Invalid import file structure');
            toast.error('Invalid file format. Please select a valid export file.');
            resolve(false);
          }
        } catch (error) {
          console.error('Failed to import data:', error);
          toast.error('Failed to import data. Please check the file format.');
          resolve(false);
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
        resolve(false);
      };
      reader.readAsText(file);
    });
  }, [version, migrate, persistData]);

  // Clear persisted data
  const clearPersistedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(defaultValue);
      toast.success('All data cleared successfully!');
    } catch (error) {
      console.warn(`Failed to clear persisted data for key "${key}":`, error);
      toast.error('Failed to clear data');
    }
  }, [key, defaultValue]);

  return {
    state,
    setState: setStateWithPersistence,
    isLoading,
    error,
    exportData,
    importData,
    clearPersistedData
  };
};
