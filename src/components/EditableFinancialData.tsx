
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface EditableFinancialDataProps {
  income: number;
  categories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  onUpdate: (newData: {
    income: number;
    categories: Array<{
      name: string;
      amount: number;
      budget: number;
      color: string;
    }>;
  }) => void;
}

const EditableFinancialData = ({
  income,
  categories,
  onUpdate
}: EditableFinancialDataProps) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [increment, setIncrement] = useState(100);
  const [directEditValue, setDirectEditValue] = useState<string>('');

  const handleDoubleClick = (itemName: string, currentValue: number) => {
    setEditingItem(itemName);
    setDirectEditValue(currentValue.toString());
  };

  const handleIncrement = (itemName: string, isIncome: boolean = false) => {
    if (isIncome) {
      onUpdate({
        income: income + increment,
        categories: [...categories]
      });
    } else {
      const updatedCategories = categories.map(cat => cat.name === itemName ? {
        ...cat,
        budget: cat.budget + increment
      } : cat);
      onUpdate({
        income,
        categories: updatedCategories
      });
    }
  };

  const handleDecrement = (itemName: string, isIncome: boolean = false) => {
    if (isIncome) {
      onUpdate({
        income: Math.max(0, income - increment),
        categories: [...categories]
      });
    } else {
      const updatedCategories = categories.map(cat => cat.name === itemName ? {
        ...cat,
        budget: Math.max(0, cat.budget - increment)
      } : cat);
      onUpdate({
        income,
        categories: updatedCategories
      });
    }
  };

  const handleDirectValueChange = (itemName: string, value: string, isIncome: boolean = false) => {
    setDirectEditValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      if (isIncome) {
        onUpdate({
          income: numValue,
          categories: [...categories]
        });
      } else {
        const updatedCategories = categories.map(cat => cat.name === itemName ? {
          ...cat,
          budget: numValue
        } : cat);
        onUpdate({
          income,
          categories: updatedCategories
        });
      }
    }
  };

  const handleClickOutside = () => {
    setEditingItem(null);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <h2 className="text-base font-bold text-amber-400">MONEY PLAN</h2>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600">
                <Settings className="w-4 h-4 mr-1" />
                Settings
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 bg-slate-800 border-slate-600">
              <div className="space-y-2">
                <Label htmlFor="increment" className="text-slate-300">Increment Amount</Label>
                <Input 
                  id="increment" 
                  type="number" 
                  value={increment} 
                  onChange={e => setIncrement(Number(e.target.value))} 
                  className="bg-slate-700 border-slate-600 text-white" 
                />
                <p className="text-xs text-slate-400">Double-click any card to edit with +/- buttons or type custom amount</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm" onClick={handleClickOutside}>
          {/* Income Card */}
          <div>
            <div 
              className="bg-black/30 p-3 rounded border border-slate-600 cursor-pointer hover:bg-black/40 transition-colors" 
              onDoubleClick={e => {
                e.stopPropagation();
                handleDoubleClick('INCOME', income);
              }}
              onClick={e => e.stopPropagation()}
            >
              <div className="text-xs text-slate-400 mb-1">INCOME</div>
              <div className="text-lg font-bold text-green-400">${income.toLocaleString()}</div>
              
              {editingItem === 'INCOME' && (
                <div className="mt-3 space-y-2">
                  <Input
                    type="number"
                    value={directEditValue}
                    onChange={(e) => handleDirectValueChange('INCOME', e.target.value, true)}
                    className="text-sm bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter amount"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={e => {
                        e.stopPropagation();
                        handleDecrement('INCOME', true);
                      }} 
                      className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-white text-xs">±{increment}</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={e => {
                        e.stopPropagation();
                        handleIncrement('INCOME', true);
                      }} 
                      className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category Cards */}
          {categories.map(category => (
            <div key={category.name}>
              <div 
                className="bg-black/30 p-3 rounded border border-slate-600 cursor-pointer hover:bg-black/40 transition-colors" 
                onDoubleClick={e => {
                  e.stopPropagation();
                  handleDoubleClick(category.name, category.budget);
                }}
                onClick={e => e.stopPropagation()}
              >
                <div className="text-xs text-slate-400 mb-1">{category.name}</div>
                <div className="text-lg font-bold text-blue-400">${category.budget.toLocaleString()}</div>
                
                {editingItem === category.name && (
                  <div className="mt-3 space-y-2">
                    <Input
                      type="number"
                      value={directEditValue}
                      onChange={(e) => handleDirectValueChange(category.name, e.target.value)}
                      className="text-sm bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter amount"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={e => {
                          e.stopPropagation();
                          handleDecrement(category.name);
                        }} 
                        className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-white text-xs">±{increment}</span>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={e => {
                          e.stopPropagation();
                          handleIncrement(category.name);
                        }} 
                        className="bg-green-600 hover:bg-green-700 text-white border-green-600"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EditableFinancialData;
