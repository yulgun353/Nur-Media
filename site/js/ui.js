/* ============================================================
   UI KIT — icons, header, footer, overlays, motion
   ============================================================ */
(function () {
  "use strict";
  var N = window.NUR, t = N.t, T = N.T, esc = N.esc;

  /* ---------------- icon set ---------------- */
  var P = {
    spark:    '<path d="M12 2.5 14.2 9 21 11.3 14.2 13.6 12 20.2 9.8 13.6 3 11.3 9.8 9z"/>',
    sun:      '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77"/>',
    moon:     '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    zap:      '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    palette:  '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.66 1.5-1.34 0-.36-.14-.69-.38-.95-.24-.26-.39-.6-.39-.98 0-.8.65-1.45 1.45-1.45H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9.28-10-9.28z"/>',
    pen:      '<path d="M3 21l3.5-.7L20 6.8a2 2 0 0 0 0-2.8l-.9-.9a2 2 0 0 0-2.8 0L2.7 16.6 3 21z"/><path d="M15 5l4 4"/>',
    share:    '<circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8 15.7 6.4M8.3 13.2l7.4 4.4"/>',
    chart:    '<path d="M3 21h18"/><rect x="4" y="12" width="4" height="7" rx="1"/><rect x="10" y="7" width="4" height="12" rx="1"/><rect x="16" y="3" width="4" height="16" rx="1"/>',
    video:    '<rect x="2.5" y="5" width="14" height="14" rx="3"/><path d="m16.5 11 5-3v8l-5-3z"/>',
    code:     '<path d="m8 8-5 4 5 4M16 8l5 4-5 4M13.5 5l-3 14"/>',
    billboard:'<rect x="3" y="3" width="18" height="12" rx="2"/><path d="M12 15v6M8 21h8"/>',
    camera:   '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.8l1.3-2h6.8l1.3 2h1.8A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/><circle cx="12" cy="13" r="3.6"/>',
    arrow:    '<path d="M4 12h15m0 0-6-6m6 6-6 6"/>',
    mail:     '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
    phone:    '<path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5L17 13l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3z"/>',
    pin:      '<path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
    check:    '<path d="m4.5 12.5 5 5 10-11"/>',
    star:     '<path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z"/>',
    close:    '<path d="M6 6l12 12M18 6 6 18"/>',
    menu:     '<path d="M3 6h18M3 12h18M3 18h18"/>',
    globe:    '<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3z"/>',
    chevron:  '<path d="m9 5 7 7-7 7"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14.5 8.5H17V5h-2.5A4.5 4.5 0 0 0 10 9.5V11H8v3.5h2V21h3.5v-6.5H16l.7-3.5h-3.2V9.7c0-.7.5-1.2 1-1.2z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4a2.5 2.5 0 0 1 5 0v4"/>',
    youtube:  '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10.5 9.5 5 2.5-5 2.5z"/>',
    play:     '<path d="M7 4.5v15l13-7.5z"/>',
    plus:     '<path d="M12 5v14M5 12h14"/>',
    edit:     '<path d="M4 20h4L20 8l-4-4L4 16z"/><path d="m14.5 5.5 4 4"/>',
    trash:    '<path d="M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M4 19h16"/>',
    upload:   '<path d="M12 20V9m0 0-4 4m4-4 4 4M4 5h16"/>',
    grid:     '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    users:    '<circle cx="9" cy="8" r="3.4"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2A3.4 3.4 0 0 1 16 11.8M17.5 14.4A6.5 6.5 0 0 1 21.5 20"/>',
    inbox:    '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5.5 5h13l2.5 8v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z"/>',
    gear:     '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5"/>',
    layers:   '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    logout:   '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 8 6 12l4 4M6 12h10"/>',
    eye:      '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    doc:      '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    heart:    '<path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3c0 4.8-7.5 9.4-7.5 9.4z"/>',
    quote:    '<path d="M9 6C6 7.5 4.5 10 4.5 13.5 4.5 16 6 18 8.5 18s4-1.8 4-4-1.5-3.6-3.5-3.6c-.4 0-.8 0-1 .2C8.2 9.2 9 8 10.5 7zM19 6c-3 1.5-4.5 4-4.5 7.5 0 2.5 1.5 4.5 4 4.5s4-1.8 4-4-1.5-3.6-3.5-3.6c-.4 0-.8 0-1 .2.2-1.4 1-2.6 2.5-3.6z"/>',
    search:   '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>',
    lock:     '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    eyeOff:   '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20"/>',
    shield:   '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    key:      '<path d="m21 2-2 2m-1.5 1.5L19 7l-2 2-2-2m-1.5 1.5L15 10l-2 2m-2-2a5 5 0 1 0-7 7 5 5 0 0 0 7-7Z"/>',
    user:     '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>'
  };

  function icon(name, size, cls) {
    var d = P[name] || P.spark;
    return '<svg class="ic' + (cls ? " " + cls : "") + '" width="' + (size || 20) + '" height="' + (size || 20) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + "</svg>";
  }

  /* ---------------- logo ---------------- */
  function logo(dark) {
    var c = N.content().settings.name;
    var txt = esc(T(c));
    var col = dark ? "#fff" : "var(--ink)";
    return '<a class="logo" href="' + N.href("index.html") + '" aria-label="' + txt + '">' +
      '<span class="logo-mark"><svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">' +
      '<defs><linearGradient id="lgm" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#4F46E5"/><stop offset=".55" stop-color="#7C3AED"/><stop offset="1" stop-color="#D946EF"/>' +
      '</linearGradient></defs>' +
      '<rect width="40" height="40" rx="12" fill="url(#lgm)"/>' +
      '<path d="M12 28V12l16 16V12" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg></span><span class="logo-text">' + txt + "</span></a>";
  }

  /* ---------------- Day/Night Mode (Direct 1-Click Toggle) ---------------- */
  function modeBtn(variant) {
    var cur = N.mode || "dark";
    var ic = cur === "dark" ? "moon" : "sun";
    return '<button type="button" class="mode-btn' + (variant ? " " + variant : "") + '" data-mode-toggle aria-label="Mode">' +
      icon(ic, 18, "mode-ic") + "</button>";
  }

  /* ---------------- 4-Theme Color Switcher (Direct 1-Click Cycle) ---------------- */
  function themeBtn(variant) {
    var cur = N.theme || "cyan";
    var col = N.THEME_COLOR[cur] || "#00F0FF";
    return '<button type="button" class="theme-btn' + (variant ? " " + variant : "") + '" data-theme-cycle aria-label="Theme">' +
      icon("palette", 18, "theme-ic") +
      '<span class="theme-dot" style="background:' + esc(col) + '"></span>' +
      "</button>";
  }

  /* ---------------- language switcher ---------------- */
  function langSwitch(variant) {
    var items = N.LANGS.map(function (l) {
      return '<li><button type="button" class="ls-item' + (l === N.lang ? " is-on" : "") +
        '" data-lang="' + l + '"><span class="ls-code">' + N.LANG_SHORT[l] + '</span>' +
        '<span class="ls-name">' + N.LANG_NAME[l] + "</span>" +
        (l === N.lang ? icon("check", 15, "ls-check") : "") + "</button></li>";
    }).join("");
    return '<div class="langsw' + (variant ? " " + variant : "") + '">' +
      '<button type="button" class="langsw-btn" data-langbtn aria-haspopup="true" aria-expanded="false">' +
      icon("globe", 17) + '<span>' + N.LANG_SHORT[N.lang] + "</span>" + icon("chevron", 14, "ls-chev") + "</button>" +
      '<ul class="langsw-menu" data-langmenu role="menu">' + items + "</ul></div>";
  }

  /* ---------------- header ---------------- */
  function header(active) {
    var nav = [
      { key: "home", file: "index.html", ic: "spark" },
      { key: "about", file: "about.html", ic: "users" },
      { key: "services", file: "services.html", ic: "zap" },
      { key: "work", file: "work.html", ic: "layers" },
      { key: "blog", file: "blog.html", ic: "doc" },
      { key: "contact", file: "contact.html", ic: "phone" }
    ];
    var desktopLinks = nav.map(function (item) {
      var isCur = active === item.key;
      return '<li><a href="' + N.href(item.file) + '"' + (isCur ? ' class="is-on" aria-current="page"' : "") + ">" +
        esc(t("nav." + item.key)) +
        "</a></li>";
    }).join("");

    var drawerLinks = nav.map(function (item) {
      var isCur = active === item.key;
      return '<li><a href="' + N.href(item.file) + '"' + (isCur ? ' class="is-on" aria-current="page"' : "") + ">" +
        icon(item.ic, 18, "nav-link-ic") +
        '<span class="nav-link-txt">' + esc(t("nav." + item.key)) + "</span>" +
        (isCur ? icon("check", 14, "nav-link-chk") : "") +
        "</a></li>";
    }).join("");

    return '<a class="skip" href="#main">' + esc(t("a11y.skip")) + "</a>" +
      '<header class="hdr" id="hdr"><div class="wrap hdr-in">' +
      logo(false) +
      '<nav class="nav-desktop" aria-label="Main"><ul>' + desktopLinks + "</ul></nav>" +
      '<div class="hdr-act">' + modeBtn() + themeBtn() + langSwitch() +
      '<a class="btn btn-primary btn-sm hdr-cta" href="' + N.href("contact.html") + '">' + esc(t("cta.start")) + icon("arrow", 16) + "</a>" +
      '<button type="button" class="burger" id="burger" aria-label="' + esc(t("a11y.openMenu")) + '" aria-expanded="false" aria-controls="nav">' +
      '<span></span><span></span><span></span></button>' +
      "</div></div></header>" +
      '<nav class="nav-drawer" id="nav" aria-label="Mobile Navigation">' +
      '<div class="nav-drawer-h">' +
        logo(false) +
        '<button type="button" class="nav-close" id="navClose" aria-label="Close">' + icon("close", 20) + '</button>' +
      '</div>' +
      '<ul class="nav-drawer-links">' + drawerLinks + "</ul>" +
      '<div class="nav-drawer-f">' +
        '<a class="btn btn-primary btn-block" href="' + N.href("contact.html") + '">' + esc(t("cta.start")) + icon("arrow", 16) + '</a>' +
      '</div>' +
      "</nav>" +
      '<div class="navscrim" id="navscrim" hidden></div>';
  }

  /* ---------------- footer ---------------- */
  function footer() {
    var s = N.content().settings;
    var files = { home: "index.html", about: "about.html", services: "services.html", work: "work.html", blog: "blog.html", contact: "contact.html" };
    var quick = Object.keys(files).map(function (k) {
      return '<li><a href="' + N.href(files[k]) + '">' + esc(t("nav." + k)) + "</a></li>";
    }).join("");
    var svcs = N.sortByOrder(N.content().services).filter(function (x) { return x.active; }).slice(0, 5).map(function (x) {
      return '<li><a href="' + N.href("services.html#" + x.id) + '">' + esc(T(x.name)) + "</a></li>";
    }).join("");
    var soc = [
      ["instagram", s.social.instagram], ["facebook", s.social.facebook],
      ["linkedin", s.social.linkedin], ["youtube", s.social.youtube]
    ].filter(function (x) { return x[1]; }).map(function (x) {
      return '<a class="soc" href="' + esc(x[1]) + '" target="_blank" rel="noopener" aria-label="' + x[0] + '">' + icon(x[0], 18) + "</a>";
    }).join("");

    return '<footer class="ftr"><div class="ftr-glow" aria-hidden="true"></div><div class="wrap">' +
      '<div class="ftr-grid">' +
        '<div class="ftr-col ftr-brand">' + logo(true) +
          "<p>" + esc(t("footer.about")) + "</p>" +
          '<div class="ftr-soc">' + soc + "</div></div>" +
        '<div class="ftr-col"><h4>' + esc(t("footer.quick")) + "</h4><ul>" + quick + "</ul></div>" +
        '<div class="ftr-col"><h4>' + esc(t("footer.servL")) + "</h4><ul>" + svcs + "</ul></div>" +
        '<div class="ftr-col ftr-news">' +
          "<h4>" + esc(t("footer.newsletter")) + "</h4>" +
          "<p>" + esc(t("footer.newsSub")) + "</p>" +
          '<form class="news-form" data-news novalidate>' +
            '<input type="email" required placeholder="' + esc(t("footer.newsPh")) + '" aria-label="' + esc(t("footer.newsPh")) + '">' +
            '<button type="submit" class="btn btn-ghost-light btn-sm">' + esc(t("footer.subscribe")) + "</button>" +
          "</form>" +
          '<ul class="ftr-contact">' +
            '<li>' + icon("mail", 16) + '<a href="mailto:' + esc(s.email) + '">' + esc(s.email) + "</a></li>" +
            '<li>' + icon("phone", 16) + '<a href="tel:' + esc(s.phone.replace(/\s/g, "")) + '">' + esc(s.phone) + "</a></li>" +
            '<li>' + icon("pin", 16) + "<span>" + esc(T(s.address)) + "</span></li>" +
          "</ul>" +
        "</div>" +
      "</div>" +
      '<div class="ftr-bar"><p>&copy; ' + new Date().getFullYear() + " " + esc(T(s.name)) + ". " + esc(t("footer.rights")) + "</p>" +
        '<div class="ftr-bar-r"><span>' + esc(t("footer.made")) + "</span>" +
        '<a class="ftr-admin" href="' + N.href("admin.html") + '">' + icon("layers", 15) + esc(t("footer.admin")) + "</a></div>" +
      "</div></div></footer>";
  }

  /* ---------------- mount helpers ---------------- */
  function mountHeader(active) {
    var h = document.getElementById("hdr-root");
    if (h) h.innerHTML = header(active);
    wireNav();
    wireLang();
  }
  function mountFooter() {
    var f = document.getElementById("ftr-root");
    if (f) { f.innerHTML = footer(); wireLang(); wireNews(); }
  }

  function wireNav() {
    var b = document.getElementById("burger"), nav = document.getElementById("nav"),
        sc = document.getElementById("navscrim"), hdr = document.getElementById("hdr"),
        nc = document.getElementById("navClose");
    function set(open) {
      if (!nav) return;
      nav.classList.toggle("is-open", open);
      if (sc) sc.hidden = !open;
      if (b) {
        b.setAttribute("aria-expanded", String(open));
        b.setAttribute("aria-label", t(open ? "a11y.closeMenu" : "a11y.openMenu"));
      }
      document.body.classList.toggle("no-scroll", open);
    }
    if (b) b.addEventListener("click", function (e) { e.preventDefault(); set(!nav.classList.contains("is-open")); });
    if (nc) nc.addEventListener("click", function (e) { e.preventDefault(); set(false); });
    if (sc) sc.addEventListener("click", function () { set(false); });
    if (nav) nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
    /* sticky shadow */
    var last = -1;
    function onScroll() {
      var y = window.scrollY > 8;
      if (y !== last) { hdr && hdr.classList.toggle("is-stuck", y); last = y; }
    }
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  function wireLang() {
    /* Kept for backwards compatibility if called elsewhere */
  }

  /* Global robust event handler for mode, theme, and language */
  document.addEventListener("click", function (e) {
    var modeBtn = e.target.closest("[data-mode-toggle]");
    var themeCycleBtn = e.target.closest("[data-theme-cycle]");
    var langBtn = e.target.closest("[data-langbtn]");
    var langIt = e.target.closest("[data-lang]");

    /* --- Day / Night Mode Direct 1-Click Toggle --- */
    if (modeBtn) {
      e.preventDefault();
      e.stopPropagation();
      N.toggleMode();
      return;
    }

    /* --- 4-Theme Color Direct 1-Click Cycle --- */
    if (themeCycleBtn) {
      e.preventDefault();
      e.stopPropagation();
      N.cycleTheme();
      return;
    }

    /* --- Language Button Dropdown --- */
    if (langBtn) {
      e.preventDefault();
      e.stopPropagation();
      var sw = langBtn.closest(".langsw");
      if (!sw) return;
      var lwasOpen = sw.classList.contains("is-open");
      document.querySelectorAll(".langsw.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        var b = o.querySelector("[data-langbtn]");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (!lwasOpen) {
        sw.classList.add("is-open");
        langBtn.setAttribute("aria-expanded", "true");
      }
      return;
    }

    /* --- Language Item Select --- */
    if (langIt) {
      e.preventDefault();
      e.stopPropagation();
      var langCode = langIt.getAttribute("data-lang");
      document.querySelectorAll(".langsw.is-open").forEach(function (o) {
        o.classList.remove("is-open");
        var b = o.querySelector("[data-langbtn]");
        if (b) b.setAttribute("aria-expanded", "false");
      });
      if (langCode) {
        N.setLang(langCode);
      }
      return;
    }

    /* Click outside */
    document.querySelectorAll(".langsw.is-open").forEach(function (o) {
      o.classList.remove("is-open");
      var b = o.querySelector("[data-langbtn]");
      if (b) b.setAttribute("aria-expanded", "false");
    });
  });

  /* Listen for Day/Night mode changes */
  document.addEventListener("nur:modechange", function (e) {
    var m = e.detail && e.detail.mode ? e.detail.mode : N.mode;
    var ic = m === "dark" ? "moon" : "sun";

    document.querySelectorAll("[data-mode-toggle]").forEach(function (btn) {
      btn.removeAttribute("title");
      btn.innerHTML = icon(ic, 18, "mode-ic");
    });
  });

  /* Listen for 4-Theme color changes */
  document.addEventListener("nur:themechange", function (e) {
    var th = e.detail && e.detail.theme ? e.detail.theme : N.theme;
    var col = N.THEME_COLOR[th] || "#00F0FF";

    document.querySelectorAll("[data-theme-cycle]").forEach(function (btn) {
      btn.removeAttribute("title");
      var dot = btn.querySelector(".theme-dot");
      if (dot) dot.style.background = col;
    });
  });

  function wireNews() {
    document.querySelectorAll("[data-news]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var i = f.querySelector("input");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) { i.focus(); i.classList.add("is-bad"); return; }
        i.classList.remove("is-bad"); i.value = "";
        toast(t("footer.subscribed"));
      });
    });
  }

  /* ---------------- modal ---------------- */
  function openModal(html, opts) {
    /* remove any previous dialog synchronously so two never coexist */
    document.querySelectorAll(".modal").forEach(function (m) { m.remove(); });
    document.removeEventListener("keydown", escClose);
    var el = document.createElement("div");
    el.className = "modal" + ((opts && opts.wide) ? " modal-wide" : "");
    el.setAttribute("role", "dialog"); el.setAttribute("aria-modal", "true");
    el.innerHTML = '<div class="modal-card">' +
      '<button type="button" class="modal-x" aria-label="' + esc(t("common.close")) + '">' + icon("close", 18) + "</button>" +
      html + "</div>";
    document.body.appendChild(el);
    document.body.classList.add("no-scroll");
    requestAnimationFrame(function () { el.classList.add("is-in"); });
    el.addEventListener("click", function (e) { if (e.target === el || e.target.closest(".modal-x")) closeModal(); });
    document.addEventListener("keydown", escClose);
    var f = el.querySelector("input,textarea,select,button:not(.modal-x)"); if (f) f.focus();
    return el;
  }
  function escClose(e) { if (e.key === "Escape") closeModal(); }
  function closeModal() {
    var m = document.querySelector(".modal");
    if (!m) return;
    m.classList.remove("is-in");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", escClose);
    setTimeout(function () { m.remove(); }, 180);
  }

  /* ---------------- toast ---------------- */
  function toast(msg, kind) {
    var box = document.getElementById("toasts");
    if (!box) { box = document.createElement("div"); box.id = "toasts"; box.className = "toasts"; document.body.appendChild(box); }
    var el = document.createElement("div");
    el.className = "toast" + (kind ? " toast-" + kind : "");
    el.innerHTML = icon(kind === "err" ? "close" : "check", 16) + "<span>" + esc(msg) + "</span>";
    box.appendChild(el);
    requestAnimationFrame(function () { el.classList.add("is-in"); });
    setTimeout(function () { el.classList.remove("is-in"); setTimeout(function () { el.remove(); }, 220); }, 3200);
  }

  /* ---------------- motion ---------------- */
  function reveal(root) {
    var els = (root || document).querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.style.transitionDelay = (en.target.getAttribute("data-delay") || 0) + "ms";
        en.target.classList.add("is-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }

  function counters(root) {
    (root || document).querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      var dur = 1200, t0 = null;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        el.textContent = N.fmtNum(Math.round(target * e));
        if (p < 1) requestAnimationFrame(step);
      }
      if (!("IntersectionObserver" in window)) { el.textContent = N.fmtNum(target); return; }
      var io = new IntersectionObserver(function (ents) {
        if (ents[0].isIntersecting) { requestAnimationFrame(step); io.disconnect(); }
      }, { threshold: .4 });
      io.observe(el);
    });
  }

  /* ---------------- shared blocks ---------------- */
  function sectionHead(eyebrow, title, sub, center) {
    return '<div class="sec-head' + (center ? " is-center" : "") + '" data-reveal>' +
      (eyebrow ? '<span class="eyebrow">' + esc(eyebrow) + "</span>" : "") +
      "<h2>" + title + "</h2>" +
      (sub ? "<p>" + esc(sub) + "</p>" : "") + "</div>";
  }

  function stars(n) {
    var s = "";
    for (var i = 0; i < 5; i++) s += icon("star", 15, i < n ? "is-on" : "is-off");
    return '<span class="stars" aria-label="' + n + '/5">' + s + "</span>";
  }

  function avatar(initials, color, size) {
    return '<span class="avatar" style="--av:' + esc(color || "#4F46E5") + ";--sz:" + (size || 44) + 'px">' + esc(initials) + "</span>";
  }

  function clientMark(name, color) {
    var ini = name.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
    return '<span class="cmark" style="--cm:' + esc(color || "#4F46E5") + '">' + esc(ini) + "</span>";
  }

  window.UI = {
    icon: icon, logo: logo, langSwitch: langSwitch, modeBtn: modeBtn, themeBtn: themeBtn,
    header: header, footer: footer,
    mountHeader: mountHeader, mountFooter: mountFooter,
    openModal: openModal, closeModal: closeModal, toast: toast,
    reveal: reveal, counters: counters,
    sectionHead: sectionHead, stars: stars, avatar: avatar, clientMark: clientMark
  };
})();
