
import { Card } from "@/components/ui/card";
import SpentTracker from "./SpentTracker";
import { useDashboard } from "@/contexts/DashboardContext";

const BudgetManager = () => {
  const { baseData, handleSpentUpdate } = useDashboard();

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
    </div>
  );
};

export default BudgetManager;
