/* ==========================================================================
   SCRIPT.JS // TECNICA TYPEFACE SPECIMEN CONTROLLER
   AUTOMATION ENGINE & REACTION INTERACTION PIPELINE
   ========================================================================== */

const fontFamilySelect = document.getElementById('fontFamily');
const fontSizeInput = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const lineHeightInput = document.getElementById('lineHeight');
const lineHeightValue = document.getElementById('lineHeightValue');
const testTextInput = document.getElementById('testText');
const previewBox = document.getElementById('preview-box');
const cascadeSpread = document.getElementById('cascadeSpread');
const inventorySpread = document.getElementById('inventorySpread');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const standardSizes = [12, 14, 18, 24, 36, 48, 60, 72, 96, 120];

const testStrings = {
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

const glyphGroups = {
    'Uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'Lowercase letters': 'abcdefghijklmnopqrstuvwxyz',
    'Numbers': '0123456789',
    'Punctuation': '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
    'Symbols': '±≠≤≥∞∫√°©®™€¥£¢',
    'Latin extended': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
};

function initSystem() {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = 'Theme: Light';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.textContent = 'Theme: Dark';
        }
    }

    if (systemPrefersDark.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // GENERAZIONE AUTOMATICA CASCATA TIPOGRAFICA
    standardSizes.forEach(size => {
        const row = document.createElement('div');
        row.className = 'cascade-row';

        const meta = document.createElement('div');
        meta.className = 'cascade-meta';
        meta.textContent = `${size}px (${Math.round(size * 0.75)}pt)`;

        const sample = document.createElement('div');
        sample.className = 'cascade-sample-node';
        sample.style.fontSize = `${size}px`;
        sample.textContent = testStrings[size] || testStrings[12];

        row.appendChild(meta);
        row.appendChild(sample);
        cascadeSpread.appendChild(row);
    });

    // GENERAZIONE AUTOMATICA MAPPA CARATTERI (H3 applicato correttamente)
    for (const [groupName, glyphs] of Object.entries(glyphGroups)) {
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
            cell.textContent = char;
            grid.appendChild(cell);
        });

        block.appendChild(title);
        block.appendChild(grid);
        inventorySpread.appendChild(block);
    }

    syncFontWeightGlobal();
}

function syncFontWeightGlobal() {
    const currentWeight = fontFamilySelect.value;
    previewBox.style.fontFamily = currentWeight;
    
    document.querySelectorAll('.cascade-sample-node').forEach(el => {
        el.style.fontFamily = currentWeight;
    });

    document.querySelectorAll('.inventory-cell').forEach(el => {
        el.style.fontFamily = currentWeight;
    });
}

fontFamilySelect.addEventListener('change', syncFontWeightGlobal);

fontSizeInput.addEventListener('input', () => {
    previewBox.style.fontSize = fontSizeInput.value + 'px';
    fontSizeValue.textContent = fontSizeInput.value;
});

lineHeightInput.addEventListener('input', () => {
    previewBox.style.lineHeight = lineHeightInput.value;
    lineHeightValue.textContent = lineHeightInput.value;
});

testTextInput.addEventListener('input', () => {
    previewBox.textContent = testTextInput.value || ' ';
});

window.onload = initSystem;
