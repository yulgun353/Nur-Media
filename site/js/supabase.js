/* ============================================================
   NUR Media — Supabase Cloud Integration
   Project URL: https://xigbxymwcvkmnjfebqot.supabase.co
   Project ID:  xigbxymwcvkmnjfebqot
   ============================================================ */
(function () {
  "use strict";

  var SUPABASE_URL = "https://xigbxymwcvkmnjfebqot.supabase.co";
  var SUPABASE_KEY = "sb_publishable_eUakj7_cDLBpyZZtCwDB2A_hm-wnMye";
  var PROJECT_ID = "xigbxymwcvkmnjfebqot";

  var headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
  };

  /* ---------------- API Helpers ---------------- */
  function restUrl(endpoint) {
    return SUPABASE_URL + "/rest/v1" + endpoint;
  }

  /* 1. Send Lead to Supabase */
  function sendLead(lead) {
    if (!lead) return Promise.resolve(null);
    var payload = {
      id: lead.id || ("L-" + Date.now()),
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      service: lead.service || "",
      budget: lead.budget || "",
      message: lead.message || "",
      status: lead.status || "new",
      created_at: lead.date || new Date().toISOString()
    };

    return fetch(restUrl("/leads"), {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload)
    })
    .then(function (res) {
      if (res.ok) {
        console.log("[Supabase] Lead successfully synced to cloud ✓", payload.id);
        return { ok: true, id: payload.id };
      }
      return res.text().then(function (t) {
        console.warn("[Supabase] Lead sync response:", res.status, t);
        return { ok: false, status: res.status };
      });
    })
    .catch(function (err) {
      console.warn("[Supabase] Lead sync skipped (offline fallback active):", err);
      return { ok: false, error: err };
    });
  }

  /* 2. Fetch Leads from Supabase */
  function fetchLeads() {
    return fetch(restUrl("/leads?select=*&order=created_at.desc"), {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY
      }
    })
    .then(function (res) {
      if (res.ok) return res.json();
      return null;
    })
    .catch(function (err) {
      console.warn("[Supabase] fetchLeads error:", err);
      return null;
    });
  }

  /* 3. Sync Site Content to Supabase */
  function syncContent(contentData) {
    if (!contentData) return Promise.resolve(null);
    var payload = {
      id: "main",
      data: contentData,
      updated_at: new Date().toISOString()
    };

    return fetch(restUrl("/site_content"), {
      method: "POST",
      headers: Object.assign({}, headers, { "Prefer": "resolution=merge-duplicates" }),
      body: JSON.stringify(payload)
    })
    .then(function (res) {
      if (res.ok) {
        console.log("[Supabase] Content synced to cloud ✓");
        return { ok: true };
      }
      return { ok: false, status: res.status };
    })
    .catch(function (err) {
      console.warn("[Supabase] Content sync error:", err);
      return { ok: false, error: err };
    });
  }

  /* 4. Fetch Content from Supabase */
  function fetchContent() {
    return fetch(restUrl("/site_content?id=eq.main&select=*"), {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": "Bearer " + SUPABASE_KEY
      }
    })
    .then(function (res) {
      if (res.ok) return res.json();
      return null;
    })
    .then(function (rows) {
      if (rows && rows.length && rows[0].data) {
        return rows[0].data;
      }
      return null;
    })
    .catch(function (err) {
      console.warn("[Supabase] fetchContent error:", err);
      return null;
    });
  }

  /* 5. Test Connection */
  function testConnection() {
    return fetch(SUPABASE_URL + "/auth/v1/settings", {
      method: "GET",
      headers: { "apikey": SUPABASE_KEY }
    })
    .then(function (res) {
      return res.ok;
    })
    .catch(function () {
      return false;
    });
  }

  /* Export on window.NUR */
  if (window.NUR) {
    window.NUR.supabase = {
      url: SUPABASE_URL,
      key: SUPABASE_KEY,
      projectId: PROJECT_ID,
      sendLead: sendLead,
      fetchLeads: fetchLeads,
      syncContent: syncContent,
      fetchContent: fetchContent,
      testConnection: testConnection
    };
  }
})();
