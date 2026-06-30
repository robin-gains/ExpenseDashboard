# CEO Briefing Note — SpendLens Dashboard

**Prepared by:** Robin R
**Date:** July 2026
**Sprint:** 1 (Prototype)

---

## What I Built and Why It Matters

I built a browser-based expense tracking dashboard that lets a user log spending, view transactions, filter by category, and see a running summary of totals across currencies. The goal was to deliver a working front-end that proves the core SpendLens user journey — add an expense, see it reflected instantly, understand where money is going — before committing to backend infrastructure.

This matters because it gives the team something real to test, show, and build on. It is live, accessible at a public URL, and deployable in under a minute.

---

## The Three Most Important Trade-Offs I Made

**1. Hardcoded data instead of a real backend**
All expense records and currency rates are static files baked into the app. This allowed me to move fast without being blocked by database decisions, API design, or authentication. The cost is real: refresh the page and any changes disappear. This was the right call for a sprint-one prototype, but it is the most important thing to fix before any real user testing happens.

**2. Functionality over visual polish**
I prioritised getting the components working add, edit, delete, summarise, filter over making the dashboard look credible. It is functional but visually plain. There are no charts, no colour hierarchy, and limited responsiveness on mobile. This call was made deliberately to avoid spending sprint time on design before the logic was stable. The result is a working skeleton, not a finished product.

**3. Skipping tests and a staging environment**
There is no test suite, and pushing to the main branch deploys directly to production via Vercel. This kept the workflow simple but means any future change carries risk. A staging environment and at least basic component tests should be introduced before the next sprint ships anything to real users.

---

## The Three Things I Would Prioritise Next Sprint

**1. Fix the category filter and wire it to real data**
The filter component exists on the page but is currently blank — it is not connected to the expense data. This is the most visible broken feature and the first thing I would fix. It is roughly a half-day of work and directly unlocks the core filtering use case that SpendLens is built around.

**2. Persist data so changes survive a page refresh**
Right now, every refresh wipes the slate clean. Deleted expenses come back, added expenses disappear, and notes are lost. The plan is to first persist state to `localStorage` as a quick fix, then evaluate a lightweight hosted database if the product moves toward multi-device or multi-user use. Without this, the app cannot be meaningfully tested by real users.

**3. Redesign the UI with charts and a proper visual language**
The dashboard needs spending charts, a category breakdown view, and a colour system that communicates at a glance. Introducing a charting library and a focused design pass would move the product from internal prototype to something that can be shown externally without caveats.

---

## Honest Summary

This sprint delivered a working foundation. The app is live, the core components exist, and the data model is clear. What it is not yet is user-ready. The category filter needs fixing, data does not persist, and several edge cases around editing and deleting have been identified but not yet resolved. None of this is unexpected it is the known shape of a sprint-one prototype. The next sprint has a clear and achievable scope.
