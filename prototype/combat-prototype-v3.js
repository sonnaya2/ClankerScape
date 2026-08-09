(() => {
  const $ = (selector, root = document) => root.querySelector(selector);

  const gearPanel = $('[data-subpanel="gear"]');
  const statsPanel = $('[data-subpanel="stats"]');
  const buffsPanel = $('[data-subpanel="buffs"]');
  const attachmentStage = $('.loadout-attachment-stage', gearPanel);
  const inventionBlock = $('.invention-module', attachmentStage);
  const monolithBlock = $('.monolith-module', attachmentStage);

  if (!gearPanel || !statsPanel || !buffsPanel || !attachmentStage || !inventionBlock || !monolithBlock) return;

  $('[data-subtab="stats"]')?.remove();
  $('[data-subtab="buffs"]')?.remove();

  const readout = $('#loadout-focus-readout');
  if (readout) readout.textContent = 'Gear · stats · prayer · gizmos · monolith · effects';

  const heading = $('.stage-heading', gearPanel);
  if (heading) {
    $('.eyebrow', heading)?.replaceChildren(document.createTextNode('COMBAT LOADOUT'));
    $('h1', heading)?.replaceChildren(document.createTextNode('Everything equipped, in one place'));
    $('p', heading)?.replaceChildren(document.createTextNode('Choose gear from its slot, then tune stats, prayer, gizmos, relics and common effects without leaving the loadout.'));
  }

  const statsGroups = $('.stats-groups', statsPanel);
  if (statsGroups) {
    const statsModule = document.createElement('section');
    statsModule.className = 'loadout-stats-module';
    statsModule.innerHTML = `
      <header class="attachment-block__head">
        <div><h3>Stats</h3><span>Core inputs · resolved output stays in Setup Summary</span></div>
      </header>`;
    statsModule.append(statsGroups);
    attachmentStage.insertBefore(statsModule, inventionBlock);
  }

  const coreGrid = document.createElement('div');
  coreGrid.className = 'attachment-core-grid';
  inventionBlock.before(coreGrid);
  coreGrid.append(inventionBlock, monolithBlock);

  const inventionHead = $('.attachment-block__head span', inventionBlock);
  if (inventionHead) inventionHead.textContent = 'Four gizmos · perk catalogue opens only when needed';
  const archHead = $('.attachment-block__head span', monolithBlock);
  if (archHead) archHead.textContent = 'Vertical monolith · click a socket to replace';

  const activeEffects = $('.active-effects-strip', buffsPanel);
  const buffWorkbench = $('.buff-workbench', buffsPanel);
  if (activeEffects || buffWorkbench) {
    const effectsModule = document.createElement('section');
    effectsModule.className = 'loadout-effects-module';
    effectsModule.innerHTML = `
      <header class="attachment-block__head">
        <div><h3>Effects</h3><span>Debuff · poison · boosts · combat relics · rare League state</span></div>
      </header>`;
    if (activeEffects) effectsModule.append(activeEffects);
    if (buffWorkbench) effectsModule.append(buffWorkbench);
    attachmentStage.append(effectsModule);
  }

  statsPanel.setAttribute('aria-hidden', 'true');
  buffsPanel.setAttribute('aria-hidden', 'true');
})();
