
# Homework 1: Production Portfolio

## Objective
Upgrade the existing developer portfolio into a production-ready website by improving accessibility, keyboard navigation, security, and performance.

## Project Rules
- Use semantic HTML5, CSS3, and Vanilla JavaScript.
- Do not use external UI frameworks.
- Implement and verify each milestone separately.
- Keep the original Exercise implementation unchanged.
- Use atomic Git commits.
- Test the website through a local HTTP server.

## Milestone M1: WCAG 2.2 AA Accessibility Audit

### Tasks
- Review semantic HTML landmarks.
- Verify heading hierarchy.
- Check text and background color contrast.
- Verify accessible names for interactive elements.
- Check image alternative text.
- Fix identified accessibility issues.

### Acceptance Criteria
- Semantic landmarks are correctly structured.
- Normal text meets the 4.5:1 contrast ratio where applicable.
- Interactive elements have accessible names.
- No known WCAG 2.2 AA violations remain after testing.

### Commit
fix(a11y): contrast & landmarks

## Milestone M2: Keyboard Focus Audit

### Tasks
- Test navigation using Tab and Shift+Tab.
- Verify keyboard activation using Enter and Space where applicable.
- Ensure visible keyboard focus.
- Check that users can leave interactive components.
- Prevent keyboard focus traps.

### Acceptance Criteria
- All interactive controls are keyboard accessible.
- Focus indicators are visible.
- Users can navigate without a mouse.
- No unintended keyboard traps remain.

### Commit
fix(nav): keyboard trap prevention

## Milestone M3: Content Security Policy

### Tasks
- Inspect HTML for inline event handlers.
- Replace inline handlers with JavaScript event listeners.
- Define a restrictive Content Security Policy.
- Check browser Console for CSP violations.
- Verify that website functionality remains intact.

### Acceptance Criteria
- No inline event handlers are used.
- A Content Security Policy is configured.
- Necessary application resources load correctly.
- No unintended CSP violations occur.

### Commit
security: enforce CSP and remove inline handlers

## Milestone M4: Lighthouse Performance Audit

### Tasks
- Run a Lighthouse audit in Chrome DevTools.
- Review performance, accessibility, best practices, and SEO.
- Optimize images and other assets where necessary.
- Recheck mobile responsiveness.
- Run the final Lighthouse audit.

### Acceptance Criteria
- Target a Lighthouse score of 100 in all four categories.
- The website works at a 375px viewport.
- No horizontal scrolling occurs on mobile.
- No JavaScript Console errors remain.

### Commit
perf: optimize assets

## Verification
Each milestone must be tested before moving to the next one. Save screenshots of the relevant audit results for the final PDF submission.
