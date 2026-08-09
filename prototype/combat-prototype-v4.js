(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const ART_ROOT = 'https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/';

  const statsModule = $('.loadout-stats-module');
  const inventionModule = $('.invention-module');
  const effectsModule = $('.loadout-effects-module');
  if (!statsModule || !inventionModule || !effectsModule) return;

  /* ---------------------------------------------------------------------
   * Stats: equipped weapons already define setup/tier. The only league-state
   * fact worth repeating here is whether Genesis Essence is overriding them.
   * ------------------------------------------------------------------- */
  const weaponSection = $$('.stats-groups > section', statsModule).find(
    (section) => $('h2', section)?.textContent?.trim().toLowerCase() === 'weapon',
  );
  weaponSection?.remove();
  statsModule.classList.add('stats-with-resolved-genesis');

  const statsHead = $('.attachment-block__head', statsModule);
  if (statsHead) {
    const note = $('span', statsHead);
    if (note) note.textContent = 'Core inputs · weapon state resolves from equipped gear';

    const genesis = document.createElement('div');
    genesis.className = 'genesis-resolved is-active';
    genesis.dataset.genesisActive = 'true';
    genesis.title = 'Genesis Essence is active: equipped weapons are treated as tier 120.';
    genesis.innerHTML = `
      <span>Genesis Essence</span>
      <strong>Active</strong>
      <em>T120</em>`;
    statsHead.append(genesis);
  }

  /* ---------------------------------------------------------------------
   * Invention: the four equipped gizmos are state, so show them as a compact
   * strip rather than four tall mini-panels with blank vertical space.
   * ------------------------------------------------------------------- */
  inventionModule.classList.add('invention-compact-strip');
  const inventionNote = $('.attachment-block__head span', inventionModule);
  if (inventionNote) inventionNote.textContent = 'Four equipped gizmos · click one, then open the perk library';

  /* ---------------------------------------------------------------------
   * Buff reconciliation against the real Equilibrium BuffsPanel.
   * Common combat effects remain directly visible above. The categories that
   * do not deserve permanent canvas space live in one native disclosure.
   * ------------------------------------------------------------------- */
  const makeIcon = (path, fallback) => {
    const span = document.createElement('span');
    span.className = 'game-icon';
    span.dataset.fallback = fallback;
    if (path) {
      const img = document.createElement('img');
      img.alt = '';
      img.src = ART_ROOT + path;
      img.addEventListener('error', () => { img.hidden = true; }, { once: true });
      span.append(img);
    }
    return span;
  };

  const makeToggle = ({ label, detail, icon, fallback = '•', active = false }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `overflow-buff-row${active ? ' is-on' : ''}`;
    button.setAttribute('aria-pressed', String(active));
    button.append(makeIcon(icon, fallback));
    const copy = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = label;
    const small = document.createElement('small');
    small.textContent = detail;
    copy.append(strong, small);
    button.append(copy);
    button.addEventListener('click', () => {
      const on = !button.classList.contains('is-on');
      button.classList.toggle('is-on', on);
      button.setAttribute('aria-pressed', String(on));
    });
    return button;
  };

  const makeInfo = ({ label, detail, state }) => {
    const row = document.createElement('div');
    row.className = 'overflow-info-row';
    const copy = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = label;
    const small = document.createElement('small');
    small.textContent = detail;
    copy.append(strong, small);
    const value = document.createElement('em');
    value.textContent = state;
    row.append(copy, value);
    return row;
  };

  const makeGroup = (title, subtitle) => {
    const section = document.createElement('section');
    section.className = 'overflow-buff-group';
    const header = document.createElement('header');
    const heading = document.createElement('h4');
    heading.textContent = title;
    const note = document.createElement('span');
    note.textContent = subtitle;
    header.append(heading, note);
    const body = document.createElement('div');
    body.className = 'overflow-buff-list';
    section.append(header, body);
    return { section, body };
  };

  const more = document.createElement('details');
  more.className = 'more-effects-disclosure';
  more.innerHTML = `
    <summary>
      <span><strong>More buffs &amp; details</strong><small>Account unlocks, enchantments, blessings, defence/life and source state</small></span>
      <em>6 groups</em>
    </summary>`;
  const moreBody = document.createElement('div');
  moreBody.className = 'more-effects-grid';
  more.append(moreBody);

  const skillcapes = makeGroup('Skillcape perks', 'Combat cape passives');
  skillcapes.body.append(
    makeInfo({ label: 'Strength cape (99)', detail: 'Dismember gets three extra bleed hits', state: 'Shown above' }),
    makeToggle({ label: 'Attack cape (120)', detail: '+2% melee hit chance', icon: 'skills/attack.webp', fallback: 'A' }),
  );

  const unlocks = makeGroup('Account unlocks', 'Persistent combat unlocks');
  unlocks.body.append(
    makeToggle({ label: 'Ring of Vigour Passive', detail: '+10 adren after ultimates · specials cost 90% · does not stack', icon: 'upgrades/permanent-unlocks/ring-of-vigour.webp', fallback: 'R', active: true }),
    makeToggle({ label: 'Ensouled spectral lens', detail: 'Full Slayer Helmet upgrade · Necromancy Slayer Spirit on task', icon: 'upgrades/permanent-unlocks/slayer-helmet.webp', fallback: 'S' }),
    makeInfo({ label: 'Slayer helmet stand', detail: 'Anachronia Slayer Lodge · stronger tier wins vs equipped helm', state: 'None' }),
    makeInfo({ label: 'Salve amulet', detail: 'Resolved from equipped amulet + undead target state', state: 'Auto' }),
  );

  const enchantments = makeGroup('Account enchantments', 'Equipment enchantment unlocks');
  enchantments.body.append(
    makeToggle({ label: 'Agony', detail: 'Enhances Enduring Ruin with enhanced Gloves of Passage', icon: 'upgrades/enchantments/agony.webp', fallback: 'A' }),
    makeToggle({ label: 'Heroism', detail: "Champion's ring crit scaling per active bleed", icon: 'upgrades/enchantments/heroism.webp', fallback: 'H' }),
    makeToggle({ label: 'Shadows', detail: "Stalker's ring bow crit bonuses", icon: 'upgrades/enchantments/shadows.webp', fallback: 'S' }),
    makeToggle({ label: 'Metaphysics', detail: "Channeller's ring successive-channel crit damage", icon: 'upgrades/enchantments/metaphysics.webp', fallback: 'M' }),
  );

  const blessings = makeGroup('Equilibrium blessings', 'Resolved from Build');
  blessings.body.append(
    makeInfo({ label: 'Genesis Essence', detail: 'Equipped weapons are treated as tier 120', state: 'Active' }),
    makeInfo({ label: 'Tempered Heart', detail: 'Generates adrenaline on its league cadence', state: 'Active' }),
    makeInfo({ label: 'Lord of Light', detail: 'Basic attacks can trigger Light of Saradomin', state: 'Active' }),
    makeInfo({ label: 'True Equilibrium', detail: 'Current God/Blessing state comes from Build', state: 'Modeled' }),
  );

  const life = makeGroup('Defence & life', 'Common max-life and defensive modifiers');
  life.body.append(
    makeToggle({ label: 'Fortitude', detail: '+15% Defence in block calculation · increases max LP', icon: 'combat/prayers/ancient-curses/fortitude.webp', fallback: 'F' }),
    makeToggle({ label: 'Reaper Crew', detail: '+200 maximum life points', icon: 'upgrades/permanent-unlocks/reaper-crew.webp', fallback: 'R' }),
    makeToggle({ label: 'Font of Life', detail: '+500 maximum life points', icon: 'upgrades/permanent-unlocks/font-of-life.webp', fallback: 'F' }),
    makeToggle({ label: 'Boon of Het', detail: '+5% of Constitution life to maximum life points', icon: 'upgrades/permanent-unlocks/blessing-of-het.webp', fallback: 'H' }),
    makeToggle({ label: 'Thermal bath', detail: '+3 max LP per Constitution level for its active window', fallback: 'B' }),
    makeToggle({ label: 'Totem of Vitality', detail: 'Up to +1,500 maximum life points · replaces bonfire boost', icon: 'upgrades/permanent-unlocks/totem-of-vitality.webp', fallback: 'T' }),
    makeToggle({ label: 'Powerburst of vitality', detail: 'Doubles current and maximum LP for 6 seconds', icon: 'upgrades/skilling-production/powerburst-of-vitality.webp', fallback: 'P' }),
  );

  const sources = makeGroup('Status & sources', 'Settings that need context more than screen space');
  const controls = document.createElement('div');
  controls.className = 'overflow-source-controls';
  controls.innerHTML = `
    <label><span>Bonfire</span><select><option>None</option><option>Elder logs</option><option>Magic logs</option></select></label>
    <label><span>Overheal</span><select><option>None</option><option>Rocktail / sailfish · 110%</option><option>Soup · 115%</option><option>Saradomin brew</option></select></label>`;
  sources.body.append(
    controls,
    makeInfo({ label: 'Ring of Vigour', detail: 'Equipped ring and passive unlock share one effect', state: 'No stack' }),
    makeInfo({ label: 'Support state', detail: 'Partial / Scenario / Unmodeled remains visible where relevant', state: 'Explicit' }),
  );

  moreBody.append(
    skillcapes.section,
    unlocks.section,
    enchantments.section,
    blessings.section,
    life.section,
    sources.section,
  );
  effectsModule.append(more);
})();
