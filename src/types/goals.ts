
/**
 * Goal-related type definitions
 */
export type GoalType = 'emergency_fund' | 'retirement' | 'investment' | 'vacation' | 'other';

export interface GoalItem {
  name: string;
  target: number;
  current: number;
  monthlyContribution: number;
  plannedContribution: number;
  type: GoalType;
  deadline?: string;
}

export interface GoalProgress {
  percentage: number;
  remaining: number;
  monthsToTarget: number;
  isOnTrack: boolean;
}

export interface GoalSummary {
  totalTargets: number;
  totalCurrent: number;
  totalMonthlyContributions: number;
  totalPlannedContributions: number;
  averageProgress: number;
}
