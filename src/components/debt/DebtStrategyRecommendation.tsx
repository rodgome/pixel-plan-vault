
interface DebtStrategyRecommendationProps {
  debt: any;
  showStrategy: boolean;
}

const DebtStrategyRecommendation = ({ debt, showStrategy }: DebtStrategyRecommendationProps) => {
  const isStrategicDebt = 'recommendedPayment' in debt;

  if (!showStrategy || !isStrategicDebt) {
    return null;
  }

  return (
    <div className="bg-black/30 p-3 rounded border border-slate-500 mb-3">
      <div className="text-xs text-amber-400 mb-1">RECOMMENDED PAYMENT</div>
      <div className="font-bold text-amber-400">${debt.recommendedPayment.toLocaleString()}</div>
    </div>
  );
};

export default DebtStrategyRecommendation;
