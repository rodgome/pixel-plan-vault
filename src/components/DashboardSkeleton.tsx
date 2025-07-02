
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Budget Overview Skeleton */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32 bg-slate-700" />
          <Skeleton className="h-8 w-24 bg-slate-700" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-slate-700" />
            <Skeleton className="h-6 w-20 bg-slate-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-slate-700" />
            <Skeleton className="h-6 w-20 bg-slate-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-slate-700" />
            <Skeleton className="h-6 w-20 bg-slate-700" />
          </div>
        </div>
      </Card>

      {/* Import/Export Controls Skeleton */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-5 w-32 bg-slate-700" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24 bg-slate-700" />
          <Skeleton className="h-8 w-24 bg-slate-700" />
          <Skeleton className="h-8 w-20 bg-slate-700" />
        </div>
      </Card>

      {/* Money Plan Skeleton */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-5 w-24 bg-slate-700" />
          <Skeleton className="h-8 w-20 bg-slate-700" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-black/30 p-3 rounded border border-slate-600">
              <Skeleton className="h-3 w-16 bg-slate-700 mb-2" />
              <Skeleton className="h-6 w-20 bg-slate-700" />
            </div>
          ))}
        </div>
      </Card>

      {/* Financial Summary Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 bg-slate-700" />
              <Skeleton className="h-6 w-20 bg-slate-700" />
              <Skeleton className="h-2 w-full bg-slate-700" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
