
import MoneyPlanCard from './MoneyPlanCard';

interface FinancialSummaryCardsProps {
  income: number;
  expenses: number;
  debt: number;
  goals: number;
}

const FinancialSummaryCards = ({ income, expenses, debt, goals }: FinancialSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MoneyPlanCard
        title="INCOME"
        amount={income}
        icon="💰"
        color="text-green-400"
        bgColor="bg-green-900/20"
      />
      <MoneyPlanCard
        title="EXPENSES"
        amount={expenses}
        icon="💸"
        color="text-red-400"
        bgColor="bg-red-900/20"
      />
      <MoneyPlanCard
        title="DEBT"
        amount={debt}
        icon="⚠️"
        color="text-orange-400"
        bgColor="bg-orange-900/20"
      />
      <MoneyPlanCard
        title="GOALS"
        amount={goals}
        icon="🎯"
        color="text-blue-400"
        bgColor="bg-blue-900/20"
      />
    </div>
  );
};

export default FinancialSummaryCards;
