import { Expense, INITIAL_SAMPLE_EXPENSES } from '../types/expense';

const STORAGE_KEY = 'student_expense_tracker_data_v2';
const BUDGET_KEY = 'student_monthly_budget_v1';

export function loadStoredExpenses(): Expense[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Start with empty list so Total Amount Spent starts at ₹0
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return [];
  }
}

export function clearAllStoredExpenses(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Failed to clear expenses:', error);
  }
}

export function saveExpensesToStorage(expenses: Expense[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Failed to save expenses to localStorage:', error);
  }
}

export function loadMonthlyBudget(): number {
  try {
    const raw = localStorage.getItem(BUDGET_KEY);
    if (!raw) return 4000; // Default ₹4,000 monthly college budget
    const val = Number(raw);
    return isNaN(val) || val <= 0 ? 4000 : val;
  } catch {
    return 4000;
  }
}

export function saveMonthlyBudget(budget: number): void {
  try {
    localStorage.setItem(BUDGET_KEY, budget.toString());
  } catch (error) {
    console.error('Failed to save budget:', error);
  }
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function exportExpensesToCSV(expenses: Expense[]): void {
  const headers = ['ID', 'Expense Name', 'Amount (INR)', 'Category', 'Date'];
  const rows = expenses.map((e) => [
    `"${e.id}"`,
    `"${e.name.replace(/"/g, '""')}"`,
    e.amount,
    `"${e.category}"`,
    `"${e.date}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `student_expenses_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
