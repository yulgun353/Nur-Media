/* ============================================================
   UI STRINGS — ug / ar / en
   Interface chrome only; content lives in data/content.js
   ============================================================ */
(function () {
  "use strict";

  var I18N = {
    ug: {
      dir: "rtl",
      nav: { home:"باش بەت", testi:"تەكلىپنامىلەر", about:"بىز ھەققىدە", services:"خىزمەتلەر", work:"ئەسەرلىرىمىز", blog:"باقچە", contact:"ئالاقە", menu:"تىزىملىك" },
      cta: { start:"پىروجېكت باشلاش", call:"ھازىر ئالاقىلىشىش" },
      common: {
        learnMore:"تەپسىلاتى", viewAll:"ھەممىسىنى كۆرۈش", back:"قايتىش", close:"تاقاش",
        readMore:"ئوقۇش", minRead:"مىنۇت", years:"يىل", all:"ھەممىسى", filter:"سۈزۈش",
        language:"تىل", theme:"رەڭ ئۇسلۇبى", loading:"يۈكلىنىۋاتىدۇ…", page:"بەت",
        prev:"ئالدىنقى", next:"كېيىنكى", of:"/", save:"ساقلاش", cancel:"بىكار قىلىش",
        delete:"ئۆچۈرۈش", edit:"تەھرىرلەش", add:"قوشۇش", search:"ئىزدەش",
        noResults:"نەتىجە تېپىلمىدى", confirmDelete:"راستىنلا ئۆچۈرەمسىز؟",
        yes:"ھەئە", no:"ياق", active:"ئاكتىپ", inactive:"پاسسىپ", featured:"تاللانما",
        total:"جەمئىي", show:"كۆرسىتىش", rows:"قۇر"
      },
      cat: { brand:"ماركا", social:"ئىجتىمائىي تور", video:"ۋىدېئو", ads:"رەقەملىك ئىلان", web:"تور بېكەت", print:"بېسىش/سىرتقى", photo:"فوتوگرافىيە" },
      sections: {
        servicesT:"خىزمەتلىرىمىز", servicesS:"بىر ئورۇندىلا تولۇق ئىلانچىلىق خىزمىتى",
        workT:"تاللانما ئەسەرلىرىمىز", workS:"نەتىجە بىلەن ئۆلچىنىدىغان ئىشلار",
        clientsT:"بىزگە ئىشەنگەن ماركلار", clientsS:"6 دۆلەتتىكى 180 دىن ئارتۇق خېرىدار",
        testiT:"خېرىدارلىرىمىز نېمە دەيدۇ", testiS:"ھەقىقىي ئىنكاسلار",
        processT:"قانداق ئىشلەيمىز", processS:"تۆت باسقۇچلۇق ئېنىق جەريان",
        blogT:"ئەڭ يېڭى يېزىقلار", blogS:"ئىلانچىلىق ۋە ماركا ھەققىدە پىكىرلەر",
        teamT:"گۇرۇپپىمىز", teamS:"سىز بىلەن بىللە ئىشلەيدىغان كىشىلەر",
        contactT:"بىز بىلەن ئالاقىلىشىڭ", contactS:"پىلانىڭىزنى سۆزلەپ بېرىڭ — 24 سائەت ئىچىدە جاۋاب بېرىمىز",
        ctaT:"كېيىنكى پىروجېكتىڭىزنى بىللە باشلايلى", ctaS:"ھەقسىز 30 مىنۇتلۇق مەسلىھەت ئېلىڭ، ھېچقانداق مەجبۇرىيەت يوق",
        aboutT:"بىز كىم؟",
        valuesT:"قىممەت قارىشىمىز",
        infoT:"ئالاقە ئۇچۇرلىرى"
      },
      values: [
        { t:"سانلارغا ئىشىنىمىز", d:"ھەر بىر لايىھە ئۆلچىنىدىغان نەتىجىگە باغلىنىدۇ." },
        { t:"ئۈچ تىلدا سۆزلەيمىز", d:"ئۇيغۇرچە، ئەرەپچە ۋە ئېنگىلىزچىدا ئوخشاش سۈپەتتە." },
        { t:"ئېنىق سۆزلەيمىز", d:"باھا، ۋاقىت ۋە نەتىجە ئالدىنلا ئېنىق بولىدۇ." },
        { t:"ئۇزۇن مۇددەتلىك ھەمكارلىق", d:"خېرىدارلىرىمىزنىڭ 78% ئىككى يىلدىن ئارتۇق بىلەن بىللە." }
      ],
      story: [
        "نۇر مېدىيا 2014-يىلى ئۈچ كىشىلىك كىچىك گۇرۇپپا سۈپىتىدە باشلاندى. بىزنىڭ مەقسىتىمىز ئاددىي ئىدى: يەرلىك ماركلارنىڭمۇ خەلقئارالىق سەۋىيىدىكى ئىلانچىلىققا ئېرىشەلەيدىغانلىقىنى ئىسپاتلاش.",
        "بۈگۈن 24 كىشىلىك گۇرۇپپىمىز بىلەن ئۈچ تىلدا — ئۇيغۇرچە، ئەرەپچە ۋە ئېنگىلىزچىدا — خىزمەت قىلىمىز. ماركا كىملىكىدىن تارتىپ رەقەملىك ئىلان باشقۇرۇشقىچە، ھەممىسى بىر ئورۇندا."
      ],
      contact: {
        name:"ئىسمىڭىز", email:"ئېلخەت ئادرېسىڭىز", phone:"تېلېفون نومۇرى",
        subject:"تېما", service:"قايسى خىزمەت كېرەك؟", budget:"مۆلچەر خىراجەت",
        message:"ئۇچۇرىڭىز", send:"يوللاش", sending:"يوللىنىۋاتىدۇ…",
        success:"ئۇچۇرىڭىز قوبۇل قىلىندى! 24 سائەت ئىچىدە جاۋاب بېرىمىز.",
        errName:"ئىسمىڭىزنى يېزىڭ", errEmail:"توغرا ئېلخەت ئادرېسى يېزىڭ",
        errMsg:"ئۇچۇرىڭىزنى يېزىڭ (كەم دېگەندە 10 ھەرپ)", errGeneric:"خاتالىق كۆرۈلدى، قايتا سىناڭ",
        selectPlaceholder:"تاللاڭ…", budgetRange:"$1K – $5K · $5K – $15K · $15K+",
        address:"ئادرېس", phoneL:"تېلېفون", emailL:"ئېلخەت", hoursL:"خىزمەت ۋاقتى"
      },
      footer: {
        about:"بىز ئۈچ تىلدا خىزمەت قىلىدىغان ئىلانچىلىق ۋە ماركا ئاگېنتلىقى. پىكىرنى نەتىجىگە ئايلاندۇرىمىز.",
        quick:"تېز ئۇلىنىشلار", servL:"خىزمەتلەر", contactL:"ئالاقە", follow:"ئىز بېسىش",
        rights:"بارلىق ھوقۇقلار ساقلانغان.",
        newsletter:"ئايلىق خەت", newsSub:"ئىلانچىلىق مەسلىھەتلىرى — ئايىغا بىر قېتىم، ھەرگىز سىپام يوق.",
        newsPh:"ئېلخەت ئادرېسىڭىز", subscribe:"مۇشتەرى بولۇش", subscribed:"رەھمەت! تىزىملىتىلدىڭىز.",
        admin:"باشقۇرۇش سۇپىسى", made:"نۇر مېدىيا تەرىپىدىن لايىھىلەنگەن"
      },
      blog: { allCat:"ھەممە يېزىقلار", categories:{ marketing:"بازار", branding:"ماركا", seo:"ئىزدەش موتورى", video:"ۋىدېئو" } },
      work: { client:"خېرىدار", year:"يىلى", result:"نەتىجىسى", scope:"خىزمەت دائىرىسى", visit:"بېكەتكە كىرىش" },
      a11y: { skip:"مەزمۇنغا ئۆتۈش", openMenu:"تىزىملىكنى ئېچىش", closeMenu:"تىزىملىكنى تاقاش" }
    },

    ar: {
      dir: "rtl",
      nav: { home:"الرئيسية", testi:"آراء العملاء", about:"من نحن", services:"خدماتنا", work:"أعمالنا", blog:"المدونة", contact:"اتصل بنا", menu:"القائمة" },
      cta: { start:"ابدأ مشروعاً", call:"تواصل الآن" },
      common: {
        learnMore:"التفاصيل", viewAll:"عرض الكل", back:"رجوع", close:"إغلاق",
        readMore:"اقرأ المزيد", minRead:"دقائق", years:"سنة", all:"الكل", filter:"تصفية",
        language:"اللغة", theme:"المظهر", loading:"جارٍ التحميل…", page:"صفحة",
        prev:"السابق", next:"التالي", of:"من", save:"حفظ", cancel:"إلغاء",
        delete:"حذف", edit:"تعديل", add:"إضافة", search:"بحث",
        noResults:"لا توجد نتائج", confirmDelete:"هل أنت متأكد من الحذف؟",
        yes:"نعم", no:"لا", active:"نشط", inactive:"متوقف", featured:"مميز",
        total:"المجموع", show:"عرض", rows:"صف"
      },
      cat: { brand:"الهوية", social:"التواصل", video:"الفيديو", ads:"الإعلانات", web:"المواقع", print:"الطباعة والخارجي", photo:"التصوير" },
      sections: {
        servicesT:"خدماتنا", servicesS:"وكالة إعلانية متكاملة في مكان واحد",
        workT:"أعمال مختارة", workS:"أعمال تُقاس بالنتائج",
        clientsT:"علامات وثقت بنا", clientsS:"أكثر من 180 عميلاً في 6 دول",
        testiT:"ماذا يقول عملاؤنا", testiS:"آراء حقيقية من عملائنا",
        processT:"كيف نعمل", processS:"أربع مراحل واضحة",
        blogT:"أحدث المقالات", blogS:"أفكار عن التسويق والعلامات التجارية",
        teamT:"فريقنا", teamS:"الأشخاص الذين سيعملون معك",
        contactT:"تواصل معنا", contactS:"أخبرنا عن خطتك — نرد خلال 24 ساعة",
        ctaT:"لنبدأ مشروعك القادم معاً", ctaS:"استشارة مجانية 30 دقيقة، بلا أي التزام",
        aboutT:"من نحن؟",
        valuesT:"قيمنا",
        infoT:"معلومات التواصل"
      },
      values: [
        { t:"نؤمن بالأرقام", d:"كل تصميم مرتبط بنتيجة قابلة للقياس." },
        { t:"نتحدث ثلاث لغات", d:"بالعربية والإنجليزية والأويغورية وبنفس الجودة." },
        { t:"نتحدث بوضوح", d:"السعر والموعد والنتيجة محددة مسبقاً." },
        { t:"شراكة طويلة", d:"78% من عملائنا معنا لأكثر من سنتين." }
      ],
      story: [
        "بدأت نور ميديا عام 2014 كفريق من ثلاثة أشخاص بهدف بسيط: إثبات أن العلامات المحلية تستحق إعلانات بمستوى عالمي.",
        "اليوم يعمل فريقنا المكوّن من 24 شخصاً بثلاث لغات — العربية والإنجليزية والأويغورية — من الهوية البصرية إلى إدارة الإعلانات الرقمية، كل ذلك في مكان واحد."
      ],
      contact: {
        name:"الاسم", email:"البريد الإلكتروني", phone:"رقم الهاتف",
        subject:"الموضوع", service:"أي خدمة تحتاج؟", budget:"الميزانية المتوقعة",
        message:"رسالتك", send:"إرسال", sending:"جارٍ الإرسال…",
        success:"تم استلام رسالتك! سنرد خلال 24 ساعة.",
        errName:"يرجى كتابة الاسم", errEmail:"يرجى كتابة بريد إلكتروني صحيح",
        errMsg:"يرجى كتابة الرسالة (10 أحرف على الأقل)", errGeneric:"حدث خطأ، حاول مرة أخرى",
        selectPlaceholder:"اختر…", budgetRange:"$1K – $5K · $5K – $15K · $15K+",
        address:"العنوان", phoneL:"الهاتف", emailL:"البريد", hoursL:"ساعات العمل"
      },
      footer: {
        about:"وكالة إعلانية وتصميم علامات تجارية تعمل بثلاث لغات. نحوّل الأفكار إلى نتائج.",
        quick:"روابط سريعة", servL:"الخدمات", contactL:"التواصل", follow:"تابعنا",
        rights:"جميع الحقوق محفوظة.",
        newsletter:"النشرة الشهرية", newsSub:"نصائح تسويقية — مرة في الشهر، بلا إزعاج.",
        newsPh:"بريدك الإلكتروني", subscribe:"اشترك", subscribed:"شكراً! تم تسجيلك.",
        admin:"لوحة التحكم", made:"صُمّم بواسطة نور ميديا"
      },
      blog: { allCat:"كل المقالات", categories:{ marketing:"تسويق", branding:"هوية", seo:"SEO", video:"فيديو" } },
      work: { client:"العميل", year:"السنة", result:"النتيجة", scope:"نطاق العمل", visit:"زيارة الموقع" },
      a11y: { skip:"تخطَّ إلى المحتوى", openMenu:"فتح القائمة", closeMenu:"إغلاق القائمة" }
    },

    en: {
      dir: "ltr",
      nav: { home:"Home", testi:"Testimonials", about:"About", services:"Services", work:"Work", blog:"Journal", contact:"Contact", menu:"Menu" },
      cta: { start:"Start a project", call:"Talk to us" },
      common: {
        learnMore:"Learn more", viewAll:"View all", back:"Back", close:"Close",
        readMore:"Read more", minRead:"min read", years:"years", all:"All", filter:"Filter",
        language:"Language", theme:"Theme", loading:"Loading…", page:"Page",
        prev:"Previous", next:"Next", of:"of", save:"Save", cancel:"Cancel",
        delete:"Delete", edit:"Edit", add:"Add", search:"Search",
        noResults:"No results found", confirmDelete:"Are you sure you want to delete this?",
        yes:"Yes", no:"No", active:"Active", inactive:"Inactive", featured:"Featured",
        total:"Total", show:"Showing", rows:"rows"
      },
      cat: { brand:"Branding", social:"Social", video:"Video", ads:"Paid Ads", web:"Web", print:"Print & Outdoor", photo:"Photography" },
      sections: {
        servicesT:"What we do", servicesS:"A full-service advertising agency under one roof",
        workT:"Selected work", workS:"Work measured by results, not by looks",
        clientsT:"Brands that trust us", clientsS:"180+ clients across 6 markets",
        testiT:"What our clients say", testiS:"Real words from real partners",
        processT:"How we work", processS:"A clear four-stage process",
        blogT:"Latest from the journal", blogS:"Thinking on advertising and brand",
        teamT:"The team", teamS:"The people who will work with you",
        contactT:"Let's talk", contactS:"Tell us about your plan — we reply within 24 hours",
        ctaT:"Let's start your next project", ctaS:"A free 30-minute consultation, no strings attached",
        aboutT:"Who we are",
        valuesT:"What we stand for",
        infoT:"Contact details"
      },
      values: [
        { t:"We believe in numbers", d:"Every design decision is tied to a measurable outcome." },
        { t:"We speak three languages", d:"Arabic, English and Uyghur — with equal quality." },
        { t:"We speak plainly", d:"Price, timeline and outcome agreed up front." },
        { t:"We stay long-term", d:"78% of our clients have been with us for over two years." }
      ],
      story: [
        "NUR Media started in 2014 as a three-person studio with one simple belief: local brands deserve world-class advertising.",
        "Today our 24-person team works in three languages — Arabic, English and Uyghur — covering everything from brand identity to performance media, all under one roof."
      ],
      contact: {
        name:"Your name", email:"Email address", phone:"Phone number",
        subject:"Subject", service:"Which service do you need?", budget:"Estimated budget",
        message:"Your message", send:"Send message", sending:"Sending…",
        success:"Message received! We'll get back to you within 24 hours.",
        errName:"Please enter your name", errEmail:"Please enter a valid email",
        errMsg:"Please write a message (10 characters minimum)", errGeneric:"Something went wrong, please try again",
        selectPlaceholder:"Select…", budgetRange:"$1K – $5K · $5K – $15K · $15K+",
        address:"Address", phoneL:"Phone", emailL:"Email", hoursL:"Opening hours"
      },
      footer: {
        about:"A trilingual advertising and brand agency. We turn ideas into measurable results.",
        quick:"Quick links", servL:"Services", contactL:"Contact", follow:"Follow us",
        rights:"All rights reserved.",
        newsletter:"Monthly letter", newsSub:"Advertising insights — once a month, never spam.",
        newsPh:"Your email", subscribe:"Subscribe", subscribed:"Thank you! You're subscribed.",
        admin:"Admin dashboard", made:"Designed by NUR Media"
      },
      blog: { allCat:"All posts", categories:{ marketing:"Marketing", branding:"Branding", seo:"SEO", video:"Video" } },
      work: { client:"Client", year:"Year", result:"Result", scope:"Scope", visit:"Visit site" },
      a11y: { skip:"Skip to content", openMenu:"Open menu", closeMenu:"Close menu" }
    }
  };

  /* ---- Admin strings ---- */
  var ADMIN = {
    ug: {
      dir: "rtl",
      brand: "باشقۇرۇش سۇپىسى",
      login: {
        title: "باشقۇرۇش سۇپىسىغا كىرىش", sub: "نۇر مېدىيا مەزمۇن ۋە سىستېما باشقۇرۇش",
        email: "ئېلخەت ئادرېسى", pass: "پارول", submit: "سىستېمىغا كىرىش",
        hint: "سىناق ئۈچۈن: admin@nurmedia.co / nur2026",
        err: "ئېلخەت ياكى پارول خاتا كىرگۈزۈلدى", locked: "بەك كۆپ سىنىدىڭىز، 15 سېكۇنتتىن كېيىن قايتا سىناڭ",
        demo: "بۇ دېمو نەشرى — مەزمۇن browser نىڭ localStorage دا ساقلىنىدۇ",
        quickFill: "سىناق كىرىش",
        security: "SSL ئارقىلىق قوغدالغان بىخەتەر سىستېما",
        backHome: "باش بەتكە قايتىش"
      },
      nav: {
        overview: "ئومۇمىي كۆرۈنۈش", content: "مەزمۇن", services: "خىزمەتلەر",
        works: "ئەسەرلەر", clients: "خېرىدارلار", testi: "تەكلىپنامىلەر",
        posts: "ماقالىلەر", leads: "ئالاقە ئۇچۇرلىرى", team: "گۇرۇپپا",
        system: "سىستېما", settings: "تەڭشەكلەر", translate: "تەرجىمە",
        data: "سانلىق مەلۇمات", logout: "چىقىش", site: "بېكەتنى كۆرۈش"
      },
      stats: {
        title: "ئومۇمىي كۆرۈنۈش", welcome: "خۇش كەلدىڭىز",
        leads: "ئالاقە ئۇچۇرلىرى", newLeads: "يېڭى ئۇچۇرلار",
        works: "ئەسەرلەر", services: "خىزمەتلەر", posts: "ماقالىلەر",
        visits: "بۇ يىللىق كىرگەنلەر", langSplit: "تىل بويىچە تارقىلىش",
        recent: "ئەڭ يېڭى ئالاقە ئۇچۇرلىرى", quick: "تېز ھەرىكەتلەر",
        addWork: "يېڭى ئەسەر قوشۇش", addPost: "يېڭى ماqale قوشۇش", addService: "يېڭى خىزمەت",
        status: "ھالەت", contentHealth: "مەزمۇن تولۇقلۇقى",
        fillHint: "ھەر بىر مەزمۇن ئۈچ تىلدا تولدۇرۇلغان بولۇشى كېرەك"
      },
      tbl: { name: "نام", cat: "تۈر", status: "ھالەت", date: "چېسلا", order: "تەرتىپ", actions: "ھەرىكەت", client: "خېرىدار", from: "كىمدىن", subject: "تېما" },
      act: { add: "قوشۇش", edit: "تەھرىرلەش", del: "ئۆچۈرۈش", save: "ساقلاش", cancel: "بىكار قىلىش", saved: "ساقلاندى", deleted: "ئۆچۈرۈلدى", export: "چىقىرىش", import: "كىرگۈزۈش", reset: "قايتۇرۇش", resetConfirm: "بارلىق ئۆزگەرتىشلەر ئۆچۈرۈلۈپ ئەسلى مەزمۇن قايتىدۇ. داۋاملاشتۇرامسىز؟" },
      fld: { ug: "ئۇيغۇرچە", ar: "ئەرەپچە", en: "ئېنگىلىزچە", title: "ماۋزۇ", short: "قىسقا چۈشەندۈرۈش", desc: "تەپسىلىي چۈشەندۈرۈش", img: "رەسىم يولى", icon: "ئىكونكا", year: "يىلى", rating: "باھا", role: "ۋەزىپىسى", email: "ئېلخەت", phone: "تېلېفون", address: "ئادرېس", hours: "خىزمەت ۋاقتى", social: "ئىجتىمائىي تور", excerpt: "قىسقىچە", read: "ئوقۇش ۋاقتى", cat: "تۈر", active: "ئاكتىپ", featured: "تاللانما", result: "نەتىجە", name: "نام", sector: "ساھە", status: "ھالەت", new: "يېڭى", readS: "ئوقۇلغان", answered: "جاۋاب بېرىلگەن", message: "ئۇچۇر", reply: "جاۋاب يېزىش", initials: "باش ھەرپ", color: "رەڭ" },
      settings: { siteName: "بېكەت نامى", tagline: "شۇئار", contact: "ئالاقە ئۇچۇرلىرى", socialL: "ئىجتىمائىي تور ئۇلىنىشلىرى", defaultLang: "سۈكۈتتىكى تىل", saved: "تەڭشەكلەر ساقلاندى", hero: "باش بەت مەزمۇنى", heroTitle: "چوڭ ماۋزۇ", heroSub: "چۈشەندۈرۈش" },
      security: {
        title: "بىخەتەرلىك ۋە مەخپى نومۇر", sub: "ئارقا بەتكە كىرىش ئېلخىتى ۋە پارولىنى ئۆزگەرتىش",
        adminEmail: "باشقۇرغۇچى ئېلخىتى", curPass: "ھازىرقى مەخپى نومۇر",
        newPass: "يېڭى مەخپى نومۇر", confirmPass: "يېڭى مەخپى نومۇرنى جەزملەش",
        changeBtn: "مەخپى نومۇرنى ئۆزگەرتىش", resetBtn: "ئەسلىگە (nur2026) قايتۇرۇش",
        curPassErr: "ھازىرقى مەخپى نومۇر خاتا", matchErr: "يېڭى مەخپى نومۇرلار بىر-بىرىگە ماس كەلمىدى",
        lenErr: "مەخپى نومۇر كەم دېگەندە 4 ھەرپ ياكى سان بولۇشى كېرەك", emailErr: "ئېلخەت ئادرېسىنى توغرا كىرگۈزۈڭ",
        success: "مەخپى نومۇر مۇۋەپپەقىيەتلىك ئۆزگەرتىلدى ✓", resetSuccess: "مەخپى نومۇر ئەسلى ھالىتىگە قايتۇرۇلدى (nur2026) ✓"
      },
      data: { title: "سانلىق مەلۇمات باشقۇرۇش", desc: "بارلىق مەزمۇن browser نىڭ localStorage دا ساقلىنىدۇ. مۇھىم ئۆزگەرتىشلەردىن كېيىن JSON ھۆججەتنى چىقىرىپ ساقلاڭ.", exportD: "ھازىرقى مەزمۇننى JSON ھۆججەت قىلىپ چىقىرىش", importD: "JSON ھۆججەتتىن مەزمۇن كىرگۈزۈش", resetD: "ئەسلى مەزمۇنغا قايتۇرۇش", imported: "مەزمۇن كىرگۈزۈلدى", importErr: "ھۆججەتنى ئوقۇغىلى بولمىدى", size: "چوڭلۇقى", updated: "ئاخىرقى يېڭىلىنىش", storageWarn: "browser ساقلاش ئىقتىدارى چەكلەنگەن — ئۆزگەرتىشلەر بۇ سەھىپە يېپىلغاندا يوقىلىشى مۇمكىن. JSON چىقىرىش ئارقىلىق ساقلاڭ." },
      translate: { title: "ئۇيۇل تەرجىمىسى", desc: "بېكەتتىكى تۇراقلىق تېكىستلەرنى (تىزىملىك، كۇنۇپكا، فورما) بۇ يەردە تەھرىرلەڭ.", group: "بۆلەك", key: "ئۇچۇر", saved: "تەرجىمە ساقلاندى" },
      toast: { saved: "ساقلاندى ✓", deleted: "ئۆچۈرۈلدى", loginOk: "كىردىڭىز", loginErr: "كىرگىلى بولمىدى" }
    },
    ar: {
      dir: "rtl",
      brand: "لوحة التحكم",
      login: {
        title: "الدخول إلى لوحة التحكم", sub: "إدارة المحتوى والنظام لوكالة نور ميديا",
        email: "البريد الإلكتروني", pass: "كلمة المرور", submit: "تسجيل الدخول",
        hint: "للتجربة: admin@nurmedia.co / nur2026",
        err: "البريد أو كلمة المرور غير صحيحة", locked: "محاولات كثيرة، حاول بعد 15 ثانية",
        demo: "نسخة تجريبية — يُحفظ المحتوى في localStorage",
        quickFill: "تعبئة بيانات التجربة",
        security: "نظام مشفر ومحمي لاتصال لوحة التحكم",
        backHome: "العودة للموقع الرئيسي"
      },
      nav: {
        overview: "نظرة عامة", content: "المحتوى", services: "الخدمات",
        works: "الأعمال", clients: "العملاء", testi: "آراء العملاء",
        posts: "المقالات", leads: "الرسائل", team: "الفريق",
        system: "النظام", settings: "الإعدادات", translate: "الترجمة",
        data: "البيانات", logout: "خروج", site: "عرض الموقع"
      },
      stats: {
        title: "نظرة عامة", welcome: "مرحباً",
        leads: "الرسائل", newLeads: "رسائل جديدة",
        works: "الأعمال", services: "الخدمات", posts: "المقالات",
        visits: "زيارات هذا العام", langSplit: "التوزيع حسب اللغة",
        recent: "أحدث الرسائل", quick: "إجراءات سريعة",
        addWork: "إضافة عمل", addPost: "إضافة مقال", addService: "إضافة خدمة",
        status: "الحالة", contentHealth: "اكتمال المحتوى",
        fillHint: "يجب تعبئة كل محتوى بثلاث لغات"
      },
      tbl: { name: "الاسم", cat: "التصنيف", status: "الحالة", date: "التاريخ", order: "الترتيب", actions: "إجراءات", client: "العميل", from: "من", subject: "الموضوع" },
      act: { add: "إضافة", edit: "تعديل", del: "حذف", save: "حفظ", cancel: "إلغاء", saved: "تم الحفظ", deleted: "تم الحذف", export: "تصدير", import: "استيراد", reset: "استعادة الأصلي", resetConfirm: "سيتم حذف كل التعديلات واستعادة المحتوى الأصلي. متابعة؟" },
      fld: { ug: "الأويغورية", ar: "العربية", en: "الإنجليزية", title: "العنوان", short: "وصف قصير", desc: "الوصف الكامل", img: "مسار الصورة", icon: "الأيقونة", year: "السنة", rating: "التقييم", role: "الدور", email: "البريد", phone: "الهاتف", address: "العنوان", hours: "ساعات العمل", social: "وسائل التواصل", excerpt: "مقتطف", read: "زمن القراءة", cat: "التصنيف", active: "نشط", featured: "مميز", result: "النتيجة", name: "الاسم", sector: "المجال", status: "الحالة", new: "جديد", readS: "مقروء", answered: "تم الرد", message: "الرسالة", reply: "الرد", initials: "الأحرف الأولى", color: "اللون" },
      settings: { siteName: "اسم الموقع", tagline: "الشعار", contact: "معلومات التواصل", socialL: "روابط التواصل", defaultLang: "اللغة الافتراضية", saved: "تم حفظ الإعدادات", hero: "محتوى الصفحة الرئيسية", heroTitle: "العنوان الرئيسي", heroSub: "الوصف" },
      security: {
        title: "الأمان وكلمة المرور", sub: "تغيير بريد وكلمة مرور لوحة التحكم",
        adminEmail: "بريد المدير", curPass: "كلمة المرور الحالية",
        newPass: "كلمة المرور الجديدة", confirmPass: "تأكيد كلمة المرور الجديدة",
        changeBtn: "تحديث كلمة المرور", resetBtn: "استعادة الافتراضية (nur2026)",
        curPassErr: "كلمة المرور الحالية غير صحيحة", matchErr: "كلمتا المرور غير متطابقتين",
        lenErr: "يجب ألا تقل كلمة المرور عن 4 خانات", emailErr: "يرجى إدخال بريد إلكتروني صحيح",
        success: "تم تغيير كلمة المرور بنجاح ✓", resetSuccess: "تمت استعادة كلمة المرور الافتراضية ✓"
      },
      data: { title: "إدارة البيانات", desc: "يُحفظ كل المحتوى في localStorage. صدّر ملف JSON بعد أي تعديل مهم.", exportD: "تصدير المحتوى الحالي كملف JSON", importD: "استيراد المحتوى من ملف JSON", resetD: "استعادة المحتوى الأصلي", imported: "تم الاستيراد", importErr: "تعذّر قراءة الملف", size: "الحجم", updated: "آخر تحديث", storageWarn: "تخزين المتصفح محدود — قد تُفقد التعديلات عند إغلاق الصفحة. صدّر JSON للنسخ الاحتياطي." },
      translate: { title: "ترجمة الواجهة", desc: "حرّر النصوص الثابتة (القوائم والأزرار والنماذج) هنا.", group: "المجموعة", key: "المفتاح", saved: "تم حفظ الترجمة" },
      toast: { saved: "تم الحفظ ✓", deleted: "تم الحذف", loginOk: "مرحباً بك", loginErr: "فشل الدخول" }
    },
    en: {
      dir: "ltr",
      brand: "Admin dashboard",
      login: {
        title: "Sign in to Dashboard", sub: "NUR Media content & system administration",
        email: "Email address", pass: "Password", submit: "Sign In",
        hint: "Demo credentials: admin@nurmedia.co / nur2026",
        err: "Incorrect email or password", locked: "Too many attempts, try again in 15 seconds",
        demo: "Demo build — content is stored in your browser's localStorage",
        quickFill: "Quick Demo Fill",
        security: "Encrypted & Secure Admin Gateway",
        backHome: "Back to website"
      },
      nav: {
        overview: "Overview", content: "Content", services: "Services",
        works: "Work", clients: "Clients", testi: "Testimonials",
        posts: "Posts", leads: "Messages", team: "Team",
        system: "System", settings: "Settings", translate: "Translations",
        data: "Data", logout: "Sign out", site: "View site"
      },
      stats: {
        title: "Overview", welcome: "Welcome back",
        leads: "Messages", newLeads: "New messages",
        works: "Work items", services: "Services", posts: "Posts",
        visits: "Visits this year", langSplit: "Traffic by language",
        recent: "Latest messages", quick: "Quick actions",
        addWork: "Add work item", addPost: "Add post", addService: "Add service",
        status: "Status", contentHealth: "Content completeness",
        fillHint: "Every record should be filled in all three languages"
      },
      tbl: { name: "Name", cat: "Category", status: "Status", date: "Date", order: "Order", actions: "Actions", client: "Client", from: "From", subject: "Subject" },
      act: { add: "Add", edit: "Edit", del: "Delete", save: "Save", cancel: "Cancel", saved: "Saved", deleted: "Deleted", export: "Export", import: "Import", reset: "Reset to seed", resetConfirm: "This deletes every change and restores the original content. Continue?" },
      fld: { ug: "Uyghur", ar: "Arabic", en: "English", title: "Title", short: "Short description", desc: "Full description", img: "Image path", icon: "Icon", year: "Year", rating: "Rating", role: "Role", email: "Email", phone: "Phone", address: "Address", hours: "Opening hours", social: "Social links", excerpt: "Excerpt", read: "Read time", cat: "Category", active: "Active", featured: "Featured", result: "Result", name: "Name", sector: "Sector", status: "Status", new: "New", readS: "Read", answered: "Answered", message: "Message", reply: "Reply", initials: "Initials", color: "Colour" },
      settings: { siteName: "Site name", tagline: "Tagline", contact: "Contact details", socialL: "Social links", defaultLang: "Default language", saved: "Settings saved", hero: "Homepage content", heroTitle: "Hero title", heroSub: "Hero description" },
      security: {
        title: "Security & Password", sub: "Change admin login credentials",
        adminEmail: "Admin email", curPass: "Current password",
        newPass: "New password", confirmPass: "Confirm new password",
        changeBtn: "Update Password", resetBtn: "Reset to default (nur2026)",
        curPassErr: "Current password is incorrect", matchErr: "New passwords do not match",
        lenErr: "Password must be at least 4 characters", emailErr: "Please enter a valid email address",
        success: "Password updated successfully ✓", resetSuccess: "Password reset to default (nur2026) ✓"
      },
      data: { title: "Data management", desc: "All content lives in your browser's localStorage. Export a JSON backup after important edits.", exportD: "Export the current content as a JSON file", importD: "Import content from a JSON file", resetD: "Restore the original seed content", imported: "Content imported", importErr: "Could not read that file", size: "Size", updated: "Last updated", storageWarn: "Browser storage is restricted here — changes may be lost when the tab closes. Export JSON to keep a backup." },
      translate: { title: "Interface strings", desc: "Edit the fixed site strings (navigation, buttons, forms) right here.", group: "Group", key: "Key", saved: "Translations saved" },
      toast: { saved: "Saved ✓", deleted: "Deleted", loginOk: "Signed in", loginErr: "Sign-in failed" }
    }
  };

  window.I18N = I18N;
  window.ADMIN_I18N = ADMIN;
})();
