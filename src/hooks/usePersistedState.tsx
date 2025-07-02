
import { useState, useEffect, useCallback } from 'react';

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
  const [state, setState] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Handle version migration
        if (parsed.version && parsed.version !== version && migrate) {
          const migratedData = migrate(parsed.data, parsed.version);
          return migratedData;
        }
        
        return parsed.version ? parsed.data : parsed;
      }
    } catch (error) {
      console.warn(`Failed to load persisted state for key "${key}":`, error);
    }
    return defaultValue;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      const dataToStore = {
        version,
        data: state,
        timestamp: Date.now()
      };
      localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.warn(`Failed to persist state for key "${key}":`, error);
    }
  }, [key, state, version]);

  // Export functionality
  const exportData = useCallback(() => {
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
  }, [state, version]);

  // Import functionality
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
            resolve(true);
          } else {
            console.error('Invalid import file structure');
            resolve(false);
          }
        } catch (error) {
          console.error('Failed to import data:', error);
          resolve(false);
        }
      };
      reader.readAsText(file);
    });
  }, [version, migrate]);

  // Clear persisted data
  const clearPersistedData = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(defaultValue);
    } catch (error) {
      console.warn(`Failed to clear persisted data for key "${key}":`, error);
    }
  }, [key, defaultValue]);

  return {
    state,
    setState,
    exportData,
    importData,
    clearPersistedData
  };
};
