(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const makeDialog = ({ className, eyebrow, title, note }) => {
    const dialog = document.createElement('dialog');
    dialog.className = `picker-dialog ${className}`;
    dialog.innerHTML = `
      <div class="picker-dialog__shell">
        <header class="picker-dialog__head">
          <div><span>${eyebrow}</span><h2>${title}</h2></div>
          <p>${note}</p>
          <button type="button" class="picker-dialog__close" aria-label="Close picker">×</button>
        </header>
        <div class="picker-dialog__body"></div>
      </div>`;
    document.body.append(dialog);
    const close = $('.picker-dialog__close', dialog);
    close.addEventListener('click', () => dialog.close());
    return {
      dialog,
      body: $('.picker-dialog__body', dialog),
      title: $('.picker-dialog__head h2', dialog),
      note: $('.picker-dialog__head p', dialog),
    };
  };

  const gearPanel = $('[data-subpanel="gear"]');
  const gearGrid = $('.gear-stage-grid', gearPanel);
  const paperDoll = $('.paper-doll-zone', gearPanel);
  const equipmentBrowser = $('.equipment-browser', gearPanel);
  const buffsPanel = $('[data-subpanel="buffs"]');
  const archPanel = $('[data-subpanel="arch"]');
  const inventionPanel = $('[data-subpanel="invention"]');

  if (!gearPanel || !gearGrid || !paperDoll || !equipmentBrowser || !buffsPanel || !archPanel || !inventionPanel) {
    return;
  }

  $('.context-rail__caption')?.replaceChildren(document.createTextNode('LOADOUT'));
  const loadoutReadout = $('#loadout-focus-readout');
  if (loadoutReadout) loadoutReadout.textContent = 'Gear · prayer · gizmos · monolith';
  const gearHeading = $('.stage-heading', gearPanel);
  if (gearHeading) {
    const eyebrow = $('.eyebrow', gearHeading);
    const heading = $('h1', gearHeading);
    const copy = $('p', gearHeading);
    if (eyebrow) eyebrow.textContent = 'LOADOUT AT A GLANCE';
    if (heading) heading.textContent = 'Build the combat loadout';
    if (copy) copy.textContent = 'Equipment opens from its slot. Prayer, gizmos and monolith state stay directly on the loadout instead of living behind separate destinations.';
  }

  /* -----------------------------------------------------------------------
   * Equipment: selecting a doll slot opens the catalogue as a contextual
   * picker. The catalogue remains dense; it simply stops owning permanent
   * stage space when the user is not equipping something.
   * --------------------------------------------------------------------- */
  const equipmentPicker = makeDialog({
    className: 'equipment-picker-dialog',
    eyebrow: 'EQUIPMENT PICKER',
    title: 'Choose equipment',
    note: 'One slot in context · search and filters remain local',
  });
  equipmentPicker.body.append(equipmentBrowser);

  let currentSlot = $('.slot.is-selected[data-slot]', paperDoll) || $('.slot[data-slot]:not(:disabled)', paperDoll);
  let equipmentOpener = currentSlot;
  const equipmentRows = $$('.equipment-row', equipmentBrowser);
  const equipmentSearch = $('.search-field input[type="search"]', equipmentBrowser);
  const equipmentRegion = $('.select-field select', equipmentBrowser);
  const equipmentCount = $('.equipment-heading > strong', equipmentBrowser);
  const slotScope = $('#slot-scope', equipmentBrowser);

  const SLOT_ALIASES = {
    Helmet: ['helm', 'helmet'],
    Pocket: ['pocket'],
    Cape: ['cape'],
    Amulet: ['amulet'],
    Ammo: ['ammo', 'ammunition'],
    Weapon: ['mh', 'oh', '2h', 'main', 'off', 'weapon'],
    Body: ['body'],
    'Off-hand': ['oh', 'off'],
    Gloves: ['gloves'],
    Legs: ['legs'],
    Ring: ['ring'],
    Boots: ['boots'],
  };

  const rowSlot = (row) => (row.querySelector('em')?.textContent || '').trim().toLowerCase();
  const rowRegion = (row) => (row.querySelector('small')?.textContent || '').trim().toLowerCase();
  const rowName = (row) => (row.dataset.equipName || '').toLowerCase();

  const applyEquipmentFilters = () => {
    const slotName = currentSlot?.dataset.slot || '';
    const aliases = SLOT_ALIASES[slotName] || [];
    const slotCandidates = aliases.length
      ? equipmentRows.filter((row) => aliases.some((alias) => rowSlot(row).includes(alias)))
      : equipmentRows;
    const enforceSlot = slotCandidates.length > 0;
    const query = (equipmentSearch?.value || '').trim().toLowerCase();
    const region = (equipmentRegion?.value || 'All regions').toLowerCase();
    let visible = 0;

    equipmentRows.forEach((row) => {
      const matchesSlot = !enforceSlot || aliases.some((alias) => rowSlot(row).includes(alias));
      const matchesQuery = !query || rowName(row).includes(query);
      const matchesRegion = region === 'all regions' || rowRegion(row).includes(region);
      row.hidden = !(matchesSlot && matchesQuery && matchesRegion);
      if (!row.hidden) visible += 1;
    });

    if (slotScope) slotScope.textContent = slotName ? `${slotName} · sample catalogue` : 'All wearable slots';
    if (equipmentCount) equipmentCount.textContent = `${visible} shown`;
  };

  const openEquipmentPicker = (slot) => {
    if (!slot || slot.disabled || slot.classList.contains('empty-pad')) return;
    currentSlot = slot;
    equipmentOpener = slot;
    $$('.slot.is-selected', paperDoll).forEach((item) => item.classList.remove('is-selected'));
    slot.classList.add('is-selected');
    equipmentPicker.title.textContent = `Choose ${slot.dataset.slot}`;
    equipmentPicker.note.textContent = `${slot.dataset.slot} is the only active equip context`;
    applyEquipmentFilters();
    equipmentPicker.dialog.showModal();
    queueMicrotask(() => equipmentSearch?.focus());
  };

  $$('.slot[data-slot]', paperDoll).forEach((slot) => {
    slot.addEventListener('click', () => openEquipmentPicker(slot));
  });
  equipmentSearch?.addEventListener('input', applyEquipmentFilters);
  equipmentRegion?.addEventListener('change', applyEquipmentFilters);

  const replaceSlotIcon = (slot, row) => {
    const sourceIcon = $('.game-icon', row);
    const currentIcon = $('.game-icon, .empty-mark', slot);
    if (sourceIcon && currentIcon) currentIcon.replaceWith(sourceIcon.cloneNode(true));
  };

  equipmentRows.forEach((row) => {
    row.addEventListener('click', () => {
      if (!currentSlot) return;
      replaceSlotIcon(currentSlot, row);
      currentSlot.classList.remove('is-empty');
      currentSlot.classList.add('is-filled', 'is-selected');
      const slotName = $('strong', currentSlot);
      const slotMeta = $('em', currentSlot);
      if (slotName) slotName.textContent = row.dataset.equipName || 'Equipped item';
      if (slotMeta) slotMeta.textContent = $('em', row)?.textContent || '';

      const detail = $('.selected-item-row', paperDoll);
      if (detail) {
        const detailIcon = $('.game-icon', detail);
        const sourceIcon = $('.game-icon', row);
        if (detailIcon && sourceIcon) detailIcon.replaceWith(sourceIcon.cloneNode(true));
      }
      const detailName = $('#selected-slot-name');
      const detailMeta = $('#selected-slot-meta');
      if (detailName) detailName.textContent = row.dataset.equipName || 'Equipped item';
      if (detailMeta) detailMeta.textContent = row.dataset.equipMeta || '';
      equipmentPicker.dialog.close();
    });
  });
  equipmentPicker.dialog.addEventListener('close', () => equipmentOpener?.focus());

  /* -----------------------------------------------------------------------
   * Prayer: move the same-style prayer choices out of Buffs and directly
   * below the paper doll. This removes a full navigation hop for a state that
   * behaves much more like loadout stance than a miscellaneous temporary buff.
   * --------------------------------------------------------------------- */
  const prayerPanel = $('[data-buff-panel="prayers"]', buffsPanel);
  const prayerGrid = prayerPanel ? $('.icon-choice-grid', prayerPanel) : null;
  if (prayerGrid) {
    const prayerStrip = document.createElement('section');
    prayerStrip.className = 'prayer-strip';
    prayerStrip.innerHTML = `
      <div class="prayer-strip__head"><h3>Prayer / curse</h3><span>same-style · direct</span></div>`;

    const none = document.createElement('button');
    none.type = 'button';
    none.className = 'icon-choice prayer-none';
    none.innerHTML = '<span class="game-icon" data-fallback="—"></span><span><strong>None</strong><small>No damage prayer</small></span>';
    prayerGrid.prepend(none);
    prayerStrip.append(prayerGrid);
    $('.selected-item-row', paperDoll)?.after(prayerStrip);

    const prayerChoices = $$('.icon-choice', prayerGrid);
    prayerChoices.forEach((choice) => {
      choice.setAttribute('aria-pressed', String(choice.classList.contains('is-on')));
      choice.addEventListener('click', () => {
        prayerChoices.forEach((item) => {
          const on = item === choice;
          item.classList.toggle('is-on', on);
          item.setAttribute('aria-pressed', String(on));
        });
      });
    });

    $('[data-buff-cat="prayers"]', buffsPanel)?.remove();
    $('[data-buff-open="prayers"]', buffsPanel)?.remove();
    prayerPanel.remove();
  }

  /* -----------------------------------------------------------------------
   * Invention: gizmos stay on the loadout; the perk library becomes a picker.
   * --------------------------------------------------------------------- */
  const attachmentStage = document.createElement('section');
  attachmentStage.className = 'loadout-attachment-stage';
  attachmentStage.innerHTML = `
    <header class="attachment-stage-head">
      <div><span class="eyebrow">COMBAT ATTACHMENTS</span><h2>Invention &amp; Archaeology</h2></div>
      <p>Persistent equipped state stays visible. Catalogues appear only when a slot needs a choice.</p>
    </header>`;
  gearGrid.append(attachmentStage);

  const inventionWorkbench = $('.invention-workbench', inventionPanel);
  const perkLibrary = $('.perk-library', inventionWorkbench);
  const gizmoStage = $('.gizmo-stage', inventionWorkbench);
  const inventionBlock = document.createElement('section');
  inventionBlock.className = 'attachment-block invention-module';
  inventionBlock.innerHTML = `
    <header class="attachment-block__head">
      <div><h3>Invention</h3><span>Gizmos are equipped state, not a separate page</span></div>
      <button type="button" class="attachment-action" data-open-perks>Perk library</button>
    </header>`;
  if (gizmoStage) inventionBlock.append(gizmoStage);
  attachmentStage.append(inventionBlock);

  const perkPicker = makeDialog({
    className: 'perk-picker-dialog',
    eyebrow: 'PERK PICKER',
    title: 'Choose a perk',
    note: 'Applied to the currently selected gizmo',
  });
  if (perkLibrary) perkPicker.body.append(perkLibrary);

  let activeGizmo = $('.gizmo.is-active', gizmoStage) || $('.gizmo', gizmoStage);
  const selectGizmo = (gizmo) => {
    if (!gizmo) return;
    activeGizmo = gizmo;
    $$('.gizmo', gizmoStage).forEach((item) => item.classList.toggle('is-active', item === gizmo));
    const label = $('header span', gizmo)?.childNodes?.[0]?.textContent?.trim() || 'gizmo';
    perkPicker.title.textContent = `Choose perk · ${label}`;
  };
  const openPerkPicker = () => {
    if (!activeGizmo) return;
    perkPicker.dialog.showModal();
    queueMicrotask(() => $('.perk-library input[type="search"]', perkPicker.dialog)?.focus());
  };

  $$('.gizmo', gizmoStage).forEach((gizmo) => {
    $('header', gizmo)?.addEventListener('click', () => selectGizmo(gizmo));
    $('.empty-gizmo-slot', gizmo)?.addEventListener('click', () => {
      selectGizmo(gizmo);
      openPerkPicker();
    });
  });
  $('[data-open-perks]', inventionBlock)?.addEventListener('click', openPerkPicker);

  $$('.perk-list button', perkLibrary).forEach((perk) => {
    perk.addEventListener('click', () => {
      if (!activeGizmo) return;
      const name = $('strong', perk)?.textContent || 'Perk';
      const icon = $('.game-icon', perk)?.cloneNode(true);
      let target = $('.empty-gizmo-slot', activeGizmo);
      if (!target) target = $$('.placed-perk', activeGizmo).at(-1) || null;
      if (!target) return;
      const placed = document.createElement('div');
      placed.className = 'placed-perk';
      if (icon) placed.append(icon);
      const label = document.createElement('strong');
      label.textContent = name;
      placed.append(label);
      const rank = document.createElement('span');
      rank.className = 'rank-step';
      rank.innerHTML = '− <b>R1</b> +';
      placed.append(rank);
      target.replaceWith(placed);
      const count = $$('.placed-perk', activeGizmo).length;
      const countLabel = $('header > b', activeGizmo);
      if (countLabel) countLabel.textContent = `${count} / 2`;
      perkPicker.dialog.close();
    });
  });

  /* -----------------------------------------------------------------------
   * Archaeology: compact monolith sockets on the loadout; relic catalogue in
   * a contextual picker. Clicking a relic is the selection action — no second
   * confirmation step is added.
   * --------------------------------------------------------------------- */
  const archEnergy = $('.arch-energy-rail', archPanel);
  const archWorkbench = $('.arch-workbench', archPanel);
  const relicRows = $$('[data-relic]', archWorkbench);
  const monolithBlock = document.createElement('section');
  monolithBlock.className = 'attachment-block monolith-module';
  monolithBlock.innerHTML = `
    <header class="attachment-block__head">
      <div><h3>Archaeology</h3><span>Energy stays visible · click a relic socket to replace it</span></div>
    </header>`;
  if (archEnergy) monolithBlock.append(archEnergy);
  const sockets = document.createElement('div');
  sockets.className = 'monolith-slots';
  monolithBlock.append(sockets);
  attachmentStage.append(monolithBlock);

  const relicPicker = makeDialog({
    className: 'relic-picker-dialog',
    eyebrow: 'MONOLITH PICKER',
    title: 'Choose archaeology relic',
    note: 'Select once to replace the active socket',
  });
  if (archWorkbench) relicPicker.body.append(archWorkbench);

  let activeRelicSocket = null;
  const socketFromRow = (row, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'relic-socket';
    button.dataset.energy = row?.dataset.relicEnergy || '0';
    button.dataset.name = row?.dataset.relic || 'Empty';
    const icon = $('.game-icon', row)?.cloneNode(true) || document.createElement('span');
    if (!icon.classList.contains('game-icon')) {
      icon.className = 'game-icon';
      icon.dataset.fallback = '—';
    }
    const slot = document.createElement('small');
    slot.textContent = `Slot ${index + 1}`;
    const name = document.createElement('strong');
    name.textContent = button.dataset.name;
    const energy = document.createElement('em');
    energy.textContent = button.dataset.energy;
    button.append(icon, slot, name, energy);
    button.addEventListener('click', () => {
      activeRelicSocket = button;
      $$('.relic-socket', sockets).forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      relicPicker.title.textContent = `Choose relic · Slot ${index + 1}`;
      relicPicker.dialog.showModal();
    });
    return button;
  };

  relicRows.slice(0, 3).forEach((row, index) => sockets.append(socketFromRow(row, index)));

  const updateMonolithMeter = () => {
    const allSockets = $$('.relic-socket', sockets);
    const used = allSockets.reduce((sum, socket) => sum + Number(socket.dataset.energy || 0), 0);
    const cap = 650;
    const summary = $('.energy-meter span', monolithBlock);
    const fill = $('.energy-meter u', monolithBlock);
    if (summary) summary.innerHTML = `<b>${used}</b> / ${cap} · ${Math.max(0, cap - used)} free · ${allSockets.length} / 3 active`;
    if (fill) fill.style.width = `${Math.min(100, (used / cap) * 100)}%`;
  };
  updateMonolithMeter();

  relicRows.forEach((row) => {
    row.addEventListener('click', () => {
      if (!activeRelicSocket) return;
      const icon = $('.game-icon', row)?.cloneNode(true);
      const currentIcon = $('.game-icon', activeRelicSocket);
      if (icon && currentIcon) currentIcon.replaceWith(icon);
      activeRelicSocket.dataset.name = row.dataset.relic || 'Relic';
      activeRelicSocket.dataset.energy = row.dataset.relicEnergy || '0';
      $('strong', activeRelicSocket).textContent = activeRelicSocket.dataset.name;
      $('em', activeRelicSocket).textContent = activeRelicSocket.dataset.energy;
      updateMonolithMeter();
      relicPicker.dialog.close();
    });
  });

  /* The old standalone pages are now intentionally redundant in this lens. */
  $('[data-subtab="arch"]')?.remove();
  $('[data-subtab="invention"]')?.remove();
  archPanel.remove();
  inventionPanel.remove();

  /* -----------------------------------------------------------------------
   * Buffs: V1 over-corrected into a click-heavy category browser. With prayer
   * moved away, the remaining common groups fit comfortably as direct sections.
   * --------------------------------------------------------------------- */
  const buffWorkbench = $('.buff-workbench', buffsPanel);
  const buffStage = $('.buff-category-stage', buffsPanel);
  $('.mini-context', buffWorkbench)?.remove();
  buffWorkbench?.classList.add('buff-direct-workbench');
  buffStage?.classList.add('buff-direct-grid');

  const directOrder = ['debuff', 'poison', 'boosts', 'relics'];
  directOrder.forEach((name) => {
    const panel = $(`[data-buff-panel="${name}"]`, buffStage);
    if (panel) buffStage.append(panel);
  });
  const leaguePanel = $('[data-buff-panel="league"]', buffStage);
  if (leaguePanel) {
    const rare = document.createElement('details');
    rare.className = 'support-disclosure buff-rare';
    rare.innerHTML = '<summary><span>League / rare effects</span><strong>expand when needed</strong></summary>';
    rare.append(leaguePanel);
    buffStage.append(rare);
  }

  const buffHeading = $('.stage-heading p', buffsPanel);
  if (buffHeading) buffHeading.textContent = 'Common effects are direct controls again. Prayer moved to Loadout; only League-specific state remains collapsed.';

  $$('[data-buff-open]', buffsPanel).forEach((button) => {
    button.addEventListener('click', () => {
      const target = $(`[data-buff-panel="${button.dataset.buffOpen}"]`, buffsPanel);
      target?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  });

  /* Keep the right rail a glance surface, but add the newly co-located state so
     the consolidation does not make prayer/perk/relic choices invisible. */
  const summary = $('.summary-rail');
  const glance = $('.glance-metrics', summary);
  if (summary && glance) {
    const state = document.createElement('div');
    state.className = 'loadout-state-summary';
    state.innerHTML = `
      <span><small>Prayer</small><strong>Malevolence</strong></span>
      <span><small>Gizmos</small><strong>5 / 8 perks</strong></span>
      <span><small>Monolith</small><strong>3 / 3 relics</strong></span>`;
    glance.after(state);
  }
})();
