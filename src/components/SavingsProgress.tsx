
interface SavingsProgressProps {
  current: number;
  target: number;
  remaining: number;
}

const SavingsProgress = ({ current, target, remaining }: SavingsProgressProps) => {
  const percentage = (current / target) * 100;
  
  return (
    <div className="space-y-4">
      {/* Vault Visual */}
      <div className="text-center">
        <div className="text-6xl mb-2">🏦</div>
        <div className="text-sm text-slate-400">CURRENT VAULT</div>
        <div className="text-2xl font-bold text-green-400">${current.toLocaleString()}</div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-700 h-4 rounded overflow-hidden border border-slate-600">
        <div 
          className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-1000 ease-out"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">TARGET</div>
          <div className="text-lg font-bold text-blue-400">${target.toLocaleString()}</div>
        </div>
        <div className="bg-black/30 p-3 rounded border border-slate-600">
          <div className="text-xs text-slate-400 mb-1">PROGRESS</div>
          <div className="text-lg font-bold text-amber-400">{percentage.toFixed(0)}%</div>
        </div>
      </div>

      {/* Monthly Surplus */}
      <div className="bg-black/30 p-3 rounded border border-slate-600">
        <div className="text-xs text-slate-400 mb-1">MONTHLY SURPLUS</div>
        <div className={`text-lg font-bold ${remaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          ${remaining.toLocaleString()}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          {remaining >= 0 ? 'Available for savings' : 'Budget deficit'}
        </div>
      </div>
    </div>
  );
};

export default SavingsProgress;
