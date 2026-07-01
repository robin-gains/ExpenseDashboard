# Edge Case Analysis — SpendLens Dashboard

**Prepared by:** Robin R
**Date:** July 2026

> Written before contractor handoff. The goal is to document everything that could go wrong, how the app currently handles it, and what the correct behaviour should be.


## 1. Merchant name with special characters or very long text

**What could go wrong**
The current validation blocks any merchant name containing special characters and requires more than 2 characters. This means real, common merchant names like `AT&T`, `7-Eleven`, or `M&S` cannot be added at all. The validation is stricter than it needs to be and actively breaks legitimate use. On the other end, a 200-character merchant name is not blocked and will overflow its table cell.

**How the code currently handles it**
Special characters are rejected outright and names under 2 characters fail validation. There is no upper limit on length and no truncation in the table.

**What the correct behaviour should be**
The validation should allow commonly used special characters — specifically `&`, `-`, `'`, `.`, and `/` — since these appear in real merchant names. The minimum length check should remain but the special character block should be relaxed. Long names should be truncated with an ellipsis in the table and shown in full on hover. Script-like input (`<script>`) is already safely handled by React's default HTML escaping.

---

## 2. Currency rate of null or undefined

**What could go wrong**
If a currency code is missing from `rates.js` or the value is `null`, any calculation using that rate will return `NaN` or crash. This could cause the entire summary or table to break.

**How the code currently handles it**
There is no null check in `currency.jsx`. If a rate is missing, the conversion will silently produce `NaN`, which propagates into the UI as blank or broken values.

**What the correct behaviour should be**
The currency utility should check for missing or invalid rates before calculating. If a rate is not found, it should fall back to displaying the original amount with a warning, rather than showing `NaN` or crashing.

---

## 3. Very large amounts causing display overflow

**What could go wrong**
There is no limit on how many digits a user can type into the amount field. A value like `999999999999999` is accepted, added to the table, and included in the summary total. Numbers this large break the table cell layout, push columns out of alignment, and cause the summary figures to overflow their containers entirely.

**How the code currently handles it**
There is no `max` attribute on the amount input and no validation cap in the form logic. Any number of digits passes through and renders as-is with no truncation or formatting adjustment.

**What the correct behaviour should be**
The input should enforce a sensible maximum — for example `1,000,000` — using both an HTML `max` attribute and a validation check before submission. For display, large totals in the summary should use compact formatting (e.g. `$1.2M`) so they never overflow their card. Table cells should truncate with ellipsis if the formatted value is too wide.

---

## 4. Deleting a row while it is being edited

**What could go wrong**
A user clicks Edit on an expense, then clicks Delete without saving. The row is removed from the data but the app stays in edit mode for an expense that no longer exists, causing a broken UI state.

**How the code currently handles it**
There is no guard. The `editId` state is not cleared when the corresponding expense is deleted.

**What the correct behaviour should be**
The delete handler should check whether the row being deleted is currently being edited, and if so, clear `editId` before removing the expense:

---

## 5. Duplicate IDs after delete and add

**What could go wrong**
If expense IDs are generated using `expenses.length + 1`, deleting an item and then adding a new one produces two rows with the same ID. This breaks React's key-based rendering and causes unpredictable behaviour when editing or deleting.

**How the code currently handles it**
There is no safeguard. The ID generation does not account for gaps left by deleted items.

**What the correct behaviour should be**
Use `Date.now()` or a UUID library to generate IDs. This guarantees uniqueness regardless of how many items have been added or deleted.

---

## 6. App on a narrow mobile screen

**What could go wrong**
On a screen narrower than 400px, the expense table, summary cards, and form inputs are likely to overflow or stack awkwardly. The app was built and tested on desktop and has no explicit mobile breakpoints.

**How the code currently handles it**
There is no responsive CSS in place. The layout is not tested on mobile and will likely break on small screens.

**What the correct behaviour should be**
Add responsive breakpoints so the table scrolls horizontally on small screens, the summary cards stack vertically, and form inputs span full width. At minimum, the app should be usable on a 375px viewport (standard iPhone width).

---

## 7. Accidental deletion with no confirmation

**What could go wrong**
A user misclicks the Delete button and loses an expense for the session. Since there is no undo and no persistence, the data is gone until the page is refreshed (which restores the original mock data, not the user's work).

**How the code currently handles it**
Delete fires immediately on click. There is no confirmation step.

**What the correct behaviour should be**
Show a confirmation prompt before deleting
Longer term, a soft-delete with an undo toast would be a better user experience than a browser dialog.
