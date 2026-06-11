document.addEventListener('DOMContentLoaded', async function () {
  const headerTitle = document.querySelector('.header-title');
  const nav = document.getElementById('nav');
  const main = document.getElementById('main');

  headerTitle.textContent = CONFIG.typeface;
  main.textContent = '';

  const sectionDefs = [
    { id: 'overview', title: 'Overview' },
    { id: 'families', title: 'Families' },
    { id: 'tester', title: 'Interactive Tester' },
    { id: 'charset', title: 'Character Set' },
    { id: 'languages', title: 'Language Support' },
    { id: 'specimen', title: 'Text Specimen' },
    { id: 'comparison', title: 'Family Comparison' },
    { id: 'download', title: 'Download' }
  ];

  sectionDefs.forEach(function (s) {
    var a = document.createElement('a');
    a.href = '#' + s.id;
    a.textContent = s.title;
    nav.appendChild(a);
  });

  function createSection(id, title) {
    var section = document.createElement('section');
    section.className = 'section';
    section.id = id;
    var inner = document.createElement('div');
    inner.className = 'container';
    var h2 = document.createElement('h2');
    h2.className = 'section-title';
    h2.textContent = title;
    inner.appendChild(h2);
    section.appendChild(inner);
    return { section: section, inner: inner };
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'className') e.className = attrs[k];
        else if (k === 'textContent') e.textContent = attrs[k];
        else if (k === 'innerHTML') e.innerHTML = attrs[k];
        else e.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      children.forEach(function (c) {
        if (typeof c === 'string') e.appendChild(document.createTextNode(c));
        else e.appendChild(c);
      });
    }
    return e;
  }

  // --- Overview ---
  (function () {
    var s = createSection('overview', 'Overview');
    var content = el('div', { className: 'overview-content' });

    var df = CONFIG.families[0].name;
    var title = el('h1', { className: 'overview-title', textContent: CONFIG.typeface, style: 'font-family: ' + df + ', sans-serif' });
    var tagline = el('p', { className: 'overview-tagline', textContent: CONFIG.tagline, style: 'font-family: ' + df + ', sans-serif' });
    var desc = el('p', { className: 'overview-desc', textContent: CONFIG.description });

    var btnGroup = el('div', { className: 'btn-group' }, [
      el('a', { className: 'btn', href: CONFIG.repository + '/releases', target: '_blank', textContent: 'Download Fonts' }),
      el('a', { className: 'btn', href: CONFIG.repository, target: '_blank', textContent: 'View Repository' })
    ]);

    var meta = el('div', { className: 'overview-meta' }, [
      el('div', { className: 'overview-meta-item' }, [
        el('span', { className: 'overview-meta-label', textContent: 'Styles' }),
        el('span', { className: 'overview-meta-value', textContent: '6' })
      ]),
      el('div', { className: 'overview-meta-item' }, [
        el('span', { className: 'overview-meta-label', textContent: 'Format' }),
        el('span', { className: 'overview-meta-value', textContent: 'WOFF2' })
      ]),
      el('div', { className: 'overview-meta-item' }, [
        el('span', { className: 'overview-meta-label', textContent: 'Classification' }),
        el('span', { className: 'overview-meta-value', textContent: 'Geometric Sans-Serif' })
      ])
    ]);

    content.appendChild(title);
    content.appendChild(tagline);
    content.appendChild(desc);
    content.appendChild(btnGroup);
    content.appendChild(meta);
    s.inner.appendChild(content);
    main.appendChild(s.section);
  })();

  // --- Families ---
  (function () {
    var s = createSection('families', 'Families');
    var grid = el('div', { className: 'families-grid' });

    CONFIG.families.forEach(function (f) {
      var block = el('div', { className: 'family-block' }, [
        el('div', { className: 'family-name', textContent: f.displayName }),
        el('div', { className: 'family-sample', textContent: CONFIG.samples.pangram, style: 'font-family: ' + f.name + ', sans-serif' })
      ]);
      grid.appendChild(block);
    });

    s.inner.appendChild(grid);
    main.appendChild(s.section);
  })();

  // --- Interactive Tester ---
  (function () {
    var s = createSection('tester', 'Interactive Tester');
    var controls = el('div', { className: 'tester-controls' });

    var familyGroup = el('div', { className: 'tester-control-group' }, [
      el('label', { textContent: 'Family' })
    ]);
    var select = el('select', { id: 'testerFamily' });
    CONFIG.families.forEach(function (f) {
      var opt = el('option', { value: f.name, textContent: f.displayName });
      select.appendChild(opt);
    });
    familyGroup.appendChild(select);

    var sizeGroup = el('div', { className: 'tester-control-group' }, [
      el('label', { textContent: 'Size' }),
      el('input', { type: 'range', id: 'testerSize', min: '12', max: '96', value: '32' }),
      el('span', { className: 'tester-value', id: 'testerSizeVal', textContent: '32px' })
    ]);

    var trackGroup = el('div', { className: 'tester-control-group' }, [
      el('label', { textContent: 'Tracking' }),
      el('input', { type: 'range', id: 'testerTracking', min: '-10', max: '40', value: '0' }),
      el('span', { className: 'tester-value', id: 'testerTrackVal', textContent: '0' })
    ]);

    var themeGroup = el('div', { className: 'tester-control-group' }, [
      el('label', { textContent: 'Theme' }),
      el('button', { className: 'theme-btn', id: 'testerTheme', textContent: 'Dark' })
    ]);

    controls.appendChild(familyGroup);
    controls.appendChild(sizeGroup);
    controls.appendChild(trackGroup);
    controls.appendChild(themeGroup);

    var preview = el('div', { className: 'tester-preview' }, [
      el('div', { className: 'tester-text', id: 'testerText', textContent: CONFIG.samples.pangram, style: 'font-family: ' + CONFIG.families[0].name + ', sans-serif' })
    ]);

    s.inner.appendChild(controls);
    s.inner.appendChild(preview);
    main.appendChild(s.section);

    var tText = document.getElementById('testerText');
    var tFamily = document.getElementById('testerFamily');
    var tSize = document.getElementById('testerSize');
    var tSizeVal = document.getElementById('testerSizeVal');
    var tTrack = document.getElementById('testerTracking');
    var tTrackVal = document.getElementById('testerTrackVal');
    var tTheme = document.getElementById('testerTheme');

    tFamily.addEventListener('change', function () {
      tText.style.fontFamily = tFamily.value + ', sans-serif';
    });

    tSize.addEventListener('input', function () {
      tText.style.fontSize = tSize.value + 'px';
      tSizeVal.textContent = tSize.value + 'px';
    });

    tTrack.addEventListener('input', function () {
      tText.style.letterSpacing = tTrack.value + 'px';
      tTrackVal.textContent = tTrack.value;
    });

    tTheme.addEventListener('click', function () {
      var theme = document.documentElement.getAttribute('data-theme');
      if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        tTheme.textContent = 'Dark';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        tTheme.textContent = 'Light';
      }
    });
  })();

  // --- Character Set ---
  (function () {
    var s = createSection('charset', 'Character Set');
    var groups = [
      { label: 'Uppercase', chars: CONFIG.characters.uppercase },
      { label: 'Lowercase', chars: CONFIG.characters.lowercase },
      { label: 'Numerals', chars: CONFIG.characters.numerals },
      { label: 'Punctuation', chars: CONFIG.characters.punctuation }
    ];

    groups.forEach(function (g) {
      var grp = el('div', { className: 'charset-group' }, [
        el('div', { className: 'section-subtitle', textContent: g.label }),
        el('div', { className: 'charset-chars', textContent: g.chars, style: 'font-family: ' + CONFIG.families[0].name + ', sans-serif' })
      ]);
      s.inner.appendChild(grp);
    });

    main.appendChild(s.section);
  })();

  // --- Language Support ---
  (function () {
    var s = createSection('languages', 'Language Support');
    var grid = el('div', { className: 'languages-grid' });

    CONFIG.languages.forEach(function (lang) {
      var block = el('div', { className: 'language-block' }, [
        el('div', { className: 'language-name', textContent: lang.name }),
        el('div', { className: 'language-sample', textContent: lang.sample })
      ]);
      grid.appendChild(block);
    });

    s.inner.appendChild(grid);
    main.appendChild(s.section);
  })();

  // --- Text Specimen ---
  (function () {
    var s = createSection('specimen', 'Text Specimen');

    var df = CONFIG.families[0].name;
    var large = el('div', { className: 'specimen-large', textContent: CONFIG.typeface, style: 'font-family: ' + df + ', sans-serif' });
    var medium = el('div', { className: 'specimen-medium', textContent: CONFIG.samples.medium, style: 'font-family: ' + df + ', sans-serif' });
    var small = el('p', { className: 'specimen-small', textContent: CONFIG.samples.small, style: 'font-family: ' + df + ', sans-serif' });

    s.inner.appendChild(large);
    s.inner.appendChild(medium);
    s.inner.appendChild(small);
    main.appendChild(s.section);
  })();

  // --- Family Comparison ---
  (function () {
    var s = createSection('comparison', 'Family Comparison');
    var grid = el('div', { className: 'comparison-grid' });

    var texts = [
      CONFIG.samples.pangram,
      CONFIG.samples.display,
      '0123456789'
    ];

    CONFIG.families.forEach(function (f) {
      texts.forEach(function (txt) {
        var item = el('div', { className: 'comparison-item' }, [
          el('div', { className: 'comparison-item-label', textContent: f.displayName }),
          el('div', { className: 'comparison-item-text', textContent: txt, style: 'font-family: ' + f.name + ', sans-serif' })
        ]);
        grid.appendChild(item);
      });
    });

    s.inner.appendChild(grid);
    main.appendChild(s.section);
  })();

  // --- Download ---
  (function () {
    var s = createSection('download', 'Download');
    var links = el('div', { className: 'btn-group' }, [
      el('a', { className: 'btn', href: CONFIG.repository + '/releases', target: '_blank', textContent: 'Download Fonts' }),
      el('a', { className: 'btn', href: CONFIG.repository, target: '_blank', textContent: 'View Repository' }),
      el('a', { className: 'btn', href: CONFIG.issueUrl, target: '_blank', textContent: 'Report Issue' })
    ]);
    s.inner.appendChild(links);
    main.appendChild(s.section);
  })();

  // --- Font Loading ---
  (function () {
    var allText = main.querySelectorAll('.family-sample, .comparison-item-text, .charset-chars, .specimen-large, .specimen-medium, .specimen-small, .overview-title, .overview-tagline');
    allText.forEach(function (el) {
      el.classList.add('font-loading');
    });

    var promises = CONFIG.families.map(function (f) {
      var font = new FontFace(f.name, 'url(' + CONFIG.fontBaseUrl + '/' + f.name + '.woff2)');
      return font.load().then(function () {
        document.fonts.add(font);
      });
    });

    Promise.all(promises).then(function () {
      allText.forEach(function (el) {
        el.classList.remove('font-loading');
        el.classList.add('font-loaded');
      });
    }).catch(function () {
      allText.forEach(function (el) {
        el.classList.remove('font-loading');
        el.classList.add('font-loaded');
      });
    });
  })();

  // --- Active Nav ---
  (function () {
    var links = nav.querySelectorAll('a');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove('active'); });
          var id = entry.target.id;
          links.forEach(function (l) {
            if (l.getAttribute('href') === '#' + id) l.classList.add('active');
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    var sections = main.querySelectorAll('.section');
    sections.forEach(function (s) { observer.observe(s); });
  })();
});
