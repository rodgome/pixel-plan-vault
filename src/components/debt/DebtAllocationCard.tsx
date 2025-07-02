
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DebtItem } from '@/types/debt';

interface DebtAllocationCardProps {
  debts: DebtItem[];
  totalPaidAmount: number;
  onUpdateDebt: (index: number, updatedDebt: DebtItem) => void;
}

const DebtAllocationCard = ({ debts, totalPaidAmount, onUpdateDebt }: DebtAllocationCardProps) => {
  const [allocations, setAllocations] = useState<{ [key: number]: number }>({});

  // Initialize allocations from actual debt totalPaid values
  useEffect(() => {
    const initialAllocations = debts.reduce((acc, debt, index) => {
      acc[index] = debt.totalPaid || 0;
      return acc;
    }, {} as { [key: number]: number });
    setAllocations(initialAllocations);
  }, [debts]);

  const totalAllocated = Object.values(allocations).reduce((sum, amount) => sum + amount, 0);
  const remainingToAllocate = totalPaidAmount - totalAllocated;

  const handleAllocationChange = (index: number, amount: number) => {
    const newAllocations = { ...allocations, [index]: amount };
    setAllocations(newAllocations);
    
    // Update the debt with the new allocation
    const updatedDebt = { ...debts[index], totalPaid: amount };
    onUpdateDebt(index, updatedDebt);
  };

  const handleAutoAllocate = () => {
    // If there's a mismatch, first sync the current allocations
    const currentTotal = Object.values(allocations).reduce((sum, amount) => sum + amount, 0);
    
    // Calculate how much we need to distribute
    const amountToDistribute = totalPaidAmount;
    
    if (amountToDistribute <= 0 || debts.length === 0) return;
    
    // Use minimum payments as the basis for proportional distribution
    const totalMinPayments = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
    
    if (totalMinPayments === 0) {
      // If no min payments, distribute equally
      const equalAmount = Math.floor(amountToDistribute / debts.length);
      const remainder = amountToDistribute % debts.length;
      
      debts.forEach((debt, index) => {
        const amount = equalAmount + (index < remainder ? 1 : 0);
        handleAllocationChange(index, amount);
      });
    } else {
      // Distribute proportionally based on minimum payments
      let distributedSoFar = 0;
      
      debts.forEach((debt, index) => {
        if (index === debts.length - 1) {
          // Last item gets the remainder to ensure exact total
          const amount = amountToDistribute - distributedSoFar;
          handleAllocationChange(index, Math.max(0, amount));
        } else {
          const proportion = debt.minPayment / totalMinPayments;
          const amount = Math.floor(amountToDistribute * proportion);
          distributedSoFar += amount;
          handleAllocationChange(index, amount);
        }
      });
    }
  };

  return (
    <Card className="bg-black/20 p-4 rounded border border-slate-600 mb-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-amber-400">DEBT PAYMENT ALLOCATION</h3>
          <Button 
            onClick={handleAutoAllocate}
            size="sm"
            variant="outline"
            className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
          >
            Auto Allocate
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
          <div className="bg-slate-700/50 p-2 rounded">
            <div className="text-xs text-slate-400">Total Paid</div>
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
        {debts.map((debt, index) => (
          <div key={index} className="flex items-center justify-between bg-slate-700/30 p-3 rounded">
            <div className="flex-1">
              <div className="text-sm font-medium text-slate-200">{debt.name}</div>
              <div className="text-xs text-slate-400">Min Payment: ${debt.minPayment.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">$</span>
              <Input
                type="number"
                value={allocations[index] || 0}
                onChange={(e) => handleAllocationChange(index, Number(e.target.value) || 0)}
                className="w-24 h-8 bg-slate-600 border-slate-500 text-white text-sm"
                min="0"
                step="1"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DebtAllocationCard;
