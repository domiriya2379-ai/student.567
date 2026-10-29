export type ExpenseCategory = 'Food' | 'Travel' | 'Books' | 'Fun' | 'Other';

export interface Expense {
  id: string;
  name: string;
  amount: number; // In Indian Rupees (₹)
  category: ExpenseCategory;
  date: string; // YYYY-MM-DD
  notes?: string;
  createdAt: number;
}

export interface CategoryMeta {
  name: ExpenseCategory;
  color: string;
  bgLight: string;
  borderLight: string;
  textColor: string;
  iconName: string;
  description: string;
}

export const CATEGORIES: Record<ExpenseCategory, CategoryMeta> = {
  Food: {
    name: 'Food',
    color: '#f97316', // orange-500
    bgLight: 'bg-orange-50',
    borderLight: 'border-orange-200',
    textColor: 'text-orange-700',
    iconName: 'Utensils',
    description: 'Canteen, snacks, groceries, mess fees, chai & coffee',
  },
  Travel: {
    name: 'Travel',
    color: '#0284c7', // sky-600
    bgLight: 'bg-sky-50',
    borderLight: 'border-sky-200',
    textColor: 'text-sky-700',
    iconName: 'Bus',
    description: 'Metro card, bus pass, auto rickshaw, train tickets',
  },
  Books: {
    name: 'Books',
    color: '#0d9488', // teal-600
    bgLight: 'bg-teal-50',
    borderLight: 'border-teal-200',
    textColor: 'text-teal-700',
    iconName: 'BookOpen',
    description: 'Textbooks, stationery, photocopies, lab manuals, courses',
  },
  Fun: {
    name: 'Fun',
    color: '#8b5cf6', // violet-500
    bgLight: 'bg-purple-50',
    borderLight: 'border-purple-200',
    textColor: 'text-purple-700',
    iconName: 'Gamepad2',
    description: 'Movies, outings, college fests, gaming, subscriptions',
  },
  Other: {
    name: 'Other',
    color: '#64748b', // slate-500
    bgLight: 'bg-slate-50',
    borderLight: 'border-slate-200',
    textColor: 'text-slate-700',
    iconName: 'Tag',
    description: 'Mobile recharge, hostel dues, laundry, miscellaneous',
  },
};

export const INITIAL_SAMPLE_EXPENSES: Expense[] = [
  {
    id: 'sample-1',
    name: 'Canteen Lunch & Samosa',
    amount: 140,
    category: 'Food',
    date: '2026-10-28',
    createdAt: 1730100000000,
  },
  {
    id: 'sample-2',
    name: 'Metro SmartCard Monthly Recharge',
    amount: 500,
    category: 'Travel',
    date: '2026-10-27',
    createdAt: 1730000000000,
  },
  {
    id: 'sample-3',
    name: 'Data Structures & Algorithms Reference Book',
    amount: 650,
    category: 'Books',
    date: '2026-10-25',
    createdAt: 1729850000000,
  },
  {
    id: 'sample-4',
    name: 'College Fest Movie Ticket',
    amount: 320,
    category: 'Fun',
    date: '2026-10-24',
    createdAt: 1729750000000,
  },
  {
    id: 'sample-5',
    name: 'Mobile Prepaid Data Pack',
    amount: 299,
    category: 'Other',
    date: '2026-10-22',
    createdAt: 1729600000000,
  },
  {
    id: 'sample-6',
    name: 'Library Notebooks & Gel Pens',
    amount: 180,
    category: 'Books',
    date: '2026-10-20',
    createdAt: 1729450000000,
  },
  {
    id: 'sample-7',
    name: 'Evening Chai with Project Team',
    amount: 80,
    category: 'Food',
    date: '2026-10-18',
    createdAt: 1729250000000,
  },
];
