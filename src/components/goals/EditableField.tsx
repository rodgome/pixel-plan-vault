
import EditableField from '@/components/ui/EditableField';
import { FieldType } from '@/types/editable';

interface GoalsEditableFieldProps {
  fieldName: string;
  value: number | string;
  label: string;
  colorClass: string;
  isEditing: boolean;
  localEditValue: string;
  increment: number;
  onFieldClick: (fieldName: string, value: number | string) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement: (fieldName: string) => void;
  onDecrement: (fieldName: string) => void;
  isNumber?: boolean;
  canEdit?: boolean;
  showButtons?: boolean;
}

/**
 * Editable field component specifically designed for goals
 * @param props - The component props
 * @returns GoalsEditableField component
 */
const GoalsEditableField = ({ 
  fieldName, 
  value, 
  label, 
  colorClass, 
  isEditing, 
  localEditValue, 
  increment, 
  onFieldClick, 
  onLocalValueChange, 
  onFieldBlur,
  onIncrement, 
  onDecrement,
  isNumber = true,
  canEdit = true,
  showButtons = true
}: GoalsEditableFieldProps) => {
  /**
   * Determines the appropriate field type based on whether it's a number field
   * @returns The field type for the EditableField component
   */
  const getFieldType = (): FieldType => {
    if (!isNumber) return 'text';
    return 'currency';
  };

  return (
    <EditableField
      fieldName={fieldName}
      value={value}
      label={label}
      type={getFieldType()}
      colorClass={colorClass}
      isEditing={isEditing}
      localEditValue={localEditValue}
      increment={increment}
      onFieldClick={onFieldClick}
      onLocalValueChange={onLocalValueChange}
      onFieldBlur={onFieldBlur}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      canEdit={canEdit}
      showButtons={showButtons}
    />
  );
};

export default GoalsEditableField;
