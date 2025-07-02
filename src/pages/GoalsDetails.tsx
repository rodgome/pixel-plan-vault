
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import GoalsBreakdown from '../components/GoalsBreakdown';
import { useDashboard } from '../contexts/DashboardContext';

const GoalsDetails = () => {
  const {
    baseData,
    handleGoalUpdate,
    handleDeleteGoal,
    handleAddGoal
  } = useDashboard();

  const handleBack = () => {
    window.history.back();
  };

  // Get the goals spent amount from the GOALS category
  const goalsSpent = baseData.categories.find(cat => cat.name === 'GOALS')?.amount || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400 font-mono">
      {/* Header */}
      <div className="border-b-2 border-amber-400 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={handleBack}
                variant="ghost" 
                size="sm"
                className="text-amber-400 hover:text-amber-300 hover:bg-slate-700/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h1 className="text-2xl font-bold text-amber-400 tracking-wider">GOALS TRACKER</h1>
                  <p className="text-xs text-green-300">SAVINGS GOALS BREAKDOWN</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <GoalsBreakdown 
              goals={baseData.goals}
              onUpdateGoal={handleGoalUpdate}
              onDeleteGoal={handleDeleteGoal}
              onAddGoal={handleAddGoal}
              goalsSpent={goalsSpent}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GoalsDetails;
