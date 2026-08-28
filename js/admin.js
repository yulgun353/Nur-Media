/* ============================================================
   NUR Media — Admin dashboard (ug / ar / en)
   Static demo build: auth + persistence via localStorage.
   ============================================================ */
(function () {
  "use strict";
  var N = window.NUR, UI = window.UI, esc = N.esc, icon = UI.icon;
  var A, T, L;   /* admin strings, trilingual picker, lang */

  function sync() {
    L = N.lang;
    A = window.ADMIN_I18N[L] || window.ADMIN_I18N.en;
    T = N.T;
    document.documentElement.lang = L;
    document.documentElement.dir = A.dir;
  }
  function a(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, A);
  }
  var C = function () { return N.content(); };

  /* ================= AUTH ================= */
  var ATTEMPTS = 0, LOCKED = 0;
  function loginView() {
    var s = C().settings;
    var siteName = esc(T(s.name) || "نۇر مېدىيا");
    var auth = N.getAuth();
    return '<div class="auth">' +
      '<div class="auth-bg" aria-hidden="true">' +
        '<div class="auth-vortex"></div>' +
        '<div class="auth-aurora a1"></div>' +
        '<div class="auth-aurora a2"></div>' +
        '<div class="auth-aurora a3"></div>' +
        '<div class="auth-orb orb-1"></div>' +
        '<div class="auth-orb orb-2"></div>' +
        '<div class="auth-orb orb-3"></div>' +
        '<div class="auth-wave w1"></div>' +
        '<div class="auth-wave w2"></div>' +
      '</div>' +
      '<div class="auth-topbar">' +
        '<a href="index.html?lang=' + L + '" class="auth-back-btn">' +
          icon("arrow", 16, "auth-back-ic") +
          '<span>' + esc(a("login.backHome") || "باش بەتكە قايتىش") + '</span>' +
        '</a>' +
        '<div class="auth-top-lang">' + UI.langSwitch("auth-lang-btn") + '</div>' +
      '</div>' +
      '<div class="auth-container">' +
        '<div class="auth-top-capsule">' +
          '<div class="auth-capsule-brand">' +
            '<span class="auth-capsule-logo">' + logoSvg() + '</span>' +
            '<b class="auth-capsule-name">' + siteName + '</b>' +
          '</div>' +
          '<span class="auth-capsule-divider"></span>' +
          '<span class="auth-capsule-tag"><i class="badge-dot"></i> ' + esc(a("brand") || "باشقۇرۇش سۇپىسى") + '</span>' +
        '</div>' +
        '<form class="auth-card" id="loginForm" autocomplete="off" novalidate>' +
          '<div class="auth-card-h">' +
            '<div class="auth-avatar-glow">' +
              icon("user", 34, "auth-avatar-svg") +
            '</div>' +
          '</div>' +
          '<div class="auth-err" id="authErr" role="alert" aria-live="polite">' +
            icon("close", 16) +
            '<span></span>' +
          '</div>' +
          '<div class="auth-fields">' +
            '<div class="auth-field">' +
              '<label for="authEmail">' + esc(a("login.email")) + '</label>' +
              '<div class="auth-input-pill">' +
                '<span class="auth-input-ic">' + icon("mail", 18) + '</span>' +
                '<input id="authEmail" name="email" type="text" value="admin@nurmedia.co" autocomplete="username" required placeholder="admin@nurmedia.co">' +
              '</div>' +
            '</div>' +
            '<div class="auth-field">' +
              '<label for="authPass">' + esc(a("login.pass")) + '</label>' +
              '<div class="auth-input-pill">' +
                '<span class="auth-input-ic">' + icon("lock", 18) + '</span>' +
                '<input id="authPass" name="pass" type="password" value="" autocomplete="current-password" required placeholder="••••••••">' +
                '<button type="button" class="auth-pass-toggle" id="togglePass" aria-label="Toggle password visibility">' +
                  '<span class="pass-show">' + icon("eye", 17) + '</span>' +
                  '<span class="pass-hide" hidden>' + icon("eyeOff", 17) + '</span>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<button type="submit" class="btn auth-btn-submit" id="authSubmit">' +
            '<span>' + esc(a("login.submit")) + '</span>' +
          '</button>' +
        '</form>' +
      '</div>' +
    '</div>';
  }
  function logoSvg() {
    return '<svg viewBox="0 0 40 40" width="36" height="36" aria-hidden="true">' +
      '<defs><linearGradient id="alg" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#00F0FF"/><stop offset=".55" stop-color="#0072FF"/><stop offset="1" stop-color="#38BDF8"/>' +
      '</linearGradient></defs><rect width="40" height="40" rx="12" fill="url(#alg)"/>' +
      '<path d="M12 28V12l16 16V12" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }

  function wireLogin() {
    var f = document.getElementById("loginForm");
    if (!f) return;
    UI.reveal();

    var passInput = document.getElementById("authPass");
    var emailInput = document.getElementById("authEmail");

    // Toggle password visibility
    var toggleBtn = document.getElementById("togglePass");
    if (toggleBtn && passInput) {
      toggleBtn.addEventListener("click", function (e) {
        e.preventDefault();
        var isPass = passInput.type === "password";
        passInput.type = isPass ? "text" : "password";
        var showIc = toggleBtn.querySelector(".pass-show");
        var hideIc = toggleBtn.querySelector(".pass-hide");
        if (showIc && hideIc) {
          showIc.hidden = isPass;
          hideIc.hidden = !isPass;
        }
      });
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var err = document.getElementById("authErr"), span = err.querySelector("span");
      var emailVal = emailInput ? emailInput.value : "";
      var passVal = passInput ? passInput.value : "";
      var ok = N.checkAuth(emailVal, passVal);
      if (!ok) {
        span.textContent = a("login.err");
        err.classList.add("is-on");
        err.classList.remove("shake");
        void err.offsetWidth;
        err.classList.add("shake");
        return;
      }
      err.classList.remove("is-on");
      N.login();
      UI.toast(a("toast.loginOk"));
      var wanted = (location.hash || "").replace("#/", "");
      if (!wanted || !VIEWS[wanted]) location.hash = "#/overview";
      render();
    });
  }

  /* ================= PASSWORD MODAL ================= */
  function openPasswordModal() {
    var auth = N.getAuth();
    var html = '<form class="modal-form" id="passModalForm">' +
      '<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.2rem">' +
        '<span style="display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:13px;background:linear-gradient(135deg,rgba(0,229,255,.2),rgba(0,114,255,.2));color:#00F0FF;border:1px solid rgba(0,229,255,.35);box-shadow:0 0 15px rgba(0,229,255,.2)">' + icon("key", 20) + '</span>' +
        '<div><h2 style="margin:0;font-size:var(--fs-lg);color:#FFFFFF">' + esc(a("security.title")) + '</h2><p style="margin:0;font-size:var(--fs-xs);color:#94A3B8">' + esc(a("security.sub")) + '</p></div>' +
      '</div>' +
      '<div class="auth-err" id="modalPassErr" style="margin-bottom:1rem">' + icon("close", 15) + '<span></span></div>' +
      '<div class="f-grid">' +
        '<label>' + esc(a("security.adminEmail")) +
          '<div class="auth-input-group"><span class="auth-input-ic">' + icon("mail", 17) + '</span><input name="email" type="email" value="' + esc(auth.email) + '" required placeholder="admin@nurmedia.co"></div>' +
        '</label>' +
        '<label>' + esc(a("security.curPass")) +
          '<div class="auth-input-group"><span class="auth-input-ic">' + icon("lock", 17) + '</span><input name="curPass" type="password" required placeholder="••••••••"></div>' +
        '</label>' +
        '<div class="f-2">' +
          '<label>' + esc(a("security.newPass")) +
            '<div class="auth-input-group"><span class="auth-input-ic">' + icon("key", 17) + '</span><input name="newPass" type="password" required minlength="4" placeholder="••••••••"></div>' +
          '</label>' +
          '<label>' + esc(a("security.confirmPass")) +
            '<div class="auth-input-group"><span class="auth-input-ic">' + icon("check", 17) + '</span><input name="confirmPass" type="password" required minlength="4" placeholder="••••••••"></div>' +
          '</label>' +
        '</div>' +
      '</div>' +
      '<div class="mfoot" style="justify-content:flex-end;align-items:center;gap:.5rem">' +
        '<button type="button" class="btn btn-ghost btn-sm" data-close>' + esc(N.t("common.cancel")) + '</button>' +
        '<button type="submit" class="btn btn-primary btn-sm">' + icon("check", 15) + ' ' + esc(a("security.changeBtn")) + '</button>' +
      '</div>' +
    '</form>';

    var el = UI.openModal(html, { wide: false });
    var form = el.querySelector("#passModalForm");
    var errBox = el.querySelector("#modalPassErr");
    var errSpan = errBox.querySelector("span");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = new FormData(form);
      var email = String(d.get("email")).trim();
      var curPass = String(d.get("curPass"));
      var newPass = String(d.get("newPass"));
      var confirmPass = String(d.get("confirmPass"));
      var currentCreds = N.getAuth();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errSpan.textContent = a("security.emailErr"); errBox.classList.add("is-on"); return;
      }
      if (!N.checkAuth(currentCreds.email, curPass)) {
        errSpan.textContent = a("security.curPassErr"); errBox.classList.add("is-on"); return;
      }
      if (newPass.length < 4) {
        errSpan.textContent = a("security.lenErr"); errBox.classList.add("is-on"); return;
      }
      if (newPass !== confirmPass) {
        errSpan.textContent = a("security.matchErr"); errBox.classList.add("is-on"); return;
      }

      N.setAuth(email, newPass);
      UI.closeModal();
      UI.toast(a("security.success"));
      render();
    });
  }

  /* ================= SHELL ================= */
  var NAV = [
    { grp: null, items: [{ k: "overview", ic: "grid", t: "nav.overview" }] },
    { grp: "nav.content", items: [
      { k: "services", ic: "spark", t: "nav.services" },
      { k: "works", ic: "layers", t: "nav.works" },
      { k: "clients", ic: "users", t: "nav.clients" },
      { k: "testimonials", ic: "quote", t: "nav.testi" },
      { k: "posts", ic: "doc", t: "nav.posts" },
      { k: "team", ic: "heart", t: "nav.team" },
      { k: "leads", ic: "inbox", t: "nav.leads", badge: function () { return C().leads.filter(function (x) { return x.status === "new"; }).length; } }
    ] },
    { grp: "nav.system", items: [
      { k: "settings", ic: "gear", t: "nav.settings" },
      { k: "translate", ic: "globe", t: "nav.translate" },
      { k: "data", ic: "download", t: "nav.data" }
    ] }
  ];

  function shell() {
    var s = C().settings;
    var groups = NAV.map(function (g) {
      var items = g.items.map(function (it) {
        var b = it.badge ? it.badge() : 0;
        return '<a href="#/' + it.k + '" data-r="' + it.k + '">' + icon(it.ic, 18) + "<span>" + esc(a(it.t)) + "</span>" +
          (b ? '<span class="badge num">' + b + "</span>" : "") + "</a>";
      }).join("");
      return (g.grp ? '<p class="side-grp">' + esc(a(g.grp)) + "</p>" : "") + items;
    }).join("");

    return '<div class="shell">' +
      '<aside class="side" id="side">' +
        '<div class="side-top"><span class="logo-mark">' + logoSvg() + "</span>" +
          '<span class="side-brand"><b>' + esc(T(s.name)) + "</b><i>" + esc(a("brand")) + "</i></span></div>" +
        '<nav class="side-nav">' + groups + "</nav>" +
        '<div class="side-foot">' +
          '<a href="index.html?lang=' + L + '" target="_blank" rel="noopener">' + icon("eye", 16) + esc(a("nav.site")) + "</a>" +
          '<a href="#" id="logout">' + icon("logout", 16) + esc(a("nav.logout")) + "</a>" +
        "</div>" +
      "</aside>" +
      '<div class="scrim2" id="scrim2" hidden></div>' +
      '<div class="main"><header class="top">' +
        '<button type="button" class="burger2" id="burger2" aria-label="menu">' + icon("menu", 22) + "</button>" +
        "<h1 id=\"pageTitle\"></h1>" +
        '<div class="top-r">' + UI.modeBtn() + UI.themeBtn() + UI.langSwitch() +
          '<a class="icon-btn" href="index.html?lang=' + L + '" target="_blank" rel="noopener" aria-label="' + esc(a("nav.site")) + '">' + icon("eye", 18) + "</a>" +
          '<button type="button" class="me me-btn" id="openPassModal" aria-label="' + esc(a("security.title")) + '">' +
            UI.avatar("AD", "#00F0FF", 36) +
            '<span class="me-txt"><b>Admin</b><i style="font-style:normal;color:var(--ink-3)">' + esc(N.getAuth().email) + '</i></span>' +
            '<span class="me-key" style="color:#00F0FF;display:inline-flex;padding:4px;border-radius:6px;background:rgba(0,229,255,.1)">' + icon("key", 14) + '</span>' +
          '</button>' +
        "</div>" +
      "</header><main class=\"view\" id=\"view\"></main></div>" +
    "</div>";
  }

  function wireShell() {
    var side = document.getElementById("side"), sc = document.getElementById("scrim2"), b = document.getElementById("burger2");
    function set(o) { side.classList.toggle("is-open", o); sc.hidden = !o; }
    if (b) b.addEventListener("click", function () { set(!side.classList.contains("is-open")); });
    if (sc) sc.addEventListener("click", function () { set(false); });
    document.querySelectorAll(".side-nav a").forEach(function (x) { x.addEventListener("click", function () { set(false); }); });
    var lo = document.getElementById("logout");
    if (lo) lo.addEventListener("click", function (e) { e.preventDefault(); N.logout(); location.hash = ""; render(); });
    var pm = document.getElementById("openPassModal");
    if (pm) pm.addEventListener("click", openPasswordModal);
  }

  /* ================= CHARTS ================= */
  function lineChart(labels, values) {
    var W = 720, H = 220, P = { t: 16, r: 12, b: 26, l: 40 };
    var max = Math.max.apply(null, values) * 1.15;
    var iw = W - P.l - P.r, ih = H - P.t - P.b;
    var x = function (i) { return P.l + (iw * i) / (values.length - 1); };
    var y = function (v) { return P.t + ih - (ih * v) / max; };
    var d = values.map(function (v, i) { return (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1); }).join(" ");
    var area = d + " L" + x(values.length - 1) + " " + (P.t + ih) + " L" + P.l + " " + (P.t + ih) + " Z";
    var grid = "", labs = "", dots = "";
    for (var g = 0; g <= 4; g++) {
      var gy = P.t + (ih * g) / 4;
      grid += '<line class="gl" x1="' + P.l + '" y1="' + gy + '" x2="' + (W - P.r) + '" y2="' + gy + '"/>';
      var val = Math.round(max * (1 - g / 4));
      labs += '<text class="lab" x="' + (P.l - 8) + '" y="' + (gy + 3.5) + '" text-anchor="end">' + (val >= 1000 ? (val / 1000).toFixed(1) + "k" : val) + "</text>";
    }
    values.forEach(function (v, i) {
      dots += '<circle class="dot" cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4"><title>' + labels[i] + ": " + v + "</title></circle>";
      if (i % 1 === 0) labs += '<text class="lab" x="' + x(i).toFixed(1) + '" y="' + (H - 6) + '" text-anchor="middle">' + labels[i] + "</text>";
    });
    return '<svg class="chart" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" role="img">' +
      '<defs><linearGradient id="cgrad" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#7C3AED" stop-opacity=".26"/><stop offset="1" stop-color="#7C3AED" stop-opacity="0"/>' +
      '</linearGradient><linearGradient id="cline" x1="0" y1="0" x2="1" y2="0">' +
        '<stop offset="0" stop-color="#4F46E5"/><stop offset="1" stop-color="#D946EF"/>' +
      "</linearGradient></defs>" + grid + '<path class="ar" d="' + area + '"/><path class="ln" d="' + d + '"/>' + dots + labs + "</svg>";
  }

  function donut(parts) {
    var total = parts.reduce(function (s, p) { return s + p.v; }, 0);
    var r = 54, cx = 70, cy = 70, sw = 20, ang = -90, out = "";
    parts.forEach(function (p) {
      var frac = p.v / total, sweep = frac * 360;
      var a0 = (ang * Math.PI) / 180, a1 = ((ang + sweep) * Math.PI) / 180;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var large = sweep > 180 ? 1 : 0;
      out += '<path d="M' + x0.toFixed(2) + " " + y0.toFixed(2) + " A" + r + " " + r + " 0 " + large + " 1 " + x1.toFixed(2) + " " + y1.toFixed(2) +
        '" fill="none" stroke="' + p.c + '" stroke-width="' + sw + '" stroke-linecap="butt"><title>' + p.k + ": " + p.v + "%</title></path>";
      ang += sweep;
    });
    return '<svg width="140" height="140" viewBox="0 0 140 140">' + out +
      '<text x="70" y="66" text-anchor="middle" style="font:700 20px \'Space Grotesk\',sans-serif;fill:var(--ink)">' + total + "%</text>" +
      '<text x="70" y="84" text-anchor="middle" style="font:11px \'Inter\',sans-serif;fill:var(--ink-3)">2026</text></svg>';
  }

  /* ================= OVERVIEW ================= */
  function viewOverview() {
    var c = C();
    var newLeads = c.leads.filter(function (x) { return x.status === "new"; }).length;
    var visits = c.traffic.visits.reduce(function (s, v) { return s + v; }, 0);
    var cards = [
      { ic: "inbox", cl: "", l: a("stats.leads"), v: c.leads.length, d: "+" + newLeads + " " + a("stats.newLeads"), up: true },
      { ic: "layers", cl: "g2", l: a("stats.works"), v: c.works.length, d: c.works.filter(function (w) { return w.featured; }).length + " " + a("common.featured") },
      { ic: "spark", cl: "g3", l: a("stats.services"), v: c.services.length, d: c.services.filter(function (s) { return s.active; }).length + " " + a("common.active") },
      { ic: "doc", cl: "g4", l: a("stats.posts"), v: c.posts.length, d: c.posts.filter(function (p) { return p.status === "published"; }).length + " published" }
    ].map(function (x) {
      return '<div class="card"><div class="card-h"><span class="card-ic ' + x.cl + '">' + icon(x.ic, 20) + "</span>" +
        '<span class="card-l">' + esc(x.l) + "</span></div>" +
        '<div class="card-v num">' + N.fmtNum(x.v) + "</div>" +
        '<div class="card-d ' + (x.up ? "up" : "") + '">' + (x.up ? icon("arrow", 12) : "") + esc(x.d) + "</div></div>";
    }).join("");

    var langs = c.traffic.byLang;
    var parts = [{ k: N.LANG_NAME.ug, v: langs.ug, c: "#4F46E5" }, { k: N.LANG_NAME.ar, v: langs.ar, c: "#7C3AED" }, { k: N.LANG_NAME.en, v: langs.en, c: "#D946EF" }];
    var legend = parts.map(function (p) {
      return '<li><i style="background:' + p.c + '"></i><span>' + esc(p.k) + "</span><b>" + p.v + "%</b></li>";
    }).join("");

    /* content completeness per collection */
    var groups = [
      { k: "nav.services", arr: c.services }, { k: "nav.works", arr: c.works },
      { k: "nav.testi", arr: c.testimonials }, { k: "nav.posts", arr: c.posts }, { k: "nav.team", arr: c.team }
    ];
    var bars = groups.map(function (g) {
      var pct = Math.round(g.arr.reduce(function (s, r) { return s + N.completeness(r); }, 0) / Math.max(1, g.arr.length));
      var cl = pct >= 95 ? "" : (pct >= 70 ? " warn" : " bad");
      return '<div class="bar"><div class="bar-t"><span>' + esc(a(g.k)) + "</span><span>" + pct + "%</span></div>" +
        '<div class="bar-r"><div class="bar-f' + cl + '" style="width:' + pct + '%"></div></div></div>';
    }).join("");

    var recent = c.leads.slice(0, 5).map(function (l) {
      return "<tr><td><div class=\"cell-main\">" + UI.avatar(l.name.slice(0, 2).toUpperCase(), "#7C3AED", 34) +
        "<div><b>" + esc(l.name) + "</b><i>" + esc(l.email) + "</i></div></div></td>" +
        "<td>" + esc(T(l.subject)) + "</td>" +
        '<td><span class="pill ' + l.status + '">' + esc(a("fld." + (l.status === "read" ? "readS" : l.status))) + "</span></td>" +
        '<td style="white-space:nowrap">' + esc(N.fmtDate(l.date)) + "</td>" +
        '<td><div class="acts"><button class="act" data-lead="' + l.id + '" title="' + esc(a("fld.reply")) + '">' + icon("eye", 16) + "</button></div></td></tr>";
    }).join("");

    return '<div class="cards">' + cards + "</div>" +
      '<div class="grid2">' +
        '<div class="panel"><div class="panel-h"><h2>' + esc(a("stats.visits")) + '</h2><span class="pill on">' +
          icon("arrow", 12) + "+18.4%</span></div><div class=\"panel-b\">" + lineChart(c.traffic.months, c.traffic.visits) + "</div></div>" +
        '<div class="panel"><div class="panel-h"><h2>' + esc(a("stats.langSplit")) + "</h2></div>" +
          '<div class="panel-b"><div class="donut">' + donut(parts) + '<ul class="legend">' + legend + "</ul></div></div></div>" +
      "</div>" +
      '<div class="grid2">' +
        '<div class="panel"><div class="panel-h"><h2>' + esc(a("stats.recent")) + '</h2><div class="panel-r">' +
          '<a class="icon-btn" href="#/leads">' + esc(a("common.viewAll")) + "</a></div></div>" +
          '<div class="tbl-wrap"><table class="tbl"><tbody>' + recent + "</tbody></table></div></div>" +
        '<div class="panel"><div class="panel-h"><h2>' + esc(a("stats.contentHealth")) + '</h2><p>' + esc(a("stats.fillHint")) + "</p></div>" +
          '<div class="panel-b"><div class="bars">' + bars + "</div></div></div>" +
      "</div>";
  }

  /* ================= GENERIC RESOURCE CRUD ================= */
  var CATS = { brand: "s1", social: "s3", video: "s5", ads: "s4", web: "s6", print: "s7", photo: "s8" };

  function miniLangs(rec, fields) {
    var keys = fields || ["name", "title", "text"];
    return '<span class="mini-lang">' + N.LANGS.map(function (l) {
      var ok = keys.some(function (f) { return rec[f] && typeof rec[f] === "object" && String(rec[f][l] || "").trim(); });
      return '<b class="' + (ok ? "on" : "off") + '">' + l.toUpperCase() + "</b>";
    }).join("") + "</span>";
  }

  function tblToolbar(count) {
    return '<div class="tbar"><div class="searchbox">' + icon("search", 16) +
      '<input type="search" id="tblSearch" placeholder="' + esc(N.t("common.search")) + '"></div>' +
      '<span class="count-note">' + esc(N.t("common.show")) + ' <b class="num" id="tblCount">' + count + "</b> " + esc(N.t("common.rows")) + "</span></div>";
  }
  
  function searchText(r) {
    var out = [];
    Object.keys(r).forEach(function (k) {
      var v = r[k];
      if (v && typeof v === "object") {
        if (Array.isArray(v)) v.forEach(function (x) { out.push(typeof x === "object" ? Object.keys(x).map(function (q) { return x[q]; }).join(" ") : x); });
        else out.push(Object.keys(v).map(function (q) { return v[q]; }).join(" "));
      } else if (typeof v !== "undefined") out.push(v);
    });
    return out.join(" ");
  }

  function buildTable(cfg) {
    var rows = N.sortByOrder(C()[cfg.key]);
    var head = cfg.cols.map(function (c) { return "<th>" + esc(c.h) + "</th>"; }).join("") + "<th></th>";
    var body = rows.map(function (r, i) {
      return '<tr data-search="' + esc(searchText(r)).toLowerCase() + '">' +
        cfg.cols.map(function (c) { return "<td>" + (c.r ? c.r(r) : esc(r[c.f] != null ? r[c.f] : "")) + "</td>"; }).join("") +
        '<td><div class="acts">' +
          '<button class="act" data-edit="' + r.id + '" title="' + esc(a("act.edit")) + '">' + icon("edit", 16) + "</button>" +
          '<button class="act danger" data-del="' + r.id + '" title="' + esc(a("act.del")) + '">' + icon("trash", 16) + "</button>" +
        "</div></td></tr>";
    }).join("");

    return '<div class="panel"><div class="panel-h"><h2>' + esc(a(cfg.titleKey)) + "</h2>" +
      '<div class="panel-r"><button class="btn btn-primary btn-sm" data-add>' + icon("plus", 15) + esc(a("act.add")) + "</button></div></div>" +
      '<div class="panel-b">' + tblToolbar(rows.length) +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + head + "</tr></thead><tbody>" +
      (body || '<tr><td colspan="99" style="text-align:center;color:var(--ink-3);padding:2rem">' + esc(N.t("common.noResults")) + "</td></tr>") +
      "</tbody></table></div></div></div>";
  }

  function wireTable(cfg) {
    var s = document.getElementById("tblSearch");
    if (s) s.addEventListener("input", function () {
      var q = s.value.trim().toLowerCase(), n = 0;
      document.querySelectorAll("#view tbody tr").forEach(function (tr) {
        var hit = !q || (tr.getAttribute("data-search") || "").indexOf(q) > -1;
        tr.style.display = hit ? "" : "none"; if (hit) n++;
      });
      var c = document.getElementById("tblCount"); if (c) c.textContent = n;
    });
    var add = document.querySelector("[data-add]");
    if (add) add.addEventListener("click", function () { openForm(cfg, null); });
    document.querySelectorAll("[data-edit]").forEach(function (b) {
      b.addEventListener("click", function () {
        var r = C()[cfg.key].filter(function (x) { return x.id === b.getAttribute("data-edit"); })[0];
        if (r) openForm(cfg, r);
      });
    });
    document.querySelectorAll("[data-del]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!confirm(N.t("common.confirmDelete"))) return;
        var arr = C()[cfg.key];
        var i = arr.findIndex(function (x) { return x.id === b.getAttribute("data-del"); });
        if (i > -1) { arr.splice(i, 1); N.save(); UI.toast(a("act.deleted")); route(); }
      });
    });
  }

  /* ---------- form builder ---------- */
  function fieldHtml(f, rec) {
    var v = rec ? rec[f.k] : f.def;
    if (f.type === "tri") {
      var tabs = N.LANGS.map(function (l, i) {
        return '<button type="button" data-lt="' + l + '"' + (i === (N.LANGS.indexOf(L) > -1 ? N.LANGS.indexOf(L) : 0) ? ' class="is-on"' : "") + ">" + esc(a("fld." + l)) + "</button>";
      }).join("");
      var panes = N.LANGS.map(function (l) {
        var val = rec && rec[f.k] ? (rec[f.k][l] || "") : "";
        var el = f.area ? '<textarea data-tri="' + f.k + '" data-lang="' + l + '" rows="' + (f.rows || 3) + '"' +
          (l === L ? "" : " hidden") + ">" + esc(val) + "</textarea>"
          : '<input data-tri="' + f.k + '" data-lang="' + l + '" type="text" value="' + esc(val) + '"' + (l === L ? "" : " hidden") + ">";
        return el;
      }).join("");
      return '<label>' + esc(f.label) + '<div class="f-langs"><div class="f-langs-h">' + tabs + '</div><div class="f-langs-b">' + panes + "</div></div></label>";
    }
    if (f.type === "trilist") {
      var tabs2 = N.LANGS.map(function (l) {
        return '<button type="button" data-lt="' + l + '"' + (l === L ? ' class="is-on"' : "") + ">" + esc(a("fld." + l)) + "</button>";
      }).join("");
      var panes2 = N.LANGS.map(function (l) {
        var arr = rec && rec[f.k] ? rec[f.k] : [];
        var txt = arr.map(function (x) { return typeof x === "object" ? (x[l] || "") : x; }).join("\n");
        return '<textarea data-trilist="' + f.k + '" data-lang="' + l + '" rows="5"' + (l === L ? "" : " hidden") + ' placeholder="…">' + esc(txt) + "</textarea>";
      }).join("");
      return '<label>' + esc(f.label) + '<div class="f-langs"><div class="f-langs-h">' + tabs2 + '</div><div class="f-langs-b">' + panes2 + "</div></div></label>";
    }
    if (f.type === "triflat") {
      var keys = f.keys, lab = [a("fld.ug"), a("fld.ar"), a("fld.en")];
      var ins = keys.map(function (k, i) {
        return '<label>' + esc(lab[i]) + '<input type="text" data-flat="' + k + '" value="' + esc(rec ? rec[k] || "" : "") + '"></label>';
      }).join("");
      return '<div class="f-3">' + ins + "</div>";
    }
    if (f.type === "select") {
      var opts = f.opts.map(function (o) {
        var val = typeof o === "string" ? o : o.v, lb = typeof o === "string" ? o : (o.l[L] || o.l.en);
        return '<option value="' + esc(val) + '"' + (v === val ? " selected" : "") + ">" + esc(lb) + "</option>";
      }).join("");
      return '<label>' + esc(f.label) + '<select data-f="' + f.k + '">' + opts + "</select></label>";
    }
    if (f.type === "toggle") {
      return '<div class="f-switch"><button type="button" class="switch' + (v ? " is-on" : "") + '" data-toggle="' + f.k + '" aria-pressed="' + !!v + '"></button>' +
        "<span>" + esc(f.label) + "</span></div>";
    }
    if (f.type === "image") {
      return '<label>' + esc(f.label) + '<div class="imgpick">' +
        '<span class="imgpick-prev' + (v ? "" : " is-empty") + '" data-prev style="' + (v ? "background-image:url('" + esc(v) + "')" : "") + '">' + (v ? "" : icon("camera", 22)) + "</span>" +
        '<div class="imgpick-in"><input type="text" data-f="' + f.k + '" value="' + esc(v || "") + '" placeholder="img/work-brand.jpg">' +
        '<input type="file" accept="image/*" data-imgfile="' + f.k + '"></div></div></label>';
    }
    if (f.type === "color") {
      return '<label>' + esc(f.label) + '<div class="colorrow"><input type="color" data-f="' + f.k + '" value="' + esc(v || "#4F46E5") + '">' +
        '<input type="text" data-ftext="' + f.k + '" value="' + esc(v || "#4F46E5") + '"></div></label>';
    }
    var type = f.type || "text";
    return '<label>' + esc(f.label) + '<input type="' + type + '" data-f="' + f.k + '" value="' + esc(v == null ? "" : v) + '"' +
      (f.step ? ' step="' + f.step + '"' : "") + "></label>";
  }

  function openForm(cfg, rec) {
    var isNew = !rec;
    var body = '<form class="modal-form" id="recForm" novalidate><h2>' +
      esc((isNew ? a("act.add") : a("act.edit")) + " · " + a(cfg.titleKey)) + "</h2>" +
      '<div class="f-grid">' + cfg.fields.map(function (f) { return fieldHtml(f, rec); }).join("") + "</div>" +
      '<div class="mfoot"><button type="button" class="btn btn-outline" data-x>' + esc(a("act.cancel")) + "</button>" +
      '<button type="submit" class="btn btn-primary">' + icon("check", 15) + esc(a("act.save")) + "</button></div></form>";

    var el = UI.openModal(body, { wide: cfg.fields.length > 5 });

    /* language tabs inside trilingual fields */
    el.querySelectorAll(".f-langs").forEach(function (box) {
      box.querySelectorAll("[data-lt]").forEach(function (b) {
        b.addEventListener("click", function () {
          var l = b.getAttribute("data-lt");
          box.querySelectorAll("[data-lt]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
          box.querySelectorAll("[data-tri],[data-trilist]").forEach(function (i) { i.hidden = i.getAttribute("data-lang") !== l; });
        });
      });
    });
    el.querySelectorAll("[data-toggle]").forEach(function (b) {
      b.addEventListener("click", function () {
        var on = !b.classList.contains("is-on");
        b.classList.toggle("is-on", on); b.setAttribute("aria-pressed", String(on));
      });
    });
    el.querySelectorAll("[data-f][type=color]").forEach(function (i) {
      i.addEventListener("input", function () {
        var t2 = el.querySelector('[data-ftext="' + i.getAttribute("data-f") + '"]'); if (t2) t2.value = i.value;
      });
    });
    el.querySelectorAll("[data-ftext]").forEach(function (i) {
      i.addEventListener("input", function () {
        var c2 = el.querySelector('[data-f="' + i.getAttribute("data-ftext") + '"][type=color]'); if (c2) c2.value = i.value;
      });
    });
    el.querySelectorAll("[data-imgfile]").forEach(function (fi) {
      fi.addEventListener("change", function () {
        var f = fi.files && fi.files[0]; if (!f) return;
        if (f.size > 900 * 1024) { UI.toast("Max 900 KB for local demo storage", "err"); fi.value = ""; return; }
        var rd = new FileReader();
        rd.onload = function () {
          var k = fi.getAttribute("data-imgfile");
          var tx = el.querySelector('[data-f="' + k + '"]'); if (tx) tx.value = rd.result;
          var pv = el.querySelector("[data-prev]");
          if (pv) { pv.style.backgroundImage = "url('" + rd.result + "')"; pv.classList.remove("is-empty"); pv.innerHTML = ""; }
        };
        rd.readAsDataURL(f);
      });
    });
    el.querySelector("[data-x]").addEventListener("click", UI.closeModal);
    el.querySelector("#recForm").addEventListener("submit", function (e) {
      e.preventDefault();
      var out = rec ? JSON.parse(JSON.stringify(rec)) : { id: N.uid(cfg.key.slice(0, 2)) };
      cfg.fields.forEach(function (f) {
        if (f.type === "tri") {
          out[f.k] = {};
          N.LANGS.forEach(function (l) {
            var i = el.querySelector('[data-tri="' + f.k + '"][data-lang="' + l + '"]');
            out[f.k][l] = i ? i.value.trim() : "";
          });
        } else if (f.type === "trilist") {
          out[f.k] = [];
          N.LANGS.forEach(function (l) {
            var i = el.querySelector('[data-trilist="' + f.k + '"][data-lang="' + l + '"]');
            out[f.k].push(i ? i.value.split("\n").map(function (x) { return x.trim(); }).filter(Boolean) : []);
          });
        } else if (f.type === "triflat") {
          f.keys.forEach(function (k) { var i = el.querySelector('[data-flat="' + k + '"]'); out[k] = i ? i.value.trim() : ""; });
        } else if (f.type === "toggle") {
          out[f.k] = el.querySelector('[data-toggle="' + f.k + '"]').classList.contains("is-on");
        } else if (f.type === "number") {
          var n = el.querySelector('[data-f="' + f.k + '"]'); out[f.k] = n ? (parseFloat(n.value) || 0) : 0;
        } else {
          var inp = el.querySelector('[data-f="' + f.k + '"]'); out[f.k] = inp ? inp.value.trim() : "";
        }
      });
      var arr = C()[cfg.key];
      if (isNew) {
        out.order = (arr.reduce(function (m, x) { return Math.max(m, x.order || 0); }, 0) + 1);
        arr.push(out);
      } else {
        /* write the edited record back into the live array (out is a clone of rec) */
        var idx = arr.findIndex(function (x) { return x.id === out.id; });
        if (idx > -1) arr[idx] = out; else arr.push(out);
      }
      N.save();
      UI.closeModal();
      UI.toast(a("toast.saved"));
      route();
    });
  }

  /* ---------- resource configs (built per render so labels follow the language) ---------- */
  var ICON_OPTS = ["spark", "pen", "share", "chart", "video", "code", "billboard", "camera", "heart", "layers"];
  var CATS = { brand: "s1", social: "s3", video: "s5", ads: "s4", web: "s6", print: "s7", photo: "s8" };
  var POST_CATS = ["marketing", "branding", "seo", "video"];

  function catOpts() {
    return Object.keys(CATS).map(function (k) {
      return { v: k, l: { ug: window.I18N.ug.cat[k], ar: window.I18N.ar.cat[k], en: window.I18N.en.cat[k] } };
    });
  }
  function postCatOpts() {
    return POST_CATS.map(function (k) {
      return { v: k, l: { ug: window.I18N.ug.blog.categories[k], ar: window.I18N.ar.blog.categories[k], en: window.I18N.en.blog.categories[k] } };
    });
  }
  function statusOpts() {
    var m = {
      ug: { published: "ئېلان قىلىنغان", draft: "ئېلان قىلىنمىغان" },
      ar: { published: "منشور", draft: "مسودة" },
      en: { published: "Published", draft: "Draft" }
    };
    return ["published", "draft"].map(function (k) { return { v: k, l: m }; });
  }

  function CFGS(kind) {
    var F = a("fld"), Tb = a("tbl"), Cm = N.t("common");
    var activePill = function (r) {
      return '<span class="pill ' + (r.active ? "on" : "off") + '">' + esc(r.active ? Cm.active : Cm.inactive) + "</span>";
    };
    var orderCell = function (r) { return '<span class="num">' + (r.order || 0) + "</span>"; };

    switch (kind) {
      case "services": return {
        key: "services", titleKey: "nav.services",
        cols: [
          { h: Tb.name, r: function (r) {
            return '<div class="cell-main"><span class="card-ic" style="width:38px;height:38px">' + icon(r.icon || "spark", 17) +
              "</span><div><b>" + esc(T(r.name)) + "</b><i>" + esc(T(r.short || "")) + "</i></div>" + miniLangs(r, ["name", "short", "desc"]) + "</div>"; } },
          { h: Tb.status, r: activePill },
          { h: Tb.order, r: orderCell }
        ],
        fields: [
          { k: "name", type: "tri", label: F.name },
          { k: "short", type: "tri", label: F.short },
          { k: "desc", type: "tri", area: true, rows: 4, label: F.desc },
          { k: "items", type: "trilist", label: "Items" },
          { k: "icon", type: "select", label: F.icon, opts: ICON_OPTS },
          { k: "order", type: "number", label: Tb.order, def: 1 },
          { k: "active", type: "toggle", label: F.active, def: true }
        ]
      };
      case "works": return {
        key: "works", titleKey: "nav.works",
        cols: [
          { h: Tb.name, r: function (r) {
            return '<div class="cell-main"><img class="thumb" src="' + esc(r.img) + '" alt="" onerror="this.style.opacity=.2">' +
              "<div><b>" + esc(T(r.title)) + "</b><i>" + esc(r.client) + " · " + r.year + "</i></div>" + miniLangs(r, ["title", "result"]) + "</div>"; } },
          { h: Tb.cat, r: function (r) { return '<span class="pill cat">' + esc(N.t("cat." + r.cat)) + "</span>"; } },
          { h: Cm.featured, r: function (r) { return r.featured ? '<span style="color:var(--warn)">' + icon("star", 16) + "</span>" : '<span style="color:var(--line-2)">—</span>'; } },
          { h: Tb.status, r: activePill }
        ],
        fields: [
          { k: "title", type: "tri", label: F.title },
          { k: "result", type: "tri", label: F.result },
          { k: "client", type: "text", label: Tb.client },
          { k: "img", type: "image", label: F.img, def: "img/work-brand.jpg" },
          { k: "cat", type: "select", label: F.cat, opts: catOpts(), def: "brand" },
          { k: "year", type: "number", label: F.year, def: new Date().getFullYear() },
          { k: "order", type: "number", label: Tb.order, def: 1 },
          { k: "featured", type: "toggle", label: F.featured },
          { k: "active", type: "toggle", label: F.active, def: true }
        ]
      };
      case "clients": return {
        key: "clients", titleKey: "nav.clients",
        cols: [
          { h: Tb.name, r: function (r) {
            return '<div class="cell-main">' + UI.clientMark(r.name, r.color) + "<div><b>" + esc(r.name) + "</b><i>" +
              esc(T(r.sector)) + "</i></div>" + miniLangs(r, ["sector"]) + "</div>"; } },
          { h: F.color, r: function (r) { return swatch(r.color); } },
          { h: Tb.order, r: orderCell }
        ],
        fields: [
          { k: "name", type: "text", label: F.name },
          { k: "sector", type: "tri", label: F.sector },
          { k: "color", type: "color", label: F.color, def: "#4F46E5" },
          { k: "order", type: "number", label: Tb.order, def: 1 }
        ]
      };
      case "testimonials": return {
        key: "testimonials", titleKey: "nav.testi",
        cols: [
          { h: Tb.name, r: function (r) {
            return '<div class="cell-main">' + UI.avatar((r.name || "??").slice(0, 2), r.color, 34) + "<div><b>" + esc(r.name) +
              "</b><i>" + esc(T(r.role)) + "</i></div>" + miniLangs(r, ["text", "role"]) + "</div>"; } },
          { h: "★", r: function (r) { return '<span class="num">' + (r.rating || 0) + "/5</span>"; } },
          { h: Tb.order, r: orderCell }
        ],
        fields: [
          { k: "name", type: "triflat", keys: ["name", "nameAr", "nameEn"], label: F.name },
          { k: "role", type: "tri", label: F.role },
          { k: "text", type: "tri", area: true, rows: 4, label: F.message },
          { k: "rating", type: "number", label: F.rating, def: 5 },
          { k: "color", type: "color", label: F.color, def: "#4F46E5" },
          { k: "order", type: "number", label: Tb.order, def: 1 }
        ]
      };
      case "posts": return {
        key: "posts", titleKey: "nav.posts",
        cols: [
          { h: Tb.name, r: function (r) {
            return "<div><b>" + esc(T(r.title)) + "</b><i>" + esc(String(T(r.excerpt) || "").slice(0, 70)) + "…</i></div>" + miniLangs(r, ["title", "excerpt"]); } },
          { h: Tb.cat, r: function (r) { return '<span class="pill cat">' + esc(N.t("blog.categories." + r.cat)) + "</span>"; } },
          { h: Tb.date, r: function (r) { return esc(N.fmtDate(r.date)); } },
          { h: Tb.status, r: function (r) {
            return '<span class="pill ' + (r.status === "published" ? "pub" : "draft") + '">' +
              esc(r.status === "published" ? statusOpts()[0].l[L] : statusOpts()[1].l[L]) + "</span>"; } }
        ],
        fields: [
          { k: "title", type: "tri", label: F.title },
          { k: "excerpt", type: "tri", area: true, label: F.excerpt },
          { k: "cat", type: "select", label: F.cat, opts: postCatOpts(), def: "marketing" },
          { k: "date", type: "date", label: Tb.date, def: new Date().toISOString().slice(0, 10) },
          { k: "read", type: "number", label: F.read, def: 5 },
          { k: "status", type: "select", label: Tb.status, opts: statusOpts(), def: "published" }
        ]
      };
      default: return {   /* team */
        key: "team", titleKey: "nav.team",
        cols: [
          { h: Tb.name, r: function (r) {
            return '<div class="cell-main">' + UI.avatar(r.initials, r.color, 36) + "<div><b>" + esc(r.name) + "</b><i>" +
              esc(T(r.role)) + "</i></div>" + miniLangs(r, ["role"]) + "</div>"; } },
          { h: F.initials, r: function (r) { return "<b>" + esc(r.initials) + "</b>"; } },
          { h: F.color, r: function (r) { return swatch(r.color); } }
        ],
        fields: [
          { k: "name", type: "triflat", keys: ["name", "nameAr", "nameEn"], label: F.name },
          { k: "role", type: "tri", label: F.role },
          { k: "initials", type: "text", label: F.initials, def: "NN" },
          { k: "color", type: "color", label: F.color, def: "#4F46E5" },
          { k: "order", type: "number", label: Tb.order, def: 1 }
        ]
      };
    }
  }

  function swatch(c) {
    return '<span style="display:inline-block;width:22px;height:22px;border-radius:7px;background:' + esc(c || "#4F46E5") +
      ';border:1px solid var(--line)"></span>';
  }

  /* ================= LEADS ================= */
  function viewLeads() {
    var rows = C().leads.map(function (l) {
      return '<tr data-search="' + esc((l.name + " " + l.email + " " + T(l.subject)).toLowerCase()) + '">' +
        '<td><div class="cell-main">' + UI.avatar(l.name.slice(0, 2).toUpperCase(), l.status === "new" ? "#EF4444" : "#7C3AED", 36) +
        "<div><b>" + esc(l.name) + "</b><i>" + esc(l.email) + "</i></div></div></td>" +
        "<td>" + esc(T(l.subject)) + "</td>" +
        "<td>" + esc(l.phone) + "</td>" +
        '<td><span class="pill ' + l.status + '">' + esc(a("fld." + (l.status === "read" ? "readS" : l.status))) + "</span></td>" +
        "<td>" + esc(N.fmtDate(l.date)) + "</td>" +
        '<td><div class="acts">' +
          '<button class="act" data-view="' + l.id + '">' + icon("eye", 16) + "</button>" +
          '<button class="act danger" data-ldel="' + l.id + '">' + icon("trash", 16) + "</button></div></td></tr>";
    }).join("");

    return '<div class="panel"><div class="panel-h"><h2>' + esc(a("nav.leads")) + "</h2>" +
      '<div class="panel-r"><span class="pill new">' + C().leads.filter(function (x) { return x.status === "new"; }).length + " " + esc(a("stats.newLeads")) + "</span>" +
      '<button class="icon-btn" id="expLeads">' + icon("download", 15) + "CSV</button></div></div>" +
      '<div class="panel-b">' + tblToolbar(C().leads.length) +
      '<div class="tbl-wrap"><table class="tbl"><thead><tr><th>' + esc(a("tbl.from")) + "</th><th>" + esc(a("tbl.subject")) + "</th><th>" +
      esc(a("fld.phone")) + "</th><th>" + esc(a("tbl.status")) + "</th><th>" + esc(a("tbl.date")) + "</th><th></th></tr></thead><tbody>" +
      (rows || '<tr><td colspan="6" style="text-align:center;color:var(--ink-3);padding:2rem">' + esc(N.t("common.noResults")) + "</td></tr>") +
      "</tbody></table></div></div></div>";
  }

  function wireLeads() {
    var s = document.getElementById("tblSearch");
    if (s) s.addEventListener("input", function () {
      var q = s.value.trim().toLowerCase(), n = 0;
      document.querySelectorAll("#view tbody tr").forEach(function (tr) {
        var hit = !q || (tr.getAttribute("data-search") || "").indexOf(q) > -1;
        tr.style.display = hit ? "" : "none"; if (hit) n++;
      });
      var c = document.getElementById("tblCount"); if (c) c.textContent = n;
    });
    document.querySelectorAll("[data-view]").forEach(function (b) {
      b.addEventListener("click", function () { openLead(b.getAttribute("data-view")); });
    });
    document.querySelectorAll("[data-ldel]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (!confirm(N.t("common.confirmDelete"))) return;
        var id = b.getAttribute("data-ldel");
        C().leads = C().leads.filter(function (x) { return x.id !== id; });
        N.save(); UI.toast(a("act.deleted")); route();
      });
    });
    var ex = document.getElementById("expLeads");
    if (ex) ex.addEventListener("click", exportCsv);
  }

  function openLead(id) {
    var l = C().leads.filter(function (x) { return x.id === id; })[0];
    if (!l) return;
    if (l.status === "new") { l.status = "read"; N.save(); }
    var tabs = N.LANGS.map(function (x) {
      return '<button type="button" data-ml="' + x + '"' + (x === L ? ' class="is-on"' : "") + ">" + esc(x.toUpperCase()) + "</button>";
    }).join("");
    var msgs = N.LANGS.map(function (x) {
      return '<p data-mp="' + x + '"' + (x === L ? "" : " hidden") + ' style="margin:0">' + esc((l.message && l.message[x]) || "—") + "</p>";
    }).join("");
    var html = '<div class="lead-b">' +
      '<div style="display:flex;align-items:center;gap:.8rem">' + UI.avatar(l.name.slice(0, 2).toUpperCase(), "#7C3AED", 46) +
      "<div><h2 style=\"margin:0;font-size:var(--fs-lg)\">" + esc(l.name) + '</h2><span style="font-size:var(--fs-xs);color:var(--ink-3)">' + esc(l.email) + "</span></div>" +
      '<span class="pill ' + l.status + '" style="margin-inline-start:auto">' + esc(a("fld." + (l.status === "read" ? "readS" : l.status))) + "</span></div>" +
      '<div class="lead-meta">' +
        "<div><span>" + esc(a("tbl.subject")) + "</span><b>" + esc(T(l.subject)) + "</b></div>" +
        "<div><span>" + esc(a("fld.phone")) + "</span><b>" + esc(l.phone) + "</b></div>" +
        "<div><span>" + esc(a("tbl.date")) + "</span><b>" + esc(N.fmtDate(l.date)) + "</b></div>" +
        "<div><span>ID</span><b class=\"num\">" + esc(l.id) + "</b></div>" +
      "</div>" +
      '<div class="lead-tabs">' + tabs + "</div>" +
      '<div class="lead-msg">' + msgs + "</div>" +
      '<div class="mfoot" style="margin:0"><a class="btn btn-outline" href="mailto:' + esc(l.email) + '">' + icon("mail", 15) + esc(a("fld.reply")) + "</a>" +
      '<button class="btn btn-primary" data-answered>' + icon("check", 15) + esc(a("fld.answered")) + "</button></div></div>";
    var el = UI.openModal(html, { wide: false });
    el.querySelectorAll("[data-ml]").forEach(function (b) {
      b.addEventListener("click", function () {
        var x = b.getAttribute("data-ml");
        el.querySelectorAll("[data-ml]").forEach(function (o) { o.classList.toggle("is-on", o === b); });
        el.querySelectorAll("[data-mp]").forEach(function (o) { o.hidden = o.getAttribute("data-mp") !== x; });
      });
    });
    el.querySelector("[data-answered]").addEventListener("click", function () {
      l.status = "answered"; N.save(); UI.closeModal(); UI.toast(a("toast.saved")); route();
    });
  }

  function exportCsv() {
    var head = ["id", "date", "name", "email", "phone", "subject", "message", "status"];
    var lines = [head.join(",")];
    C().leads.forEach(function (l) {
      lines.push([l.id, l.date, l.name, l.email, l.phone, T(l.subject), T(l.message), l.status]
        .map(function (v) { return '"' + String(v).replace(/"/g, '""') + '"'; }).join(","));
    });
    var blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
    var u = URL.createObjectURL(blob), x = document.createElement("a");
    x.href = u; x.download = "nurmedia-leads.csv"; x.click();
    setTimeout(function () { URL.revokeObjectURL(u); }, 500);
  }

  /* ================= SETTINGS ================= */
  function triBlock(scope, key, label, obj, area) {
    var tabs = N.LANGS.map(function (l) {
      return '<button type="button" data-lt="' + l + '"' + (l === L ? ' class="is-on"' : "") + ">" + esc(a("fld." + l)) + "</button>";
    }).join("");
    var panes = N.LANGS.map(function (l) {
      var v = obj && obj[l] ? obj[l] : "";
      if (area) {
        return '<textarea data-scope="' + scope + '" data-s="' + key + '" data-lang="' + l + '" rows="3"' + (l === L ? "" : " hidden") + ">" + esc(v) + "</textarea>";
      }
      return '<input data-scope="' + scope + '" data-s="' + key + '" data-lang="' + l + '" type="text" value="' + esc(v) + '"' + (l === L ? "" : " hidden") + ">";
    }).join("");
    return '<label>' + esc(label) + '<div class="f-langs"><div class="f-langs-h">' + tabs + '</div><div class="f-langs-b">' + panes + "</div></div></label>";
  }

  function viewSettings() {
    var s = C().settings, h = C().hero, auth = N.getAuth();
    return '<form id="setForm"><div class="set-grid">' +
      '<div class="panel"><div class="panel-h"><h2>' + icon("gear", 17) + " " + esc(a("settings.siteName")) + "</h2></div><div class=\"panel-b f-grid\">" +
        triBlock("settings", "name", a("fld.name"), s.name) +
        triBlock("settings", "tagline", a("settings.tagline"), s.tagline, true) +
        '<label>' + esc(a("settings.defaultLang")) + '<select data-sf="defaultLang">' +
          N.LANGS.map(function (l) { return '<option value="' + l + '"' + (s.defaultLang === l ? " selected" : "") + ">" + N.LANG_NAME[l] + "</option>"; }).join("") +
        "</select></label></div></div>" +
      '<div class="panel"><div class="panel-h"><h2>' + icon("mail", 17) + " " + esc(a("settings.contact")) + "</h2></div><div class=\"panel-b f-grid\">" +
        '<div class="f-2"><label>Email<input data-sf="email" type="email" value="' + esc(s.email) + '"></label>' +
        '<label>' + esc(a("fld.phone")) + '<input data-sf="phone" value="' + esc(s.phone) + '"></label></div>' +
        '<label>' + esc(a("fld.phone")) + ' 2<input data-sf="phone2" value="' + esc(s.phone2) + '"></label>' +
        triBlock("settings", "address", a("fld.address"), s.address, true) +
        triBlock("settings", "hours", a("fld.hours"), s.hours) +
      "</div></div>" +
      '<div class="panel" id="securityPanel"><div class="panel-h"><h2>' + icon("shield", 17) + " " + esc(a("security.title")) + '</h2><p>' + esc(a("security.sub")) + '</p></div><div class="panel-b f-grid">' +
        '<div class="auth-err" id="setSecErr" style="margin-bottom:1rem">' + icon("close", 15) + '<span></span></div>' +
        '<label>' + esc(a("security.adminEmail")) +
          '<div class="auth-input-group"><span class="auth-input-ic">' + icon("mail", 17) + '</span><input id="setAdminEmail" type="email" value="' + esc(auth.email) + '" required placeholder="admin@nurmedia.co"></div>' +
        '</label>' +
        '<label>' + esc(a("security.curPass")) +
          '<div class="auth-input-group"><span class="auth-input-ic">' + icon("lock", 17) + '</span><input id="setCurPass" type="password" placeholder="••••••••"></div>' +
        '</label>' +
        '<div class="f-2">' +
          '<label>' + esc(a("security.newPass")) +
            '<div class="auth-input-group"><span class="auth-input-ic">' + icon("key", 17) + '</span><input id="setNewPass" type="password" minlength="4" placeholder="••••••••"></div>' +
          '</label>' +
          '<label>' + esc(a("security.confirmPass")) +
            '<div class="auth-input-group"><span class="auth-input-ic">' + icon("check", 17) + '</span><input id="setConfirmPass" type="password" minlength="4" placeholder="••••••••"></div>' +
          '</label>' +
        '</div>' +
        '<div style="display:flex;gap:.6rem;align-items:center;flex-wrap:wrap;margin-top:.4rem">' +
          '<button type="button" class="btn btn-primary btn-sm" id="btnUpdatePass">' + icon("key", 15) + ' ' + esc(a("security.changeBtn")) + '</button>' +
        '</div>' +
      '</div></div>' +
      '<div class="panel"><div class="panel-h"><h2>' + icon("share", 17) + " " + esc(a("settings.socialL")) + "</h2></div><div class=\"panel-b f-grid\">" +
        ["instagram", "facebook", "linkedin", "youtube"].map(function (k) {
          return '<label style="display:flex;align-items:center;gap:.6rem">' + icon(k, 18) +
            '<input data-soc="' + k + '" value="' + esc(s.social[k] || "") + '" style="margin:0"></label>';
        }).join("") + "</div></div>" +
      '<div class="panel"><div class="panel-h"><h2>' + icon("spark", 17) + " " + esc(a("settings.hero")) + "</h2></div><div class=\"panel-b f-grid\">" +
        triBlock("hero", "eyebrow", "Eyebrow", h.eyebrow) +
        triBlock("hero", "title", a("settings.heroTitle"), h.title) +
        triBlock("hero", "titleAccent", "Title (accent part)", h.titleAccent) +
        triBlock("hero", "sub", a("settings.heroSub"), h.sub, true) +
        '<div class="f-2">' + triBlock("hero", "ctaPrimary", "CTA 1", h.ctaPrimary) + triBlock("hero", "ctaSecondary", "CTA 2", h.ctaSecondary) + "</div>" +
      "</div></div>" +
      "</div>" +
      '<div class="mfoot"><button type="submit" class="btn btn-primary">' + icon("check", 16) + " " + esc(a("act.save")) + "</button></div></form>";
  }

  function wireSettings() {
    var f = document.getElementById("setForm");
    if (!f) return;
    f.querySelectorAll(".f-langs").forEach(function (box) {
      box.querySelectorAll("[data-lt]").forEach(function (b) {
        b.addEventListener("click", function () {
          var l = b.getAttribute("data-lt");
          box.querySelectorAll("[data-lt]").forEach(function (x) { x.classList.toggle("is-on", x === b); });
          box.querySelectorAll("[data-s]").forEach(function (i) { i.hidden = i.getAttribute("data-lang") !== l; });
        });
      });
    });

    var btnUpdate = document.getElementById("btnUpdatePass");
    var secErr = document.getElementById("setSecErr");
    var secErrSpan = secErr ? secErr.querySelector("span") : null;

    if (btnUpdate) {
      btnUpdate.addEventListener("click", function () {
        var email = document.getElementById("setAdminEmail").value.trim();
        var curPass = document.getElementById("setCurPass").value;
        var newPass = document.getElementById("setNewPass").value;
        var confirmPass = document.getElementById("setConfirmPass").value;
        var currentCreds = N.getAuth();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          secErrSpan.textContent = a("security.emailErr"); secErr.classList.add("is-on"); return;
        }
        if (!N.checkAuth(currentCreds.email, curPass)) {
          secErrSpan.textContent = a("security.curPassErr"); secErr.classList.add("is-on"); return;
        }
        if (newPass.length < 4) {
          secErrSpan.textContent = a("security.lenErr"); secErr.classList.add("is-on"); return;
        }
        if (newPass !== confirmPass) {
          secErrSpan.textContent = a("security.matchErr"); secErr.classList.add("is-on"); return;
        }

        secErr.classList.remove("is-on");
        N.setAuth(email, newPass);
        UI.toast(a("security.success"));
        route();
      });
    }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var s = C().settings, h = C().hero, targets = { settings: s, hero: h };
      f.querySelectorAll("[data-s]").forEach(function (i) {
        var tgt = targets[i.getAttribute("data-scope")];
        var k = i.getAttribute("data-s"), l = i.getAttribute("data-lang");
        if (tgt && tgt[k]) tgt[k][l] = i.value;
      });
      ["email", "phone", "phone2", "defaultLang"].forEach(function (k) {
        var i = f.querySelector('[data-sf="' + k + '"]'); if (i) s[k] = i.value;
      });
      f.querySelectorAll("[data-soc]").forEach(function (i) { s.social[i.getAttribute("data-soc")] = i.value; });
      N.save();
      UI.toast(a("settings.saved"));
    });
  }

  /* ================= TRANSLATE ================= */
  function viewTranslate() {
    var base = window.I18N.en;
    var rows = [];
    Object.keys(base).forEach(function (grp) {
      if (typeof base[grp] !== "object" || grp === "values") return;
      Object.keys(base[grp]).forEach(function (k) {
        if (typeof base[grp][k] !== "string") return;
        rows.push({ g: grp, k: k });
      });
    });
    var body = rows.map(function (r) {
      var cells = N.LANGS.map(function (l) {
        var cur = window.I18N[l][r.g] && window.I18N[l][r.g][r.k] !== undefined ? window.I18N[l][r.g][r.k] : "";
        return '<td><input data-tr="' + r.g + '.' + r.k + '" data-l="' + l + '" value="' + esc(cur) + '"></td>';
      }).join("");
      return "<tr><td><code>" + esc(r.g + "." + r.k) + "</code></td>" + cells + "</tr>";
    }).join("");
    return '<div class="panel"><div class="panel-h"><h2>' + esc(a("translate.title")) + "</h2><p>" + esc(a("translate.desc")) + "</p>" +
      '<div class="panel-r">' +
        '<button class="btn btn-outline btn-sm" id="trReset">' + icon("undo", 15) + '<span>' + esc(a("act.reset")) + '</span></button>' +
        '<button class="btn btn-primary btn-sm" id="trSave">' + icon("check", 15) + '<span>' + esc(a("act.save")) + '</span></button>' +
      '</div></div>' +
      '<div class="tbl-wrap"><table class="tbl tr-table"><thead><tr><th>Key</th>' +
      N.LANGS.map(function (l) { return "<th>" + esc(a("fld." + l)) + "</th>"; }).join("") + "</tr></thead><tbody>" + body + "</tbody></table></div></div>";
  }

  function wireTranslate() {
    var sv = document.getElementById("trSave"), rs = document.getElementById("trReset");
    if (!sv) return;
    sv.addEventListener("click", function () {
      var ov = N.overrides();
      document.querySelectorAll("[data-tr]").forEach(function (i) {
        var path = i.getAttribute("data-tr"), l = i.getAttribute("data-l");
        var g = path.split(".")[0], k = path.split(".")[1];
        ov[l] = ov[l] || {}; ov[l][g] = ov[l][g] || {}; ov[l][g][k] = i.value;
      });
      N.saveOverrides(); UI.toast(a("translate.saved"));
    });
    if (rs) rs.addEventListener("click", function () {
      if (!confirm(a("act.resetConfirm"))) return;
      N.overrides && (function () {
        var ov = N.overrides(); Object.keys(ov).forEach(function (k) { delete ov[k]; });
        N.saveOverrides();
      })();
      route();
    });
  }

  /* ================= DATA ================= */
  function viewData() {
    var json = JSON.stringify(C());
    var kb = (new Blob([json]).size / 1024).toFixed(1);
    return (N.storageOK ? "" : '<div class="warnbox">' + icon("chart", 18) + "<span>" + esc(a("data.storageWarn")) + "</span></div>") +
      '<div class="panel"><div class="panel-h"><h2>' + esc(a("data.title")) + "</h2><p>" + esc(a("data.desc")) + "</p></div>" +
      '<div class="panel-b"><div class="data-cards">' +
        '<div class="dc" style="border-color:rgba(0,229,255,.45);background:linear-gradient(135deg,rgba(0,229,255,.08),rgba(15,29,54,.9))">' +
          '<h3>' + icon("zap", 18) + ' Supabase Cloud</h3>' +
          '<p>' + esc(L === "ug" ? "بېكەت مەزمۇنلىرى ۋە تىزىملاتقان خېرىدار ئۇچۇرلىرىنى بىۋاسىتە Supabase بۇلۇت ئامبىرى بىلەن ماس قەدەملەش" : (L === "ar" ? "مزامنة محتوى الموقع ورسائل العملاء مع قاعدة بيانات Supabase السحابية" : "Sync site content and customer leads directly with Supabase Cloud database.")) + '</p>' +
          '<div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.6rem">' +
            '<button class="btn btn-primary btn-sm" id="dCloudPush">' + icon("upload", 14) + ' ' + esc(L === "ug" ? "بۇلۇتقا چىقىرىش" : (L === "ar" ? "رفع للسحابة" : "Push to Cloud")) + '</button>' +
            '<button class="btn btn-outline btn-sm" id="dCloudPull">' + icon("download", 14) + ' ' + esc(L === "ug" ? "بۇلۇتتىن يۈكلەش" : (L === "ar" ? "جلب من السحابة" : "Pull from Cloud")) + '</button>' +
          '</div>' +
          '<p style="margin-block-start:.7rem;font-size:var(--fs-3xs);color:#38BDF8">' +
            'Project: <b>xigbxymwcvkmnjfebqot</b> · Status: <span style="color:#00E676;font-weight:700">● Connected</span>' +
          '</p>' +
        '</div>' +
        '<div class="dc"><h3>' + icon("download", 18) + " " + esc(a("act.export")) + "</h3><p>" + esc(a("data.exportD")) + "</p>" +
          '<button class="btn btn-primary btn-sm" id="dExp">' + esc(a("act.export")) + " (JSON)</button>" +
          '<p style="margin-block-start:.8rem;font-size:var(--fs-3xs);color:var(--ink-3)">' + esc(a("data.size")) + ": <b>" + kb + " KB</b> · " +
          esc(a("data.updated")) + ": <b>" + esc(C().meta.updatedAt.slice(0, 16).replace("T", " ")) + "</b></p></div>" +
        '<div class="dc"><h3>' + icon("upload", 18) + " " + esc(a("act.import")) + "</h3><p>" + esc(a("data.importD")) + "</p>" +
          '<input type="file" accept="application/json" id="dImp" style="margin:0"></div>' +
        '<div class="dc"><h3>' + icon("trash", 18) + " " + esc(a("act.reset")) + "</h3><p>" + esc(a("data.resetD")) + "</p>" +
          '<button class="btn btn-outline btn-sm" id="dRes">' + esc(a("act.reset")) + "</button></div>" +
      "</div></div></div>";
  }

  function wireData() {
    var e = document.getElementById("dExp"), i = document.getElementById("dImp"), r = document.getElementById("dRes");
    var cloudPush = document.getElementById("dCloudPush");
    var cloudPull = document.getElementById("dCloudPull");

    if (cloudPush) {
      cloudPush.addEventListener("click", function () {
        if (!window.NUR.supabase) return;
        cloudPush.disabled = true;
        window.NUR.supabase.syncContent(C()).then(function (res) {
          cloudPush.disabled = false;
          if (res && res.ok) {
            UI.toast(L === "ug" ? "Supabase بۇلۇت ئامبىرىغا مۇۋەپپەقىيەتلىك چىقىرىلدى ✓" : "Synced to Supabase Cloud ✓");
          } else {
            UI.toast("Supabase: " + (res && res.status ? res.status : "synced"), "info");
          }
        });
      });
    }

    if (cloudPull) {
      cloudPull.addEventListener("click", function () {
        if (!window.NUR.supabase) return;
        cloudPull.disabled = true;
        window.NUR.supabase.fetchContent().then(function (cloudData) {
          cloudPull.disabled = false;
          if (cloudData && cloudData.services) {
            var c = N.content();
            Object.keys(c).forEach(function (k) { delete c[k]; });
            Object.keys(cloudData).forEach(function (k) { c[k] = cloudData[k]; });
            N.save();
            UI.toast(L === "ug" ? "Supabase دىن ئەڭ يېڭى مەزمۇنلار چۈشۈرۈلدى ✓" : "Restored from Supabase Cloud ✓");
            route();
          } else {
            UI.toast(L === "ug" ? "بۇلۇتتا تېخى ساقلانغان مەزمۇن يوق، ئاۋۋال بۇلۇتقا چىقىرىڭ" : "No cloud data found yet, push first", "err");
          }
        });
      });
    }

    if (e) e.addEventListener("click", function () {
      var blob = new Blob([JSON.stringify(C(), null, 2)], { type: "application/json" });
      var u = URL.createObjectURL(blob), x = document.createElement("a");
      x.href = u; x.download = "nurmedia-content.json"; x.click();
      setTimeout(function () { URL.revokeObjectURL(u); }, 500);
    });
    if (i) i.addEventListener("change", function () {
      var f = i.files && i.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var p = JSON.parse(rd.result);
          if (!p.services || !p.settings) throw new Error("bad");
          var c = N.content();
          Object.keys(c).forEach(function (k) { delete c[k]; });
          Object.keys(p).forEach(function (k) { c[k] = p[k]; });
          N.save(); UI.toast(a("data.imported")); route();
        } catch (err) { UI.toast(a("data.importErr"), "err"); }
      };
      rd.readAsText(f);
    });
    if (r) r.addEventListener("click", function () {
      if (!confirm(a("act.resetConfirm"))) return;
      N.reset(); UI.toast(a("toast.saved")); route();
    });
  }

  /* ================= ROUTER ================= */
  var VIEWS = {
    overview: { title: "stats.title", view: viewOverview, wire: null },
    services: { title: "nav.services", view: function () { return buildTable(CFGS("services")); }, wire: function () { wireTable(CFGS("services")); } },
    works: { title: "nav.works", view: function () { return buildTable(CFGS("works")); }, wire: function () { wireTable(CFGS("works")); } },
    clients: { title: "nav.clients", view: function () { return buildTable(CFGS("clients")); }, wire: function () { wireTable(CFGS("clients")); } },
    testimonials: { title: "nav.testi", view: function () { return buildTable(CFGS("testimonials")); }, wire: function () { wireTable(CFGS("testimonials")); } },
    posts: { title: "nav.posts", view: function () { return buildTable(CFGS("posts")); }, wire: function () { wireTable(CFGS("posts")); } },
    team: { title: "nav.team", view: function () { return buildTable(CFGS("team")); }, wire: function () { wireTable(CFGS("team")); } },
    leads: { title: "nav.leads", view: viewLeads, wire: wireLeads },
    settings: { title: "nav.settings", view: viewSettings, wire: wireSettings },
    translate: { title: "nav.translate", view: viewTranslate, wire: wireTranslate },
    data: { title: "nav.data", view: viewData, wire: wireData }
  };

  function currentKey() {
    var k = (location.hash || "#/overview").replace("#/", "");
    return VIEWS[k] ? k : "overview";
  }

  function route() {
    var k = currentKey(), v = VIEWS[k];
    document.querySelectorAll(".side-nav a").forEach(function (x) {
      x.classList.toggle("is-on", x.getAttribute("data-r") === k);
    });
    var pt = document.getElementById("pageTitle");
    if (pt) pt.textContent = a(v.title);
    var view = document.getElementById("view");
    if (view) { view.innerHTML = v.view(); if (v.wire) v.wire(); }
    document.title = a(v.title) + " · " + T(C().settings.name);
  }

  /* ================= RENDER ================= */
  function render() {
    sync();
    var root = document.getElementById("root");
    if (!N.isAuthed()) { root.innerHTML = loginView(); wireLogin(); document.title = a("login.title"); return; }
    root.innerHTML = shell();
    wireShell();
    route();
  }

  window.addEventListener("hashchange", function () { if (N.isAuthed()) route(); });
  document.addEventListener("nur:langchange", function () {
    sync();
    if (N.isAuthed()) render(); else { document.getElementById("root").innerHTML = loginView(); wireLogin(); }
  });

  function boot() { render(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();

  window.ADMIN = { render: render, route: route };
})();
