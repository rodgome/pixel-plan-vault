
import EditableField from '@/components/ui/EditableField';

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
  
  const handleFieldClick = (fieldName: string, value: string | number) => {
    onDoubleClick(fieldName, value.toString());
  };

  return (
    <EditableField
      fieldName="name"
      value={name}
      type="text"
      colorClass="font-bold text-slate-200"
      isEditing={isEditing}
      localEditValue={localEditValue}
      onFieldClick={handleFieldClick}
      onLocalValueChange={onLocalValueChange}
      onFieldBlur={onFieldBlur}
      canEdit={canEdit}
      showButtons={false}
      className="flex-1"
    />
  );
};

export default EditableName;
