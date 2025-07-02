
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useRef } from 'react';
import { toast } from '@/components/ui/sonner';

interface ImportExportControlsProps {
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
  onClear: () => void;
}

const ImportExportControls = ({ onExport, onImport, onClear }: ImportExportControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const success = await onImport(file);
      if (success) {
        toast.success('Data imported successfully!');
      } else {
        toast.error('Failed to import data. Please check the file format.');
      }
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = () => {
    onExport();
    toast.success('Data exported successfully!');
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      onClear();
      toast.success('All data cleared!');
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-amber-400">DATA MANAGEMENT</h3>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        <Button
          onClick={handleExport}
          variant="ghost"
          size="sm"
          className="text-green-400 hover:text-green-300 hover:bg-slate-700/50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
        
        <Button
          onClick={handleImportClick}
          variant="ghost"
          size="sm"
          className="text-blue-400 hover:text-blue-300 hover:bg-slate-700/50"
        >
          <Upload className="h-4 w-4 mr-2" />
          Import Data
        </Button>
        
        <Button
          onClick={handleClear}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300 hover:bg-slate-700/50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
      
      <Input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </Card>
  );
};

export default ImportExportControls;
