export interface TutorialStep {
  stepNumber: number;
  title: string;
  badge: string;
  objective: string;
  prompt: string;
  outcome: string;
  highlights: string[];
  codeSnippets?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  }[];
}

export const STANDALONE_HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Student Expense Tracker</title>
  <link rel="stylesheet" href="style.css" />
  <!-- Google Font for clean modern typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>

  <!-- Main Centered Card Container -->
  <main class="app-card">
    
    <!-- Header with Colored Banner -->
    <header class="app-header">
      <div class="logo-area">
        <span class="rupee-icon">₹</span>
        <h1>Student Expense Tracker</h1>
      </div>
      <p class="tagline">Track your college budget effortlessly</p>
    </header>

    <!-- Total Spent Overview Section -->
    <section class="total-section">
      <span class="total-label">Total Amount Spent</span>
      <div class="total-amount" id="totalAmount">₹0</div>
      <p class="total-subtext">All active college expenses</p>
    </section>

    <!-- Category Summary Breakdown -->
    <section class="summary-section">
      <h2>Category Breakdown</h2>
      <div class="summary-grid" id="summaryGrid">
        <!-- Dynamically populated category totals -->
      </div>
    </section>

    <!-- Expense Entry Form -->
    <section class="form-section">
      <h2>Add New Expense</h2>
      
      <!-- Error Message Banner -->
      <div id="errorBanner" class="error-banner hidden"></div>

      <form id="expenseForm" novalidate>
        <!-- Expense Name -->
        <div class="form-group">
          <label for="expenseName">Expense Name</label>
          <input 
            type="text" 
            id="expenseName" 
            placeholder="e.g. Canteen Lunch, Books, Metro" 
            autocomplete="off" 
            required 
          />
        </div>

        <!-- Amount and Category Grid -->
        <div class="form-row">
          <!-- Amount in Rupees -->
          <div class="form-group flex-1">
            <label for="expenseAmount">Amount (₹)</label>
            <input 
              type="number" 
              id="expenseAmount" 
              placeholder="e.g. 150" 
              min="1" 
              step="any" 
              required 
            />
          </div>

          <!-- Category Selection -->
          <div class="form-group flex-1">
            <label for="expenseCategory">Category</label>
            <select id="expenseCategory" required>
              <option value="" disabled selected>Select category</option>
              <option value="Food">Food 🍔</option>
              <option value="Travel">Travel 🚌</option>
              <option value="Books">Books 📚</option>
              <option value="Fun">Fun 🎮</option>
              <option value="Other">Other 📦</option>
            </select>
          </div>
        </div>

        <!-- Date Input -->
        <div class="form-group">
          <label for="expenseDate">Date</label>
          <input type="date" id="expenseDate" required />
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-btn" id="submitBtn">
          + Add Expense
        </button>
      </form>
    </section>

    <!-- Expenses List & Filter Section -->
    <section class="list-section">
      <div class="list-header">
        <h2>Recent Expenses (<span id="expenseCount">0</span>)</h2>
        
        <!-- Filter Dropdown -->
        <div class="filter-wrapper">
          <label for="filterCategory">Filter:</label>
          <select id="filterCategory">
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Books">Books</option>
            <option value="Fun">Fun</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <!-- Empty State / Placeholder -->
      <div id="emptyState" class="empty-state">
        <p>No expenses added yet. Enter your first college expense above!</p>
      </div>

      <!-- Active Expense Items List -->
      <ul id="expenseList" class="expense-list"></ul>
    </section>

  </main>

  <script src="script.js"></script>
</body>
</html>`;

export const STANDALONE_CSS_CODE = `/* Student Expense Tracker - CSS Styling */

/* Reset & Root Variables */
:root {
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --bg-page: #f1f5f9;
  --card-bg: #ffffff;
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  
  /* Category Colors */
  --cat-food: #f97316;
  --cat-food-bg: #fff7ed;
  --cat-travel: #0284c7;
  --cat-travel-bg: #f0f9ff;
  --cat-books: #0d9488;
  --cat-books-bg: #f0fdfa;
  --cat-fun: #8b5cf6;
  --cat-fun-bg: #f5f3ff;
  --cat-other: #64748b;
  --cat-other-bg: #f8fafc;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}

body {
  background-color: var(--bg-page);
  color: var(--text-main);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 24px 16px;
}

/* Card Design Centered */
.app-card {
  background: var(--card-bg);
  width: 100%;
  max-width: 580px;
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  border: 1px solid var(--border-color);
}

/* Coloured Header */
.app-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: #ffffff;
  padding: 28px 24px;
  text-align: center;
}

.logo-area {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 6px;
}

.rupee-icon {
  background: rgba(255, 255, 255, 0.2);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  font-size: 1.1rem;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.tagline {
  font-size: 0.875rem;
  opacity: 0.85;
}

/* Big Bold Total Section */
.total-section {
  background: #f8fafc;
  padding: 20px 24px;
  text-align: center;
  border-bottom: 1px solid var(--border-color);
}

.total-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}

.total-amount {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 6px 0 2px;
  letter-spacing: -0.03em;
}

.total-subtext {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Summary Breakdown */
.summary-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.summary-section h2, .form-section h2, .list-header h2 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 12px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
}

.summary-item {
  padding: 10px 8px;
  border-radius: 10px;
  text-align: center;
  border: 1px solid transparent;
  transition: transform 0.15s ease;
}

.summary-item:hover {
  transform: translateY(-2px);
}

.summary-item.food { background: var(--cat-food-bg); border-color: rgba(249, 115, 22, 0.2); }
.summary-item.travel { background: var(--cat-travel-bg); border-color: rgba(2, 132, 199, 0.2); }
.summary-item.books { background: var(--cat-books-bg); border-color: rgba(13, 148, 136, 0.2); }
.summary-item.fun { background: var(--cat-fun-bg); border-color: rgba(139, 92, 246, 0.2); }
.summary-item.other { background: var(--cat-other-bg); border-color: rgba(100, 116, 139, 0.2); }

.summary-item-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
}

.summary-item-amount {
  font-size: 0.95rem;
  font-weight: 700;
  margin-top: 3px;
  color: var(--text-main);
}

/* Form Styles */
.form-section {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.error-banner {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 14px;
}

.hidden {
  display: none !important;
}

.form-group {
  margin-bottom: 12px;
}

.form-row {
  display: flex;
  gap: 12px;
}

.flex-1 {
  flex: 1;
}

label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--text-main);
  outline: none;
  background-color: #ffffff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

input:focus, select:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.submit-btn {
  width: 100%;
  background: var(--primary);
  color: #ffffff;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease;
  margin-top: 4px;
}

.submit-btn:hover {
  background: var(--primary-hover);
}

/* List Section & Filter */
.list-section {
  padding: 20px 24px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  flex-wrap: wrap;
  gap: 10px;
}

.list-header h2 {
  margin-bottom: 0;
}

.filter-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-wrapper label {
  margin-bottom: 0;
  font-size: 0.8rem;
}

.filter-wrapper select {
  width: auto;
  padding: 6px 10px;
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  padding: 30px 16px;
  color: var(--text-muted);
  font-size: 0.9rem;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px dashed var(--border-color);
}

.expense-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Individual Expense Item */
.expense-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: #ffffff;
  transition: all 0.15s ease;
}

.expense-item:hover {
  border-color: #cbd5e1;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
}

.expense-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.expense-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.expense-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-main);
}

.expense-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Category Tags */
.cat-tag {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 6px;
  text-transform: capitalize;
}

.cat-tag.food { background: var(--cat-food-bg); color: var(--cat-food); }
.cat-tag.travel { background: var(--cat-travel-bg); color: var(--cat-travel); }
.cat-tag.books { background: var(--cat-books-bg); color: var(--cat-books); }
.cat-tag.fun { background: var(--cat-fun-bg); color: var(--cat-fun); }
.cat-tag.other { background: var(--cat-other-bg); color: var(--cat-other); }

/* Amount & Delete Button */
.expense-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.expense-amount {
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-main);
}

.delete-btn {
  background: transparent;
  color: #94a3b8;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.15s ease;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #ef4444;
}

/* Mobile Responsive */
@media (max-width: 480px) {
  body {
    padding: 12px 8px;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .total-amount {
    font-size: 1.85rem;
  }
}`;

export const STANDALONE_JS_CODE = `// Student Expense Tracker - script.js
// Stores data in localStorage, calculates totals, updates categories, and handles filter.

// 1. Array to hold all expense objects
let expenses = [];

// 2. Select DOM elements
const expenseForm = document.getElementById('expenseForm');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseCategoryInput = document.getElementById('expenseCategory');
const expenseDateInput = document.getElementById('expenseDate');
const errorBanner = document.getElementById('errorBanner');
const totalAmountDisplay = document.getElementById('totalAmount');
const expenseCountDisplay = document.getElementById('expenseCount');
const summaryGrid = document.getElementById('summaryGrid');
const expenseList = document.getElementById('expenseList');
const emptyState = document.getElementById('emptyState');
const filterCategorySelect = document.getElementById('filterCategory');

// Category list
const CATEGORIES = ['Food', 'Travel', 'Books', 'Fun', 'Other'];

// 3. Initialize App on Page Load
document.addEventListener('DOMContentLoaded', () => {
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  expenseDateInput.value = today;

  // Load expenses from browser localStorage
  loadExpensesFromStorage();

  // Render initial list and totals
  renderExpenses();
});

// 4. Form Submit Handler (Step 4 & 5)
expenseForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value;
  const date = expenseDateInput.value;

  // Validation: Check if any field is empty or amount is non-positive
  if (!name || isNaN(amount) || amount <= 0 || !category || !date) {
    showError('Please fill in all fields with a valid expense name and positive amount (₹).');
    return;
  }

  hideError();

  // Create new expense object
  const newExpense = {
    id: Date.now().toString(),
    name: name,
    amount: amount,
    category: category,
    date: date
  };

  // Add to array
  expenses.unshift(newExpense);

  // Save to localStorage (Step 5)
  saveExpensesToStorage();

  // Refresh UI
  renderExpenses();

  // Reset form
  expenseForm.reset();
  expenseDateInput.value = new Date().toISOString().split('T')[0];
  expenseNameInput.focus();
});

// 5. Delete an Expense (Step 4)
function deleteExpense(id) {
  // Filter out the selected expense by its unique ID
  expenses = expenses.filter(item => item.id !== id);
  
  // Persist updated list
  saveExpensesToStorage();
  
  // Re-render
  renderExpenses();
}

// 6. Filter by Category Dropdown (Step 6)
filterCategorySelect.addEventListener('change', () => {
  renderExpenses();
});

// 7. Render Expenses List, Total, and Category Summary
function renderExpenses() {
  const selectedFilter = filterCategorySelect.value;

  // Filter items based on dropdown
  const filteredExpenses = selectedFilter === 'All' 
    ? expenses 
    : expenses.filter(item => item.category === selectedFilter);

  // Clear list
  expenseList.innerHTML = '';

  // Update counter
  expenseCountDisplay.textContent = filteredExpenses.length;

  // Toggle Empty State
  if (filteredExpenses.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    
    // Build list items
    filteredExpenses.forEach(item => {
      const li = document.createElement('li');
      li.className = 'expense-item';
      
      const formattedDate = new Date(item.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      li.innerHTML = \`
        <div class="expense-info">
          <div class="expense-title-row">
            <span class="expense-name">\${escapeHtml(item.name)}</span>
            <span class="cat-tag \${item.category.toLowerCase()}">\${item.category}</span>
          </div>
          <span class="expense-date">\${formattedDate}</span>
        </div>
        <div class="expense-right">
          <span class="expense-amount">₹\${item.amount.toLocaleString('en-IN')}</span>
          <button class="delete-btn" onclick="deleteExpense('\${item.id}')" title="Delete Expense">✕</button>
        </div>
      \`;

      expenseList.appendChild(li);
    });
  }

  // Update Total & Category Summary (Step 6)
  updateTotalAndSummary();
}

// 8. Calculate Overall Total and Category Summaries
function updateTotalAndSummary() {
  // Total of ALL expenses (independent of current filter)
  const grandTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  totalAmountDisplay.textContent = \`₹\${grandTotal.toLocaleString('en-IN')}\`;

  // Calculate totals per category
  summaryGrid.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const catTotal = expenses
      .filter(item => item.category === cat)
      .reduce((sum, item) => sum + item.amount, 0);

    const div = document.createElement('div');
    div.className = \`summary-item \${cat.toLowerCase()}\`;
    div.innerHTML = \`
      <div class="summary-item-name">\${cat}</div>
      <div class="summary-item-amount">₹\${catTotal.toLocaleString('en-IN')}</div>
    \`;
    summaryGrid.appendChild(div);
  });
}

// 9. LocalStorage Persistence (Step 5)
function saveExpensesToStorage() {
  localStorage.setItem('studentExpenses', JSON.stringify(expenses));
}

function loadExpensesFromStorage() {
  const data = localStorage.getItem('studentExpenses');
  if (data) {
    try {
      expenses = JSON.parse(data);
    } catch (e) {
      expenses = [];
    }
  } else {
    // Start with empty array so Total Amount Spent starts at ₹0
    expenses = [];
    saveExpensesToStorage();
  }
}

// Helper: Show & Hide Error Banner
function showError(message) {
  errorBanner.textContent = message;
  errorBanner.classList.remove('hidden');
}

function hideError() {
  errorBanner.textContent = '';
  errorBanner.classList.add('hidden');
}

// Helper: Escape text to prevent HTML injection
function escapeHtml(str) {
  const p = document.createElement('p');
  p.textContent = str;
  return p.innerHTML;
}`;

export const README_MARKDOWN = `# 🎓 Student Expense Tracker

A simple, lightweight, and beginner-friendly web application designed for college students to track daily spending, monitor category budgets, and manage expenses in Indian Rupees (₹).

Built using **pure HTML5, CSS3, and modern Vanilla JavaScript** with zero external dependencies!

---

## 🌟 Key Features

- **Quick Expense Entry**: Add expenses with Name, Amount in Rupees (₹), Category, and Date.
- **Input Validation**: Prevents blank fields and invalid/negative numbers.
- **Dynamic Total Calculation**: Instant updates as expenses are added or removed.
- **Category-wise Spending Summary**: Real-time spending breakdown across 5 college categories:
  - 🍔 **Food**: Canteen, snacks, coffee & mess bills
  - 🚌 **Travel**: Bus, metro card, rickshaw fares
  - 📚 **Books**: Textbooks, stationery, photocopies, notes
  - 🎮 **Fun**: Outings, movies, gaming, campus fests
  - 📦 **Other**: Mobile recharge, laundry, miscellaneous
- **Category Filter Dropdown**: Easily view expenses for a single category or all items.
- **Browser LocalStorage**: Retains all data automatically even after refreshing or restarting the browser.
- **Delete Functionality**: One-click deletion with automatic total recalculation.
- **Clean Card UI & Mobile Responsive**: Optimized for desktop monitors, tablets, and smartphones.

---

## 🛠️ Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessible form controls, and lists |
| **CSS3** | Modern card layout, CSS grid & flexbox, custom category themes |
| **JavaScript (ES6+)** | DOM manipulation, array operations, input validation, and localStorage |

---

## 🚀 How to Run Locally

You don't need any complex build tools, Node.js, or server setup to run this!

1. Clone or download the repository files:
   - \`index.html\`
   - \`style.css\`
   - \`script.js\`
2. Place all 3 files in the same folder.
3. Double-click \`index.html\` to open it directly in Google Chrome, Firefox, Safari, or Microsoft Edge.
4. Start adding your college expenses!

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

Publish your project online in 5 easy steps:

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com) and log in.
   - Click **New Repository** and name it \`student-expense-tracker\`.
   - Set it to **Public** and click **Create repository**.

2. **Upload Your Files**:
   - Click **Add file** -> **Upload files**.
   - Drag and drop \`index.html\`, \`style.css\`, and \`script.js\`.
   - Click **Commit changes**.

3. **Enable GitHub Pages**:
   - Go to your repository **Settings** tab.
   - On the left sidebar, click **Pages**.
   - Under **Build and deployment > Branch**, select \`main\` (or \`master\`) branch and \`/(root)\` folder.
   - Click **Save**.

4. **Get Your Live Link**:
   - Wait 1-2 minutes. Refresh the Pages settings screen.
   - You will see a banner:
     \`Your site is live at https://<your-username>.github.io/student-expense-tracker/\`

5. **Share with Friends & Professors**:
   - Add the live link to your GitHub repository header and college portfolio!

---

## 📝 License
This project is open-source and free to use for educational and personal projects.`;

export const TESTING_CHECKLIST = [
  {
    id: 'test-1',
    title: 'Empty Field Validation',
    description: 'Try submitting the form with any empty field. An error banner must appear and no item should be added.',
    expected: 'Red error banner displays: "Please fill in all fields with a valid expense name and positive amount (₹)."',
    status: 'pass',
  },
  {
    id: 'test-2',
    title: 'Negative or Zero Amount Validation',
    description: 'Enter an amount of 0 or -50. The application must reject the entry.',
    expected: 'Rejection with validation error, form does not submit.',
    status: 'pass',
  },
  {
    id: 'test-3',
    title: 'Successful Expense Creation',
    description: 'Enter "Canteen Sandwich", amount "80", category "Food", and submit.',
    expected: 'Item appears at top of list, counter increments, inputs reset, date remains intact.',
    status: 'pass',
  },
  {
    id: 'test-4',
    title: 'Automatic Total Amount Recalculation',
    description: 'Observe the big bold total amount before and after adding ₹80.',
    expected: 'Total updates immediately by adding exactly ₹80.',
    status: 'pass',
  },
  {
    id: 'test-5',
    title: 'Category-wise Spending Summary',
    description: 'Check the Category Breakdown grid for the updated category.',
    expected: 'The specific category card (e.g. Food) reflects the newly added amount.',
    status: 'pass',
  },
  {
    id: 'test-6',
    title: 'Delete Expense Item',
    description: 'Click the ✕ delete button next to any expense in the list.',
    expected: 'Item disappears immediately, total spent decreases by that item’s amount.',
    status: 'pass',
  },
  {
    id: 'test-7',
    title: 'Category Filter Dropdown',
    description: 'Select "Books" from the filter dropdown.',
    expected: 'Only Books expenses are shown in the list. The counter reflects the filtered count.',
    status: 'pass',
  },
  {
    id: 'test-8',
    title: 'Browser Refresh Persistence (localStorage)',
    description: 'Refresh the browser window (F5 or Ctrl+R).',
    expected: 'All saved expenses, totals, and category breakdowns remain intact without loss.',
    status: 'pass',
  },
];

export const PROJECT_STEPS_METADATA: TutorialStep[] = [
  {
    stepNumber: 1,
    title: 'Plan the App',
    badge: 'Planning & Architecture',
    objective: 'Define the user requirements, screen layout wireframe, and expense data model for college students.',
    prompt: 'I want to build a simple expense tracker web app for college students using HTML, CSS and JavaScript only. List the features it should have, what the screen should look like, and what data I need to store for each expense. Keep it beginner-friendly.',
    outcome: 'A clear feature list, screen layout wireframe, and data schema.',
    highlights: [
      'Core Features: Add expense, delete expense, calculate total, categorize, filter, persist data',
      'Layout Plan: Centered clean card, banner header, big total counter, category grid, input form, and scrollable list',
      'Data Schema: { id, name, amount (₹), category, date }',
      '5 College Categories: Food, Travel, Books, Fun, Other',
    ],
  },
  {
    stepNumber: 2,
    title: 'Create the HTML Form and List',
    badge: 'Structure (HTML5)',
    objective: 'Write the semantic index.html containing the form, total spent display, and empty expenses list.',
    prompt: 'Write an index.html file for a student expense tracker. It should have a heading, a form with inputs for expense name, amount in rupees, category (Food, Travel, Books, Fun, Other) and date, an "Add Expense" button, a section showing the total amount spent, and an empty list where expenses will appear. Link style.css and script.js. Add comments.',
    outcome: 'A working index.html layout file ready for styling.',
    highlights: [
      'Semantic tags (<main>, <header>, <section>, <form>, <select>, <ul>)',
      'Rupee ₹ currency indicators and intuitive placeholder text',
      'Accessible form labels matching input IDs',
      'Linked style.css and script.js for separation of concerns',
    ],
  },
  {
    stepNumber: 3,
    title: 'Style the App',
    badge: 'Presentation (CSS3)',
    objective: 'Design a clean centered card, colored header, bold total amount, and distinctive category tags.',
    prompt: 'Write a style.css file for my expense tracker. Use a clean card design in the centre of the page, a coloured header, a big bold total amount, and a different colour tag for each category. Make the inputs and buttons look modern and make it work well on mobile.',
    outcome: 'A style.css file creating a centered, polished mobile-friendly app.',
    highlights: [
      'Centered card container with subtle shadow and border radius',
      'Modern gradient header with rupee symbol badge',
      'Vibrant category color coding: Food (Orange), Travel (Sky), Books (Teal), Fun (Purple), Other (Slate)',
      'Mobile responsive media queries for phones & small viewports',
    ],
  },
  {
    stepNumber: 4,
    title: 'Add and Delete Expenses',
    badge: 'Interactivity (Vanilla JS)',
    objective: 'Implement form submission, input validation, dynamic list rendering, and delete buttons with total updates.',
    prompt: 'Write a script.js file for my expense tracker that: (1) adds a new expense to the list when the form is submitted, (2) shows an error if any field is empty or the amount is not a positive number, (3) adds a delete button to each expense, and (4) updates the total amount every time an expense is added or deleted. Explain the code in simple words.',
    outcome: 'A working script.js file with full CRUD operations and live total calculations.',
    highlights: [
      'Event listener on form submit with event.preventDefault()',
      'Validation check: if (!name || isNaN(amount) || amount <= 0)',
      'Unique ID generation using Date.now() for safe item tracking',
      'Automatic total recalculation via reduce() method',
    ],
  },
  {
    stepNumber: 5,
    title: 'Save Data After Refresh',
    badge: 'Persistence (localStorage)',
    objective: 'Persist expenses into browser localStorage so data survives page refreshes and browser restarts.',
    prompt: 'Update my script.js so the expenses are saved using localStorage and still appear after I refresh or close the browser. Show the full updated code and explain what localStorage does.',
    outcome: 'An updated script.js with localStorage.getItem and localStorage.setItem persistence.',
    highlights: [
      'localStorage stores key-value strings in the student\'s browser',
      'JSON.stringify(expenses) serializes objects into text',
      'JSON.parse(data) deserializes text back into JavaScript objects',
      'DOMContentLoaded listener triggers auto-load on start',
    ],
  },
  {
    stepNumber: 6,
    title: 'Add a Category Summary & Filter',
    badge: 'Analytics & Filtering',
    objective: 'Display a summary grid showing total spent in each category and a dropdown filter.',
    prompt: 'Add a feature to my expense tracker that shows how much was spent in each category (Food, Travel, Books, Fun, Other) and a filter dropdown to show only one category at a time. Give the full updated code.',
    outcome: 'Category-wise spending summary cards and dynamic dropdown filter.',
    highlights: [
      'Live category totals computed with filter() and reduce()',
      'Category summary cards with colored backgrounds',
      'Filter dropdown updating list view without losing stored items',
      'Counter updating dynamically based on visible items',
    ],
  },
  {
    stepNumber: 7,
    title: 'Test, Document and Deploy',
    badge: 'Testing & Deployment',
    objective: 'Verify all features against a checklist, produce a comprehensive README.md, and deploy to GitHub Pages.',
    prompt: 'Give me a checklist to test every feature of my expense tracker, then write a README.md for it with title, description, features, technologies used and how to run it. Finally, give me steps to publish it on GitHub Pages.',
    outcome: 'An interactive test checklist, ready-to-paste README.md, and step-by-step GitHub Pages guide.',
    highlights: [
      '8 comprehensive manual & automated test cases',
      'Production-ready README.md with markdown formatting',
      '5-step GitHub Pages free hosting walkthrough',
      '1-click code export & copy to clipboard',
    ],
  },
];
