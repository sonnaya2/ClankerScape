# Grok Heavy comparison prompt

Send the prompt below to a fresh Grok Heavy conversation. The output is a comparison concept, not an implementation authority. Do not give Grok access to ClankerScape code, private repositories, credentials, or another site's UI.

---

You are designing a single high-fidelity main screen for **ClankerScape**, an unofficial RuneScape 3 Leagues II: Equilibrium first-to-Dragon route workbench.

The app is free, has no monetisation goal, and is not a product landing page. It helps a player execute a sourced route to 48,000 League Points while switching between a skilling queue and a PvM queue. Design the working route screen itself—not a hero, pitch, onboarding page, or dashboard preamble.

Create an original static UI implementation in one self-contained HTML/CSS/JavaScript file, or a minimal React component if your environment renders it better. Do not copy code, layout, or visual treatment from the RuneScape Wiki, an RS3 tool, a public route, or any other website. Do not use external images, generated images, stock art, or scraped assets. CSS geometry and plain text placeholders are enough.

The first 1600×900 viewport must show:

- ClankerScape as a compact utility label;
- current points out of 48,000;
- completed tasks and next 50/175/300/450 region threshold;
- active route phase;
- at least eight executable route rows;
- separate “Skilling next” and “PvM next” actions;
- current regions and the approaching region decision;
- relic progression;
- Blessing path and remaining reset count;
- a clickable route row that opens a source modal containing a route note, requirements, a live-Wiki-content placeholder, source freshness, and a full article action.

Use this route context in the mock data:

- regions: Misthalin, Havenhythe, Karamja, Kharidian Desert, Asgarnia; Anachronia pending at 450 tasks;
- relics: Golden Touch, Superheated, Assassin's Insight, Crystal Grace, Production Master, Perkfection, Infernal Fire;
- early Blessings: Big Boned, Abyssal Cinders, Avernic Rampage, Demon's Mark;
- goal: alternate deterministic skilling batches and PvM point clusters rather than forcing one uninterrupted grind.

Visual direction:

- dense player-built game utility;
- warm near-black/charcoal stone surfaces;
- cream text;
- restrained gold for phase and milestone structure;
- restrained teal/emerald for active/focus/progress state;
- red only for real blockers or destructive reset consequences;
- square or 2–4 px corners;
- thin borders and very restrained depth;
- high information density with clear hierarchy;
- tabular numerals for points, tasks, and time;
- desktop and a credible phone adaptation.

Hard rejections:

- no hero section;
- no slogan or marketing paragraph;
- no pricing, CTA, testimonials, feature grid, or fake KPI card strip;
- no glassmorphism;
- no backdrop blur;
- no blue-purple SaaS palette;
- no gradient text;
- no aurora/blob background;
- no glowing borders, pulsing controls, or ambient particles;
- no oversized rounded card garden;
- no giant logo or decorative empty header;
- no “AI recommendation” panel or AI language;
- no hamburger that hides the route, queue switch, or irreversible decision;
- no iframe or wholesale Wiki-page embed;
- no copied RuneScape interface chrome.

Interaction requirements:

- route rows have visible action, locality, queue/category, gain, estimated time, and blocker/status;
- blocked rows name the blocker rather than merely appearing disabled;
- meaningful information is not hover-only;
- the source modal is keyboard-operable and visually distinguishes route commentary from Wiki content;
- animation is limited to useful state changes and respects reduced motion.

Aim for a distinctive, credible player tool rather than generic “premium” polish. The page should feel intentionally composed, not like a component-library demo.

After producing the implementation, perform a hostile design audit of your own result. List the five largest remaining defects or AI-generated design tells. Do not praise the work. Explain what you would change and why.

---

## Comparison rules for ClankerScape

When reviewing Grok's result:

- use it only to expose tunnel vision or a better information arrangement;
- do not copy its code;
- do not copy a visual motif merely because it is polished;
- reject any hard-rejection pattern above;
- compare route scan speed, above-the-fold usefulness, queue clarity, irreversible-decision visibility, modal clarity, phone behaviour, and visual restraint;
- retain ClankerScape's own source, security, and data architecture.
