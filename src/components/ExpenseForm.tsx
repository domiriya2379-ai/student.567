import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Sparkles, Check, Calendar, Tag, FileText } from 'lucide-react';
import { ExpenseCategory, CATEGORIES, Expense } from '../types/expense';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  editingExpense?: Expense | null;
  onUpdateExpense?: (updated: Expense) => void;
  onCancelEdit?: () => void;
}

const QUICK_CAMPUS_PRESETS = [
  { name: 'Canteen Samosa & Chai', amount: 45, category: 'Food' as ExpenseCategory },
  { name: 'Metro / Bus Recharge', amount: 200, category: 'Travel' as ExpenseCategory },
  { name: 'Class Notes Photocopy', amount: 60, category: 'Books' as ExpenseCategory },
  { name: 'Hostel Night Maggi', amount: 35, category: 'Food' as ExpenseCategory },
  { name: 'Weekend Movie & Snack', amount: 250, category: 'Fun' as ExpenseCategory },
];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  editingExpense,
  onUpdateExpense,
  onCancelEdit,
}) => {
  const [name, setName] = useState(editingExpense?.name || '');
  const [amount, setAmount] = useState(editingExpense ? editingExpense.amount.toString() : '');
  const [category, setCategory] = useState<ExpenseCategory | ''>(editingExpense?.category || '');
  const [date, setDate] = useState(
    editingExpense?.date || new Date().toISOString().split('T')[0]
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successFlash, setSuccessFlash] = useState(false);

  // Sync state if editing expense changes
  React.useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setErrorMessage(null);
    }
  }, [editingExpense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const parsedAmount = parseFloat(amount);

    // Validation as required in Step 4:
    // (2) shows an error if any field is empty or the amount is not a positive number
    if (!trimmedName) {
      setErrorMessage('Please enter an expense name (e.g., Canteen Lunch, Books, Bus Pass).');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid amount greater than ₹0.');
      return;
    }

    if (!category) {
      setErrorMessage('Please select a category (Food, Travel, Books, Fun, or Other).');
      return;
    }

    if (!date) {
      setErrorMessage('Please select a valid date for the expense.');
      return;
    }

    // Success! Clear error
    setErrorMessage(null);

    if (editingExpense && onUpdateExpense) {
      onUpdateExpense({
        ...editingExpense,
        name: trimmedName,
        amount: parsedAmount,
        category: category as ExpenseCategory,
        date,
      });
    } else {
      onAddExpense({
        name: trimmedName,
        amount: parsedAmount,
        category: category as ExpenseCategory,
        date,
      });

      // Reset form
      setName('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);

      // Flash success indicator briefly
      setSuccessFlash(true);
      setTimeout(() => setSuccessFlash(false), 2000);
    }
  };

  const applyPreset = (preset: typeof QUICK_CAMPUS_PRESETS[0]) => {
    setName(preset.name);
    setAmount(preset.amount.toString());
    setCategory(preset.category);
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            {editingExpense ? 'Edit College Expense' : 'Add New Expense'}
          </h2>
          <p className="text-xs text-slate-500">
            {editingExpense
              ? 'Update the details for this expense'
              : 'Log daily spending in rupees (₹) with category & date'}
          </p>
        </div>

        {/* Quick presets for students */}
        {!editingExpense && (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1 text-2xs uppercase tracking-wider text-slate-400 font-semibold">
              <Sparkles className="w-3 h-3 text-amber-500" /> Quick Add:
            </span>
            {QUICK_CAMPUS_PRESETS.slice(0, 3).map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-2 py-0.5 rounded text-2xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
              >
                {p.name.split(' ')[0]} (₹{p.amount})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Validation Error Banner (Step 4 Requirement) */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Validation Error:</span> {errorMessage}
          </div>
        </div>
      )}

      {/* Success Notification Flash */}
      {successFlash && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Expense successfully recorded and saved to localStorage!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Expense Name Input */}
          <div className="sm:col-span-2 lg:col-span-2">
            <label
              htmlFor="expense-name"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Expense Name
            </label>
            <div className="relative">
              <input
                id="expense-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. Canteen Lunch, Semester Book, Metro Pass"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Amount in Rupees (₹) Input */}
          <div>
            <label
              htmlFor="expense-amount"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm pointer-events-none">
                ₹
              </span>
              <input
                id="expense-amount"
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="150"
                className="w-full pl-8 pr-3.5 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Category Dropdown (Food, Travel, Books, Fun, Other) */}
          <div>
            <label
              htmlFor="expense-category"
              className="block text-xs font-semibold text-slate-700 mb-1"
            >
              Category
            </label>
            <select
              id="expense-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value as ExpenseCategory);
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full px-3 py-2.5 text-sm bg-slate-50/50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Food">Food 🍔 (Canteen & snacks)</option>
              <option value="Travel">Travel 🚌 (Metro, bus, auto)</option>
              <option value="Books">Books 📚 (Stationery, prints)</option>
              <option value="Fun">Fun 🎮 (Movies, outings)</option>
              <option value="Other">Other 📦 (Recharge, hostel)</option>
            </select>
          </div>

        </div>

        {/* Second Row: Date and Submit Button */}
        <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
          
          <div className="w-full sm:w-auto flex items-center gap-2">
            <label
              htmlFor="expense-date"
              className="text-xs font-semibold text-slate-600 whitespace-nowrap"
            >
              Date:
            </label>
            <input
              id="expense-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {editingExpense && onCancelEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5"
            >
              {editingExpense ? (
                <>
                  <Check className="w-4 h-4" />
                  Update Expense
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  + Add Expense
                </>
              )}
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};
