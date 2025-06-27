
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit, Save, X } from 'lucide-react';

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

const EditableFinancialData = ({ income, categories, onUpdate }: EditableFinancialDataProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    income,
    categories: [...categories]
  });

  const handleEdit = () => {
    setEditData({ income, categories: [...categories] });
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ income, categories: [...categories] });
    setIsEditing(false);
  };

  const updateIncome = (value: number) => {
    setEditData(prev => ({ ...prev, income: value }));
  };

  const updateCategoryAmount = (categoryName: string, amount: number) => {
    setEditData(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.name === categoryName ? { ...cat, amount } : cat
      )
    }));
  };

  if (!isEditing) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">✏️</span>
              <h2 className="text-base font-bold text-amber-400">FINANCIAL DATA</h2>
            </div>
            <Button
              onClick={handleEdit}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="bg-black/30 p-3 rounded border border-slate-600">
              <div className="text-xs text-slate-400 mb-1">INCOME</div>
              <div className="text-lg font-bold text-green-400">${income.toLocaleString()}</div>
            </div>
            {categories.map((category) => (
              <div key={category.name} className="bg-black/30 p-3 rounded border border-slate-600">
                <div className="text-xs text-slate-400 mb-1">{category.name}</div>
                <div className="text-lg font-bold text-blue-400">${category.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">✏️</span>
            <h2 className="text-base font-bold text-amber-400">EDIT FINANCIAL DATA</h2>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
            >
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-slate-300">Monthly Income</Label>
            <Input
              id="income"
              type="number"
              value={editData.income}
              onChange={(e) => updateIncome(Number(e.target.value))}
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          
          {editData.categories.map((category) => (
            <div key={category.name} className="space-y-2">
              <Label htmlFor={category.name} className="text-slate-300">
                {category.name.charAt(0) + category.name.slice(1).toLowerCase()}
              </Label>
              <Input
                id={category.name}
                type="number"
                value={category.amount}
                onChange={(e) => updateCategoryAmount(category.name, Number(e.target.value))}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default EditableFinancialData;
