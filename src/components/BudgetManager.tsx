import { Card } from "@/components/ui/card";
import SpentTracker from "./SpentTracker";
import CategoryBreakdown from "./CategoryBreakdown";
import { useDashboard } from "@/contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

const BudgetManager = () => {
  const { baseData, handleSpentUpdate } = useDashboard();
  const navigate = useNavigate();

  const handleNeedsClick = () => navigate("/needs");
  const handleWantsClick = () => navigate("/wants");
  const handleDebtClick = () => navigate("/debt");
  const handleGoalsClick = () => navigate("/goals");

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-400/20 rounded-full flex items-center justify-center">
              <span className="text-lg">💳</span>
            </div>
            <h3 className="text-lg font-bold text-purple-400">
              SPENDING TRACKER
            </h3>
          </div>
          <SpentTracker
            categories={baseData.categories}
            onUpdate={handleSpentUpdate}
          />
        </div>
      </Card>
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-400/20 rounded-full flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
            <h3 className="text-lg font-bold text-amber-400">
              CATEGORY BREAKDOWN
            </h3>
          </div>
          <CategoryBreakdown
            categories={baseData.categories}
            debts={baseData.debts}
            goals={baseData.goals}
            onDebtClick={handleDebtClick}
            onGoalsClick={handleGoalsClick}
            onNeedsClick={handleNeedsClick}
            onWantsClick={handleWantsClick}
          />
        </div>
      </Card>
    </div>
  );
};

export default BudgetManager;
