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
  return;
};
export default ImportExportControls;