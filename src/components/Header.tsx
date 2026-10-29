import React from 'react';
import { IndianRupee, BookOpen, Layers, Download, RotateCcw, Wallet } from 'lucide-react';
import { exportExpensesToCSV, formatINR } from '../utils/storage';
import { Expense } from '../types/expense';

interface HeaderProps {
  activeTab: 'app' | 'guide';
  onTabChange: (tab: 'app' | 'guide') => void;
  expenses: Expense[];
  monthlyBudget: number;
  onUpdateBudget: (newBudget: number) => void;
  onResetToZero: () => void;
  onLoadSampleData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  expenses,
  monthlyBudget,
  onUpdateBudget,
  onResetToZero,
  onLoadSampleData,
}) => {
  const [isEditingBudget, setIsEditingBudget] = React.useState(false);
  const [budgetInput, setBudgetInput] = React.useState(monthlyBudget.toString());

  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(budgetInput);
    if (!isNaN(val) && val > 0) {
      onUpdateBudget(val);
      setIsEditingBudget(false);
    }
  };

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm font-bold text-lg">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                  Student Expense Tracker
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                  College Edition
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Simple budget management for university & campus life
              </p>
            </div>
          </div>

          {/* Navigation Mode Switcher & Actions */}
          <div className="flex items-center flex-wrap gap-2">
            
            {/* View Switcher Tabs */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200/80">
              <button
                type="button"
                onClick={() => onTabChange('app')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'app'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Live Tracker
              </button>
              
              <button
                type="button"
                onClick={() => onTabChange('guide')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  activeTab === 'guide'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Steps 1–7 Code & Guide
              </button>
            </div>

            {/* Quick CSV Export */}
            <button
              type="button"
              onClick={() => exportExpensesToCSV(expenses)}
              title="Download your expenses as a CSV file"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            {/* Reset to ₹0 (Clear All) */}
            <button
              type="button"
              onClick={onResetToZero}
              title="Clear all expenses and reset total amount spent to ₹0"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50/60 hover:bg-rose-100/70 border border-rose-200 rounded-lg transition-colors shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
              <span>Reset to ₹0</span>
            </button>

            {/* Load Sample Data (if empty) */}
            {expenses.length === 0 && (
              <button
                type="button"
                onClick={onLoadSampleData}
                title="Load sample college student expenses"
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors shadow-2xs"
              >
                <span>+ Load Samples</span>
              </button>
            )}
          </div>

        </div>

        {/* Quick Student Budget Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-slate-500 font-medium">
              <Wallet className="w-3.5 h-3.5 text-blue-600" />
              Monthly Budget:
            </span>
            {isEditingBudget ? (
              <form onSubmit={handleBudgetSubmit} className="flex items-center gap-1.5">
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="w-24 pl-5 pr-2 py-0.5 text-xs border border-blue-400 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingBudget(false)}
                  className="px-1.5 py-0.5 text-slate-500 hover:text-slate-700 text-xs"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-900">{formatINR(monthlyBudget)}</span>
                <button
                  type="button"
                  onClick={() => {
                    setBudgetInput(monthlyBudget.toString());
                    setIsEditingBudget(true);
                  }}
                  className="text-blue-600 hover:text-blue-800 underline text-2xs font-medium"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span>Currency: <strong>INR (₹)</strong></span>
            <span aria-hidden="true">·</span>
            <span>Persistence: <strong>localStorage</strong></span>
          </div>
        </div>
      </div>
    </header>
  );
};
