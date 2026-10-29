import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { formatINR } from '../utils/storage';
import { Expense } from '../types/expense';

interface TotalCardProps {
  expenses: Expense[];
  monthlyBudget: number;
  onResetToZero?: () => void;
}

export const TotalCard: React.FC<TotalCardProps> = ({ expenses, monthlyBudget, onResetToZero }) => {
  const totalSpent = React.useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const percentageUsed = Math.min(100, Math.round((totalSpent / monthlyBudget) * 100));
  const remainingBudget = monthlyBudget - totalSpent;

  // Determine budget status
  let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let barColor = 'bg-emerald-500';
  let statusText = totalSpent === 0 ? 'Full Budget Available (₹0 Spent)' : 'Within Budget';
  let StatusIcon = CheckCircle2;

  if (totalSpent > monthlyBudget) {
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    barColor = 'bg-rose-500';
    statusText = 'Budget Exceeded';
    StatusIcon = ShieldAlert;
  } else if (percentageUsed >= 75) {
    statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
    barColor = 'bg-amber-500';
    statusText = 'Approaching Limit';
    StatusIcon = AlertTriangle;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Big Bold Total Section */}
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
            Total Amount Spent
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-baseline gap-2">
            <span>{formatINR(totalSpent)}</span>
            {totalSpent > 0 && onResetToZero && (
              <button
                type="button"
                onClick={onResetToZero}
                className="text-xs font-medium text-rose-600 hover:text-rose-800 underline transition-colors"
                title="Reset total amount spent to ₹0"
              >
                Clear to ₹0
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {expenses.length === 0
              ? 'No expenses recorded yet (Total spent: ₹0)'
              : `Across ${expenses.length} recorded ${expenses.length === 1 ? 'expense' : 'expenses'} this session`}
          </p>
        </div>

        {/* Budget Status Badge */}
        <div className="sm:text-right">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusColor}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{statusText}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1.5">
            {remainingBudget >= 0 ? (
              <span><strong>{formatINR(remainingBudget)}</strong> remaining this month</span>
            ) : (
              <span className="text-rose-600 font-semibold">{formatINR(Math.abs(remainingBudget))} over monthly limit</span>
            )}
          </div>
        </div>

      </div>

      {/* Progress Bar towards Monthly Budget */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
          <span>Monthly Target: {formatINR(monthlyBudget)}</span>
          <span>{percentageUsed}% Used</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${barColor}`}
            style={{ width: `${Math.min(100, (totalSpent / monthlyBudget) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};
