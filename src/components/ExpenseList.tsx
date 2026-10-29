import React, { useState } from 'react';
import {
  Trash2,
  Edit3,
  Search,
  ArrowUpDown,
  Filter,
  Calendar,
  Utensils,
  Bus,
  BookOpen,
  Gamepad2,
  Tag,
  Inbox,
  Clock,
} from 'lucide-react';
import { Expense, ExpenseCategory, CATEGORIES } from '../types/expense';
import { formatINR } from '../utils/storage';

interface ExpenseListProps {
  expenses: Expense[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onDeleteExpense: (id: string) => void;
  onEditExpense: (expense: Expense) => void;
  onLoadSampleData: () => void;
}

const CATEGORY_ICONS: Record<ExpenseCategory, React.ComponentType<{ className?: string }>> = {
  Food: Utensils,
  Travel: Bus,
  Books: BookOpen,
  Fun: Gamepad2,
  Other: Tag,
};

type SortOption = 'newest' | 'oldest' | 'amount-high' | 'amount-low';

export const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  selectedCategory,
  onSelectCategory,
  onDeleteExpense,
  onEditExpense,
  onLoadSampleData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Filter & Search & Sort logic
  const filteredAndSortedExpenses = React.useMemo(() => {
    let result = [...expenses];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((e) => e.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.amount.toString().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime() || b.createdAt - a.createdAt;
      }
      if (sortBy === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime() || a.createdAt - b.createdAt;
      }
      if (sortBy === 'amount-high') {
        return b.amount - a.amount;
      }
      if (sortBy === 'amount-low') {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [expenses, selectedCategory, searchQuery, sortBy]);

  const confirmDelete = (id: string) => {
    onDeleteExpense(id);
    setPendingDeleteId(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      
      {/* Top Controls: Heading, Filter, Search, Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pb-4 border-b border-slate-100">
        
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Expense Records
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {filteredAndSortedExpenses.length} of {expenses.length}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {selectedCategory === 'All'
              ? 'Showing all categories'
              : `Filtered by category: ${selectedCategory}`}
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Search Box */}
          <div className="relative min-w-[140px] sm:min-w-[180px] flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expense..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter Dropdown (Step 6) */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <label htmlFor="category-filter-select" className="sr-only">
              Filter by Category
            </label>
            <select
              id="category-filter-select"
              value={selectedCategory}
              onChange={(e) => onSelectCategory(e.target.value)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              <option value="Food">Food 🍔</option>
              <option value="Travel">Travel 🚌</option>
              <option value="Books">Books 📚</option>
              <option value="Fun">Fun 🎮</option>
              <option value="Other">Other 📦</option>
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <label htmlFor="sort-select" className="sr-only">
              Sort Expenses
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="text-xs font-medium text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Amount (High to Low)</option>
              <option value="amount-low">Amount (Low to High)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Empty State / List */}
      {filteredAndSortedExpenses.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800">
            {expenses.length === 0 ? 'No expenses added yet' : 'No matching expenses found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            {expenses.length === 0
              ? 'Start by entering your college expenses using the form above, or click below to load sample student entries.'
              : 'Try clearing your category filter or search terms to see all transactions.'}
          </p>

          {expenses.length === 0 ? (
            <button
              type="button"
              onClick={onLoadSampleData}
              className="mt-4 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
            >
              Load Sample College Expenses
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-3 divide-y divide-slate-100">
          {filteredAndSortedExpenses.map((expense) => {
            const meta = CATEGORIES[expense.category] || CATEGORIES.Other;
            const Icon = CATEGORY_ICONS[expense.category] || Tag;
            const isDeleting = pendingDeleteId === expense.id;

            return (
              <div
                key={expense.id}
                className="py-3 px-2 sm:px-3 hover:bg-slate-50/80 rounded-xl transition-colors flex items-center justify-between gap-3 group"
              >
                {/* Left: Icon and Details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: meta.color,
                      borderColor: `${meta.color}30`,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-slate-900 truncate">
                        {expense.name}
                      </span>
                      {/* Clean unboxed category tag (per frontend-design guideline) */}
                      <span
                        className="text-2xs font-semibold px-2 py-0.5 rounded-md"
                        style={{
                          backgroundColor: `${meta.color}15`,
                          color: meta.color,
                        }}
                      >
                        {expense.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(expense.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount and Actions */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-sm sm:text-base font-bold text-slate-900">
                      {formatINR(expense.amount)}
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  {isDeleting ? (
                    <div className="flex items-center gap-1 bg-red-50 p-1 rounded-lg border border-red-200">
                      <span className="text-2xs text-red-700 font-medium px-1">Delete?</span>
                      <button
                        type="button"
                        onClick={() => confirmDelete(expense.id)}
                        className="px-2 py-0.5 bg-red-600 text-white text-2xs font-bold rounded hover:bg-red-700"
                      >
                        Yes
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(null)}
                        className="px-1.5 py-0.5 text-slate-600 text-2xs font-medium hover:text-slate-900"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => onEditExpense(expense)}
                        title="Edit Expense"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDeleteId(expense.id)}
                        title="Delete Expense"
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Click edit or delete to manage any entry</span>
        <span>Automatic localStorage sync</span>
      </div>
    </div>
  );
};
