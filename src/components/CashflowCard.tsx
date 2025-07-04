
import { Card } from "@/components/ui/card";
import CategoryBreakdown from "./CategoryBreakdown";
import { useNavigate } from "react-router-dom";
import { useDashboard } from "@/contexts/DashboardContext";
import { useDashboardCalculations } from "./DashboardCalculations";
import { useEditableField } from "@/hooks/useEditableField";
import EditableField from "@/components/ui/EditableField";

const CashflowCard = () => {
  const { baseData, handleDataUpdate } = useDashboard();
  const { spendingCategories, totalBudget, totalSpent, remaining } =
    useDashboardCalculations(baseData);

  const navigate = useNavigate();

  const handleNeedsClick = () => navigate("/needs");
  const handleWantsClick = () => navigate("/wants");
  const handleDebtClick = () => navigate("/debt");
  const handleGoalsClick = () => navigate("/goals");

  const spentPercentage =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const monthlyBudgeted = spendingCategories.reduce(
    (sum, cat) => sum + cat.budget,
    0,
  );

  // Editable field logic for income
  const {
    editingField,
    localEditValue,
    increment,
    handleDoubleClick,
    handleLocalValueChange,
    handleFieldBlur,
    handleIncrement,
    handleDecrement,
  } = useEditableField({
    item: baseData,
    index: 0,
    onUpdate: (_, updatedData) => {
      handleDataUpdate({
        income: updatedData.income,
        categories: baseData.categories,
      });
    },
    increment: 500,
  });

  return (
    <div className="space-y-6">
      {/* Header Section with Overview Cards */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-300">
                CASH FLOW DASHBOARD
              </h2>
              <p className="text-sm text-slate-400">
                Monitor your monthly money flow
              </p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
                Monthly Income
              </div>
              <EditableField
                fieldName="income"
                value={totalBudget}
                type="currency"
                colorClass="text-green-400"
                isEditing={editingField === "income"}
                localEditValue={localEditValue}
                increment={increment}
                onFieldClick={handleDoubleClick}
                onLocalValueChange={handleLocalValueChange}
                onFieldBlur={handleFieldBlur}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                className="text-2xl font-bold"
              />
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
                Monthly Budgeted
              </div>
              <div className="text-2xl font-bold text-blue-400">
                ${monthlyBudgeted.toLocaleString()}
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
                Total Spent
              </div>
              <div className="text-2xl font-bold text-red-400">
                ${totalSpent.toLocaleString()}
              </div>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-slate-600">
              <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
                Remaining
              </div>
              <div
                className={`text-2xl font-bold ${remaining >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                ${remaining.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Budget Progress</span>
              <span>{spentPercentage.toFixed(1)}% used</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  spentPercentage >= 100
                    ? "bg-red-500"
                    : spentPercentage >= 80
                      ? "bg-orange-500"
                      : "bg-green-500"
                }`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown Section */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
            <h3 className="text-lg font-bold text-slate-300">
              CATEGORY BREAKDOWN
            </h3>
          </div>
          <CategoryBreakdown
            categories={spendingCategories}
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

export default CashflowCard;
