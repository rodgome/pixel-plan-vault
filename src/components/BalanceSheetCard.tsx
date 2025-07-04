import { Card } from "@/components/ui/card";
import { useDashboard } from "@/contexts/DashboardContext";

const BalanceSheetCard = () => {
  const { baseData } = useDashboard();

  const assets = baseData.goals.reduce((sum, g) => sum + g.current, 0);
  const liabilities = baseData.debts.reduce((sum, d) => sum + d.balance, 0);
  const netWorth = assets - liabilities;

  const totalGoalsTarget = baseData.goals.reduce((sum, g) => sum + g.target, 0);
  const totalGoalsCurrent = baseData.goals.reduce(
    (sum, g) => sum + g.current,
    0,
  );
  const goalsPercentage =
    totalGoalsTarget > 0 ? (totalGoalsCurrent / totalGoalsTarget) * 100 : 0;

  const debtBudget =
    baseData.categories.find((cat) => cat.name === "DEBT")?.budget || 0;
  const debtPaid = baseData.debts.reduce(
    (sum, d) => sum + (d.totalPaid || 0),
    0,
  );
  const debtPercentage = debtBudget > 0 ? (debtPaid / debtBudget) * 100 : 0;

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <h2 className="text-base font-bold text-amber-400">BALANCE SHEET</h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">ASSETS</div>
            <div className="text-lg font-bold text-green-400">
              ${assets.toLocaleString()}
            </div>
          </div>
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">LIABILITIES</div>
            <div className="text-lg font-bold text-red-400">
              ${liabilities.toLocaleString()}
            </div>
          </div>
          <div className="bg-black/30 p-3 rounded border border-slate-600">
            <div className="text-xs text-slate-400 mb-1">NET WORTH</div>
            <div
              className={`text-lg font-bold ${netWorth >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              ${netWorth.toLocaleString()}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Debt Payments</span>
              <span>{debtPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${Math.min(debtPercentage, 100)}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Savings Progress</span>
              <span>{goalsPercentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${Math.min(goalsPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BalanceSheetCard;
