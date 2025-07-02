
interface BudgetBalanceProps {
  income: number;
  categories: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
}

const BudgetBalance = ({ income, categories }: BudgetBalanceProps) => {
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const balance = income - totalBudget;

  return (
    <div className="bg-black/30 p-3 rounded border border-slate-600">
      <div className="text-xs text-slate-400 mb-1">BALANCE</div>
      <div className={`text-lg font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        ${balance.toLocaleString()}
      </div>
      <div className="text-xs text-slate-500 mt-1">
        Income - Total Budget
      </div>
    </div>
  );
};

export default BudgetBalance;
