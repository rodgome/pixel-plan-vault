
import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Minus, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SpentTrackerProps {
  categories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  onUpdate: (newData: {
    categories: Array<{
      name: string;
      amount: number;
      budget: number;
      color: string;
    }>;
  }) => void;
}

const SpentTracker = ({
  categories,
  onUpdate
}: SpentTrackerProps) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [increment, setIncrement] = useState(50);
  const [directEditValue, setDirectEditValue] = useState<string>('');

  // Memoize total spent to prevent recalculation
  const totalSpent = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.amount, 0);
  }, [categories]);

  const handleDoubleClick = useCallback((itemName: string, currentAmount: number) => {
    setEditingItem(itemName);
    setDirectEditValue(currentAmount.toString());
  }, []);

  const handleIncrement = useCallback((itemName: string) => {
    const updatedCategories = categories.map(cat => cat.name === itemName ? {
      ...cat,
      amount: cat.amount + increment
    } : cat);
    
    onUpdate({
      categories: updatedCategories
    });
  }, [categories, increment, onUpdate]);

  const handleDecrement = useCallback((itemName: string) => {
    const updatedCategories = categories.map(cat => cat.name === itemName ? {
      ...cat,
      amount: Math.max(0, cat.amount - increment)
    } : cat);
    
    onUpdate({
      categories: updatedCategories
    });
  }, [categories, increment, onUpdate]);

  const handleDirectAmountChange = useCallback((itemName: string, value: string) => {
    setDirectEditValue(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0) {
      const updatedCategories = categories.map(cat => cat.name === itemName ? {
        ...cat,
        amount: numValue
      } : cat);
      
      onUpdate({
        categories: updatedCategories
      });
    }
  }, [categories, onUpdate]);

  const handleClickOutside = useCallback(() => {
    setEditingItem(null);
  }, []);

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lg">💸</span>
            <h2 className="text-base font-bold text-red-400">SPENT SO FAR</h2>
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
          {/* Total Spent Card */}
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">TOTAL SPENT</div>
            <div className="text-lg font-bold text-red-400">${totalSpent.toLocaleString()}</div>
          </div>

          {/* Category Cards */}
          {categories.map(category => (
            <div key={category.name}>
              <div 
                className="bg-black/30 p-3 rounded border border-slate-600 cursor-pointer hover:bg-black/40 transition-colors" 
                onDoubleClick={e => {
                  e.stopPropagation();
                  handleDoubleClick(category.name, category.amount);
                }}
                onClick={e => e.stopPropagation()}
              >
                <div className="text-xs text-slate-400 mb-1">{category.name}</div>
                <div className="text-lg font-bold text-red-400">${category.amount.toLocaleString()}</div>
                <div className="text-xs text-slate-500 mt-1">
                  of ${category.budget.toLocaleString()} budget
                </div>

                {editingItem === category.name && (
                  <div className="mt-3 space-y-2">
                    <Input
                      type="number"
                      value={directEditValue}
                      onChange={(e) => handleDirectAmountChange(category.name, e.target.value)}
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

export default SpentTracker;
