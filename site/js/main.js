/* ============================================================
   PUBLIC SITE — page renderers
   Each page sets <body data-page="...">; content comes from the
   shared store so dashboard edits appear immediately.
   ============================================================ */
(function () {
  "use strict";
  var N = window.NUR, UI = window.UI, t = N.t, T = N.T, esc = N.esc, icon = UI.icon;

  var C = function () { return N.content(); };
  var catIcon = { brand: "spark", social: "share", video: "video", ads: "chart", web: "code", print: "billboard", photo: "camera" };

  /* ---------------- shared blocks ---------------- */

  function hero(opts) {
    return '<section class="hero' + (opts.mini ? " hero-mini" : "") + '">' +
      '<div class="hero-bg" aria-hidden="true"><span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>' +
      '<div class="hero-grid"></div></div>' +
      '<div class="wrap hero-in">' + opts.inner + "</div></section>";
  }

  function statsBlock() {
    var items = C().stats.map(function (s, i) {
      return '<div class="stat" data-reveal data-delay="' + (i * 70) + '">' +
        '<span class="stat-v num"><span data-count="' + s.value + '">0</span>' + esc(s.suffix || "") + "</span>" +
        '<span class="stat-l">' + esc(T(s.label)) + "</span></div>";
    }).join("");
    return '<section class="stats"><div class="wrap"><div class="stats-grid">' + items + "</div></div></section>";
  }

  function servicesBlock(limit) {
    var all = N.sortByOrder(C().services).filter(function (s) { return s.active; });
    var list = limit ? all.slice(0, limit) : all;
    var cards = list.map(function (s, i) {
      return '<article class="svc-card" id="' + s.id + '" data-reveal data-delay="' + (i % 4) * 70 + '">' +
        '<span class="svc-ic">' + icon(s.icon || "spark", 22) + "</span>" +
        "<h3>" + esc(T(s.name)) + "</h3>" +
        "<p>" + esc(T(s.short || s.desc)) + "</p>" +
        '<ul class="svc-list">' + (s.items || []).slice(0, 4).map(function (x) {
          return "<li>" + icon("check", 14) + "<span>" + esc(T(x)) + "</span></li>";
        }).join("") + "</ul>" +
        '<a class="lnk" href="' + N.href("contact.html") + '">' + esc(t("common.learnMore")) + icon("arrow", 15) + "</a>" +
        "</article>";
    }).join("");
    return '<section class="sec" id="services"><div class="wrap">' +
      UI.sectionHead(t("nav.services"), esc(t("sections.servicesT")), t("sections.servicesS")) +
      '<div class="svc-grid">' + cards + "</div>" +
      (limit ? '<div class="sec-more"><a class="btn btn-outline" href="' + N.href("services.html") + '">' + esc(t("common.viewAll")) + icon("arrow", 16) + "</a></div>" : "") +
      "</div></section>";
  }

  function workCard(w, i) {
    return '<article class="wk-card" data-cat="' + w.cat + '" data-reveal data-delay="' + (i % 3) * 80 + '" tabindex="0" role="button" ' +
      'aria-label="' + esc(T(w.title)) + '" data-work="' + w.id + '">' +
      '<div class="wk-img"><img src="' + esc(w.img) + '" alt="' + esc(T(w.title)) + '" loading="lazy" width="1536" height="1024">' +
      '<span class="wk-tag">' + icon(catIcon[w.cat] || "spark", 14) + esc(t("cat." + w.cat)) + "</span>" +
      '<span class="wk-zoom">' + icon("eye", 20) + "</span></div>" +
      '<div class="wk-body"><h3>' + esc(T(w.title)) + "</h3>" +
      '<p class="wk-client">' + esc(w.client) + " · " + w.year + "</p>" +
      '<p class="wk-res">' + icon("chart", 14) + esc(T(w.result)) + "</p></div></article>";
  }

  function workBlock(limit) {
    var all = N.sortByOrder(C().works).filter(function (w) { return w.active; });
    var list = limit ? all.filter(function (w) { return w.featured; }).slice(0, limit) : all;
    return '<section class="sec sec-alt" id="work"><div class="wrap">' +
      UI.sectionHead(t("nav.work"), esc(t("sections.workT")), t("sections.workS")) +
      '<div class="wk-grid">' + list.map(workCard).join("") + "</div>" +
      (limit ? '<div class="sec-more"><a class="btn btn-outline" href="' + N.href("work.html") + '">' + esc(t("common.viewAll")) + icon("arrow", 16) + "</a></div>" : "") +
      "</div></section>";
  }

  function processBlock() {
    var items = C().process.map(function (p, i) {
      return '<div class="proc" data-reveal data-delay="' + (i * 80) + '">' +
        '<span class="proc-n num">' + esc(p.n) + "</span>" +
        "<h3>" + esc(T(p.name)) + "</h3><p>" + esc(T(p.text)) + "</p></div>";
    }).join("");
    return '<section class="sec"><div class="wrap">' +
      UI.sectionHead(t("sections.processT"), esc(t("sections.processT")), t("sections.processS"), true) +
      '<div class="proc-grid">' + items + "</div></div></section>";
  }

  function clientsBlock() {
    var items = N.sortByOrder(C().clients).map(function (c) {
      return '<div class="cli" data-reveal>' + UI.clientMark(c.name, c.color) +
        '<div><strong>' + esc(c.name) + "</strong><span>" + esc(T(c.sector)) + "</span></div></div>";
    }).join("");
    return '<section class="sec sec-alt"><div class="wrap">' +
      UI.sectionHead(t("nav.work"), esc(t("sections.clientsT")), t("sections.clientsS"), true) +
      '<div class="cli-grid">' + items + "</div></div></section>";
  }

  function testiBlock(limit) {
    var list = C().testimonials.slice(0, limit || C().testimonials.length);
    var cards = list.map(function (x, i) {
      var nm = N.lang === "ar" ? x.nameAr : (N.lang === "en" ? x.nameEn : x.name);
      var ini = nm.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("");
      return '<figure class="testi" data-reveal data-delay="' + (i * 80) + '">' +
        '<span class="testi-q">' + icon("quote", 26) + "</span>" +
        UI.stars(x.rating) +
        "<blockquote>" + esc(T(x.text)) + "</blockquote>" +
        '<figcaption>' + UI.avatar(ini, x.color, 46) + "<div><strong>" + esc(nm) + "</strong><span>" + esc(T(x.role)) + "</span></div></figcaption>" +
        "</figure>";
    }).join("");
    return '<section class="sec"><div class="wrap">' +
      UI.sectionHead(t("nav.testi") || "", esc(t("sections.testiT")), t("sections.testiS"), true) +
      '<div class="testi-grid">' + cards + "</div></div></section>";
  }

  function blogBlock(limit) {
    var list = C().posts.filter(function (p) { return p.status === "published"; }).slice(0, limit || C().posts.length);
    var cards = list.map(function (p, i) {
      return '<article class="post" data-reveal data-delay="' + (i * 80) + '">' +
        '<span class="post-cat">' + esc(t("blog.categories." + p.cat)) + "</span>" +
        "<h3>" + esc(T(p.title)) + "</h3><p>" + esc(T(p.excerpt)) + "</p>" +
        '<div class="post-meta"><span>' + esc(N.fmtDate(p.date)) + "</span><span>" + p.read + " " + esc(t("common.minRead")) + "</span></div>" +
        "</article>";
    }).join("");
    return '<section class="sec sec-alt"><div class="wrap">' +
      UI.sectionHead(t("nav.blog"), esc(t("sections.blogT")), t("sections.blogS")) +
      '<div class="post-grid">' + cards + "</div></div></section>";
  }

  function teamBlock() {
    var items = C().team.map(function (m, i) {
      var nm = N.lang === "ar" ? m.nameAr : (N.lang === "en" ? m.nameEn : m.name);
      return '<div class="member" data-reveal data-delay="' + (i * 80) + '">' +
        UI.avatar(m.initials, m.color, 72) +
        "<h3>" + esc(nm) + "</h3><p>" + esc(T(m.role)) + "</p></div>";
    }).join("");
    return '<section class="sec sec-alt"><div class="wrap">' +
      UI.sectionHead("", esc(t("sections.teamT")), t("sections.teamS"), true) +
      '<div class="member-grid">' + items + "</div></div></section>";
  }

  function ctaBlock() {
    var s = C().settings;
    return '<section class="cta"><div class="cta-bg" aria-hidden="true"></div><div class="wrap cta-in">' +
      "<h2>" + esc(t("sections.ctaT")) + "</h2><p>" + esc(t("sections.ctaS")) + "</p>" +
      '<div class="cta-btns"><a class="btn btn-light" href="' + N.href("contact.html") + '">' + esc(t("cta.start")) + icon("arrow", 16) + "</a>" +
      '<a class="btn btn-ghost-light" href="tel:' + esc(s.phone.replace(/\s/g, "")) + '">' + icon("phone", 16) + esc(s.phone) + "</a></div>" +
      "</div></section>";
  }

  /* ---------------- work detail modal ---------------- */
  function openWork(id) {
    var w = C().works.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    var svc = C().services.filter(function (s) { return s.id === ({ brand: "s1", social: "s3", video: "s5", ads: "s4", web: "s6", print: "s7", photo: "s8" })[w.cat]; })[0];
    var html = '<div class="wd"><div class="wd-img"><img src="' + esc(w.img) + '" alt="' + esc(T(w.title)) + '"></div>' +
      '<div class="wd-body">' +
      '<span class="wk-tag">' + icon(catIcon[w.cat] || "spark", 14) + esc(t("cat." + w.cat)) + "</span>" +
      "<h2>" + esc(T(w.title)) + "</h2>" +
      '<dl class="wd-dl">' +
      "<div><dt>" + esc(t("work.client")) + "</dt><dd>" + esc(w.client) + "</dd></div>" +
      "<div><dt>" + esc(t("work.year")) + "</dt><dd>" + w.year + "</dd></div>" +
      "<div><dt>" + esc(t("work.scope")) + "</dt><dd>" + esc(svc ? T(svc.name) : t("cat." + w.cat)) + "</dd></div>" +
      "</dl>" +
      '<p class="wd-res">' + icon("chart", 17) + "<span>" + esc(T(w.result)) + "</span></p>" +
      (svc ? "<p>" + esc(T(svc.desc)) + "</p>" : "") +
      '<a class="btn btn-primary" href="' + N.href("contact.html") + '">' + esc(t("cta.start")) + icon("arrow", 16) + "</a>" +
      "</div></div>";
    UI.openModal(html, { wide: true });
  }

  function wireWork() {
    document.querySelectorAll("[data-work]").forEach(function (el) {
      var go = function () { openWork(el.getAttribute("data-work")); };
      el.addEventListener("click", go);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  /* ---------------- contact form ---------------- */
  function contactForm() {
    var opts = N.sortByOrder(C().services).filter(function (s) { return s.active; }).map(function (s) {
      return '<option value="' + s.id + '">' + esc(T(s.name)) + "</option>";
    }).join("");
    return '<form class="form" id="leadForm" novalidate>' +
      '<div class="f-row">' +
        '<label>' + esc(t("contact.name")) + '<input name="name" type="text" required autocomplete="name"><span class="f-err" data-err="name"></span></label>' +
        '<label>' + esc(t("contact.email")) + '<input name="email" type="email" required autocomplete="email"><span class="f-err" data-err="email"></span></label>' +
      "</div>" +
      '<div class="f-row">' +
        '<label>' + esc(t("contact.phone")) + '<input name="phone" type="tel" autocomplete="tel"></label>' +
        '<label>' + esc(t("contact.service")) + '<select name="service"><option value="">' + esc(t("contact.selectPlaceholder")) + "</option>" + opts + "</select></label>" +
      "</div>" +
      '<label>' + esc(t("contact.subject")) + '<input name="subject" type="text"></label>' +
      '<label>' + esc(t("contact.message")) + '<textarea name="message" rows="5" required></textarea><span class="f-err" data-err="message"></span></label>' +
      '<button type="submit" class="btn btn-primary btn-block" data-submit>' + esc(t("contact.send")) + icon("arrow", 16) + "</button>" +
      '<p class="form-ok" data-ok hidden>' + icon("check", 16) + esc(t("contact.success")) + "</p>" +
      "</form>";
  }

  function wireForm() {
    var f = document.getElementById("leadForm");
    if (!f) return;
    var busy = false, tries = 0;
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (busy) return;
      tries++;
      if (tries > 5) { UI.toast(t("contact.errGeneric"), "err"); return; }
      var d = {};
      new FormData(f).forEach(function (v, k) { d[k] = String(v).trim(); });
      var bad = false;
      ["name", "email", "message"].forEach(function (k) {
        var el = f.querySelector('[data-err="' + k + '"]'); if (el) el.textContent = "";
      });
      if (!d.name) { f.querySelector('[data-err="name"]').textContent = t("contact.errName"); bad = true; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { f.querySelector('[data-err="email"]').textContent = t("contact.errEmail"); bad = true; }
      if (!d.message || d.message.length < 10) { f.querySelector('[data-err="message"]').textContent = t("contact.errMsg"); bad = true; }
      if (bad) return;

      var svc = C().services.filter(function (s) { return s.id === d.service; })[0];
      busy = true;
      var btn = f.querySelector("[data-submit]");
      btn.disabled = true; btn.innerHTML = t("contact.sending");
      setTimeout(function () {
        N.addLead({
          name: d.name, email: d.email, phone: d.phone || "—",
          subject: { ug: d.subject || (svc ? T(svc.name) : "ئومۇمىي"), ar: d.subject || (svc ? T(svc.name) : "عام"), en: d.subject || (svc ? T(svc.name) : "General") },
          message: { ug: d.message, ar: d.message, en: d.message }
        });
        f.reset();
        f.querySelector("[data-ok]").hidden = false;
        UI.toast(t("contact.success"));
        btn.disabled = false; btn.innerHTML = t("contact.send") + icon("arrow", 16);
        busy = false;
      }, 650);
    });
  }

  /* ---------------- pages ---------------- */
  var PAGES = {
    index: function () {
      var h = C().hero;
      document.getElementById("main").innerHTML =
        hero({ inner:
          '<div class="hero-copy" data-reveal>' +
            '<span class="eyebrow">' + icon("spark", 14) + esc(T(h.eyebrow)) + "</span>" +
            "<h1>" + esc(T(h.title)) + ' <span class="grad-text">' + esc(T(h.titleAccent)) + "</span></h1>" +
            '<p class="lead">' + esc(T(h.sub)) + "</p>" +
            '<div class="hero-btns">' +
              '<a class="btn btn-primary btn-lg" href="' + N.href("contact.html") + '">' + esc(T(h.ctaPrimary)) + icon("arrow", 16) + "</a>" +
              '<a class="btn btn-ghost" href="' + N.href("work.html") + '">' + icon("play", 16) + esc(T(h.ctaSecondary)) + "</a>" +
            "</div>" +
            '<ul class="hero-marks">' + ["Google", "Meta", "TikTok", "LinkedIn"].map(function (b) {
              return "<li>" + esc(b) + "</li>";
            }).join("") + "</ul>" +
          "</div>" +
          '<div class="hero-art" data-reveal data-delay="120">' +
            '<img src="img/hero.jpg" alt="" width="1536" height="1024">' +
            '<span class="float f1">' + icon("chart", 18) + '<b class="num">5.8×</b><i>ROAS</i></span>' +
            '<span class="float f2">' + icon("users", 18) + '<b class="num">180+</b><i>brands</i></span>' +
            '<span class="float f3">' + icon("star", 18) + '<b class="num">4.9</b><i>rating</i></span>' +
          "</div>"
        }) +
        statsBlock() +
        servicesBlock(4) +
        workBlock(3) +
        processBlock() +
        clientsBlock() +
        blogBlock(3) +
        ctaBlock();
      UI.counters(); wireWork();
    },

    about: function () {
      document.getElementById("main").innerHTML =
        hero({ mini: true, inner:
          '<div class="ph" data-reveal><span class="eyebrow">' + esc(t("nav.about")) + "</span>" +
          "<h1>" + esc(t("sections.aboutT")) + "</h1><p class=\"lead\">" + esc(T(C().hero.sub)) + "</p></div>" }) +
        '<section class="sec"><div class="wrap split">' +
          '<div class="split-txt" data-reveal>' + story().map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + "</div>" +
          '<div class="split-img" data-reveal data-delay="120"><img src="img/office.jpg" alt="" loading="lazy" width="1536" height="1024">' +
          '<span class="split-badge"><b class="num">12</b><i>' + esc(t("common.years")) + "</i></span></div>" +
        "</div></section>" +
        statsBlock() +
        '<section class="sec sec-alt"><div class="wrap">' +
          UI.sectionHead("", esc(t("sections.valuesT")), "", true) +
          '<div class="val-grid">' + t2().map(function (v, i) {
            return '<div class="val" data-reveal data-delay="' + (i * 80) + '"><span class="val-n num">0' + (i + 1) + "</span><h3>" + esc(v.t) + "</h3><p>" + esc(v.d) + "</p></div>";
          }).join("") + "</div></div></section>" +
        processBlock() + teamBlock() + ctaBlock();
    },

    services: function () {
      document.getElementById("main").innerHTML =
        hero({ mini: true, inner:
          '<div class="ph" data-reveal><span class="eyebrow">' + esc(t("nav.services")) + "</span>" +
          "<h1>" + esc(t("sections.servicesT")) + "</h1><p class=\"lead\">" + esc(t("sections.servicesS")) + "</p></div>" }) +
        servicesBlock(0) + ctaBlock();
      var id = location.hash.slice(1);
      if (id) { var el = document.getElementById(id); if (el) setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 250); }
    },

    work: function () {
      var cats = ["brand", "social", "video", "ads", "web", "print", "photo"];
      var chips = '<button type="button" class="chip is-on" data-f="all">' + esc(t("common.all")) + "</button>" +
        cats.map(function (c) { return '<button type="button" class="chip" data-f="' + c + '">' + icon(catIcon[c], 14) + esc(t("cat." + c)) + "</button>"; }).join("");
      document.getElementById("main").innerHTML =
        hero({ mini: true, inner:
          '<div class="ph" data-reveal><span class="eyebrow">' + esc(t("nav.work")) + "</span>" +
          "<h1>" + esc(t("sections.workT")) + "</h1><p class=\"lead\">" + esc(t("sections.workS")) + "</p></div>" }) +
        '<section class="sec"><div class="wrap">' +
        '<div class="chips" data-reveal>' + chips + "</div>" +
        '<div class="wk-grid" id="wkGrid">' +
          N.sortByOrder(C().works).filter(function (w) { return w.active; }).map(workCard).join("") +
        "</div>" +
        '<p class="empty" id="wkEmpty" hidden>' + esc(t("common.noResults")) + "</p>" +
        "</div></section>" + ctaBlock();
      wireWork();
      document.querySelectorAll("[data-f]").forEach(function (b) {
        b.addEventListener("click", function () {
          document.querySelectorAll("[data-f]").forEach(function (x) { x.classList.remove("is-on"); });
          b.classList.add("is-on");
          var f = b.getAttribute("data-f"), shown = 0;
          document.querySelectorAll("#wkGrid .wk-card").forEach(function (c) {
            var ok = f === "all" || c.getAttribute("data-cat") === f;
            c.style.display = ok ? "" : "none"; if (ok) shown++;
          });
          document.getElementById("wkEmpty").hidden = shown > 0;
        });
      });
    },

    blog: function () {
      var cats = ["marketing", "branding", "seo", "video"];
      var chips = '<button type="button" class="chip is-on" data-b="all">' + esc(t("blog.allCat")) + "</button>" +
        cats.map(function (c) { return '<button type="button" class="chip" data-b="' + c + '">' + esc(t("blog.categories." + c)) + "</button>"; }).join("");
      document.getElementById("main").innerHTML =
        hero({ mini: true, inner:
          '<div class="ph" data-reveal><span class="eyebrow">' + esc(t("nav.blog")) + "</span>" +
          "<h1>" + esc(t("sections.blogT")) + "</h1><p class=\"lead\">" + esc(t("sections.blogS")) + "</p></div>" }) +
        '<section class="sec"><div class="wrap">' +
        '<div class="chips" data-reveal>' + chips + "</div>" +
        '<div class="post-grid" id="pGrid">' + C().posts.filter(function (p) { return p.status === "published"; }).map(function (p, i) {
          return '<article class="post" data-p="' + p.cat + '" data-reveal data-delay="' + (i * 70) + '">' +
            '<span class="post-cat">' + esc(t("blog.categories." + p.cat)) + "</span>" +
            "<h3>" + esc(T(p.title)) + "</h3><p>" + esc(T(p.excerpt)) + "</p>" +
            '<div class="post-meta"><span>' + esc(N.fmtDate(p.date)) + "</span><span>" + p.read + " " + esc(t("common.minRead")) + "</span></div></article>";
        }).join("") + "</div>" +
        '<p class="empty" id="pEmpty" hidden>' + esc(t("common.noResults")) + "</p>" +
        "</div></section>" + ctaBlock();
      document.querySelectorAll("[data-b]").forEach(function (b) {
        b.addEventListener("click", function () {
          document.querySelectorAll("[data-b]").forEach(function (x) { x.classList.remove("is-on"); });
          b.classList.add("is-on");
          var f = b.getAttribute("data-b"), shown = 0;
          document.querySelectorAll("#pGrid .post").forEach(function (c) {
            var ok = f === "all" || c.getAttribute("data-p") === f;
            c.style.display = ok ? "" : "none"; if (ok) shown++;
          });
          document.getElementById("pEmpty").hidden = shown > 0;
        });
      });
    },

    contact: function () {
      var s = C().settings;
      document.getElementById("main").innerHTML =
        hero({ mini: true, inner:
          '<div class="ph" data-reveal><span class="eyebrow">' + esc(t("nav.contact")) + "</span>" +
          "<h1>" + esc(t("sections.contactT")) + "</h1><p class=\"lead\">" + esc(t("sections.contactS")) + "</p></div>" }) +
        '<section class="sec"><div class="wrap c-grid">' +
          '<div class="c-form" data-reveal>' + contactForm() + "</div>" +
          '<aside class="c-side" data-reveal data-delay="120">' +
            "<h3>" + esc(t("sections.infoT")) + "</h3>" +
            '<ul class="c-list">' +
              '<li>' + icon("mail", 18) + '<div><span>' + esc(t("contact.emailL")) + '</span><a href="mailto:' + esc(s.email) + '">' + esc(s.email) + "</a></div></li>" +
              '<li>' + icon("phone", 18) + '<div><span>' + esc(t("contact.phoneL")) + '</span><a href="tel:' + esc(s.phone.replace(/\s/g, "")) + '">' + esc(s.phone) + "</a><a href=\"tel:" + esc(s.phone2.replace(/\s/g, "")) + '">' + esc(s.phone2) + "</a></div></li>" +
              '<li>' + icon("pin", 18) + "<div><span>" + esc(t("contact.address")) + "</span><p>" + esc(T(s.address)) + "</p></div></li>" +
              '<li>' + icon("clock", 18) + "<div><span>" + esc(t("contact.hoursL")) + "</span><p>" + esc(T(s.hours)) + "</p></div></li>" +
            "</ul>" +
            '<div class="c-map" aria-hidden="true">' + mapSvg() + "</div>" +
          "</aside>" +
        "</div></section>" + ctaBlock();
      wireForm();
    }
  };

  /* narrative copy lives in I18N, not in the editable content store */
  function t2() {
    return window.I18N[N.lang].values || window.I18N.en.values;
  }
  function story() {
    return window.I18N[N.lang].story || window.I18N.en.story;
  }

  function mapSvg() {
    return '<svg viewBox="0 0 400 220" width="100%" height="180" role="img" aria-label="map">' +
      '<rect width="400" height="220" fill="#EEF0FA"/>' +
      '<g stroke="#D3D8EC" stroke-width="1.5">' +
      '<path d="M0 40h400M0 95h400M0 150h400M0 205h400"/>' +
      '<path d="M60 0v220M140 0v220M220 0v220M300 0v220M370 0v220"/></g>' +
      '<path d="M0 150 L140 95 L220 120 L400 40" fill="none" stroke="#C7CCE4" stroke-width="9" stroke-linecap="round"/>' +
      '<circle cx="220" cy="120" r="30" fill="#7C3AED" opacity=".13"/>' +
      '<circle cx="220" cy="120" r="16" fill="#7C3AED" opacity=".22"/>' +
      '<path d="M220 104a13 13 0 0 0-13 13c0 10 13 24 13 24s13-14 13-24a13 13 0 0 0-13-13z" fill="#4F46E5"/>' +
      '<circle cx="220" cy="117" r="4.6" fill="#fff"/></svg>';
  }

  /* ---------------- boot ---------------- */
  function boot() {
    N.applyLang(N.lang);
    var page = document.body.getAttribute("data-page") || "index";
    UI.mountHeader(page);
    var main = document.getElementById("main");
    if (main && PAGES[page]) PAGES[page]();
    UI.mountFooter();
    UI.reveal();
    document.dispatchEvent(new CustomEvent("nur:rendered"));
  }

  function rerender() {
    boot();
    window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
  }

  document.addEventListener("nur:langchange", rerender);
  document.addEventListener("DOMContentLoaded", boot);
  if (document.readyState !== "loading") boot();

  window.SITE = { rerender: rerender, openWork: openWork };
})();
