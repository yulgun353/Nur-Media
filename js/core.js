/* ============================================================
   CORE — language, storage, helpers
   Works with or without localStorage (opaque-origin safe).
   ============================================================ */
(function () {
  "use strict";

  var LANGS = ["ug", "ar", "en"];
  var LANG_NAME = { ug: "ئۇيغۇرچە", ar: "العربية", en: "English" };
  var LANG_SHORT = { ug: "UG", ar: "AR", en: "EN" };
  var DEFAULT_LANG = "ug";
  var DB_KEY = "nurmedia.content.v5";
  var LANG_KEY = "nurmedia.lang";
  var MODE_KEY = "nurmedia.mode";
  var THEME_KEY = "nurmedia.theme";
  var SESSION_KEY = "nurmedia.session";
  var OVERRIDE_KEY = "nurmedia.ui.overrides";

  /* ---------- Mode Engine (Dark / Light) ---------- */
  var MODES = ["dark", "light"];
  var MODE_NAME = {
    dark:  { ug: "كېچە مودى", ar: "الوضع الليلي", en: "Dark Mode" },
    light: { ug: "كۈندۈز مودى", ar: "الوضع النهاري", en: "Light Mode" }
  };
  var DEFAULT_MODE = "dark";

  /* ---------- 4 Themes: 2 Bright Light + 2 Muted Dark ---------- */
  var THEMES = ["dark-midnight", "dark-obsidian", "light-crystal", "light-warm"];
  var THEME_NAME = {
    "dark-midnight":  { ug: "تۇتۇق كۆك كېچە",  ar: "ليلي نيون كحلي",  en: "Midnight Dark" },
    "dark-obsidian":  { ug: "تۇتۇق قارا بىنەپشە", ar: "ليلي بنفسجي فاحم", en: "Obsidian Dark" },
    "light-crystal":  { ug: "يورۇق ئاق نېئون",   ar: "نهاري أبيض كريستال", en: "Crystal Light" },
    "light-warm":     { ug: "يورۇق شەپەق قايماق", ar: "نهاري عاجي دافئ", en: "Sunset Light" }
  };
  var THEME_COLOR = {
    "dark-midnight":  "#00F0FF",
    "dark-obsidian":  "#C084FC",
    "light-crystal":  "#0284C7",
    "light-warm":     "#F97316"
  };
  var DEFAULT_THEME = "dark-midnight";

  /* ---------- storage that never throws ---------- */
  var mem = {};
  var storageOK = (function () {
    try {
      var k = "__nur_probe__";
      window.localStorage.setItem(k, "1");
      window.localStorage.removeItem(k);
      return true;
    } catch (e) { return false; }
  })();

  function sGet(k) { return storageOK ? window.localStorage.getItem(k) : (mem[k] || null); }
  function sSet(k, v) { if (storageOK) { try { window.localStorage.setItem(k, v); } catch (e) { mem[k] = v; } } else { mem[k] = v; } }
  function sDel(k) { if (storageOK) { try { window.localStorage.removeItem(k); } catch (e) {} } delete mem[k]; }

  /* ---------- deep merge so seed upgrades never break old data ---------- */
  function isObj(v) { return v && typeof v === "object" && !Array.isArray(v); }
  function deepMerge(base, patch) {
    if (!isObj(base)) return patch === undefined ? base : patch;
    var out = {}, k;
    for (k in base) if (Object.prototype.hasOwnProperty.call(base, k)) out[k] = base[k];
    if (!isObj(patch)) return out;
    for (k in patch) {
      if (!Object.prototype.hasOwnProperty.call(patch, k)) continue;
      out[k] = isObj(base[k]) && isObj(patch[k]) ? deepMerge(base[k], patch[k]) : patch[k];
    }
    return out;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ---------- content store ---------- */
  var content = null;
  var overrides = null;

  function loadContent() {
    if (content) return content;
    var raw = sGet(DB_KEY);
    if (raw) {
      try {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.meta && parsed.services) { content = parsed; return content; }
      } catch (e) { /* corrupt -> reseed */ }
    }
    content = clone(window.SEED_CONTENT);
    return content;
  }

  function saveContent() {
    content.meta.updatedAt = new Date().toISOString();
    sSet(DB_KEY, JSON.stringify(content));
    return content;
  }

  function resetContent() {
    content = clone(window.SEED_CONTENT);
    overrides = null;
    sDel(OVERRIDE_KEY);
    return saveContent();
  }

  function loadOverrides() {
    if (overrides) return overrides;
    var raw = sGet(OVERRIDE_KEY);
    try { overrides = raw ? JSON.parse(raw) : {}; } catch (e) { overrides = {}; }
    return overrides;
  }
  function saveOverrides() { sSet(OVERRIDE_KEY, JSON.stringify(overrides)); }

  /* ---------- Mode Handling (Dark / Light) ---------- */
  function detectMode() {
    var q = new URLSearchParams(location.search).get("mode");
    if (q && MODES.indexOf(q) > -1) return q;
    var saved = sGet(MODE_KEY);
    if (saved && MODES.indexOf(saved) > -1) return saved;
    return DEFAULT_MODE;
  }

  var currentMode = detectMode();

  function applyMode(m) {
    if (MODES.indexOf(m) === -1) m = DEFAULT_MODE;
    currentMode = m;
    document.documentElement.setAttribute("data-mode", m);
    sSet(MODE_KEY, m);
    document.dispatchEvent(new CustomEvent("nur:modechange", { detail: { mode: m } }));
  }

  function toggleMode() {
    var next = currentMode === "dark" ? "light" : "dark";
    applyMode(next);
    return next;
  }

  applyMode(currentMode);

  /* ---------- Theme Handling (4 Colors) ---------- */
  function detectTheme() {
    var q = new URLSearchParams(location.search).get("theme");
    if (q && THEMES.indexOf(q) > -1) return q;
    var saved = sGet(THEME_KEY);
    if (saved && THEMES.indexOf(saved) > -1) return saved;
    return DEFAULT_THEME;
  }

  var currentTheme = detectTheme();

  function applyTheme(th) {
    if (THEMES.indexOf(th) === -1) th = DEFAULT_THEME;
    currentTheme = th;
    document.documentElement.setAttribute("data-theme", th);
    sSet(THEME_KEY, th);
    document.dispatchEvent(new CustomEvent("nur:themechange", { detail: { theme: th } }));
  }

  function cycleTheme() {
    var idx = THEMES.indexOf(currentTheme);
    var next = THEMES[(idx + 1) % THEMES.length];
    applyTheme(next);
    return next;
  }

  applyTheme(currentTheme);

  /* ---------- language ---------- */
  function detect() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && LANGS.indexOf(q) > -1) return q;
    var saved = sGet(LANG_KEY);
    if (saved && LANGS.indexOf(saved) > -1) return saved;
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav === "ug") return "ug";
    if (nav === "ar") return "ar";
    if (nav === "en") return "en";
    return DEFAULT_LANG;
  }

  var lang = detect();

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.documentElement.dir = window.I18N[l].dir;
    sSet(LANG_KEY, l);
    /* tell font loader which scripts are needed */
    document.documentElement.setAttribute("data-script",
      l === "ug" ? "uyghur" : (l === "ar" ? "arabic" : "latin"));
  }

  function setLang(l) {
    if (LANGS.indexOf(l) === -1) return;
    applyLang(l);
    var url = new URL(location.href);
    url.searchParams.set("lang", l);
    url.hash = "";
    history.replaceState(null, "", url.toString());
    document.dispatchEvent(new CustomEvent("nur:langchange", { detail: { lang: l } }));
  }

  /* preserve ?lang= when navigating between pages */
  function href(page) {
    if (!page || page.charAt(0) === "#" || /^https?:/.test(page)) return page;
    return page + (page.indexOf("?") > -1 ? "&" : "?") + "lang=" + lang;
  }

  /* ---------- strings ---------- */
  function t(path) {
    var packs = [window.I18N[lang], window.I18N.en];
    var ov = loadOverrides();
    if (ov[lang]) packs.unshift(ov[lang]);
    for (var i = 0; i < packs.length; i++) {
      var v = path.split(".").reduce(function (o, k) { return o == null ? undefined : o[k]; }, packs[i]);
      if (typeof v === "string" && v.length) return v;
    }
    return path;
  }

  /* pick the current language from a { ug, ar, en } object */
  function T(o) {
    if (o == null) return "";
    if (typeof o === "string") return o;
    return o[lang] || o.en || o.ug || o.ar || "";
  }

  function fmtNum(n) {
    var loc = lang === "ar" ? "ar-EG" : (lang === "ug" ? "en-US" : "en-US");
    try { return new Intl.NumberFormat(loc).format(n); } catch (e) { return String(n); }
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d)) return iso;
    var loc = lang === "ar" ? "ar-EG" : (lang === "ug" ? "en-GB" : "en-GB");
    try {
      return new Intl.DateTimeFormat(loc, { day: "numeric", month: "short", year: "numeric" }).format(d);
    } catch (e) { return d.toISOString().slice(0, 10); }
  }

  function relTime(iso) {
    var d = new Date(iso); if (isNaN(d)) return "";
    var diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 3600) return Math.max(1, Math.round(diff / 60)) + (lang === "en" ? "m" : " مىنۇت");
    if (diff < 86400) return Math.round(diff / 3600) + (lang === "en" ? "h" : " سائەت");
    return Math.round(diff / 86400) + (lang === "en" ? "d" : " كۈن");
  }

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function uid(prefix) {
    return (prefix || "id") + "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function sortByOrder(arr) {
    return (arr || []).slice().sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
  }

  function completeness(rec) {
    /* how many language fields of a record are filled -> used by dashboard health */
    var fields = ["name", "title", "short", "desc", "text", "excerpt", "role", "subject"];
    var found = 0, filled = 0;
    fields.forEach(function (f) {
      if (rec[f] && typeof rec[f] === "object") {
        found++;
        if (LANGS.every(function (l) { return String(rec[f][l] || "").trim().length > 0; })) filled++;
      }
    });
    return found ? Math.round((filled / found) * 100) : 100;
  }

  /* ---------- leads (public form -> dashboard inbox) ---------- */
  function addLead(lead) {
    var c = loadContent();
    c.leads = c.leads || [];
    lead.id = "L-" + (1043 + c.leads.length);
    lead.date = new Date().toISOString();
    lead.status = "new";
    c.leads.unshift(lead);
    saveContent();
    return lead;
  }

  /* ---------- auth & credentials management ---------- */
  var AUTH_KEY = "nurmedia.auth.creds";
  var DEFAULT_CREDS = { email: "admin@nurmedia.co", pass: "nur2026" };

  function getAuth() {
    var raw = sGet(AUTH_KEY);
    if (raw) {
      try {
        var p = JSON.parse(raw);
        if (p && p.email && p.pass) return p;
      } catch (e) {}
    }
    return DEFAULT_CREDS;
  }

  function setAuth(email, pass) {
    var creds = { email: String(email).trim().toLowerCase(), pass: String(pass) };
    sSet(AUTH_KEY, JSON.stringify(creds));
    return creds;
  }

  function checkAuth(email, pass) {
    var cur = getAuth();
    return String(email).trim().toLowerCase() === cur.email.toLowerCase() && String(pass) === cur.pass;
  }

  function resetAuth() {
    sDel(AUTH_KEY);
    return DEFAULT_CREDS;
  }

  /* ---------- session (in-memory per page session, never persisted) ---------- */
  var sessionAuthed = false;
  function isAuthed() { return sessionAuthed; }
  function login() { sessionAuthed = true; }
  function logout() { sessionAuthed = false; }

  window.NUR = {
    LANGS: LANGS, LANG_NAME: LANG_NAME, LANG_SHORT: LANG_SHORT,
    MODES: MODES, MODE_NAME: MODE_NAME,
    get mode() { return currentMode; },
    applyMode: applyMode, toggleMode: toggleMode,
    THEMES: THEMES, THEME_NAME: THEME_NAME, THEME_COLOR: THEME_COLOR,
    get theme() { return currentTheme; },
    applyTheme: applyTheme, cycleTheme: cycleTheme,
    get lang() { return lang; },
    applyLang: applyLang, setLang: setLang, href: href,
    t: t, T: T, fmtNum: fmtNum, fmtDate: fmtDate, relTime: relTime,
    esc: esc, uid: uid, sortByOrder: sortByOrder, completeness: completeness,
    content: loadContent, save: saveContent, reset: resetContent,
    overrides: loadOverrides, saveOverrides: saveOverrides,
    storageOK: storageOK,
    addLead: addLead, isAuthed: isAuthed, login: login, logout: logout,
    getAuth: getAuth, setAuth: setAuth, checkAuth: checkAuth, resetAuth: resetAuth
  };
})();
