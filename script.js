/* ============================================================================
   SCRIPT.JS - TECNICA TYPEFACE SPECIMEN CONTROLLER
   Automation engine for typeface specimen interaction
   ============================================================================ */

// DOM Element References
const DOM = {
  fontFamily: document.getElementById('fontFamily'),
  fontSize: document.getElementById('fontSize'),
  fontSizeValue: document.getElementById('fontSizeValue'),
  lineHeight: document.getElementById('lineHeight'),
  lineHeightValue: document.getElementById('lineHeightValue'),
  testText: document.getElementById('testText'),
  previewBox: document.getElementById('preview-box'),
  cascadeSpread: document.getElementById('cascadeSpread'),
  inventorySpread: document.getElementById('inventorySpread'),
  themeToggleBtn: document.getElementById('themeToggleBtn')
};

// Configuration
const STANDARD_SIZES = [12, 14, 18, 24, 36, 48, 60, 72, 96, 120];

const TEST_STRINGS = {
  12: 'Micro-grid bitmap rendering terminal data channels active.',
  14: 'High density dot matrix buffer array reference system.',
  18: 'Low resolution digital interface emulation core online.',
  24: 'Geometric raster algorithm for typographic constraints.',
  36: 'Structured dot grid field analysis level nine matrix.',
  48: 'Monospaced glyph cell bounds calibrated.',
  60: 'Raw compute stream output validation.',
  72: 'Tecnica system typeface protocol.',
  96: 'Raster data channels active.',
  120: 'Terminal specimen test.'
};

const GLYPH_GROUPS = {
  'Uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  'Lowercase': 'abcdefghijklmnopqrstuvwxyz',
  'Numbers': '0123456789',
  'Punctuation': '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
  'Symbols': '±≠≤≥∞∫√°©®™€¥£¢',
  'Latin Extended': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
};

/**
 * Initialize theme system
 */
function initTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(prefersDark ? 'dark' : 'light');
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);
}

/**
 * Set theme on document root
 */
function setTheme(theme) {
  const isDark = theme === 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  DOM.themeToggleBtn.textContent = `Theme: ${isDark ? 'Light' : 'Dark'}`;
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

/**
 * Generate type scale cascade
 */
function renderTypeScale() {
  const fragment = document.createDocumentFragment();
  
  STANDARD_SIZES.forEach(size => {
    const row = document.createElement('div');
    row.className = 'cascade-row';
    
    const meta = document.createElement('div');
    meta.className = 'cascade-meta';
    meta.textContent = `${size}px (${Math.round(size * 0.75)}pt)`;
    
    const sample = document.createElement('div');
    sample.className = 'cascade-sample-node';
    sample.style.fontSize = `${size}px`;
    sample.style.fontFamily = DOM.fontFamily.value;
    sample.textContent = TEST_STRINGS[size] || TEST_STRINGS[12];
    
    row.appendChild(meta);
    row.appendChild(sample);
    fragment.appendChild(row);
  });
  
  DOM.cascadeSpread.appendChild(fragment);
}

/**
 * Generate character inventory grid
 */
function renderInventory() {
  const fragment = document.createDocumentFragment();
  
  Object.entries(GLYPH_GROUPS).forEach(([groupName, glyphs]) => {
    const block = document.createElement('div');
    block.className = 'inventory-group';
    
    const title = document.createElement('h3');
    title.className = 'inventory-group-title';
    title.textContent = groupName;
    
    const grid = document.createElement('div');
    grid.className = 'inventory-grid';
    
    Array.from(glyphs).forEach(char => {
      const cell = document.createElement('div');
      cell.className = 'inventory-cell';
      cell.style.fontFamily = DOM.fontFamily.value;
      cell.textContent = char;
      grid.appendChild(cell);
    });
    
    block.appendChild(title);
    block.appendChild(grid);
    fragment.appendChild(block);
  });
  
  DOM.inventorySpread.appendChild(fragment);
}

/**
 * Update font weight across all preview areas
 */
function updateFontWeight() {
  const fontFamily = DOM.fontFamily.value;
  
  DOM.previewBox.style.fontFamily = fontFamily;
  
  document.querySelectorAll('.cascade-sample-node').forEach(el => {
    el.style.fontFamily = fontFamily;
  });
  
  document.querySelectorAll('.inventory-cell').forEach(el => {
    el.style.fontFamily = fontFamily;
  });
}

/**
 * Update preview box font size
 */
function updateFontSize() {
  const size = DOM.fontSize.value;
  DOM.previewBox.style.fontSize = `${size}px`;
  DOM.fontSizeValue.textContent = size;
}

/**
 * Update preview box line height
 */
function updateLineHeight() {
  const height = DOM.lineHeight.value;
  DOM.previewBox.style.lineHeight = height;
  DOM.lineHeightValue.textContent = height;
}

/**
 * Update preview text content
 */
function updatePreviewText() {
  DOM.previewBox.textContent = DOM.testText.value || ' ';
}

/**
 * Attach event listeners
 */
function attachEventListeners() {
  DOM.fontFamily.addEventListener('change', updateFontWeight);
  DOM.fontSize.addEventListener('input', updateFontSize);
  DOM.lineHeight.addEventListener('input', updateLineHeight);
  DOM.testText.addEventListener('input', updatePreviewText);
}

/**
 * Initialize application
 */
function initialize() {
  initTheme();
  renderTypeScale();
  renderInventory();
  attachEventListeners();
}

// Start on DOM ready
document.addEventListener('DOMContentLoaded', initialize);
