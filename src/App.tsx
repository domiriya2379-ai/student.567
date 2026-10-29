import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TotalCard } from './components/TotalCard';
import { CategorySummary } from './components/CategorySummary';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ProjectGuide } from './components/ProjectGuide';
import { Expense, INITIAL_SAMPLE_EXPENSES } from './types/expense';
import {
  loadStoredExpenses,
  saveExpensesToStorage,
  loadMonthlyBudget,
  saveMonthlyBudget,
} from './utils/storage';

export default function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadStoredExpenses());
  const [monthlyBudget, setMonthlyBudget] = useState<number>(() => loadMonthlyBudget());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'app' | 'guide'>('app');
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  // Sync to localStorage whenever expenses change
  useEffect(() => {
    saveExpensesToStorage(expenses);
  }, [expenses]);

  // Sync budget to localStorage
  useEffect(() => {
    saveMonthlyBudget(monthlyBudget);
  }, [monthlyBudget]);

  const handleAddExpense = (newExpenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...newExpenseData,
      id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: Date.now(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleUpdateExpense = (updated: Expense) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
    if (editingExpense?.id === id) {
      setEditingExpense(null);
    }
  };

  const handleResetToZero = () => {
    setExpenses([]);
    setEditingExpense(null);
    setSelectedCategory('All');
  };

  const handleLoadSampleData = () => {
    setExpenses(INITIAL_SAMPLE_EXPENSES);
    setEditingExpense(null);
    setSelectedCategory('All');
  };

  const handleUpdateBudget = (newBudget: number) => {
    setMonthlyBudget(newBudget);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans antialiased pb-16">
      
      {/* Sticky Header with mode switcher & budget stats */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        expenses={expenses}
        monthlyBudget={monthlyBudget}
        onUpdateBudget={handleUpdateBudget}
        onResetToZero={handleResetToZero}
        onLoadSampleData={handleLoadSampleData}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        
        {activeTab === 'app' ? (
          <div className="space-y-5">
            
            {/* Top Row: Total Spent & Monthly Budget Card */}
            <TotalCard
              expenses={expenses}
              monthlyBudget={monthlyBudget}
              onResetToZero={handleResetToZero}
            />

            {/* Category Breakdown (Step 6) */}
            <CategorySummary
              expenses={expenses}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Expense Add/Edit Form (Step 2, 4) */}
            <ExpenseForm
              onAddExpense={handleAddExpense}
              editingExpense={editingExpense}
              onUpdateExpense={handleUpdateExpense}
              onCancelEdit={() => setEditingExpense(null)}
            />

            {/* Expenses List & Filter Section (Step 2, 4, 6) */}
            <ExpenseList
              expenses={expenses}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onDeleteExpense={handleDeleteExpense}
              onEditExpense={setEditingExpense}
              onLoadSampleData={handleLoadSampleData}
            />

          </div>
        ) : (
          /* Step-by-Step Curriculum, Standalone Code & Test Suite (Steps 1 to 7) */
          <ProjectGuide />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-500 max-w-5xl mx-auto px-4">
        <p>
          Student Expense Tracker &bull; Designed for College Students &bull; Currency in Indian Rupees (₹)
        </p>
        <p className="mt-1 text-2xs text-slate-400">
          Built with pure HTML5, CSS3, JavaScript principles &amp; modern React SPA architecture
        </p>
      </footer>
    </div>
  );
}
