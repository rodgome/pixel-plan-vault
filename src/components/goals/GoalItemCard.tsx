
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution?: number;
  type: 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
  deadline?: string;
}

interface GoalItemCardProps {
  goal: GoalItem;
  index: number;
  onUpdate?: (index: number, updatedGoal: GoalItem) => void;
  onDelete?: () => void;
}

const GoalItemCard = ({ goal, index, onUpdate, onDelete }: GoalItemCardProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [directEditValue, setDirectEditValue] = useState<string>('');
  const [increment, setIncrement] = useState(100);

  const getGoalIcon = (type: string) => {
    switch (type) {
      case 'emergency_fund': return '🛡️';
      case 'retirement': return '👴';
      case 'investment': return '📈';
      case 'vacation': return '🏖️';
      default: return '🎯';
    }
  };

  const getGoalColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 50) return 'text-blue-400';
    if (percentage >= 25) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const percentage = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
  const plannedContribution = goal.plannedContribution || goal.monthlyContribution;
  const maxContribution = Math.max(goal.monthlyContribution, plannedContribution, goal.current);
  
  // Calculate monthly contribution progress
  const monthlyProgress = plannedContribution > 0 ? Math.min((goal.monthlyContribution / plannedContribution) * 100, 100) : 0;

  const handleDoubleClick = (fieldName: string, currentValue: number | string) => {
    setEditingField(fieldName);
    setDirectEditValue(currentValue.toString());
  };

  const handleIncrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target += increment;
        break;
      case 'current':
        updatedGoal.current += increment;
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution += increment;
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = (updatedGoal.plannedContribution || 0) + increment;
        break;
    }
    onUpdate(index, updatedGoal);
  };

  const handleDecrement = (fieldName: string) => {
    if (!onUpdate) return;
    
    const updatedGoal = { ...goal };
    switch (fieldName) {
      case 'target':
        updatedGoal.target = Math.max(0, updatedGoal.target - increment);
        break;
      case 'current':
        updatedGoal.current = Math.max(0, updatedGoal.current - increment);
        break;
      case 'monthlyContribution':
        updatedGoal.monthlyContribution = Math.max(0, updatedGoal.monthlyContribution - increment);
        break;
      case 'plannedContribution':
        updatedGoal.plannedContribution = Math.max(0, (updatedGoal.plannedContribution || 0) - increment);
        break;
    }
    onUpdate(index, updatedGoal);
  };

  const handleDirectValueChange = (fieldName: string, value: string) => {
    if (!onUpdate) return;
    
    setDirectEditValue(value);
    const updatedGoal = { ...goal };
    
    if (fieldName === 'name') {
      updatedGoal.name = value;
      onUpdate(index, updatedGoal);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      switch (fieldName) {
        case 'target':
          updatedGoal.target = numValue;
          break;
        case 'current':
          updatedGoal.current = numValue;
          break;
        case 'monthlyContribution':
          updatedGoal.monthlyContribution = numValue;
          break;
        case 'plannedContribution':
          updatedGoal.plannedContribution = numValue;
          break;
      }
      onUpdate(index, updatedGoal);
    }
  };

  const handleClickOutside = () => {
    setEditingField(null);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  const renderEditableField = (fieldName: string, value: number, label: string, colorClass: string) => {
    const isEditing = editingField === fieldName;
    
    return (
      <div 
        className="cursor-pointer" 
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (onUpdate) handleDoubleClick(fieldName, value);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs text-slate-400">{label}</div>
        <div className={`font-bold ${colorClass}`}>${value.toLocaleString()}</div>
        
        {isEditing && onUpdate && (
          <div className="mt-2 space-y-2">
            <Input
              type="number"
              value={directEditValue}
              onChange={(e) => handleDirectValueChange(fieldName, e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white h-8"
              placeholder="Enter amount"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex items-center justify-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrement(fieldName);
                }} 
                className="bg-red-600 hover:bg-red-700 text-white border-red-600 h-7 px-2"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white text-xs">±{increment}</span>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrement(fieldName);
                }} 
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 h-7 px-2"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEditableName = () => {
    const isEditing = editingField === 'name';
    
    return (
      <div 
        className="cursor-pointer flex-1" 
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (onUpdate) handleDoubleClick('name', goal.name);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="font-bold text-slate-200">{goal.name}</span>
        
        {isEditing && onUpdate && (
          <div className="mt-2">
            <Input
              type="text"
              value={directEditValue}
              onChange={(e) => handleDirectValueChange('name', e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white h-8"
              placeholder="Enter goal name"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    );
  };

  const renderEditableIcon = () => {
    const isEditing = editingField === 'icon';
    
    return (
      <div 
        className="cursor-pointer" 
        onDoubleClick={(e) => {
          e.stopPropagation();
          if (onUpdate) {
            setEditingField('icon');
            setDirectEditValue(goal.type);
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-lg">{getGoalIcon(goal.type)}</span>
        
        {isEditing && onUpdate && (
          <div className="mt-2">
            <select
              value={directEditValue}
              onChange={(e) => {
                const updatedGoal = { ...goal };
                updatedGoal.type = e.target.value as 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';
                onUpdate(index, updatedGoal);
                setEditingField(null);
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

  return (
    <div className="bg-black/20 p-4 rounded border border-slate-600 relative" onClick={handleClickOutside}>
      {/* Delete Button */}
      {onDelete && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 h-6 w-6 p-0"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      )}

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {renderEditableIcon()}
          {renderEditableName()}
        </div>
        <div className="flex items-center gap-2 mr-8">
          <div className={`text-sm font-bold ${getGoalColor(percentage)}`}>
            {percentage.toFixed(1)}%
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        {renderEditableField('current', goal.current, 'CURRENT', 'text-green-400')}
        {renderEditableField('target', goal.target, 'TARGET', 'text-blue-400')}
      </div>

      {/* Monthly Contribution Fields */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
        {renderEditableField('monthlyContribution', goal.monthlyContribution, 'MONTHLY CONTRIBUTION', 'text-orange-400')}
        {renderEditableField('plannedContribution', goal.plannedContribution || goal.monthlyContribution, 'PLANNED CONTRIBUTION', 'text-purple-400')}
      </div>

      {/* Monthly Contribution Progress */}
      <div className="space-y-2 mb-3">
        <div className="text-xs text-slate-400">THIS MONTH'S CONTRIBUTION PROGRESS</div>
        <Progress 
          value={monthlyProgress} 
          className="h-2 bg-slate-700 [&>div]:bg-orange-500" 
        />
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">Contributed: ${goal.monthlyContribution.toLocaleString()}</span>
          <span className="text-purple-400">Target: ${plannedContribution.toLocaleString()}</span>
        </div>
      </div>

      {/* Goal Progress Bar */}
      <div className="space-y-2">
        <div className="text-xs text-slate-400 mb-1">GOAL PROGRESS</div>
        <div className="relative">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-green-400">Current: ${goal.current.toLocaleString()}</span>
            <span className="text-blue-400">Target: ${goal.target.toLocaleString()}</span>
            {goal.deadline && <span className="text-purple-400">Due: {goal.deadline}</span>}
          </div>
          
          <div className="relative h-4 bg-slate-700 rounded overflow-hidden">
            {/* Goal Progress Bar */}
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-600 to-green-400"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalItemCard;
