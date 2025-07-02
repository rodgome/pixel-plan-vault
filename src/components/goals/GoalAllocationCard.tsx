import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { GoalItem } from '@/types/goals';

interface GoalAllocationCardProps {
  goals: GoalItem[];
  totalPaidAmount: number;
  onUpdateGoal: (index: number, updatedGoal: GoalItem) => void;
}

const GoalAllocationCard = ({ goals, totalPaidAmount, onUpdateGoal }: GoalAllocationCardProps) => {
  const [allocations, setAllocations] = useState<{ [key: number]: number }>(
    goals.reduce((acc, goal, index) => {
      acc[index] = goal.current || 0;
      return acc;
    }, {} as { [key: number]: number })
  );

  const totalAllocated = Object.values(allocations).reduce((sum, amount) => sum + amount, 0);
  const remainingToAllocate = totalPaidAmount - totalAllocated;
  const hasAllocationMismatch = remainingToAllocate !== 0;

  const handleAllocationChange = (index: number, amount: number) => {
    const newAllocations = { ...allocations, [index]: amount };
    setAllocations(newAllocations);
    
    // Update the goal with the new allocation
    const updatedGoal = { ...goals[index], current: amount };
    onUpdateGoal(index, updatedGoal);
  };

  const handleAutoAllocate = () => {
    if (remainingToAllocate <= 0) return;
    
    // Simple auto-allocation: distribute remaining amount proportionally based on monthly contributions
    const totalMonthlyContributions = goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0);
    
    goals.forEach((goal, index) => {
      if (totalMonthlyContributions > 0) {
        const proportion = goal.monthlyContribution / totalMonthlyContributions;
        const suggestedAmount = Math.round(remainingToAllocate * proportion);
        const currentAllocation = allocations[index] || 0;
        const newAmount = Math.min(currentAllocation + suggestedAmount, goal.target); // Don't exceed target
        handleAllocationChange(index, newAmount);
      }
    });
  };

  return (
    <Card className="bg-black/20 p-4 rounded border border-slate-600 mb-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-amber-400">GOAL CONTRIBUTION ALLOCATION</h3>
          <Button 
            onClick={handleAutoAllocate}
            size="sm"
            variant="outline"
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            disabled={remainingToAllocate <= 0}
          >
            Auto Allocate
          </Button>
        </div>
        
        {/* Allocation Alert */}
        {hasAllocationMismatch && (
          <Alert variant="destructive" className="mb-3 bg-red-900/20 border-red-700">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-300">
              {remainingToAllocate > 0 
                ? `You have $${remainingToAllocate.toLocaleString()} unallocated to goals. Use Auto Allocate or adjust amounts manually.`
                : `You've over-allocated by $${Math.abs(remainingToAllocate).toLocaleString()}. Reduce some amounts.`
              }
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
          <div className="bg-slate-700/50 p-2 rounded">
            <div className="text-xs text-slate-400">Total Available</div>
            <div className="text-green-400 font-bold">${totalPaidAmount.toLocaleString()}</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded">
            <div className="text-xs text-slate-400">Allocated</div>
            <div className="text-blue-400 font-bold">${totalAllocated.toLocaleString()}</div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded">
            <div className="text-xs text-slate-400">Remaining</div>
            <div className={`font-bold ${remainingToAllocate === 0 ? 'text-green-400' : remainingToAllocate > 0 ? 'text-amber-400' : 'text-red-400'}`}>
              ${remainingToAllocate.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {goals.map((goal, index) => {
          const progress = goal.target > 0 ? (allocations[index] / goal.target) * 100 : 0;
          return (
            <div key={index} className="flex items-center justify-between bg-slate-700/30 p-3 rounded">
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-200">{goal.name}</div>
                <div className="text-xs text-slate-400">
                  Target: ${goal.target.toLocaleString()} • {progress.toFixed(1)}% complete
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">$</span>
                <Input
                  type="number"
                  value={allocations[index] || 0}
                  onChange={(e) => handleAllocationChange(index, Number(e.target.value) || 0)}
                  className="w-24 h-8 bg-slate-600 border-slate-500 text-white text-sm"
                  min="0"
                  max={goal.target}
                  step="1"
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default GoalAllocationCard;
