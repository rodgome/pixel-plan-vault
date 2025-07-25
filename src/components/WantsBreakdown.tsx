import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface WantsBreakdownProps {
  categories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  income?: number;
  onBudgetUpdate?: (newBudget: number) => void;
}

const WantsBreakdown = ({
  categories,
  income = 0,
  onBudgetUpdate,
}: WantsBreakdownProps) => {
  const wantsCategory = categories.find((cat) => cat.name === "WANTS");

  if (!wantsCategory) return null;

  const percentage =
    wantsCategory.budget > 0
      ? (wantsCategory.amount / wantsCategory.budget) * 100
      : 0;
  const [editing, setEditing] = useState(false);
  const [directValue, setDirectValue] = useState<string>("");
  const [increment, setIncrement] = useState(100);

  const handleDoubleClick = () => {
    setEditing(true);
    setDirectValue(wantsCategory.budget.toString());
  };

  const handleIncrement = () => {
    if (onBudgetUpdate) onBudgetUpdate(wantsCategory.budget + increment);
  };

  const handleDecrement = () => {
    if (onBudgetUpdate)
      onBudgetUpdate(Math.max(0, wantsCategory.budget - increment));
  };

  const handleDirectChange = (value: string) => {
    setDirectValue(value);
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && onBudgetUpdate) {
      onBudgetUpdate(num);
    }
  };

  return (
    <div className="space-y-4" onClick={() => setEditing(false)}>
      <div
        className="text-center"
        onDoubleClick={handleDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-2xl font-bold text-amber-400">
          ${wantsCategory.amount.toLocaleString()} / $
          {wantsCategory.budget.toLocaleString()}
        </div>
        <div className="text-slate-400">
          {percentage.toFixed(1)}% of budget spent
        </div>
        {editing && onBudgetUpdate && (
          <div className="mt-3 space-y-2">
            <Input
              type="number"
              value={directValue}
              onChange={(e) => handleDirectChange(e.target.value)}
              className="text-sm bg-slate-700 border-slate-600 text-white"
              placeholder="Enter amount"
            />
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleDecrement}
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-white text-xs">±{increment}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={handleIncrement}
                className="bg-green-600 hover:bg-green-700 text-white border-green-600"
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-700 h-4 rounded overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 80
                ? "bg-orange-500"
                : "bg-green-500"
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-300">
          Discretionary Spending
        </h3>
        <div className="text-slate-400 text-sm">
          This category includes entertainment, dining out, hobbies,
          subscriptions, and other non-essential purchases.
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-700/50 p-3 rounded">
            <div className="text-slate-400">Remaining Budget</div>
            <div className="text-lg font-bold text-green-400">
              ${(wantsCategory.budget - wantsCategory.amount).toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-700/50 p-3 rounded">
            <div className="text-slate-400">Status</div>
            <div
              className={`text-lg font-bold ${
                percentage >= 100
                  ? "text-red-400"
                  : percentage >= 80
                    ? "text-orange-400"
                    : "text-green-400"
              }`}
            >
              {percentage >= 100
                ? "Over Budget"
                : percentage >= 80
                  ? "Near Limit"
                  : "On Track"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WantsBreakdown;
