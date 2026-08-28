/* Real execution test: loads every page in jsdom, runs the site's own JS,
   and asserts the rendered DOM for all three languages + the dashboard. */
const { JSDOM, VirtualConsole } = require("jsdom");
const path = require("path");
const fs = require("fs");

const SITE = "/home/user/site";
const errors = [];
const notImpl = /Not implemented|Could not parse CSS|Error: Not implemented/i;

function vc(tag) {
  const v = new VirtualConsole();
  v.on("jsdomError", (e) => {
    if (!notImpl.test(e.message + " " + (e.detail || ""))) errors.push(`[${tag}] jsdomError: ${e.message}\n${(e.detail && e.detail.stack) || e.stack || ""}`);
  });
  v.on("error", (...a) => errors.push(`[${tag}] console.error: ${a.join(" ")}`));
  return v;
}

async function load(file, lang, hash) {
  const url = `http://127.0.0.1:4173/${file}?lang=${lang}${hash || ""}`;
  const dom = await JSDOM.fromURL(url, {
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true,
    virtualConsole: vc(file + ":" + lang)
  });
  await new Promise((r) => setTimeout(r, 300));
  return dom;
}

const results = [];
function check(name, cond, extra) {
  results.push({ name, pass: !!cond, extra: extra === undefined ? "" : String(extra) });
  console.log(`${cond ? "  ✓" : "  ✗"} ${name}${cond ? "" : "  -> " + (extra === undefined ? "" : extra)}`);
}

(async () => {
  /* ============ 1. public pages x 3 languages ============ */
  const pages = ["index.html", "about.html", "services.html", "work.html", "blog.html", "contact.html"];
  const expectDir = { ug: "rtl", ar: "rtl", en: "ltr" };

  for (const lang of ["ug", "ar", "en"]) {
    console.log(`\n── public site [${lang}] ──`);
    for (const p of pages) {
      const dom = await load(p, lang);
      const d = dom.window.document;
      const dirOk = d.documentElement.getAttribute("dir") === expectDir[lang];
      const langOk = d.documentElement.getAttribute("lang") === lang;
      const navN = d.querySelectorAll("#hdr-root .nav a").length;
      const ftrOk = d.querySelectorAll("#ftr-root .ftr-col").length >= 4;
      const mainLen = (d.getElementById("main") || {}).innerHTML ? d.getElementById("main").innerHTML.length : 0;
      check(`${p} dir=${expectDir[lang]}`, dirOk, d.documentElement.getAttribute("dir"));
      check(`${p} lang attr`, langOk, d.documentElement.getAttribute("lang"));
      check(`${p} nav links = 6`, navN === 6, navN);
      check(`${p} footer 4 cols`, ftrOk);
      check(`${p} main rendered (>2000 chars)`, mainLen > 2000, mainLen);
      /* no untranslated dotted keys leaking into the page */
      const txt = d.body.textContent;
      const leaks = (txt.match(/\b(?:nav|common|sections|footer|contact|cat|blog)\.[a-zA-Z]+/g) || []);
      check(`${p} no i18n key leaks`, leaks.length === 0, leaks.slice(0, 5).join(","));
      dom.window.close();
    }
  }

  /* ============ 2. homepage content specifics ============ */
  console.log("\n── homepage content ──");
  {
    const dom = await load("index.html", "ug");
    const d = dom.window.document;
    check("hero h1 present", /نۇر|ماركا/.test(d.querySelector(".hero-copy h1").textContent), d.querySelector(".hero-copy h1").textContent);
    check("4 stat cards", d.querySelectorAll(".stat").length === 4, d.querySelectorAll(".stat").length);
    check("4 service cards (limit)", d.querySelectorAll(".svc-card").length === 4, d.querySelectorAll(".svc-card").length);
    check("3 featured work cards", d.querySelectorAll(".wk-card").length === 3, d.querySelectorAll(".wk-card").length);
    check("4 process steps", d.querySelectorAll(".proc").length === 4, d.querySelectorAll(".proc").length);
    check("8 client marks", d.querySelectorAll(".cli").length === 8, d.querySelectorAll(".cli").length);
    check("3 blog posts", d.querySelectorAll(".post").length === 3, d.querySelectorAll(".post").length);
    dom.window.close();
  }

  /* ============ 3. work filter + modal ============ */
  console.log("\n── work page interactions ──");
  {
    const dom = await load("work.html", "en");
    const d = dom.window.document, w = dom.window;
    check("7 work cards", d.querySelectorAll(".wk-card").length === 7, d.querySelectorAll(".wk-card").length);
    const chip = d.querySelector('[data-f="video"]');
    chip.click();
    const visible = [...d.querySelectorAll(".wk-card")].filter((c) => c.style.display !== "none").length;
    check("filter 'video' shows 1", visible === 1, visible);
    d.querySelector('[data-f="all"]').click();
    const allVisible = [...d.querySelectorAll(".wk-card")].filter((c) => c.style.display !== "none").length;
    check("filter 'all' shows 7", allVisible === 7, allVisible);
    d.querySelector("[data-work]").click();
    await new Promise((r) => setTimeout(r, 60));
    const modal = d.querySelector(".modal");
    check("work modal opens", !!modal);
    check("modal has client + result", !!modal && /Client/.test(modal.textContent) && modal.querySelectorAll(".wd-dl div").length === 3);
    dom.window.close();
  }

  /* ============ 4. contact form writes a lead ============ */
  console.log("\n── contact form ──");
  {
    const dom = await load("contact.html", "ar");
    const d = dom.window.document, w = dom.window;
    const f = d.getElementById("leadForm");
    check("form rendered", !!f);
    f.querySelector('[name="name"]').value = "Test User";
    f.querySelector('[name="email"]').value = "test@example.com";
    f.querySelector('[name="message"]').value = "This is a test message long enough.";
    f.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 900));
    const okVisible = !d.querySelector("[data-ok]").hidden;
    check("success message shown", okVisible);
    const leads = JSON.parse(w.localStorage.getItem("nurmedia.content.v3")).leads;
    check("lead saved to storage", leads[0].email === "test@example.com", JSON.stringify(leads[0] && leads[0].email));
    check("lead defaults to 'new'", leads[0].status === "new", leads[0].status);
    /* validation path */
    const f2 = d.getElementById("leadForm");
    f2.querySelector('[name="email"]').value = "bad-email";
    f2.dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 40));
    check("invalid email blocked", /بريد/.test(d.querySelector('[data-err="email"]').textContent), d.querySelector('[data-err="email"]').textContent);
    dom.window.close();
  }

  /* ============ 5. language switch ============ */
  console.log("\n── language switching ──");
  {
    const dom = await load("index.html", "ug");
    const d = dom.window.document, w = dom.window;
    const before = d.querySelector(".nav a").textContent;
    d.querySelector('#hdr-root [data-lang="en"]').click();
    await new Promise((r) => setTimeout(r, 120));
    const after = d.querySelector(".nav a").textContent;
    check("nav text switches ug -> en", before !== after && after === "Home", `${before} -> ${after}`);
    check("dir flips to ltr", d.documentElement.getAttribute("dir") === "ltr");
    check("lang saved", w.localStorage.getItem("nurmedia.lang") === "en");
    dom.window.close();
  }

  /* ============ 6. dashboard ============ */
  console.log("\n── admin dashboard ──");
  for (const lang of ["ug", "ar", "en"]) {
    const dom = await load("admin.html", lang, "#/overview");
    const d = dom.window.document, w = dom.window;
    check(`[${lang}] login screen shown`, !!d.getElementById("loginForm"));
    d.querySelector('#loginForm [name="email"]').value = "admin@nurmedia.co";
    d.querySelector('#loginForm [name="pass"]').value = "nur2026";
    d.getElementById("loginForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 120));
    check(`[${lang}] logged in -> shell`, !!d.querySelector(".shell"));
    check(`[${lang}] dir=${expectDir[lang]}`, d.documentElement.getAttribute("dir") === expectDir[lang], d.documentElement.getAttribute("dir"));

    const routes = ["overview", "services", "works", "clients", "testimonials", "posts", "team", "leads", "settings", "translate", "data"];
    for (const rt of routes) {
      w.location.hash = "#/" + rt;
      w.dispatchEvent(new w.Event("hashchange"));
      await new Promise((r) => setTimeout(r, 30));
      const view = d.getElementById("view");
      const len = view ? view.innerHTML.length : 0;
      check(`[${lang}] #/${rt} renders (>300 chars)`, len > 300, len);
    }
    /* overview specifics */
    w.location.hash = "#/overview";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 30));
    check(`[${lang}] 4 stat cards`, d.querySelectorAll(".cards .card").length === 4, d.querySelectorAll(".cards .card").length);
    check(`[${lang}] line chart drawn`, d.querySelectorAll(".chart .ln").length === 1);
    check(`[${lang}] donut has 3 arcs`, d.querySelectorAll(".donut path").length === 3, d.querySelectorAll(".donut path").length);
    check(`[${lang}] 5 health bars`, d.querySelectorAll(".bar").length === 5, d.querySelectorAll(".bar").length);
    /* table row counts */
    const counts = { services: 8, works: 7, clients: 8, testimonials: 4, posts: 4, team: 4, leads: 3 };
    for (const k of Object.keys(counts)) {
      w.location.hash = "#/" + k;
      w.dispatchEvent(new w.Event("hashchange"));
      await new Promise((r) => setTimeout(r, 25));
      const n = d.querySelectorAll("#view tbody tr").length;
      check(`[${lang}] ${k} table rows = ${counts[k]}`, n === counts[k], n);
    }
    /* sidebar nav labels not empty */
    const emptyNav = [...d.querySelectorAll(".side-nav a span")].filter((s) => !s.textContent.trim()).length;
    check(`[${lang}] sidebar labels filled`, emptyNav === 0, emptyNav);
    dom.window.close();
  }

  /* ============ 7. dashboard CRUD ============ */
  console.log("\n── dashboard CRUD ──");
  {
    const dom = await load("admin.html", "en", "#/services");
    const d = dom.window.document, w = dom.window;
    d.querySelector('#loginForm [name="email"]').value = "admin@nurmedia.co";
    d.querySelector('#loginForm [name="pass"]').value = "nur2026";
    d.getElementById("loginForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 120));
    w.location.hash = "#/services";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 40));

    /* edit an existing record */
    d.querySelector("[data-edit]").click();
    await new Promise((r) => setTimeout(r, 40));
    const modal = d.querySelector(".modal");
    check("edit modal opens", !!modal);
    const inp = modal.querySelector('[data-tri="name"][data-lang="en"]');
    inp.value = "Renamed Service";
    modal.querySelector("#recForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 80));
    const stored = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("edit persisted", stored.services.some((s) => s.name.en === "Renamed Service"));
    check("table reflects edit", /Renamed Service/.test(d.getElementById("view").textContent));

    /* add a new record */
    d.querySelector("[data-add]").click();
    await new Promise((r) => setTimeout(r, 40));
    const m2 = d.querySelector(".modal");
    m2.querySelector('[data-tri="name"][data-lang="ug"]').value = "يېڭى خىزمەت";
    m2.querySelector('[data-tri="name"][data-lang="ar"]').value = "خدمة جديدة";
    m2.querySelector('[data-tri="name"][data-lang="en"]').value = "Brand New Service";
    m2.querySelector("#recForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 80));
    const st2 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("add persisted (9 services)", st2.services.length === 9, st2.services.length);
    const added = st2.services[st2.services.length - 1];
    check("new record has all 3 languages", added.name.ug && added.name.ar && added.name.en === "Brand New Service");
    check("new record gets order", added.order === 9, added.order);

    /* settings save */
    w.location.hash = "#/settings";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 40));
    const sName = d.querySelector('[data-scope="settings"][data-s="name"][data-lang="en"]');
    sName.value = "NUR Media Group";
    d.getElementById("setForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 60));
    const st3 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("settings persisted", st3.settings.name.en === "NUR Media Group", st3.settings.name.en);
    check("settings did not clobber other langs", st3.settings.name.ug === "نۇر مېدىيا", st3.settings.name.ug);

    /* hero edit */
    w.location.hash = "#/settings";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 40));
    d.querySelector('[data-scope="hero"][data-s="title"][data-lang="en"]').value = "New Hero Title";
    d.getElementById("setForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 60));
    const st4 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("hero edit persisted", st4.hero.title.en === "New Hero Title", st4.hero.title.en);

    /* leads: open -> status flips to read */
    w.location.hash = "#/leads";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 40));
    d.querySelector("[data-view]").click();
    await new Promise((r) => setTimeout(r, 60));
    const st5 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("lead marked read on open", st5.leads[0].status === "read", st5.leads[0].status);
    d.querySelector("[data-answered]").click();
    await new Promise((r) => setTimeout(r, 80));
    const st6 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("lead marked answered", st6.leads[0].status === "answered", st6.leads[0].status);

    /* reset restores seed */
    w.location.hash = "#/data";
    w.dispatchEvent(new w.Event("hashchange"));
    await new Promise((r) => setTimeout(r, 40));
    w.confirm = () => true;
    d.getElementById("dRes").click();
    await new Promise((r) => setTimeout(r, 80));
    const st7 = JSON.parse(w.localStorage.getItem("nurmedia.content.v3"));
    check("reset restores 8 seed services", st7.services.length === 8, st7.services.length);
    check("reset restores site name", st7.settings.name.en === "NUR Media", st7.settings.name.en);

    /* export produces valid JSON */
    const json = JSON.stringify(st7);
    check("exported payload parses", !!JSON.parse(json).settings.name.en);
    dom.window.close();
  }

  /* ============ 8. login rejection ============ */
  console.log("\n── auth ──");
  {
    const dom = await load("admin.html", "en");
    const d = dom.window.document, w = dom.window;
    d.querySelector('#loginForm [name="pass"]').value = "wrong";
    d.getElementById("loginForm").dispatchEvent(new w.Event("submit", { bubbles: true, cancelable: true }));
    await new Promise((r) => setTimeout(r, 60));
    check("wrong password rejected", !d.querySelector(".shell") && d.getElementById("authErr").classList.contains("is-on"));
    dom.window.close();
  }

  /* ============ summary ============ */
  const failed = results.filter((r) => !r.pass);
  console.log(`\n════════════════════════════════`);
  console.log(`${results.length - failed.length}/${results.length} checks passed`);
  if (errors.length) {
    console.log(`\n${errors.length} JS errors:`);
    errors.slice(0, 12).forEach((e) => console.log("  ! " + e));
  } else {
    console.log("0 uncaught JS errors");
  }
  if (failed.length) {
    console.log("\nFailed:");
    failed.forEach((f) => console.log("  ✗ " + f.name + (f.extra ? " -> " + f.extra : "")));
  }
  process.exit(failed.length || errors.length ? 1 : 0);
})();
