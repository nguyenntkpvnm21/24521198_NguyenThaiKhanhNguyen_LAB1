# Work Breakdown Structure (WBS)

## Task T-01: Semantic DOM landmarks & A11y Contract
- **Goal**: Construct a semantic HTML DOM structure complying with accessibility standards without `<div>` elements.
- **Contracts**:
  - Skip-to-content link pointing to `#main-content`.
  - Exactly one `<h1>` element.
  - Required landmarks: `<header>`, `<nav>`, `<main>`, `<section>`.
  - Zero `<div>` tags.

  ## Exercise 2 Breakdown
- [x] T-02A: Tokens & Reset (`feat(css): tokens & reset`)
- [ ] T-02B: 2D Grid Layout (`feat(css): responsive grid`)
- [ ] T-02C: Theme Engine (`feat(js): dark mode engine`)

## Exercise 3: Component Architecture & State Modeling

### Modular Components Breakdown
- Hero Section: Landmark, portrait image with explicit dimensions, headline, pitch.
- Theme Switcher: Accessible button with aria-pressed and dynamic icon.
- Skills Matrix: Categorized badges arranged in clean CSS Grid.
- Project Cards: Self-contained `<article>` cards with tags, links, and descriptions.
- Contact Form: Validated native form with client-side state handling.

### 4-State Resilient Component Contract
- Task T-03A: Loading Skeleton (Pure CSS Shimmer gradient).
- Task T-03B: Live Data State (Flexbox metadata badges & CSS Grid cards).
- Task T-03C: Empty & Error States with accessible retry trigger.
- Task T-03D: Contact Form native validation and submission state machine.

## Task T-03: Resilient Component Architecture (4-State Contract)

### 1. State Machine Specification
- `STATE_LOADING`: Render pure CSS animated shimmer placeholder cards. Reserve bounding box to ensure CLS = 0.
- `STATE_SUCCESS`: Render projects array in responsive 2D Grid with Flexbox metadata category badges.
- `STATE_EMPTY`: Render semantic feedback card indicating zero items found with guidance.
- `STATE_ERROR`: Render accessible alert box with failure message and a keyboard-focusable Retry button.

### 2. Work Breakdown Structure (WBS)
| Sub-Task ID | Title | Scope | Commit Target |
| :--- | :--- | :--- | :--- |
| **T-03A** | Loading Skeleton | Pure CSS shimmer gradient keyframes & placeholder DOM | `feat(css): implement pure css shimmer loading skeleton` |
| **T-03B** | Live Data Layout | Responsive 2D Grid, Flexbox badges, card semantic tree | `feat(ui): implement live data state with responsive grid and badges` |
| **T-03C** | Empty & Error States | Accessible message containers & retry trigger button | `feat(ui): implement empty and error states with accessible retry` |
| **T-03D** | State Machine Engine | Pure JS state orchestration, mock triggers, safe DOM rendering | `feat(js): orchestrate resilient component state machine and retry logic` |