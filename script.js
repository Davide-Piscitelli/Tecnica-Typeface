/* ==========================================================================
   SCRIPT.JS // TECNICA TYPEFACE SPECIMEN CONTROLLER
   AUTOMATION ENGINE & REACTION INTERACTION PIPELINE
   ========================================================================== */

// --- ELEMENTI DEL DOM ---
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

// --- DATASETS E MATRICI DATI ---
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
    'Capital letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    'Lowercase letters': 'abcdefghijklmnopqrstuvwxyz',
    'Numbers and digits': '0123456789',
    'Punctuation marks': '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
    'Special symbols': '±≠≤≥∞∫√°©®™€¥£¢',
    'Accent and extended letters': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
};

/**
 * Avvia i cicli di caricamento, calibra le preferenze tema di sistema,
 * e genera autonomamente le righe della cascata e i glifi.
 */
function initSystem() {
    // Rilevamento automatico preferenza tema OS
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

    // Esegui la configurazione al boot iniziale
    if (systemPrefersDark.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Listener per il click sul cambio tema manuale
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // --- GENERAZIONE AUTOMATICA SEZIONE 02 // TYPE SCALE VIEW ---
    standardSizes.forEach(size => {
        const row = document.createElement('div');
        row.className = 'cascade-row';
        
        const meta = document.createElement('div');
        meta.className = 'cascade-meta sub-label-caps';
        meta.textContent = `SIZE_${size}PT`;

        const sample = document.createElement('div');
        sample.className = 'cascade-sample-node';
        sample.setAttribute('contenteditable', 'true');
        sample.style.fontSize = size + 'pt';
        sample.textContent = testStrings[size];

        row.appendChild(meta);
        row.appendChild(sample);
        cascadeSpread.appendChild(row);
    });

    // --- GENERAZIONE AUTOMATICA SEZIONE 03 // CHARACTER SET ---
    for (const [category, chars] of Object.entries(glyphGroups)) {
        const block = document.createElement('div');
        block.className = 'inventory-group';

        const header = document.createElement('h4');
        header.className = 'sub-label-caps';
        header.style.fontWeight = '700';
        header.textContent = category;
        block.appendChild(header);

        const grid = document.createElement('div');
        grid.className = 'inventory-grid';

        chars.split('').forEach(char => {
            const cell = document.createElement('div');
            cell.className = 'inventory-cell';
            cell.textContent = char;
            grid.appendChild(cell);
        });

        block.appendChild(grid);
        inventorySpread.appendChild(block);
    }

    // Sincronizza i pesi dei font su tutta la pagina al caricamento
    syncFontWeightGlobal();
}

/**
 * Propaga uniformemente la variante del carattere selezionata
 * a tutti i moduli interattivi e alle celle generate della pagina.
 */
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

// --- ASCOLTO EVENTI IN TEMPO REALE ---

// Peso del font (System Weight)
fontFamilySelect.addEventListener('change', syncFontWeightGlobal);

// Dimensione del carattere (Text Size)
fontSizeInput.addEventListener('input', () => {
    previewBox.style.fontSize = fontSizeInput.value + 'px';
    fontSizeValue.textContent = fontSizeInput.value;
});

// Interlinea (Line Spacing)
lineHeightInput.addEventListener('input', () => {
    previewBox.style.lineHeight = lineHeightInput.value;
    lineHeightValue.textContent = lineHeightInput.value;
});

// Input stringa di testo libera
testTextInput.addEventListener('input', () => {
    previewBox.textContent = testTextInput.value || ' ';
});

// Esegui la pipeline all'inizializzazione della finestra
window.onload = initSystem;
