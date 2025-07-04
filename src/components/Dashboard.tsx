import DashboardLayout from './DashboardLayout';
import DashboardSkeleton from './DashboardSkeleton';
import ErrorBoundary from './ErrorBoundary';
import { useDashboard } from '@/contexts/DashboardContext';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { isLoading, error } = useDashboard();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 m-4">
        <div className="flex items-center space-x-3 text-red-400">
          <AlertCircle className="h-6 w-6" />
          <div>
            <h2 className="text-lg font-semibold">Failed to Load Dashboard</h2>
            <p className="text-sm text-slate-300 mt-1">{error}</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <ErrorBoundary>
      <DashboardLayout />
    </ErrorBoundary>
  );
};

export default Dashboard;
