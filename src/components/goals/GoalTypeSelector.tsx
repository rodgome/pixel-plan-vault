
import { useState } from 'react';

interface GoalTypeSelectorProps {
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  isEditing: boolean;
  onTypeChange: (type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other') => void;
  onEditStart: () => void;
  onEditEnd: () => void;
}

const GoalTypeSelector = ({ 
  type, 
  isEditing, 
  onTypeChange, 
  onEditStart, 
  onEditEnd 
}: GoalTypeSelectorProps) => {
  const getGoalIcon = (goalType: string) => {
    switch (goalType) {
      case 'emergency_fund': return '🛡️';
      case 'retirement': return '👴';
      case 'investment': return '📈';
      case 'vacation': return '🏖️';
      default: return '🎯';
    }
  };

  return (
    <div 
      className="cursor-pointer" 
      onDoubleClick={(e) => {
        e.stopPropagation();
        onEditStart();
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <span className="text-lg">{getGoalIcon(type)}</span>
      
      {isEditing && (
        <div className="mt-2">
          <select
            value={type}
            onChange={(e) => {
              onTypeChange(e.target.value as 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other');
              onEditEnd();
            }}
            className="text-sm bg-slate-700 border-slate-600 text-white h-8 rounded px-2"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="emergency_fund">🛡️ Emergency Fund</option>
            <option value="retirement">👴 Retirement</option>
            <option value="investment">📈 Investment</option>
            <option value="vacation">🏖️ Vacation</option>
            <option value="other">🎯 Other</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default GoalTypeSelector;
