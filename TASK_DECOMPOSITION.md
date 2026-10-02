# Work Breakdown Structure (WBS)

## Task T-01: Semantic DOM landmarks & A11y Contract
- **Goal**: Construct a semantic HTML DOM structure complying with accessibility standards without `<div>` elements.
- **Contracts**:
  - Skip-to-content link pointing to `#main-content`.
  - Exactly one `<h1>` element.
  - Required landmarks: `<header>`, `<nav>`, `<main>`, `<section>`.
  - Zero `<div>` tags.