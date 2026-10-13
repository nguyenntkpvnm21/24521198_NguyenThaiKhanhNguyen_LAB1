
# Homework 3: Resilient Event Hub & AI Failure Audit

## Work Breakdown Structure (WBS)

### Task HW3-01: Semantic HTML & Component Contracts
- **Goal:** Build a semantic and accessible event landing page before implementing JavaScript.
- **Contracts:**
  - Use semantic HTML5 elements.
  - Include an event introduction, countdown display, and registration form.
  - Use exactly one `<h1>`.
  - Use visible labels for all form inputs.
  - Provide accessible countdown and submission status regions.
  - Do not use inline JavaScript event handlers.
- **Verification:**
  - All required interface components are present.
  - Form fields have correctly associated labels.
  - The page is navigable using Tab and Enter.
- **Commit:** `feat(hw3): build semantic landing page`

### Task HW3-02: Responsive Landing Page
- **Goal:** Build a mobile-first layout for the event landing page.
- **Contracts:**
  - Use modern CSS and custom properties.
  - Support a minimum viewport width of 375px.
  - Use Flexbox or CSS Grid for layout.
  - Provide visible keyboard focus indicators.
  - Include accessible visual feedback for form states.
- **Verification:**
  - The layout works at 375px without horizontal scrolling.
  - Form elements remain readable and usable.
  - Keyboard focus is clearly visible.
- **Commit:** `feat(hw3): implement responsive landing page`

### Task HW3-03: Drift-Free Countdown Engine
- **Goal:** Implement an accurate countdown using an absolute UTC timestamp.
- **Contracts:**
  - Store the event deadline as an ISO 8601 UTC timestamp.
  - Calculate remaining time using `Date.now()`.
  - Do not decrement a counter on each interval.
  - Display remaining days, hours, minutes, and seconds.
  - Stop the countdown when the deadline is reached.
  - Prevent negative countdown values.
  - Avoid creating duplicate intervals.
- **Verification:**
  - Countdown displays correct remaining time.
  - Refreshing the page does not reset the countdown.
  - Countdown remains accurate after an inactive browser tab resumes.
  - Countdown stops at zero.
- **Commit:** `feat(hw3): implement drift-free countdown`

### Task HW3-04: Form State Machine
- **Goal:** Manage registration form behavior using explicit states.
- **Contracts:**
  - Define IDLE, SUBMITTING, SUCCESS, and ERROR states.
  - Use native HTML form validation.
  - Handle submission through JavaScript.
  - Display accessible feedback for each state.
  - Support retry after a submission error.
  - Separate form state logic from DOM rendering.
- **Verification:**
  - Valid form data triggers the SUBMITTING state.
  - Successful submission displays SUCCESS feedback.
  - Failed submission displays ERROR feedback.
  - Users can retry after an error.
- **Commit:** `feat(hw3): implement form state machine`

### Task HW3-05: Double-Submit Prevention & XSS Security
- **Goal:** Secure the registration form and prevent duplicate submissions.
- **Contracts:**
  - Reject repeated submission attempts while SUBMITTING.
  - Disable the submit button while processing.
  - Validate and normalize user input.
  - Use `textContent` or safe DOM APIs for user-controlled content.
  - Never insert unsanitized input through `innerHTML`.
  - Restore appropriate controls after success or error.
- **Verification:**
  - Rapid submission attempts do not produce duplicate requests.
  - Unsafe HTML input is displayed as text, not executed.
  - Invalid data cannot be submitted.
  - Error recovery works correctly.
- **Commit:** `fix(hw3): prevent duplicate submission and XSS`

### Task HW3-06: AI Failure Mode Audit
- **Goal:** Document three AI-induced defects discovered and verified during development.
- **Contracts:**
  - Create `AI_FAILURE_AUDIT.md`.
  - Document exactly three verified AI-related defects.
  - Describe each defect and its impact.
  - Explain how each defect was detected using Git diff, DevTools, or tests.
  - Document the implemented fix and verification evidence.
  - Do not invent defects that were not observed.
- **Verification:**
  - Three real defects are documented.
  - Each defect includes description, diagnostic method, and solution.
  - The documented fixes match the implementation and Git history.
- **Commit:** `docs(hw3): document AI failure audit`


## Final Quality Assurance

- [x] Countdown uses an absolute UTC timestamp.
- [x] Countdown does not drift after tab inactivity.
- [x] Countdown stops at zero.
- [x] Form transitions correctly between all four states.
- [x] Duplicate submissions are prevented.
- [x] No XSS execution was observed in the tested input payload.
- [x] Responsive layout works at 375px.
- [x] Keyboard accessibility verified.
- [x] No JavaScript console errors.
- [x] No unauthorized external libraries.
- [x] At least five atomic commits completed.
- [x] AI failure audit documents three AI-related issues, including one detected during code review before implementation.
- [x] Homework 1 and Homework 2 remain unchanged.

## Lighthouse Audit Results

- [x] Performance: 100/100.
- [x] Accessibility: 100/100.
- [x] Best Practices: 100/100.
- [x] SEO: 100/100.

## Final Verification

The countdown engine, form state machine, duplicate submission prevention, and input validation were tested successfully. The website was also checked for mobile responsiveness and keyboard accessibility. All four Lighthouse categories achieved a score of 100 in the recorded audit.
