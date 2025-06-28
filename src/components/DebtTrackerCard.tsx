
import { Card } from '@/components/ui/card';
import DebtBreakdown from './DebtBreakdown';

interface DebtItem {
  name: string;
  balance: number;
  minPayment: number;
  plannedPayment?: number;
  totalPaid?: number;
  interestRate: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
}

interface DebtTrackerCardProps {
  debts: DebtItem[];
}

const DebtTrackerCard = ({ debts }: DebtTrackerCardProps) => {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💳</span>
          <h2 className="text-base font-bold text-amber-400">DEBT TRACKER</h2>
        </div>
        <DebtBreakdown debts={debts} />
      </div>
    </Card>
  );
};

export default DebtTrackerCard;
