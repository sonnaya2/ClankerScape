(() => {
  const ART_ROOT = 'https://raw.githubusercontent.com/sonnaya2/Equilibrium/f6f4a8f91fa8b0e04373c45173f7089751eca9df/public/game/';

  document.querySelectorAll('img[data-game]').forEach((img) => {
    img.src = ART_ROOT + img.dataset.game;
    img.addEventListener('error', () => {
      img.hidden = true;
    }, { once: true });
  });

  const selectButtons = (selector, active) => {
    document.querySelectorAll(selector).forEach((button) => {
      const on = button === active;
      button.classList.toggle('is-active', on);
      if (button.getAttribute('role') === 'tab') {
        button.setAttribute('aria-selected', String(on));
      }
    });
  };

  document.querySelectorAll('[data-main-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      selectButtons('[data-main-tab]', button);
      document.querySelectorAll('[data-main-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.mainPanel === button.dataset.mainTab);
      });
    });
  });

  const summaryForSubtab = {
    gear: ['offence', 'defence'],
    stats: ['offence', 'defence', 'resources'],
    buffs: ['resources'],
    arch: ['resources'],
    invention: ['offence'],
    abilities: ['offence'],
    target: ['defence'],
  };

  const subtabLabel = {
    gear: 'Gear · all slots',
    stats: 'Stats · inputs vs resolved',
    buffs: 'Buffs · active effects',
    arch: 'Arch · monolith',
    invention: 'Invention · gizmos',
    abilities: 'Abilities · loadout',
    target: 'Target · core NPC',
  };

  const activateSubtab = (name) => {
    const button = document.querySelector(`[data-subtab="${name}"]`);
    if (!button) return;
    selectButtons('[data-subtab]', button);
    document.querySelectorAll('[data-subpanel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.subpanel === name);
    });
    const readout = document.querySelector('#loadout-focus-readout');
    if (readout) readout.textContent = subtabLabel[name] || name;
    document.querySelectorAll('[data-summary]').forEach((detail) => {
      detail.open = (summaryForSubtab[name] || []).includes(detail.dataset.summary);
    });
  };

  document.querySelectorAll('[data-subtab]').forEach((button) => {
    button.addEventListener('click', () => activateSubtab(button.dataset.subtab));
  });
  document.querySelectorAll('[data-jump-subtab]').forEach((button) => {
    button.addEventListener('click', () => activateSubtab(button.dataset.jumpSubtab));
  });

  document.querySelectorAll('.slot[data-slot]').forEach((slot) => {
    slot.addEventListener('click', () => {
      document.querySelectorAll('.slot').forEach((item) => item.classList.remove('is-selected'));
      slot.classList.add('is-selected');
      const scope = document.querySelector('#slot-scope');
      if (scope) scope.textContent = `${slot.dataset.slot} only`;
      const name = document.querySelector('#selected-slot-name');
      const meta = document.querySelector('#selected-slot-meta');
      if (name) {
        name.textContent = slot.querySelector('strong')?.textContent?.replace('...', '') || slot.dataset.slot;
      }
      if (meta) meta.textContent = `${slot.dataset.slot} selected · catalogue scoped`;
    });
  });

  document.querySelectorAll('.equipment-row').forEach((row) => {
    row.addEventListener('click', () => {
      document.querySelectorAll('.equipment-row').forEach((item) => item.classList.remove('is-selected'));
      row.classList.add('is-selected');
      const name = document.querySelector('#selected-slot-name');
      const meta = document.querySelector('#selected-slot-meta');
      if (name) name.textContent = row.dataset.equipName;
      if (meta) meta.textContent = row.dataset.equipMeta;
    });
  });

  const updateFilterCount = () => {
    const count = [...document.querySelectorAll('[data-advanced-filter]')].filter((el) => el.checked).length;
    const label = document.querySelector('[data-filter-count]');
    if (label) label.textContent = count ? `· ${count}` : '';
  };

  document.querySelectorAll('[data-advanced-filter]').forEach((input) => {
    input.addEventListener('change', updateFilterCount);
  });
  updateFilterCount();

  const activateBuff = (name) => {
    const button = document.querySelector(`[data-buff-cat="${name}"]`);
    if (!button) return;
    selectButtons('[data-buff-cat]', button);
    document.querySelectorAll('[data-buff-panel]').forEach((panel) => {
      panel.classList.toggle('is-active', panel.dataset.buffPanel === name);
    });
  };

  document.querySelectorAll('[data-buff-cat]').forEach((button) => {
    button.addEventListener('click', () => activateBuff(button.dataset.buffCat));
  });
  document.querySelectorAll('[data-buff-open]').forEach((button) => {
    button.addEventListener('click', () => activateBuff(button.dataset.buffOpen));
  });

  document.querySelectorAll('[data-relic]').forEach((row) => {
    row.addEventListener('click', () => {
      document.querySelectorAll('[data-relic]').forEach((item) => item.classList.remove('is-selected'));
      row.classList.add('is-selected');
      document.querySelector('#relic-inspector-name').textContent = row.dataset.relic;
      document.querySelector('#relic-inspector-detail').textContent = row.dataset.relicDetail;
      document.querySelector('#relic-inspector-energy').textContent = row.dataset.relicEnergy;
    });
  });

  document.querySelectorAll('[data-ability]').forEach((row) => {
    row.addEventListener('click', () => {
      document.querySelectorAll('[data-ability]').forEach((item) => item.classList.remove('is-selected'));
      row.classList.add('is-selected');
      document.querySelector('#ability-inspector-name').textContent = row.dataset.ability;
      document.querySelector('#ability-band').textContent = row.dataset.band;
      document.querySelector('#ability-expected').textContent = row.dataset.expected;
    });
  });

  document.querySelectorAll('[data-result-view]').forEach((button) => {
    button.addEventListener('click', () => {
      selectButtons('[data-result-view]', button);
      document.querySelectorAll('[data-result-panel]').forEach((panel) => {
        panel.classList.toggle('is-active', panel.dataset.resultPanel === button.dataset.resultView);
      });
    });
  });

  const optimizer = document.querySelector('[data-optimizer-dock]');
  document.querySelector('[data-optimize-toggle]')?.addEventListener('click', () => {
    if (optimizer) optimizer.open = !optimizer.open;
  });

  let runTimer;
  document.querySelector('[data-run-prototype]')?.addEventListener('click', (event) => {
    const button = event.currentTarget;
    const progress = document.querySelector('[data-run-progress]');
    clearTimeout(runTimer);
    if (progress) progress.hidden = false;
    button.disabled = true;
    button.textContent = 'Scanning…';
    runTimer = setTimeout(() => {
      if (progress) progress.hidden = true;
      button.disabled = false;
      button.textContent = 'Run bar';
      document.querySelector('[data-result-view="overview"]')?.click();
    }, 900);
  });

  const lensClass = {
    focused: 'prototype-focused',
    instrument: 'prototype-instrument',
    print: 'prototype-print',
    compact: 'prototype-compact',
  };

  document.querySelectorAll('[data-lens]').forEach((button) => {
    button.addEventListener('click', () => {
      Object.values(lensClass).forEach((cls) => document.body.classList.remove(cls));
      document.body.classList.add(lensClass[button.dataset.lens] || lensClass.focused);
      selectButtons('[data-lens]', button);
    });
  });
})();
