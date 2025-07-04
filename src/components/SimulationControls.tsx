
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BaseData } from '@/types/dashboard';
import { Simulation } from '@/types/simulation';
import { Category } from '@/types/categories';

interface SimulationChange {
  category: string;
  change: number;
  type: 'increase' | 'decrease';
}

interface SimulationControlsProps {
  baseData: BaseData;
  simulation: Simulation;
  onUpdate: (changes: SimulationChange[]) => void;
}

const SimulationControls = ({ baseData, simulation, onUpdate }: SimulationControlsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(baseData.categories[0].name);
  const [changeAmount, setChangeAmount] = useState(100);
  const [changeType, setChangeType] = useState<'increase' | 'decrease'>('decrease');

  const addChange = () => {
    const newChange: SimulationChange = {
      category: selectedCategory,
      change: changeAmount,
      type: changeType
    };
    
    const existingChanges = simulation.changes || [];
    const updatedChanges = [...existingChanges, newChange];
    onUpdate(updatedChanges);
  };

  const removeChange = (index: number) => {
    const existingChanges = simulation.changes || [];
    const updatedChanges = existingChanges.filter((_, i) => i !== index);
    onUpdate(updatedChanges);
  };

  return (
    <div className="space-y-4">
      {/* Add Change Form */}
      <div className="bg-black/30 p-4 rounded border border-slate-600">
        <h3 className="text-sm font-bold text-green-400 mb-3">ADD CHANGE</h3>
        
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">CATEGORY</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-green-400"
            >
              {baseData.categories.map((cat: Category) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-400 block mb-1">AMOUNT</label>
              <input
                type="number"
                value={changeAmount}
                onChange={(e) => setChangeAmount(Number(e.target.value))}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-green-400"
                min="0"
                step="50"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">TYPE</label>
              <select
                value={changeType}
                onChange={(e) => setChangeType(e.target.value as 'increase' | 'decrease')}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm text-green-400"
              >
                <option value="decrease">REDUCE</option>
                <option value="increase">INCREASE</option>
              </select>
            </div>
          </div>

          <Button 
            onClick={addChange}
            className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
          >
            ADD CHANGE
          </Button>
        </div>
      </div>

      {/* Current Changes */}
      <div className="bg-black/30 p-4 rounded border border-slate-600">
        <h3 className="text-sm font-bold text-amber-400 mb-3">ACTIVE CHANGES</h3>
        
        {!simulation.changes || simulation.changes.length === 0 ? (
          <div className="text-xs text-slate-500 text-center py-4">
            No changes applied
          </div>
        ) : (
          <div className="space-y-2">
            {simulation.changes.map((change: SimulationChange, index: number) => (
              <div key={index} className="flex items-center justify-between bg-slate-700/50 p-2 rounded">
                <div className="flex items-center gap-2">
                  <span className={`text-lg ${change.type === 'increase' ? '📈' : '📉'}`}>
                    {change.type === 'increase' ? '📈' : '📉'}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-300">{change.category}</div>
                    <div className={`text-xs ${change.type === 'increase' ? 'text-red-400' : 'text-green-400'}`}>
                      {change.type === 'increase' ? '+' : '-'}${change.change}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeChange(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationControls;
