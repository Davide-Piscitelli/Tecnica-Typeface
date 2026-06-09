/* ==========================================================================
   SCRIPT.JS // TECNICA TYPEFACE SYSTEM CONTROLLER (6 WEIGHTS ARCHITECTURE)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // DATA SET 1: Raggruppamento dei Caratteri (Capitolo 3)
    const glyphGroups = {
        'UPPERCASE': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        'LOWERCASE LETTERS': 'abcdefghijklmnopqrstuvwxyz',
        'NUMBERS': '0123456789',
        'PUNCTUATION': '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~',
        'SYMBOLS': '±≠≤≥∞∫√°©®™€¥£¢',
        'LATIN EXTENDED': 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ'
    };

    // DATA SET 2: Lista Ordinata di Copertura delle Lingue (Capitolo 5)
    const supportedLanguages = [
        "Afrikaans", "Danish", "German", "Norwegian", "Swedish",
        "Basque", "Dutch", "Icelandic", "Portuguese", "Tagalog",
        "Breton", "English", "Indonesian", "Spanish", "Walloon",
        "Catalan", "Finnish", "Italian", "Swahili", "Zulu"
    ];

    // ELEMENTI DI ANCORAGGIO DEL DOM
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
    // 1. INIZIALIZZAZIONE COMPONENTI (Matrici dei Glifi e Elenco Lingue)
    // =========================================================================
    
    // Costruzione dinamica del catalogo dei glifi organizzato
    Object.entries(glyphGroups).forEach(([groupName, chars], index, array) => {
        const sectionBlock = document.createElement("div");
        sectionBlock.className = "matrix-section-block";

        const title = document.createElement("h3");
        title.className = "ui-sub-title";
        title.textContent = groupName;
        sectionBlock.appendChild(title);

        const grid = document.createElement("div");
        grid.className = "glyph-grid font-tecnica-55"; // Classe iniziale coerente con il select

        Array.from(chars).forEach(char => {
            const cell = document.createElement("div");
            cell.className = "glyph-cell";
            cell.textContent = char;

            // Evento Click per l'ispezione ad alta definizione del singolo glifo
            cell.addEventListener("click", () => {
                inspectorPreview.textContent = char;
                const hexCode = char.codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
                inspectorUnicode.textContent = `U+${hexCode}`;
            });

            grid.appendChild(cell);
        });

        sectionBlock.appendChild(grid);
        glyphMatrixContainer.appendChild(sectionBlock);

        if (index < array.length - 1) {
            const thinLine = document.createElement("div");
            thinLine.className = "border-thin";
            glyphMatrixContainer.appendChild(thinLine);
        }
    });

    // Iniezione sistematica dell'elenco linguistico supportato
    supportedLanguages.forEach(lang => {
        const langNode = document.createElement("span");
        langNode.textContent = `* ${lang}`;
        languagesWrapper.appendChild(langNode);
    });

    // =========================================================================
    // 2. GESTIONE DEI CAMBIAMENTI DI STATO (Live Engine)
    // =========================================================================
    
    // Sincronizzazione dinamica dei parametri dello slider e dell'area di output
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

    // Gestione del cambio peso sui 6 pesi reali della cartella
    fontFamilySelector.addEventListener("change", (e) => {
        const selectedFontClass = e.target.value;

        // Reset e applicazione sull'output principale
        displayOutput.className = selectedFontClass;

        // Reset e applicazione sull'area di lettura fissa (Capitolo 2)
        legibilityContainer.className = `body-text-container ${selectedFontClass}`;

        // Reset e applicazione su tutte le celle e sull'inspector di glifi
        document.querySelectorAll(".glyph-grid").forEach(grid => {
            grid.className = `glyph-grid ${selectedFontClass}`;
        });
        inspectorPreview.className = selectedFontClass;
    });

    // INTERAZIONE INTERFACCIA: Invertitore di Tema Binario (Light / Dark)
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        if (currentTheme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
        }
    });

    // Calibrazione di avvio del live tester
    syncOutputMeasurements();
});
