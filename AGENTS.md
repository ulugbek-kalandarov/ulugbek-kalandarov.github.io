<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep portfolio motion in isolated site interaction components and scoped CSS; honor reduced-motion preferences so static sections stay unchanged.
- Keep portfolio translations in the existing dictionary and language state in the route search plus a shared provider; valid link language overrides saved preference, avoiding hydration mismatches and keeping metadata shareable.
- Use English option values with localized contact labels and include the selected language in submissions so incoming messages remain consistently categorized.
- Use native dialog and details elements for gallery focus management and case-study disclosure; this preserves keyboard accessibility without extra state libraries.
- Keep the fixed page background in its own aria-hidden site component with scoped CSS and semantic color tokens; paint section base layers beneath it and content above it to preserve readability without changing base colors.
- Keep viewer transition lifetimes, photo crossfades and pointer tracking in the isolated interaction-details module; retain native dialog focus trapping through exit animations and animate only transform/opacity overlays for paint-changing effects.
