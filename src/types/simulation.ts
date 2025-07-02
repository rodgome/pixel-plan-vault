/**
 * Simulation-related type definitions
 */
export interface SimulationChange {
  category: string;
  change: number;
  type: 'increase' | 'decrease';
}

export interface Simulation {
  id: number;
  name: string;
  changes: SimulationChange[];
  isActive: boolean;
}
