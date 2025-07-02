
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface BudgetChangeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pendingPaymentChange: number | null;
  currentPayment: number;
  debtBudget: number;
  onConfirm: () => void;
  onCancel: () => void;
}

const BudgetChangeDialog = ({
  isOpen,
  onOpenChange,
  pendingPaymentChange,
  currentPayment,
  debtBudget,
  onConfirm,
  onCancel
}: BudgetChangeDialogProps) => {
  const newBudgetAmount = debtBudget + (pendingPaymentChange || 0) - currentPayment;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-amber-400">Update Debt Budget?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            You've changed the planned payment to ${pendingPaymentChange?.toLocaleString()}. 
            Would you like to adjust the debt budget from ${debtBudget.toLocaleString()} to ${newBudgetAmount.toLocaleString()} to accommodate this change?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={onCancel}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Discard Changes
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-amber-500 hover:bg-amber-600 text-black"
          >
            Update Budget
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BudgetChangeDialog;
