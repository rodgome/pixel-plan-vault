import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import BudgetManager from "../components/BudgetManager";
import { useNavigate } from "react-router-dom";

const Manage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-green-400 font-mono">
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
                <div className="text-3xl">⚙️</div>
                <div>
                  <h1 className="text-2xl font-bold text-amber-400 tracking-wider">
                    MANAGE BUDGET
                  </h1>
                  <p className="text-xs text-green-300">
                    EDIT YOUR PLAN AND TRACK SPENDING
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <BudgetManager />
      </div>
    </div>
  );
};

export default Manage;
