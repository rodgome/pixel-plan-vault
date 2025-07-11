
import EditableField from '@/components/ui/EditableField';
import { IconOption } from '@/types/editable';

interface EditableIconProps {
  type: string;
  editingField: string | null;
  localEditValue: string;
  onDoubleClick: (fieldName: string, currentValue: string) => void;
  onTypeChange: (newType: string) => void;
  onEditingFieldChange: (field: string | null) => void;
  canEdit?: boolean;
}

/**
 * Component for editing debt item icons/types
 * @param props - The component props
 * @returns EditableIcon component
 */
const EditableIcon = ({
  type,
  editingField,
  localEditValue,
  onDoubleClick,
  onTypeChange,
  onEditingFieldChange,
  canEdit = true
}: EditableIconProps) => {
  const isEditing = editingField === 'icon';
  
  const handleFieldClick = (fieldName: string, value: string | number): void => {
    onDoubleClick(fieldName, value.toString());
  };

  const iconOptions: IconOption[] = [
    { value: 'credit_card', label: 'Credit Card', icon: '💳' },
    { value: 'loan', label: 'Loan', icon: '🏦' },
    { value: 'mortgage', label: 'Mortgage', icon: '🏠' },
    { value: 'other', label: 'Other', icon: '💸' }
  ];

  return (
    <EditableField
      fieldName="icon"
      value={type}
      type="icon"
      colorClass="text-lg"
      isEditing={isEditing}
      localEditValue={localEditValue}
      onFieldClick={handleFieldClick}
      onLocalValueChange={() => {}} // Not used for icon type
      onFieldBlur={() => {}} // Not used for icon type
      onTypeChange={onTypeChange}
      onEditingFieldChange={onEditingFieldChange}
      canEdit={canEdit}
      showButtons={false}
      iconOptions={iconOptions}
    />
  );
};

export default EditableIcon;
