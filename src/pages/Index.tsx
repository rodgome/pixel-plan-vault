import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import BudgetSimulator from "../components/BudgetSimulator";
import { useDashboard } from "../contexts/DashboardContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { baseData } = useDashboard();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400 font-mono">
      {/* Retro Header */}
      <div className="border-b-2 border-amber-400 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">💰</div>
              <div>
                <h1 className="text-2xl font-bold text-amber-400 tracking-wider">
                  VAULT
                </h1>
                <p className="text-xs text-green-300">
                  FINANCIAL COMMAND CENTER
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                <div className="text-xs text-amber-300">SYSTEM STATUS</div>
                <div className="text-sm text-green-400">● ONLINE</div>
              </div>
              <button
                onClick={() => navigate("/manage")}
                className="px-2 py-1 text-xs font-bold border border-amber-400 text-amber-400 rounded hover:bg-slate-700/50"
              >
                ⚙️ Manage
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-slate-700 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: "dashboard", label: "DASHBOARD", icon: "📊" },
              { id: "simulator", label: "SIMULATOR", icon: "🔮" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-bold border-b-2 transition-all duration-200 hover:bg-slate-700/50 ${
                  activeTab === tab.id
                    ? "border-amber-400 text-amber-400 bg-slate-800/50"
                    : "border-transparent text-slate-400"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "simulator" && <BudgetSimulator baseData={baseData} />}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 bg-black/30 mt-12">
        <div className="container mx-auto px-4 py-4 text-center">
          <p className="text-xs text-slate-500">
            VAULT v1.0 // SECURE FINANCIAL MANAGEMENT SYSTEM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
