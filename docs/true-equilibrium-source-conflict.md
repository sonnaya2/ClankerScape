# True Equilibrium source conflict

Status: **blocking conflict for combat benchmarks**  
Source date checked: 8 August 2026

## Official card

The official Jagex Tier IV Blessing card says True Equilibrium grants its stat package:

> for each relic alignment you have chosen

The card does not say Blessing path.

Official reveal page:

```text
https://secure.runescape.com/m=news/leagues-equilibrium-reveals---releasing-august-10th
```

Official Tier IV card:

```text
https://cdn.runescape.com/assets/img/external/news/2026/07/aaiyawe/bless4.png
```

## Current Equilibrium implementation

The current `sonnaya2/Equilibrium` combat rules do something different.

`src/league/blessings.ts` defines `uniqueBlessingPathCount`, which counts distinct Order/Balance/Chaos **Blessing picks**.

`src/combat/league/ruleset.ts` calls that function from `resolveLeagueRules` and multiplies the True Equilibrium bonuses by the resulting Blessing-path count.

This means the current engine result changes when Blessing paths change even when the selected relic alignments do not. That is not the official card text.

## ClankerScape ruling

Until the conflict is resolved:

- every True Equilibrium combat result is `blocked` or `mechanics/source conflict`;
- do not use the current Equilibrium True Equilibrium result to select a Blessing reset, region, relic or Tier 7 package;
- do not assume one-of-each Blessing path grants three True Equilibrium stacks;
- do not infer relic alignment from icon colour, card position or row position without a verified source;
- do not silently retain the existing implementation because tests pass;
- other Blessing packages may still be benchmarked with True Equilibrium excluded or replaced by an explicitly labelled scenario input.

## Required upstream data

Relic choices need explicit alignment metadata in their canonical records, for example:

```ts
type RelicAlignment = "Order" | "Balance" | "Chaos";

interface RelicChoice {
  tier: number;
  name: string;
  alignment: RelicAlignment;
  source: SourceReference;
}
```

The exact mapping must come from current Jagex or RuneScape Wiki evidence. A visual inference may be recorded as a hypothesis but cannot be promoted to verified data.

## Required upstream resolver change

True Equilibrium should receive the selected relic records or an independently resolved alignment count. It must not derive the count from `blessingPicks`.

Required invariants:

1. Changing Blessing paths while selected relic alignments stay fixed does not change True Equilibrium.
2. Changing selected relics to add a new verified relic alignment increases the stack count once.
3. Selecting several relics with the same alignment still counts that alignment once.
4. Rejuvenated's additional relic participates in the distinct-alignment count.
5. Unknown/unverified alignment does not receive an invented alignment or silently count as zero without a visible support warning.
6. Base-game combat remains unchanged when the League ruleset is omitted.

## ClankerScape data contract

Imported combat benchmark metadata must include:

- selected relic names and tiers;
- each relic's alignment and source status;
- resolved distinct alignment count;
- Equilibrium commit containing the corrected resolver;
- support status and any unknown alignment exclusions.

ClankerScape rejects a True Equilibrium benchmark that reports only `uniquePathCount`, derives the value from Blessing paths or lacks relic-alignment provenance.

## Route impact

This conflict prevents a reliable comparison of:

- True Equilibrium versus Havoc Born;
- Order/Genesis packages containing True Equilibrium;
- Chaos/Chaotic Insight variants that substitute True Equilibrium for Havoc Born;
- Balance/Power Archive packages;
- Icyenic and Lord of Light Prayer/armour interactions that depend on the True Equilibrium stat package.

It does **not** justify choosing Havoc Born automatically. The correct action is to keep the comparison blocked until the alignment data is sourced and the resolver is corrected.
