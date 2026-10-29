import React from 'react';
import { Utensils, Bus, BookOpen, Gamepad2, Tag, Filter } from 'lucide-react';
import { Expense, ExpenseCategory, CATEGORIES } from '../types/expense';
import { formatINR } from '../utils/storage';

interface CategorySummaryProps {
  expenses: Expense[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CATEGORY_ICONS: Record<ExpenseCategory, React.ComponentType<{ className?: string }>> = {
  Food: Utensils,
  Travel: Bus,
  Books: BookOpen,
  Fun: Gamepad2,
  Other: Tag,
};

export const CategorySummary: React.FC<CategorySummaryProps> = ({
  expenses,
  selectedCategory,
  onSelectCategory,
}) => {
  const totalSpent = React.useMemo(() => {
    return expenses.reduce((sum, item) => sum + item.amount, 0);
  }, [expenses]);

  const categoryTotals = React.useMemo(() => {
    const categories: ExpenseCategory[] = ['Food', 'Travel', 'Books', 'Fun', 'Other'];
    return categories.map((cat) => {
      const sum = expenses
        .filter((e) => e.category === cat)
        .reduce((acc, curr) => acc + curr.amount, 0);
      const count = expenses.filter((e) => e.category === cat).length;
      const percentage = totalSpent > 0 ? Math.round((sum / totalSpent) * 100) : 0;
      return {
        category: cat,
        sum,
        count,
        percentage,
        meta: CATEGORIES[cat],
      };
    });
  }, [expenses, totalSpent]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Category Breakdown
          </h2>
          <p className="text-xs text-slate-500">
            Click any category to quick-filter recent expenses
          </p>
        </div>

        {selectedCategory !== 'All' && (
          <button
            type="button"
            onClick={() => onSelectCategory('All')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
          >
            Clear Filter (Show All)
          </button>
        )}
      </div>

      {/* Responsive Grid for Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {categoryTotals.map(({ category, sum, count, percentage, meta }) => {
          const Icon = CATEGORY_ICONS[category];
          const isSelected = selectedCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(isSelected ? 'All' : category)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
              }`}
            >
              {/* Category Color Tag Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: meta.color }}
              />

              <div className="flex items-center justify-between mb-2 mt-1">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs"
                  style={{
                    backgroundColor: `${meta.color}15`,
                    color: meta.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="text-2xs font-semibold text-slate-500">
                  {percentage}%
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-700">
                {category}
              </div>

              <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">
                {formatINR(sum)}
              </div>

              <div className="text-2xs text-slate-500 mt-1">
                {count} {count === 1 ? 'item' : 'items'}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: meta.color,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
