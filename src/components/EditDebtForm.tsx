
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  plannedPayment: number;
  totalPaid: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
}

interface EditDebtFormProps {
  debt: DebtItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedDebt: DebtItem) => void;
}

const EditDebtForm = ({ debt, isOpen, onClose, onSave }: EditDebtFormProps) => {
  const [formData, setFormData] = useState<DebtItem>(debt);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: keyof DebtItem, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-200 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-amber-400">Edit Debt</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-slate-300">Debt Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-slate-300">Type</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value) => handleInputChange('type', value as DebtItem['type'])}
            >
              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="loan">Loan</SelectItem>
                <SelectItem value="mortgage">Mortgage</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="balance" className="text-slate-300">Balance ($)</Label>
            <Input
              id="balance"
              type="number"
              min="0"
              step="0.01"
              value={formData.balance}
              onChange={(e) => handleInputChange('balance', parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <div>
            <Label htmlFor="interestRate" className="text-slate-300">Interest Rate (%)</Label>
            <Input
              id="interestRate"
              type="number"
              min="0"
              step="0.01"
              value={formData.interestRate}
              onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <div>
            <Label htmlFor="minPayment" className="text-slate-300">Minimum Payment ($)</Label>
            <Input
              id="minPayment"
              type="number"
              min="0"
              step="0.01"
              value={formData.minPayment}
              onChange={(e) => handleInputChange('minPayment', parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <div>
            <Label htmlFor="plannedPayment" className="text-slate-300">Planned Payment ($)</Label>
            <Input
              id="plannedPayment"
              type="number"
              min="0"
              step="0.01"
              value={formData.plannedPayment}
              onChange={(e) => handleInputChange('plannedPayment', parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <div>
            <Label htmlFor="totalPaid" className="text-slate-300">Total Paid This Month ($)</Label>
            <Input
              id="totalPaid"
              type="number"
              min="0"
              step="0.01"
              value={formData.totalPaid}
              onChange={(e) => handleInputChange('totalPaid', parseFloat(e.target.value) || 0)}
              className="bg-slate-700 border-slate-600 text-slate-200"
              required
            />
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDebtForm;
