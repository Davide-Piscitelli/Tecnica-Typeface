/* ==========================================================================
   SCRIPT.JS // TECNICA TYPEFACE SYSTEM CONTROLLER (6 REAL WEIGHTS DECK)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // DATA MATRIX 1: Complete Specimen Character Inventory Breakdown
    const glyphGroups = {
        'UPPERCASE': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'LOWERCASE LETTERS': 'abcdefghijklmnopqrstuvwxyz',
        'NUMBERS': '0123456789',
        'PUNCTUATION': '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
        'SYMBOLS': '±≠≤≥∞∫√°©®™€¥£¢',
        'LATIN EXTENDED': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
    };

    // DATA MATRIX 2: Complete Linguistic Architecture Database
    const supportedLanguages = [
        "Afrikaans", "Danish", "German", "Norwegian", "Swedish",
        "Basque", "Dutch", "Icelandic", "Portuguese", "Tagalog",
        "Breton", "English", "Indonesian", "Spanish", "Walloon",
        "Catalan", "Finnish", "Italian", "Swahili", "Zulu"
    ];

    // OBJECT ATTRIBUTION LOGIC NODE TRACKERS
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const fontFamilySelector = document.getElementById("fontFamilySelector");
    const sizeSlider = document.getElementById("size-slider");
    const sizeVal = document.getElementById("size-val");
    const lhSlider = document.getElementById("lh-slider");
    const lhVal = document.getElementById("lh-val");
    const textInput = document.getElementById("text-input");
    const displayOutput = document.getElementById("display-output");
    
    const legibilityContainer = document.getElementById("legibility-container");
    const glyphMatrixContainer = document.getElementById("glyph-matrix-container");
    const inspectorPreview = document.getElementById("inspector-preview");
    const inspectorUnicode = document.getElementById("inspector-unicode");
    const languagesWrapper = document.getElementById("languages-wrapper");

    // =========================================================================
    // 1. INVENTORY INITIALIZATION DECK (Dynamic Table Construction)
    // =========================================================================
    
    // Systematic rendering of the structural grid components split by thin borders
    Object.entries(glyphGroups).forEach(([groupName, chars], index, array) => {
        const sectionBlock = document.createElement("div");
        sectionBlock.className = "matrix-section-block";

        const title = document.createElement("h3");
        title.className = "ui-sub-title";
        title.textContent = groupName;
        sectionBlock.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "glyph-grid font-tecnica-55"; // Set Default Initialization Class Value

        Array.from(chars).forEach(char => {
            const cell = document.createElement("div");
            cell.className = "glyph-cell";
            cell.textContent = char;

            // Atomic Inspector Dynamic Interactive Event Logic Binding
            cell.addEventListener("click", () => {
                inspectorPreview.textContent = char;
                const hexCode = char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
                inspectorUnicode.textContent = `U+${hexCode}`;
            });

            grid.appendChild(cell);
        });

        sectionBlock.appendChild(grid);
        glyphMatrixContainer.appendChild(sectionBlock);

        // Append 1px separator line if current block is not final
        if (index < array.length - 1) {
            const thinLine = document.createElement("div");
            thinLine.className = "border-thin";
            glyphMatrixContainer.appendChild(thinLine);
        }
    });

    // Iniection array logic loop execution for the linguistic metadata view
    supportedLanguages.forEach(lang => {
        const langNode = document.createElement("span");
        langNode.textContent = `* ${lang}`;
        languagesWrapper.appendChild(langNode);
    });

    // =========================================================================
    // 2. LIVE INTERACTIVE ENGINE SYSTEM LOGIC PIPELINES
    // =========================================================================
    
    const syncOutputMeasurements = () => {
        const size = sizeSlider.value;
        const lineSpacing = lhSlider.value;

        sizeVal.textContent = `${size}px`;
        lhVal.textContent = lineSpacing;

        displayOutput.style.fontSize = `${size}px`;
        displayOutput.style.lineHeight = lineSpacing;
        displayOutput.textContent = textInput.value || " ";
    };

    sizeSlider.addEventListener("input", syncOutputMeasurements);
    lhSlider.addEventListener("input", syncOutputMeasurements);
    textInput.addEventListener("input", syncOutputMeasurements);

    // Global Cascade Synchronization across the 6 authentic font profiles
    fontFamilySelector.addEventListener("change", (e) => {
        const selectedFontClass = e.target.value;

        // Apply updated typeface to heading master preview node
        displayOutput.className = selectedFontClass;

        // Cascade font conversion into chapter 2 legibility container deck
        legibilityContainer.className = `body-text-container ${selectedFontClass}`;

        // Cascade configuration across all item containers inside inventory deck
        document.querySelectorAll(".glyph-grid").forEach(grid => {
            grid.className = `glyph-grid ${selectedFontClass}`;
        });
        inspectorPreview.className = selectedFontClass;
    });

    // Toggle Action Routine execution interface for Light / Dark state parameters
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    });

    // Launch first execution frame setup routine
    syncOutputMeasurements();
});
