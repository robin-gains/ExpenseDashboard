# SpendLens Dashboard

## What This Project Does

SpendLens is a personal expense tracking dashboard that lets users log, view, and filter their spending across categories. It displays a summary of totals, a filterable table of transactions, and supports multi-currency display. It is a front-end only prototype built with React and Vite.

---

## How to Run Locally

**Prerequisites:** Node.js (v18+) and npm installed.

```bash
git clone https://github.com/YOUR_USERNAME/spendlens-dashboard.git
cd spendlens-dashboard
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

**Live URL:** [https://expense-dashboard-eight-henna.vercel.app/](https://expense-dashboard-eight-henna.vercel.app/)

---

## File and Folder Structure

 For this project I chose React because it provides a component-based architecture that makes it easier to build and maintain reusable UI elements such as the Summary, Add Expense form, Expense Table, and Notes section. State management using React hooks like useState allowed the application data to remain synchronized across components whenever expenses were added, edited, or deleted.
 I chose Vite because it offers a significantly faster development experience compared to traditional bundlers. Its instant hot module replacement (HMR) allowed changes to appear immediately during development, improving productivity and reducing iteration time. Vite also provides a lightweight configuration setup and optimized production builds, making deployment to platforms such as Vercel straightforward.

Together, React and Vite provided a modern frontend stack that supports scalability, maintainability, and efficient development workflows.
```
spendlens-dashboard/
├── public/
│   └── icons.svg              # Static SVG icons used across the UI
├── src/
│   ├── assets/                # Static assets (images, SVGs)
│   ├── components/
│   │   ├── AddExpense.jsx      # Form component to add a new expense entry
│   │   ├── CategoryFilter.jsx  # Dropdown/filter UI for filtering by category
│   │   ├── ExpenseTable.jsx    # Table displaying all expense records
│   │   ├── Notes.jsx           # Free-text notes panel per expense or session
│   │   └── Summary.jsx         # Aggregated totals and spending summary cards
│   ├── data/
│   │   ├── expenses.js         # Hardcoded mock expense records (no backend)
│   │   └── rates.js            # Static currency exchange rates
│   ├── utils/
│   │   └── currency.jsx        # Helper functions for currency formatting/conversion
│   ├── App.jsx                 # Root component; composes all views
│   ├── App.css                 # Global and component-level styles
│   ├── main.jsx                # React entry point
│   └── index.css               # Base CSS reset and variables
├── index.html                  # HTML shell for the Vite app
├── vite.config.js              # Vite bundler configuration
├── eslint.config.js            # Linting rules
└── package.json                # Dependencies and scripts
```

---

## Known Limitations

1.The category filter is currently blank it renders on the page but is not yet connected to the expense data. Given another 4 hours, this would be the first thing fixed.
2.Data does not persist. Any expenses added through the UI disappear on refresh, because the app runs entirely off hardcoded mock data. A real version would use localStorage as a quick fix, or a proper backend like Supabase for anything longer term.
3.The UI is functional but visually thin. There is no colour hierarchy, no charts, and limited responsiveness. A redesign with a proper palette and a charting library like Recharts would make it feel like a real product.
4.Notes entered in the app are not saved anywhere. They would need to be stored in localStorage tied to each expense to survive a page reload.
5.Deleting a row that is mid-edit causes a UI glitch. If you click Edit on an expense and then delete it without saving, the app stays in edit mode for a row that no longer exists. A simple guard that clears editId before deleting resolves this.
6.Deleting all expenses leaves components empty with no feedback. Totals drop to $0.00 and tables go blank. Components should check for empty arrays and show a message like "No expenses yet" rather than rendering nothing.
7.Adding after deleting can create duplicate IDs. If IDs are generated using expenses.length + 1, deleting an item and adding a new one can produce two rows with the same ID, breaking React rendering and editing. Switching to Date.now() as the ID fixes this entirely.
8.No confirmation before deleting. A single misclick permanently removes an expense for the session. A simple window.confirm("Delete this expense?") prompt would prevent accidental deletions.


---

## Assumptions the Next Developer Should Know

1.The app has no backend. All expense data lives in src/data/expenses.js and currency rates live in src/data/rates.js. Both are static files — nothing talks to a server or database.
2.The exchange rates shown in the app are not live. They were hardcoded at build time and will go stale. Do not use them for anything that needs to be accurate.
3.There is no login or user system of any kind. Anyone with the URL can open the app and see everything.
4.There are no tests. If you change something, you will need to manually check that nothing broke.
5.Pushing to main deploys immediately to production via Vercel. There is no staging environment, so be careful with what you merge.