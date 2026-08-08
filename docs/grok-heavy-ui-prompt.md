# Grok Heavy comparison prompt

Use this as one prompt in a fresh Grok Heavy context:

```text
Design and implement an independent UI prototype for a public GitHub repository named ClankerScape. The product name shown in the interface is Clankerscape.

This is a zero-revenue RuneScape 3 Leagues II: Equilibrium race-route tool whose only primary job is helping a competitive player execute a sourced route to the 48,000-point Dragon Trophy. It is not SaaS, a landing page, a conversion funnel, or a broad content portal. Do not add a hero, tagline, pricing, testimonials, feature cards, fake metrics, accounts, analytics, ads, or marketing copy.

Produce a genuinely independent composition rather than mirroring the existing planning proposal. You may read requirements and data contracts, but do not copy the proposed three-column layout by default. First reason through at least two materially different information architectures, choose the stronger one for route scan speed, and implement that one. Briefly preserve the rejected concept in your final notes so it can be compared.

Hard requirements:
- The first viewport must already be doing route work.
- Show an ordered task route with completion state, exact task title, tier, points, region, expected time, confidence/source state, and concise preparation or rationale.
- Show progress toward task-count region gates, Relic point gates, Blessing-task gates, and 48,000 points without turning them into decorative KPI cards.
- Every actionable route row must open an in-page dialog that is designed to display dynamically fetched RuneScape Wiki information. Completion must be a separate control and must not accidentally open the dialog.
- Include a useful selected-task context/preparation treatment, alternate/parked tasks, source revision/freshness, loading, offline fallback, conflict, completed, and blocked states.
- Make desktop, laptop, and phone layouts intentional.
- Use original UI structure. Do not copy the RuneScape Wiki, another RS3 website, a public player's route, or any code/layout from other projects.
- Never inspect or use github.com/RS3-Dev/TheRSGuide.com.
- Do not use AI-generated images. Use no art at all unless the repository already contains an explicitly approved, licensed asset.
- No glassmorphism, backdrop blur, aurora blobs, gradient text, excessive glow, idle animation, huge rounded cards, radius soup, or blue-purple startup-dashboard styling.
- Motion is allowed only when it communicates completion, expansion, source refresh, or dialog state, and it must respect reduced motion.
- Keep it dense, readable, keyboard-usable, and specific to a RuneScape race route. Avoid generic “optimize your journey” language.

Repository discipline:
- Work only on a new branch named `agent/grok-ui-comparison`; never commit directly to `main`, merge, deploy, or enable Pages.
- Read the Clankerscape project skills if present. Treat `plan.md` as requirements and evidence, not a layout template.
- Do not inspect or borrow code, CSS, assets, or layouts from any other repository.

Technical scope:
- Focus on UI and interaction quality, not production task ingestion or route-solving logic.
- Use representative fixture data clearly labelled as fixture data.
- Prefer React + TypeScript and plain CSS/CSS Modules. Do not install a component library just to make the prototype.
- Keep the implementation easy to delete or adapt after comparison.
- Run the available checks and inspect the rendered page at laptop, desktop, and phone widths.

At the end, return:
1. the chosen information architecture and why it beat the alternate;
2. exact files changed;
3. screenshots/viewports inspected;
4. the five harshest defects you found in your own result and what you changed;
5. anything still unverified;
6. a short comparison rubric the owner can use against another prototype.
```
