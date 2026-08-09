(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const ART_ROOT = 'https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/';

  const gearPanel = $('[data-subpanel="gear"]');
  const attachmentStage = $('.loadout-attachment-stage', gearPanel);
  const statsModule = $('.loadout-stats-module', attachmentStage);
  const effectsModule = $('.loadout-effects-module', attachmentStage);
  const coreGrid = $('.attachment-core-grid', attachmentStage);
  if (!gearPanel || !attachmentStage || !statsModule || !effectsModule || !coreGrid) return;

  statsModule.classList.add('combat-settings-v6');
  effectsModule.classList.add('effects-inside-stats-v6');
  coreGrid.classList.add('core-after-settings-v6');

  const statsHead = $('.attachment-block__head', statsModule);
  if (statsHead) {
    const title = $('h3', statsHead);
    const note = $('span', statsHead);
    if (title) title.textContent = 'Combat inputs';
    if (note) note.textContent = 'Levels · life · adrenaline · Herblore';
  }

  const iconFor = (label) => {
    const key = label.toLowerCase();
    if (key.includes('herblore')) return ['skills/herblore.webp', 'H'];
    if (key.includes('attack')) return ['skills/attack.webp', 'A'];
    if (key.includes('strength')) return ['skills/strength.webp', 'S'];
    if (key.includes('defence')) return ['skills/defence.webp', 'D'];
    if (key.includes('constitution') || key.includes('current hp')) return ['skills/constitution.webp', 'HP'];
    if (key.includes('adrenaline')) return ['combat/melee-abilities.webp', '%'];
    if (key.includes('ranged')) return ['skills/ranged.webp', 'R'];
    if (key.includes('magic')) return ['skills/magic.webp', 'M'];
    if (key.includes('necromancy')) return ['skills/necromancy.webp', 'N'];
    return ['skills/constitution.webp', '•'];
  };

  const makeStatTile = (row, labelText) => {
    const label = labelText || (row.textContent || '').trim();
    const [path, fallback] = iconFor(label);
    const tile = document.createElement('div');
    tile.className = 'stat-tile-v6';
    tile.dataset.stat = label.toLowerCase().replace(/\s+/g, '-').slice(0, 48);

    const icon = document.createElement('span');
    icon.className = 'game-icon stat-icon-v6';
    icon.dataset.fallback = fallback;
    const img = document.createElement('img');
    img.alt = '';
    img.src = ART_ROOT + path;
    img.addEventListener('error', () => { img.hidden = true; }, { once: true });
    icon.append(img);

    row.classList.add('stat-row-v6');
    tile.append(icon, row);
    return tile;
  };

  /* ---------------------------------------------------------------------
   * Stats are a compact, content-sized control strip. Current HP is folded
   * into Constitution rather than burning an entire tile. Herblore moves here
   * from Poison because it is a player stat, while Kwuarm potency stays with
   * the effect it configures.
   * ------------------------------------------------------------------- */
  const groups = $('.stats-groups', statsModule);
  let statGrid = $('.compact-stat-grid-v6', statsModule);
  if (groups && !statGrid) {
    const rows = $$('.input-row, .toggle-row, .auto-row', groups);
    const advanced = $('.advanced-section', groups);
    const currentHpRow = rows.find((row) => (row.textContent || '').toLowerCase().includes('current hp'));

    statGrid = document.createElement('div');
    statGrid.className = 'compact-stat-grid-v6';

    rows.filter((row) => row !== currentHpRow).forEach((row) => {
      statGrid.append(makeStatTile(row));
    });

    if (currentHpRow) {
      const constitutionTile = $$(':scope > .stat-tile-v6', statGrid).find((tile) =>
        (tile.dataset.stat || '').includes('constitution'),
      );
      if (constitutionTile) {
        currentHpRow.classList.add('stat-subrow-v6');
        constitutionTile.classList.add('stat-tile-v6--life');
        constitutionTile.append(currentHpRow);
      }
    }

    advanced?.remove();
    groups.replaceWith(statGrid);
    if (advanced) {
      advanced.classList.add('advanced-stats-v6');
      statGrid.after(advanced);
    }
  }

  const poisonPanel = $('[data-buff-panel="poison"]', effectsModule);
  const poisonEditor = $('.inline-editor', poisonPanel);
  const herbloreRow = poisonEditor
    ? $$('label', poisonEditor).find((label) => (label.textContent || '').toLowerCase().includes('herblore level'))
    : null;

  if (statGrid && herbloreRow && !$('.stat-tile-v6[data-stat="herblore-level"]', statGrid)) {
    herbloreRow.classList.add('input-row', 'herblore-stat-row-v6');
    const herbloreTile = makeStatTile(herbloreRow, 'Herblore level');
    herbloreTile.dataset.stat = 'herblore-level';

    const adrenalineTile = $$(':scope > .stat-tile-v6', statGrid).find((tile) =>
      (tile.dataset.stat || '').includes('starting-adrenaline'),
    );
    if (adrenalineTile) statGrid.insertBefore(herbloreTile, adrenalineTile);
    else statGrid.append(herbloreTile);

    const remainingEditorRows = $$(':scope > label', poisonEditor);
    if (remainingEditorRows.length === 0) poisonEditor.remove();
    else poisonEditor.classList.add('poison-potency-only-v6');
  }

  /* ---------------------------------------------------------------------
   * Buffs stay with combat settings, but they no longer stretch into a fake
   * dashboard grid. Each category is an intrinsic-width compact control group.
   * ------------------------------------------------------------------- */
  const effectsHead = $('.attachment-block__head', effectsModule);
  if (effectsHead) {
    const title = $('h3', effectsHead);
    const note = $('span', effectsHead);
    if (title) title.textContent = 'Buffs & effects';
    if (note) note.textContent = 'Common state · more in overflow';
  }

  if (effectsModule.parentElement !== statsModule) statsModule.append(effectsModule);

  $$('.buff-category-stage .section-head', effectsModule).forEach((head) => {
    head.classList.add('effect-section-head-v6');
  });

  const readout = $('#loadout-focus-readout');
  if (readout) readout.textContent = 'Gear · combat inputs · gizmos · monolith';
})();
