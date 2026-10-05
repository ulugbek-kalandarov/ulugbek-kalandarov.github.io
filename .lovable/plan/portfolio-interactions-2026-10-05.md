# Portfolio interactions

Keep existing copy, typography, color tokens, dark backgrounds and section order unchanged, except the requested new labels and removal of the job/internship dropdown option.

## Changes
- Add a one-time, staggered hero fade completing in approximately 0.6 seconds.
- Count up the four Results numbers on their first appearance.
- Highlight the current navigation section, add a thin blue scroll-progress line, and compact the header onto a solid background after scrolling.
- Add an “Events supported” text strip beneath the hero, moving slowly and pausing on hover.
- Fill the Experience timeline in blue as it passes through the viewport.
- Add gallery image zoom and sliding captions; extend the full-screen viewer with visible previous/next controls and keyboard navigation.
- Add an expandable summary beside the case-study download, containing Challenge, Approach, Results and Key insights with editable placeholder copy.
- Show a back-to-top control after the hero.
- Remove “Job / internship opportunity” from Project type.

## Technical details
- Use isolated React components, IntersectionObserver and requestAnimationFrame; preserve the existing static section wrappers.
- Respect reduced-motion preferences: show hero and final stats immediately, stop the strip, remove gallery transitions, and keep scroll indicators static.
- Keep new controls keyboard accessible and test desktop/mobile layouts, gallery navigation, collapsible summary and reduced-motion behavior.