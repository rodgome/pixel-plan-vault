import CashflowCard from './CashflowCard';
import BalanceSheetCard from './BalanceSheetCard';

const DashboardGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <CashflowCard />
      <BalanceSheetCard />
    </div>
  );
};

export default DashboardGrid;
