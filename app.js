const papers = window.PAPERS || [];
const stressTests = window.STRESS_TESTS || [];
const PAGE_SIZE = 48;

const state = {
  query: '',
  category: 'All',
  tag: 'All',
  year: 'All',
  sort: 'relevance',
  visiblePapers: PAGE_SIZE,
  stressQuery: '',
  stressDimension: 'All',
};

const quickQueries = [
  'Nano Banana',
  'GPT-Image-2',
  'Qwen-Image',
  'flow matching',
  'typography',
  'world model',
  'DPO GRPO',
  'agentic editing',
];

const els = {
  input: document.querySelector('#search-input'),
  quick: document.querySelector('#quick-queries'),
  categories: document.querySelector('#category-filters'),
  tags: document.querySelector('#tag-filters'),
  results: document.querySelector('#paper-results'),
  summary: document.querySelector('#results-summary'),
  empty: document.querySelector('#empty-state'),
  sort: document.querySelector('#sort-select'),
  clear: document.querySelector('#clear-filters'),
  activeFilters: document.querySelector('#active-filters'),
  loadMore: document.querySelector('#load-more'),
  yearBars: document.querySelector('#year-bars'),
  taskCloud: document.querySelector('#task-cloud'),
  paperCount: document.querySelector('#paper-count'),
  categoryCount: document.querySelector('#category-count'),
  taskCount: document.querySelector('#task-count'),
  stressInput: document.querySelector('#stress-search'),
  stressFilters: document.querySelector('#stress-filters'),
  stressResults: document.querySelector('#stress-results'),
  stressSummary: document.querySelector('#stress-summary'),
  stressClear: document.querySelector('#clear-stress'),
  modal: document.querySelector('#stress-modal'),
  modalContent: document.querySelector('#modal-content'),
  paperModal: document.querySelector('#paper-modal'),
  paperModalContent: document.querySelector('#paper-modal-content'),
  citationCopy: document.querySelector('#copy-citation'),
  citationBibtex: document.querySelector('#citation-bibtex'),
};

const normalize = (value) => (value || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const unique = (items) => [...new Set(items.filter(Boolean))];
const debounce = (fn, delay = 120) => {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
};
const escapeHtml = (value) => (value || '').toString().replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[char]);

function scorePaper(paper, query) {
  if (!query) return 1;
  const q = normalize(query);
  const title = normalize(paper.title);
  const note = normalize(paper.note);
  const venue = normalize(paper.venue);
  const category = normalize(paper.category);
  const authors = normalize(paper.authors);
  const key = normalize(paper.key);
  const sections = normalize((paper.sections || []).join(' '));
  const tags = normalize((paper.tags || []).join(' '));
  const haystack = `${title} ${note} ${venue} ${category} ${authors} ${key} ${sections} ${tags}`;
  const tokens = q.split(' ').filter(Boolean);
  let score = 0;

  if (title.includes(q)) score += 16;
  if (note.includes(q)) score += 8;
  if (tags.includes(q)) score += 7;
  if (authors.includes(q)) score += 6;
  if (key.includes(q)) score += 8;
  if (category.includes(q)) score += 5;

  for (const token of tokens) {
    if (title.includes(token)) score += 5;
    if (note.includes(token)) score += 2;
    if (venue.includes(token)) score += 1;
    if (authors.includes(token)) score += 2;
    if (key.includes(token)) score += 3;
    if (sections.includes(token)) score += 2;
    if (tags.includes(token)) score += 3;
  }

  return haystack.includes(q) || score > 0 ? score : 0;
}

function getFiltered() {
  const rows = papers
    .map((paper) => ({ ...paper, score: scorePaper(paper, state.query) }))
    .filter((paper) => paper.score > 0)
    .filter((paper) => state.category === 'All' || paper.category === state.category)
    .filter((paper) => state.tag === 'All' || (paper.tags || []).includes(state.tag))
    .filter((paper) => state.year === 'All' || String(paper.year || '') === state.year);

  rows.sort((a, b) => {
    if (state.sort === 'year-desc') return (b.year || 0) - (a.year || 0) || a.title.localeCompare(b.title);
    if (state.sort === 'year-asc') return (a.year || 9999) - (b.year || 9999) || a.title.localeCompare(b.title);
    if (state.sort === 'title') return a.title.localeCompare(b.title);
    return b.score - a.score || (b.year || 0) - (a.year || 0) || a.id - b.id;
  });
  return rows;
}

function resetPaperWindow() {
  state.visiblePapers = PAGE_SIZE;
}

function renderQuickQueries() {
  els.quick.innerHTML = quickQueries.map((query) => `<button class="chip" type="button" data-query="${escapeHtml(query)}">${escapeHtml(query)}</button>`).join('');
  els.quick.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.query = button.dataset.query;
      els.input.value = state.query;
      resetPaperWindow();
      render();
      els.input.focus();
    });
  });
}

function renderFilters() {
  const categories = ['All', ...unique(papers.map((paper) => paper.category))];
  const tags = ['All', ...unique(papers.flatMap((paper) => paper.tags || [])).sort()];
  const countByCategory = Object.fromEntries(categories.map((category) => [category, category === 'All' ? papers.length : papers.filter((paper) => paper.category === category).length]));
  const countByTag = Object.fromEntries(tags.map((tag) => [tag, tag === 'All' ? papers.length : papers.filter((paper) => (paper.tags || []).includes(tag)).length]));

  els.categories.innerHTML = categories.map((category) => `
    <button class="filter-button ${state.category === category ? 'active' : ''}" type="button" data-category="${escapeHtml(category)}">
      <span>${escapeHtml(category)}</span><span>${countByCategory[category]}</span>
    </button>
  `).join('');

  els.tags.innerHTML = tags.map((tag) => `
    <button class="chip ${state.tag === tag ? 'active' : ''}" type="button" data-tag="${escapeHtml(tag)}">
      ${escapeHtml(tag)} <span>${countByTag[tag]}</span>
    </button>
  `).join('');

  els.categories.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.category = button.dataset.category;
      resetPaperWindow();
      render();
    });
  });
  els.tags.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.tag = button.dataset.tag;
      resetPaperWindow();
      render();
    });
  });
}

function paperCard(paper) {
  const link = paper.url || `https://www.google.com/search?q=${encodeURIComponent(paper.title)}`;
  const meta = [paper.category, paper.year || '', paper.venue, paper.key].filter(Boolean);
  const tags = (paper.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const authorSummary = paper.firstAuthor ? `${paper.firstAuthor}${(paper.authors || '').includes(' and ') ? ' et al.' : ''}` : '';
  const sections = (paper.sections || []).length ? `Roadmap sections: ${paper.sections.join(', ')}` : 'Roadmap section: inferred from bibliography';
  const detail = paper.note || [authorSummary, sections].filter(Boolean).join(' | ');
  return `
    <article class="paper-card">
      <div class="paper-meta">${meta.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}</div>
      <h3 class="paper-title"><a href="${escapeHtml(link)}" target="_blank" rel="noreferrer">${escapeHtml(paper.title)}</a></h3>
      <p class="paper-note">${escapeHtml(detail || 'Roadmap bibliography entry.')}</p>
      <div class="paper-tags">${tags}</div>
      <div class="paper-actions">
        <button class="text-button" type="button" data-paper-id="${paper.id}">Details</button>
        <button class="text-button" type="button" data-copy-key="${escapeHtml(paper.key || '')}">Copy key</button>
      </div>
    </article>
  `;
}

function renderResults() {
  const rows = getFiltered();
  const visibleRows = rows.slice(0, state.visiblePapers);
  const queryPart = state.query ? ` for "${state.query}"` : '';
  const categoryPart = state.category !== 'All' ? ` in ${state.category}` : '';
  const tagPart = state.tag !== 'All' ? ` tagged ${state.tag}` : '';
  const yearPart = state.year !== 'All' ? ` from ${state.year}` : '';
  els.summary.textContent = `${rows.length} of ${papers.length} papers${queryPart}${categoryPart}${tagPart}${yearPart}`;
  els.results.innerHTML = visibleRows.map(paperCard).join('');
  els.empty.hidden = rows.length !== 0;
  els.loadMore.hidden = state.visiblePapers >= rows.length;
  els.loadMore.textContent = `Load more papers (${Math.min(PAGE_SIZE, Math.max(0, rows.length - state.visiblePapers))} more)`;
  bindPaperCardActions();
  renderActiveFilters();
}

function render() {
  renderFilters();
  renderInsights();
  renderResults();
}

function renderActiveFilters() {
  const active = [
    state.query && { label: `Search: ${state.query}`, action: () => { state.query = ''; els.input.value = ''; } },
    state.category !== 'All' && { label: `Category: ${state.category}`, action: () => { state.category = 'All'; } },
    state.tag !== 'All' && { label: `Task: ${state.tag}`, action: () => { state.tag = 'All'; } },
    state.year !== 'All' && { label: `Year: ${state.year}`, action: () => { state.year = 'All'; } },
  ].filter(Boolean);

  els.activeFilters.hidden = active.length === 0;
  els.activeFilters.innerHTML = active.map((item, index) => `
    <button class="chip active" type="button" data-filter-index="${index}">${escapeHtml(item.label)} x</button>
  `).join('');
  els.activeFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      active[Number(button.dataset.filterIndex)].action();
      resetPaperWindow();
      render();
    });
  });
}

function renderInsights() {
  const yearCounts = new Map();
  const taskCounts = new Map();
  for (const paper of papers) {
    if (paper.year) {
      yearCounts.set(paper.year, (yearCounts.get(paper.year) || 0) + 1);
    }
    for (const tag of paper.tags || []) {
      taskCounts.set(tag, (taskCounts.get(tag) || 0) + 1);
    }
  }

  const years = [...yearCounts.entries()].sort((a, b) => a[0] - b[0]);
  const maxYearCount = Math.max(...years.map(([, count]) => count), 1);
  els.yearBars.innerHTML = years.map(([year, count]) => `
    <button class="year-bar ${state.year === String(year) ? 'active' : ''}" type="button" data-year="${year}" title="${year}: ${count} papers">
      <span style="height:${Math.max(10, Math.round((count / maxYearCount) * 100))}%"></span>
      <em>${year}</em>
    </button>
  `).join('');

  els.yearBars.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.year = state.year === button.dataset.year ? 'All' : button.dataset.year;
      resetPaperWindow();
      render();
    });
  });

  els.taskCloud.innerHTML = [...taskCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14)
    .map(([task, count]) => `
      <button class="chip ${state.tag === task ? 'active' : ''}" type="button" data-task="${escapeHtml(task)}">
        ${escapeHtml(task)} <span>${count}</span>
      </button>
    `).join('');

  els.taskCloud.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.tag = state.tag === button.dataset.task ? 'All' : button.dataset.task;
      resetPaperWindow();
      render();
    });
  });
}

function scoreStressCase(test, query) {
  if (!query) return 1;
  const q = normalize(query);
  const fields = [
    test.title,
    test.dimension,
    test.level,
    test.model,
    test.summary,
    test.finding,
    ...(test.images || []).map((image) => image.label),
  ];
  const haystack = normalize(fields.join(' '));
  const tokens = q.split(' ').filter(Boolean);
  let score = haystack.includes(q) ? 12 : 0;
  for (const token of tokens) {
    if (haystack.includes(token)) score += 2;
  }
  return score;
}

function getFilteredStressTests() {
  return stressTests
    .map((test) => ({ ...test, score: scoreStressCase(test, state.stressQuery) }))
    .filter((test) => test.score > 0)
    .filter((test) => state.stressDimension === 'All' || test.dimension === state.stressDimension)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}

function renderStressFilters() {
  const dimensions = ['All', ...unique(stressTests.map((test) => test.dimension))];
  const countByDimension = Object.fromEntries(dimensions.map((dimension) => [
    dimension,
    dimension === 'All' ? stressTests.length : stressTests.filter((test) => test.dimension === dimension).length,
  ]));

  els.stressFilters.innerHTML = dimensions.map((dimension) => `
    <button class="chip ${state.stressDimension === dimension ? 'active' : ''}" type="button" data-dimension="${escapeHtml(dimension)}">
      ${escapeHtml(dimension)} <span>${countByDimension[dimension]}</span>
    </button>
  `).join('');

  els.stressFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      state.stressDimension = button.dataset.dimension;
      renderStress();
    });
  });
}

function stressCaseCard(test) {
  const cover = test.images?.[0];
  const preview = (test.images || []).slice(0, 4).map((image) => `
    <img src="${escapeHtml(image.src)}" alt="${escapeHtml(`${test.title}: ${image.label}`)}" loading="lazy" />
  `).join('');
  return `
    <article class="stress-case-card">
      <button class="stress-cover" type="button" data-stress-id="${escapeHtml(test.id)}" aria-label="Open ${escapeHtml(test.title)}">
        <img src="${escapeHtml(cover?.src || '')}" alt="${escapeHtml(test.title)}" loading="lazy" />
      </button>
      <div class="stress-case-body">
        <div class="paper-meta">
          <span>${escapeHtml(test.dimension)}</span>
          <span>${escapeHtml(test.level)}</span>
          <span>${escapeHtml(test.model)}</span>
        </div>
        <h3>${escapeHtml(test.title)}</h3>
        <p>${escapeHtml(test.summary)}</p>
        <div class="mini-gallery">${preview}</div>
        <button class="text-button stress-open" type="button" data-stress-id="${escapeHtml(test.id)}">View case</button>
      </div>
    </article>
  `;
}

function renderStressResults() {
  const rows = getFilteredStressTests();
  const queryPart = state.stressQuery ? ` for "${state.stressQuery}"` : '';
  const dimensionPart = state.stressDimension !== 'All' ? ` in ${state.stressDimension}` : '';
  els.stressSummary.textContent = `${rows.length} of ${stressTests.length} stress-test cases${queryPart}${dimensionPart}`;
  els.stressResults.innerHTML = rows.map(stressCaseCard).join('');
  els.stressResults.querySelectorAll('[data-stress-id]').forEach((button) => {
    button.addEventListener('click', () => openStressModal(button.dataset.stressId));
  });
}

function renderStress() {
  renderStressFilters();
  renderStressResults();
}

function openStressModal(id) {
  const test = stressTests.find((item) => item.id === id);
  if (!test) return;
  const gallery = (test.images || []).map((image) => `
    <figure>
      <img src="${escapeHtml(image.src)}" alt="${escapeHtml(`${test.title}: ${image.label}`)}" />
      <figcaption>${escapeHtml(image.label)}</figcaption>
    </figure>
  `).join('');
  els.modalContent.innerHTML = `
    <div class="paper-meta">
      <span>${escapeHtml(test.dimension)}</span>
      <span>${escapeHtml(test.level)}</span>
      <span>${escapeHtml(test.model)}</span>
    </div>
    <h2 id="modal-title">${escapeHtml(test.title)}</h2>
    <p class="modal-summary">${escapeHtml(test.summary)}</p>
    <p class="modal-finding"><strong>Key finding:</strong> ${escapeHtml(test.finding)}</p>
    <div class="modal-gallery">${gallery}</div>
  `;
  els.modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeStressModal() {
  els.modal.hidden = true;
  document.body.classList.remove('modal-open');
}

function bindPaperCardActions() {
  els.results.querySelectorAll('[data-paper-id]').forEach((button) => {
    button.addEventListener('click', () => openPaperModal(Number(button.dataset.paperId)));
  });
  els.results.querySelectorAll('[data-copy-key]').forEach((button) => {
    button.addEventListener('click', async () => {
      await copyText(button.dataset.copyKey);
      const oldText = button.textContent;
      button.textContent = 'Copied';
      window.setTimeout(() => {
        button.textContent = oldText;
      }, 900);
    });
  });
}

async function copyText(value) {
  if (!value) return;
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function openPaperModal(id) {
  const paper = papers.find((item) => item.id === id);
  if (!paper) return;
  const link = paper.url || `https://www.google.com/search?q=${encodeURIComponent(paper.title)}`;
  const tags = (paper.tags || []).map((tag) => `<span>${escapeHtml(tag)}</span>`).join('');
  const sections = (paper.sections || []).length ? paper.sections.join(', ') : 'Inferred from bibliography';
  els.paperModalContent.innerHTML = `
    <div class="paper-meta">
      <span>${escapeHtml(paper.category)}</span>
      ${paper.year ? `<span>${paper.year}</span>` : ''}
      ${paper.venue ? `<span>${escapeHtml(paper.venue)}</span>` : ''}
      ${paper.key ? `<span>${escapeHtml(paper.key)}</span>` : ''}
    </div>
    <h2 id="paper-modal-title">${escapeHtml(paper.title)}</h2>
    <p class="modal-summary">${escapeHtml(paper.authors || 'Authors unavailable.')}</p>
    <p class="modal-finding"><strong>Roadmap section:</strong> ${escapeHtml(sections)}</p>
    <div class="paper-tags modal-tags">${tags}</div>
    <div class="modal-actions">
      <a class="button primary" href="${escapeHtml(link)}" target="_blank" rel="noreferrer">Open paper</a>
      <button class="button" type="button" data-modal-copy-key="${escapeHtml(paper.key || '')}">Copy BibTeX key</button>
    </div>
  `;
  els.paperModal.hidden = false;
  document.body.classList.add('modal-open');
  els.paperModalContent.querySelector('[data-modal-copy-key]')?.addEventListener('click', async (event) => {
    await copyText(event.currentTarget.dataset.modalCopyKey);
    event.currentTarget.textContent = 'Copied';
  });
}

function closePaperModal() {
  els.paperModal.hidden = true;
  document.body.classList.remove('modal-open');
}

const debouncedPaperSearch = debounce((value) => {
  state.query = value;
  resetPaperWindow();
  renderResults();
}, 120);

const debouncedStressSearch = debounce((value) => {
  state.stressQuery = value;
  renderStressResults();
}, 120);

els.input.addEventListener('input', (event) => {
  debouncedPaperSearch(event.target.value);
});

els.sort.addEventListener('change', (event) => {
  state.sort = event.target.value;
  resetPaperWindow();
  renderResults();
});

els.clear.addEventListener('click', () => {
  state.query = '';
  state.category = 'All';
  state.tag = 'All';
  state.year = 'All';
  state.sort = 'relevance';
  resetPaperWindow();
  els.input.value = '';
  els.sort.value = 'relevance';
  render();
});

els.stressInput.addEventListener('input', (event) => {
  debouncedStressSearch(event.target.value);
});

els.stressClear.addEventListener('click', () => {
  state.stressQuery = '';
  state.stressDimension = 'All';
  els.stressInput.value = '';
  renderStress();
});

els.modal.querySelectorAll('[data-close-modal]').forEach((button) => {
  button.addEventListener('click', closeStressModal);
});

els.paperModal.querySelectorAll('[data-close-paper-modal]').forEach((button) => {
  button.addEventListener('click', closePaperModal);
});

els.loadMore.addEventListener('click', () => {
  state.visiblePapers += PAGE_SIZE;
  renderResults();
});

els.citationCopy?.addEventListener('click', async () => {
  await copyText(els.citationBibtex?.textContent.trim() || '');
  els.citationCopy.textContent = 'Copied';
  window.setTimeout(() => {
    els.citationCopy.textContent = 'Copy BibTeX';
  }, 1000);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !els.modal.hidden) {
    closeStressModal();
  }
  if (event.key === 'Escape' && !els.paperModal.hidden) {
    closePaperModal();
  }
});

els.paperCount.textContent = papers.length;
els.categoryCount.textContent = unique(papers.map((paper) => paper.category)).length;
els.taskCount.textContent = unique(papers.flatMap((paper) => paper.tags || [])).length;
renderQuickQueries();
render();
renderStress();
