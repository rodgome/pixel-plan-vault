
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, Upload, Trash2 } from 'lucide-react';
import { useRef } from 'react';

interface ImportExportControlsProps {
  onExport: () => void;
  onImport: (file: File) => Promise<boolean>;
  onClear: () => void;
}

const ImportExportControls = ({
  onExport,
  onImport,
  onClear
}: ImportExportControlsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await onImport(file);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = () => {
    onExport();
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      onClear();
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">💾</span>
          <h2 className="text-lg font-bold text-amber-400">DATA MANAGEMENT</h2>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-black font-bold"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>

          <Button
            onClick={handleImportClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>

          <Button
            onClick={handleClear}
            variant="destructive"
            className="font-bold"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Data
          </Button>

          <Input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </Card>
  );
};

export default ImportExportControls;
