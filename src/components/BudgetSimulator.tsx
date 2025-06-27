
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SimulationControls from './SimulationControls';
import SimulationResults from './SimulationResults';

const BudgetSimulator = () => {
  const [baseData] = useState({
    income: 5000,
    categories: [
      { name: 'HOUSING', amount: 1200, budget: 1500 },
      { name: 'FOOD', amount: 600, budget: 800 },
      { name: 'TRANSPORT', amount: 400, budget: 500 },
      { name: 'UTILITIES', amount: 250, budget: 300 },
      { name: 'ENTERTAINMENT', amount: 300, budget: 400 },
      { name: 'SHOPPING', amount: 450, budget: 600 },
    ]
  });

  const [simulations, setSimulations] = useState([
    {
      id: 1,
      name: "Current Budget",
      changes: [],
      isActive: true
    }
  ]);

  const [activeSimulation, setActiveSimulation] = useState(1);

  const addSimulation = () => {
    const newId = Math.max(...simulations.map(s => s.id)) + 1;
    setSimulations([...simulations, {
      id: newId,
      name: `Scenario ${newId}`,
      changes: [],
      isActive: false
    }]);
    setActiveSimulation(newId);
  };

  const updateSimulation = (id: number, changes: any[]) => {
    setSimulations(sims => 
      sims.map(sim => 
        sim.id === id ? { ...sim, changes } : sim
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-3xl">🔮</span>
          <div>
            <h1 className="text-2xl font-bold text-amber-400">BUDGET SIMULATOR</h1>
            <p className="text-sm text-slate-400">Explore "what-if" scenarios</p>
          </div>
        </div>
        <Button 
          onClick={addSimulation}
          className="bg-amber-600 hover:bg-amber-700 text-black font-bold border-2 border-amber-400"
        >
          + NEW SCENARIO
        </Button>
      </div>

      {/* Simulation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {simulations.map((sim) => (
          <button
            key={sim.id}
            onClick={() => setActiveSimulation(sim.id)}
            className={`px-4 py-2 text-sm font-bold rounded border-2 whitespace-nowrap transition-all duration-200 ${
              activeSimulation === sim.id
                ? 'border-amber-400 bg-amber-400/20 text-amber-400'
                : 'border-slate-600 bg-slate-800/50 text-slate-400 hover:border-slate-500'
            }`}
          >
            {sim.name}
          </button>
        ))}
      </div>

      {/* Simulation Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🎛️</span>
              <h2 className="text-lg font-bold text-amber-400">SIMULATION CONTROLS</h2>
            </div>
            <SimulationControls 
              baseData={baseData}
              simulation={simulations.find(s => s.id === activeSimulation)!}
              onUpdate={(changes) => updateSimulation(activeSimulation, changes)}
            />
          </div>
        </Card>

        {/* Results */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📈</span>
              <h2 className="text-lg font-bold text-amber-400">RESULTS</h2>
            </div>
            <SimulationResults 
              baseData={baseData}
              simulation={simulations.find(s => s.id === activeSimulation)!}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BudgetSimulator;
