(() => {
  const selectors = {
    root: '[data-product-results-timeline]'
  };

  const setActiveTab = (root, nextTab, moveFocus = true) => {
    const tabs = Array.from(root.querySelectorAll('[data-tab-trigger]'));
    const panels = Array.from(root.querySelectorAll('[data-tab-panel]'));
    if (!nextTab) return;

    tabs.forEach((tab) => {
      const isSelected = tab === nextTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    panels.forEach((panel) => {
      const isSelected = panel.id === nextTab.dataset.target;
      panel.classList.toggle('is-active', isSelected);
      panel.hidden = !isSelected;
    });

    if (moveFocus) {
      nextTab.focus();
    }
  };

  const handleKeydown = (event, root) => {
    const tabs = Array.from(root.querySelectorAll('[data-tab-trigger]'));
    const currentIndex = tabs.indexOf(event.currentTarget);
    if (currentIndex < 0) return;

    let nextIndex = null;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % tabs.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = tabs.length - 1;
        break;
      default:
        break;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    setActiveTab(root, tabs[nextIndex]);
  };

  const initTimeline = (root) => {
    const tabs = root.querySelectorAll('[data-tab-trigger]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => setActiveTab(root, tab, false));
      tab.addEventListener('keydown', (event) => handleKeydown(event, root));
    });
  };

  document.querySelectorAll(selectors.root).forEach(initTimeline);
})();
