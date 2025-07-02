
/**
 * Types for editable field functionality
 */
export type FieldType = 'text' | 'currency' | 'percentage' | 'icon';

export interface EditableFieldProps {
  fieldName: string;
  value: string | number;
  label?: string;
  type: FieldType;
  colorClass: string;
  isEditing: boolean;
  localEditValue: string;
  increment?: number;
  onFieldClick: (fieldName: string, value: string | number) => void;
  onLocalValueChange: (value: string) => void;
  onFieldBlur: (fieldName: string) => void;
  onIncrement?: (fieldName: string) => void;
  onDecrement?: (fieldName: string) => void;
  onTypeChange?: (newType: string) => void;
  onEditingFieldChange?: (field: string | null) => void;
  canEdit: boolean;
  showButtons: boolean;
  className?: string;
  iconOptions?: IconOption[];
}

export interface IconOption {
  value: string;
  label: string;
  icon: string;
}

export interface EditableFieldState {
  editingField: string | null;
  localEditValue: string;
  increment: number;
}
