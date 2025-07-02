import MoneyPlanCard from './MoneyPlanCard';
interface FinancialSummaryCardsProps {
  income: number;
  expenses: number;
  debt: number;
  goals: number;
  categories?: Array<{
    name: string;
    amount: number;
    budget: number;
    color: string;
  }>;
  totalIncome?: number;
}
const FinancialSummaryCards = ({
  income,
  expenses,
  debt,
  goals,
  categories = [],
  totalIncome = 0
}: FinancialSummaryCardsProps) => {
  // Find the WANTS category to get additional info
  const wantsCategory = categories.find(cat => cat.name === 'WANTS');
  return;
};
export default FinancialSummaryCards;