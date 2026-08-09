(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const ART_ROOT = 'https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/';

  const combatApp = $('.combat-app');
  const siteHead = $('.eq-site-head');
  const toolbar = $('.combat-toolbar');
  const loadoutContext = $('.loadout-context');
  const loadoutWorkbench = $('.loadout-workbench');
  const contextRail = $('.loadout-workbench > .context-rail');
  const gearPanel = $('[data-subpanel="gear"]');
  const gearGrid = $('.gear-stage-grid', gearPanel);
  const paperDoll = $('.paper-doll-zone', gearPanel);
  const attachmentStage = $('.loadout-attachment-stage', gearPanel);
  const statsModule = $('.loadout-stats-module', attachmentStage);
  const coreGrid = $('.attachment-core-grid', attachmentStage);
  const inventionModule = $('.invention-module', coreGrid);
  const monolithModule = $('.monolith-module', coreGrid);
  const effectsModule = $('.loadout-effects-module', attachmentStage);
  const summaryRail = $('.loadout-workbench > .summary-rail');

  if (
    !combatApp || !siteHead || !toolbar || !loadoutWorkbench || !contextRail || !gearPanel ||
    !gearGrid || !paperDoll || !attachmentStage || !statsModule || !coreGrid ||
    !inventionModule || !monolithModule || !effectsModule || !summaryRail
  ) return;

  combatApp.classList.add('reference-layout-v5');
  loadoutWorkbench.classList.add('reference-workbench');
  gearPanel.classList.add('generated-reference-layout');

  /* Put the prototype treatment control into the product header, matching the
     approved generated reference instead of carrying a second site header. */
  const prototypeMeta = $('.prototype-meta');
  const prototypeLens = $('.prototype-lens');
  if (prototypeLens) {
    prototypeLens.classList.add('prototype-lens--header');
    const label = $('span', prototypeLens);
    if (label) label.textContent = 'Prototype';
    siteHead.append(prototypeLens);
  }
  prototypeMeta?.remove();
  $('.eq-site-head__note')?.remove();

  /* Current focus belongs in the Combat toolbar. The extra Loadout context
     strip was useful during exploration but is redundant in this composition. */
  if (!$('.combat-current-focus', toolbar)) {
    const focus = document.createElement('div');
    focus.className = 'combat-current-focus';
    focus.innerHTML = `
      <span>Current focus</span>
      <strong>Melee · 2H</strong>
      <button type="button">Reset</button>`;
    $('button', focus)?.addEventListener('click', () => {
      $('[data-main-tab="loadout"]')?.click();
      $('[data-subtab="gear"]')?.click();
    });
    toolbar.append(focus);
  }
  loadoutContext?.setAttribute('hidden', '');

  /* Left rail: make it read like the reference — named loadout pages first,
     then the actual tools, with utility actions demoted to the bottom. */
  const oldCaption = $('.context-rail__caption', contextRail);
  if (oldCaption) oldCaption.textContent = 'LOADOUT PAGES';

  if (!$('.loadout-page-list', contextRail)) {
    const pages = document.createElement('div');
    pages.className = 'loadout-page-list';
    pages.innerHTML = `
      <button type="button" class="loadout-page is-current">
        <span class="game-icon" data-fallback="M"></span>
        <span><strong>Main Melee</strong><small>2H loadout</small></span>
      </button>
      <button type="button" class="loadout-page loadout-page--new"><b>＋</b><span>New page</span></button>`;
    oldCaption?.after(pages);

    const toolsCaption = document.createElement('div');
    toolsCaption.className = 'context-rail__caption context-rail__caption--tools';
    toolsCaption.textContent = 'TOOLS';
    pages.after(toolsCaption);
  }

  if (!$('.loadout-rail-footer', contextRail)) {
    const footer = document.createElement('div');
    footer.className = 'loadout-rail-footer';
    footer.innerHTML = `
      <button type="button"><span>⚙</span>Presets<b>›</b></button>
      <button type="button"><span>⇄</span>Import / Export</button>`;
    contextRail.append(footer);
  }

  /* The reference does not need a prose hero inside Loadout. The equipment
     object itself is the first thing users should see. */
  const stageHeading = $('.stage-heading', gearPanel);
  stageHeading?.setAttribute('hidden', '');

  paperDoll.classList.add('equipment-panel-v5');
  const equipmentHeading = $('.section-head', paperDoll);
  if (equipmentHeading) {
    $('h2', equipmentHeading)?.replaceChildren(document.createTextNode('Equipment'));
    const count = $('span', equipmentHeading);
    if (count) count.textContent = '13 / 13 slots';
  }

  const dollGrid = $('.paper-doll-grid', paperDoll);
  const selectedDetail = $('.selected-item-row', paperDoll);
  const prayerStrip = $('.prayer-strip', paperDoll);
  selectedDetail?.classList.add('reference-hidden-detail');

  if (dollGrid && !$('.change-equipment-action', paperDoll)) {
    const changeEquipment = document.createElement('button');
    changeEquipment.type = 'button';
    changeEquipment.className = 'change-equipment-action';
    changeEquipment.innerHTML = '<span>⌕</span> Change equipment';
    changeEquipment.addEventListener('click', () => {
      const active = $('.slot.is-selected[data-slot]', paperDoll) || $('.slot[data-slot]:not(:disabled)', paperDoll);
      active?.click();
    });
    dollGrid.after(changeEquipment);
    if (prayerStrip) changeEquipment.after(prayerStrip);
  }

  /* The V2 stage title is now redundant: Stats / Invention / Archaeology / Effects
     each own an explicit panel like the approved mock. */
  $('.attachment-stage-head', attachmentStage)?.setAttribute('hidden', '');

  /* Invention: move the action below the equipped gizmo strip. */
  const perkAction = $('[data-open-perks]', inventionModule);
  const gizmoGrid = $('.gizmo-grid', inventionModule);
  if (perkAction && gizmoGrid) {
    perkAction.textContent = '⚒  Change perks';
    perkAction.classList.add('attachment-action--footer');
    gizmoGrid.after(perkAction);
  }

  /* Archaeology gets a strong vertical instrument object using only CSS and a
     real Archaeology icon. No generated artwork is added to the site. */
  const archEnergy = $('.arch-energy-rail', monolithModule);
  const relicSockets = $('.monolith-slots', monolithModule);
  if (archEnergy && relicSockets && !$('.monolith-layout-v5', monolithModule)) {
    const layout = document.createElement('div');
    layout.className = 'monolith-layout-v5';

    const ornament = document.createElement('div');
    ornament.className = 'monolith-ornament';
    ornament.innerHTML = `
      <span class="monolith-ornament__cap">◇</span>
      <span class="game-icon" data-fallback="A"><img alt="" src="${ART_ROOT}skills/archaeology.webp"></span>
      <i></i><i></i><i></i>
      <span class="monolith-ornament__cap">◇</span>`;

    const body = document.createElement('div');
    body.className = 'monolith-body-v5';
    body.append(archEnergy, relicSockets);

    const changeRelics = document.createElement('button');
    changeRelics.type = 'button';
    changeRelics.className = 'attachment-action attachment-action--footer';
    changeRelics.textContent = 'Change relics';
    changeRelics.addEventListener('click', () => $('.relic-socket', relicSockets)?.click());
    body.append(changeRelics);

    layout.append(ornament, body);
    $('.attachment-block__head', monolithModule)?.after(layout);
  }

  /* Effects: the generated reference uses category tabs plus one compact
     More-buffs dropdown. Preserve all V4 coverage, but move its disclosure into
     the toolbar so it behaves like an actual overflow menu. */
  const effectsHead = $('.attachment-block__head', effectsModule);
  if (effectsHead) {
    $('h3', effectsHead)?.replaceChildren(document.createTextNode('Effects & Buffs'));
    const note = $('span', effectsHead);
    if (note) note.textContent = '10 active · common combat state';
  }

  const activeStrip = $('.active-effects-strip', effectsModule);
  activeStrip?.setAttribute('hidden', '');

  const categoryStage = $('.buff-category-stage.buff-direct-grid', effectsModule);
  const moreDetails = $('.more-effects-disclosure', effectsModule);
  if (categoryStage && !$('.effects-filter-bar', effectsModule)) {
    const filterBar = document.createElement('div');
    filterBar.className = 'effects-filter-bar';
    const tabs = document.createElement('div');
    tabs.className = 'effects-filter-tabs';

    const filters = [
      ['all', 'All'],
      ['debuff', 'Debuffs'],
      ['poison', 'Poison'],
      ['boosts', 'Boosts'],
      ['relics', 'Relics'],
      ['other', 'Other'],
    ];
    filters.forEach(([value, label], index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.effectFilter = value;
      button.textContent = label;
      if (index === 0) button.classList.add('is-active');
      tabs.append(button);
    });
    filterBar.append(tabs);
    if (moreDetails) {
      moreDetails.classList.add('more-effects-disclosure--menu');
      filterBar.append(moreDetails);
    }
    effectsHead?.after(filterBar);

    const directPanels = $$(':scope > [data-buff-panel]', categoryStage);
    const rare = $('.buff-rare', categoryStage);
    $$('[data-effect-filter]', tabs).forEach((button) => {
      button.addEventListener('click', () => {
        $$('[data-effect-filter]', tabs).forEach((item) => item.classList.toggle('is-active', item === button));
        const filter = button.dataset.effectFilter;
        directPanels.forEach((panel) => {
          panel.hidden = filter !== 'all' && panel.dataset.buffPanel !== filter;
        });
        if (rare) rare.hidden = filter !== 'all' && filter !== 'other';
      });
    });
  }

  /* Right rail: keep the fast summary but provide the exact explicit action in
     the reference for users who want the full worksheet. */
  if (!$('.view-full-breakdown', summaryRail)) {
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'view-full-breakdown';
    action.textContent = 'View full breakdown';
    action.addEventListener('click', () => {
      const sections = $$('.summary-section', summaryRail);
      const shouldOpen = sections.some((section) => !section.open);
      sections.forEach((section) => { section.open = shouldOpen; });
    });
    summaryRail.append(action);
  }

  if (!$('.prototype-tip')) {
    const tip = document.createElement('footer');
    tip.className = 'prototype-tip';
    tip.innerHTML = '<b>💡</b><span>Tip: Click any equipment slot, gizmo, or relic to open its catalogue and swap your setup.</span>';
    combatApp.after(tip);
  }

  $('.prototype-audit')?.setAttribute('hidden', '');
})();
