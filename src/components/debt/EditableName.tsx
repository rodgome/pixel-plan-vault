
import { Input } from '@/components/ui/input';

interface EditableNameProps {
  name: string;
  editingField: string | null;
  localEditValue: string;
  onDoubleClick: (fieldName: string, currentValue: string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  canEdit?: boolean;
}

const EditableName = ({
  name,
  editingField,
  localEditValue,
  onDoubleClick,
  onLocalValueChange,
  onFieldBlur,
  canEdit = true
}: EditableNameProps) => {
  const isEditing = editingField === 'name';
  
  return (
    <div 
      className="cursor-pointer flex-1" 
      onDoubleClick={(e) => {
        e.stopPropagation();
        if (canEdit) onDoubleClick('name', name);
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="font-bold text-slate-200">{name}</span>
      
      {isEditing && canEdit && (
        <div className="mt-2">
          <Input
            type="text"
            value={localEditValue}
            onChange={(e) => onLocalValueChange(e.target.value)}
            onBlur={() => onFieldBlur('name')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onFieldBlur('name');
              }
            }}
            className="text-sm bg-slate-700 border-slate-600 text-white h-8"
            placeholder="Enter debt name"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default EditableName;
