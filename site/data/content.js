/* ============================================================
   SEED CONTENT — NUR Media
   Trilingual content object: { ug, ar, en }
   Dashboard reads/edits a copy of this; changes persist locally.
   ============================================================ */
(function () {
  "use strict";

  var SEED = {
    meta: {
      version: 3,
      updatedAt: "2026-08-26T09:00:00Z"
    },

    settings: {
      name:      { ug: "نۇر مېدىيا",            ar: "نور ميديا",          en: "NUR Media" },
      tagline:   { ug: "ماركىڭىزنى كۆزگە كۆرۈنەرلىك قىلىمىز",
                   ar: "نجعل علامتك التجارية لا تُنسى",
                   en: "We make your brand impossible to ignore" },
      email: "NurMedia@gmail.com",
      phone: "+905365478123",
      phone2: "+90 536 547 81 23",
      address: { ug: "ئىستانبۇل رەيھانلى 5- نۇمۇرلۇق كوچا",
                 ar: "إسطنبول، ريحانلي، الشارع رقم 5",
                 en: "Reyhanlı 5th Street, Istanbul" },
      hours:   { ug: "دۈشەنبە – جۈمە، 09:00 – 18:00",
                 ar: "الاثنين – الجمعة، 09:00 – 18:00",
                 en: "Monday – Friday, 09:00 – 18:00" },
      social: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        linkedin: "https://linkedin.com",
        youtube: "https://youtube.com"
      },
      defaultLang: "ug"
    },

    hero: {
      eyebrow: { ug: "ئىلانچىلىق ۋە ماركا ئاگېنتلىقى",
                 ar: "وكالة إعلانية وتصميم علامات تجارية",
                 en: "Advertising & Brand Agency" },
      title:   { ug: "سىزنىڭ ماركىڭىز ئۈچۈن ئاۋاز بولىمىز",
                 ar: "نحن صوت علامتك التجارية",
                 en: "We give your brand a voice" },
      titleAccent: { ug: "ھەممە يەردە ئاڭلىنىدىغان",
                     ar: "يُسمع في كل مكان",
                     en: "that can't be ignored" },
      sub:     { ug: "ماركا كىملىكىدىن تارتىپ رەقەملىك ئىلانغىچە — بىز پىكىرنى كۆرۈنەرلىك نەتىجىگە ئايلاندۇرىمىز. 180 دىن ئارتۇق ماركا بىز بىلەن ئۆسۈپ چىقتى.",
                 ar: "من الهوية البصرية إلى الإعلانات الرقمية — نحوّل الأفكار إلى نتائج ملموسة. أكثر من 180 علامة تجارية نمت معنا.",
                 en: "From brand identity to performance advertising — we turn ideas into measurable results. Over 180 brands have grown with us." },
      ctaPrimary:   { ug: "ھەقسىز مەسلىھەت ئېلىش", ar: "احجز استشارة مجانية", en: "Get a free consultation" },
      ctaSecondary: { ug: "ئەسەرلىرىمىزنى كۆرۈش",  ar: "شاهد أعمالنا",        en: "See our work" }
    },

    stats: [
      { value: 180, suffix: "+", label: { ug: "خېرىدار ماركا",        ar: "علامة تجارية",    en: "Brands served" } },
      { value: 640, suffix: "+", label: { ug: "تاماملانغان پىروجېكت", ar: "مشروع منجز",      en: "Projects delivered" } },
      { value: 12,  suffix: "",  label: { ug: "يىللىق تەجرىبە",       ar: "سنة من الخبرة",   en: "Years of experience" } },
      { value: 6,   suffix: "",  label: { ug: "دۆلەتتىكى بازار",      ar: "أسواق حول العالم", en: "Markets worldwide" } }
    ],

    services: [
      {
        id: "s1", order: 1, active: true, icon: "spark",
        name: { ug: "ماركا كىملىكى", ar: "الهوية البصرية", en: "Brand Identity" },
        short:{ ug: "لوگوتىپ، رەڭ ۋە ئۇسلۇب قوللانمىسى", ar: "الشعار والألوان ودليل الاستخدام", en: "Logo, colour system and brand guidelines" },
        desc: { ug: "ماركىڭىزنىڭ خاراكتېرىنى تېپىپ، ئۇنى كۆرۈنەرلىك تىلغا ئايلاندۇرىمىز. لوگوتىپ، رەڭ سىستېمىسى، تىپوگرافىيە ۋە تولۇق ئۇسلۇب قوللانمىسى بىلەن ماركىڭىز ھەر يەردە بىردەك كۆرۈنىدۇ.",
                ar: "نكتشف شخصية علامتك ونحوّلها إلى لغة بصرية متكاملة: الشعار، نظام الألوان، الخطوط، ودليل استخدام شامل يضمن حضوراً موحّداً في كل نقطة تواصل.",
                en: "We find the character of your brand and turn it into a visual language — logo, colour system, typography and a complete guideline so your brand looks consistent everywhere." },
        items: [
          { ug: "ماركا ئىستراتېگىيىسى", ar: "استراتيجية العلامة", en: "Brand strategy" },
          { ug: "لوگوتىپ لايىھىسى", ar: "تصميم الشعار", en: "Logo design" },
          { ug: "رەڭ ۋە تىپوگرافىيە سىستېمىسى", ar: "نظام الألوان والخطوط", en: "Colour & type system" },
          { ug: "ئۇسلۇب قوللانمىسى (Brand Book)", ar: "دليل الهوية", en: "Brand book" }
        ]
      },
      {
        id: "s2", order: 2, active: true, icon: "pen",
        name: { ug: "گرافىك لايىھە", ar: "التصميم الجرافيكي", en: "Graphic Design" },
        short:{ ug: "ئىلان، قاچىلاش ۋە بايقاش لايىھىلىرى", ar: "تصاميم الحملات والمطبوعات", en: "Campaign, packaging and print design" },
        desc: { ug: "ئىلان ماتېرىياللىرى، قاچىلاش لايىھىسى، بايقاش-تۇتاش لايىھىلەر ۋە تونۇشتۇرۇش ھۆججەتلىرى. ھەر بىر لايىھە سېتىش مەقسىتىگە ماسلاشتۇرۇلغان بولىدۇ.",
                ar: "مواد الحملات، تصاميم التغليف، المطبوعات، وملفات العروض — كل تصميم يُبنى لخدمة هدف بيعي واضح.",
                en: "Campaign assets, packaging, collaterals and pitch decks — every piece designed around a clear commercial objective." },
        items: [
          { ug: "ئىلان ماتېرىياللىرى", ar: "مواد الحملات", en: "Campaign assets" },
          { ug: "قاچىلاش لايىھىسى", ar: "تصميم التغليف", en: "Packaging design" },
          { ug: "تونۇشتۇرۇش ھۆججىتى", ar: "ملفات العروض", en: "Pitch decks" },
          { ug: "بېسىشقا تەييارلاش", ar: "التجهيز للطباعة", en: "Print production" }
        ]
      },
      {
        id: "s3", order: 3, active: true, icon: "share",
        name: { ug: "ئىجتىمائىي تور باشقۇرۇش", ar: "إدارة وسائل التواصل", en: "Social Media Management" },
        short:{ ug: "مەزمۇن پىلانى، ھېسابات يۈرگۈزۈش", ar: "خطة محتوى وإدارة الحسابات", en: "Content planning and account management" },
        desc: { ug: "ئايلىق مەزمۇن پىلانى، لايىھە ۋە كوپىرايت، ئېلان يوللاش، ئىنكاسلارغا جاۋاب بېرىش ۋە ئايلىق ھېسابات. ئۈچ تىلدا مەزمۇن ئىشلەپ بېرىمىز.",
                ar: "خطة محتوى شهرية، تصميم وكتابة إعلانية، النشر، إدارة التفاعل، وتقارير شهرية — بثلاث لغات.",
                en: "Monthly content plans, design and copy, publishing, community management and monthly reporting — delivered in three languages." },
        items: [
          { ug: "مەزمۇن پىلانى", ar: "خطة المحتوى", en: "Content calendar" },
          { ug: "لايىھە ۋە كوپىرايت", ar: "التصميم والكتابة", en: "Design & copywriting" },
          { ug: "ئىنكاسلارنى باشقۇرۇش", ar: "إدارة التفاعل", en: "Community management" },
          { ug: "ئايلىق ھېسابات", ar: "التقارير الشهرية", en: "Monthly reports" }
        ]
      },
      {
        id: "s4", order: 4, active: true, icon: "chart",
        name: { ug: "پۇل تۆلەيدىغان ئىلانلار", ar: "الإعلانات المدفوعة", en: "Paid Advertising" },
        short:{ ug: "Google ۋە Meta ئىلانلىرىنى باشقۇرۇش", ar: "إدارة حملات Google وMeta", en: "Google & Meta campaign management" },
        desc: { ug: "Google، Meta، TikTok ۋە LinkedIn ئىلانلىرىنى پىلانلاش، سىناق قىلىش ۋە ئەلالاشتۇرۇش. ھەر بىر خىراجەتنىڭ قايتۇرما نىسبىتى (ROAS) نى ھېسابلاپ تۇرىمىز.",
                ar: "تخطيط واختبار وتحسين حملات Google وMeta وTikTok وLinkedIn، مع متابعة عائد الإنفاق الإعلاني (ROAS) لكل درهم.",
                en: "Planning, testing and optimising campaigns on Google, Meta, TikTok and LinkedIn — tracking ROAS on every unit of spend." },
        items: [
          { ug: "ھېسابات قۇرۇلمىسى ۋە ئىز قوغلاش", ar: "الهيكل والتتبع", en: "Account setup & tracking" },
          { ug: "ئىلان سىنىقى (A/B)", ar: "اختبار الإعلانات", en: "A/B creative testing" },
          { ug: "ھەپتىلىك ئەلالاشتۇرۇش", ar: "التحسين الأسبوعي", en: "Weekly optimisation" },
          { ug: "ROAS ھېساباتى", ar: "تقارير العائد", en: "ROAS reporting" }
        ]
      },
      {
        id: "s5", order: 5, active: true, icon: "video",
        name: { ug: "ۋىدېئو ئىشلەپچىقىرىش", ar: "إنتاج الفيديو", en: "Video Production" },
        short:{ ug: "ئىلان ۋىدېئوسى ۋە ماركىلىق مەزمۇن", ar: "الإعلانات ومحتوى العلامة", en: "Commercials and branded content" },
        desc: { ug: "ئىجادىي سىنارىيە، سۈرەتكە ئېلىش، مونتاج ۋە ئاۋاز خىزمىتى. 15 سېكۇنتلۇق Reels تىن تارتىپ تولۇق تېلېۋىزىيە ئىلانىغىچە.",
                ar: "من السيناريو الإبداعي إلى التصوير والمونتاج والمكساج — من مقاطع 15 ثانية إلى الإعلانات التلفزيونية الكاملة.",
                en: "Creative scripting, shooting, edit and sound — from 15-second reels to full broadcast commercials." },
        items: [
          { ug: "سىنارىيە ۋە storyboard", ar: "السيناريو ولوحات القصة", en: "Script & storyboard" },
          { ug: "سۈرەتكە ئېلىش", ar: "التصوير", en: "Production" },
          { ug: "مونتاج ۋە رەڭ تەڭشەش", ar: "المونتاج وتصحيح الألوان", en: "Edit & colour grade" },
          { ug: "ھەر خىل فورماتتا تاپشۇرۇش", ar: "تسليم بكل المقاسات", en: "All formats delivered" }
        ]
      },
      {
        id: "s6", order: 6, active: true, icon: "code",
        name: { ug: "تور بېكەت ياساش", ar: "تطوير المواقع", en: "Web Development" },
        desc: { ug: "تېز، بىخەتەر ۋە كۆپ تىللىق تور بېكەتلەر. ئوڭ-سول يۆنىلىشنى (RTL/LTR) تولۇق قوللايدۇ ۋە ئىزدەش موتورلىرىغا ماسلاشتۇرۇلغان بولىدۇ.",
                ar: "مواقع سريعة وآمنة ومتعددة اللغات، تدعم الاتجاه من اليمين لليسار ومهيأة لمحركات البحث.",
                en: "Fast, secure, multilingual websites with full RTL/LTR support and search-engine readiness." },
        short:{ ug: "كۆپ تىللىق، تېز تور بېكەتلەر", ar: "مواقع سريعة متعددة اللغات", en: "Fast multilingual websites" },
        items: [
          { ug: "UX/UI لايىھىسى", ar: "تصميم UX/UI", en: "UX/UI design" },
          { ug: "كۆپ تىللىق قۇرۇلما", ar: "بنية متعددة اللغات", en: "Multilingual architecture" },
          { ug: "ئىزدەش موتورى ئەلالاشتۇرۇش", ar: "تهيئة لمحركات البحث", en: "SEO" },
          { ug: "ئانالىز ۋە ئىز قوغلاش", ar: "التحليلات والتتبع", en: "Analytics" }
        ]
      },
      {
        id: "s7", order: 7, active: true, icon: "billboard",
        name: { ug: "سىرتقى ئېلان ۋە بېسىش", ar: "الإعلان الخارجي والطباعة", en: "Outdoor & Print" },
        short:{ ug: "ئېلان تاختىسى، بېسىش ۋە قاچىلاش", ar: "اللوحات والمطبوعات", en: "Billboards, signage and print" },
        desc: { ug: "ئېلان تاختىسى لايىھىسى، ھۆججەت تەييارلاش ۋە ئورۇن تاللاش بويىچە مەسلىھەت. بېسىش سۈپىتىنى ئۆزىمىز كونترول قىلىمىز.",
                ar: "تصميم اللوحات الإعلانية، تجهيز الملفات، ونصائح اختيار المواقع — مع إشراف مباشر على جودة الطباعة.",
                en: "Billboard design, file preparation and location advice — with hands-on print quality control." },
        items: [
          { ug: "ئېلان تاختىسى لايىھىسى", ar: "تصميم اللوحات", en: "Billboard design" },
          { ug: "دۇكان بەلگىسى (Signage)", ar: "لافتات المتاجر", en: "Retail signage" },
          { ug: "بېسىش نازارىتى", ar: "الإشراف على الطباعة", en: "Print supervision" },
          { ug: "ئورۇن تاللاش مەسلىھىتى", ar: "استشارات المواقع", en: "Location planning" }
        ]
      },
      {
        id: "s8", order: 8, active: true, icon: "camera",
        name: { ug: "فوتوگرافىيە", ar: "التصوير الفوتوغرافي", en: "Photography" },
        short:{ ug: "مەھسۇلات ۋە كورپوراتىپ رەسىملەر", ar: "تصوير المنتجات والشركات", en: "Product and corporate shoots" },
        desc: { ug: "مەھسۇلات رەسىملىرى، خىزمەت مۇھىتى ۋە خىزمەتچىلەر رەسىملىرى. بىر كۈنلۈك سۈرەتكە ئېلىشتا 40 تىن ئارتۇق ئىشلىتىشكە بولىدىغان رەسىم.",
                ar: "تصوير المنتجات والمكاتب وفرق العمل — أكثر من 40 صورة قابلة للاستخدام في جلسة تصوير واحدة.",
                en: "Product, workplace and team photography — 40+ usable assets from a single shoot day." },
        items: [
          { ug: "مەھسۇلات رەسىملىرى", ar: "تصوير المنتجات", en: "Product shots" },
          { ug: "كورپوراتىپ رەسىملەر", ar: "تصوير الشركات", en: "Corporate shoots" },
          { ug: "رەڭ تەڭشەش", ar: "معالجة الألوان", en: "Retouching" },
          { ug: "رەسىم ئامبىرى", ar: "مكتبة الصور", en: "Asset library" }
        ]
      }
    ],

    works: [
      { id:"w1", order:1, active:true, cat:"brand", year:2026, img:"img/work-brand.jpg",
        client:"Medina Cosmetics", featured:true,
        title:{ ug:"Medina — تولۇق ماركا قايتا قۇرۇش", ar:"Medina — إعادة بناء الهوية", en:"Medina — Full rebrand" },
        result:{ ug:"تۇنجى ئۈچ ئايدا سېتىش 42% ئاشتى", ar:"ارتفاع المبيعات 42% في الربع الأول", en:"+42% sales in the first quarter" } },
      { id:"w2", order:2, active:true, cat:"social", year:2026, img:"img/work-social.jpg",
        client:"Kashgar Coffee", featured:true,
        title:{ ug:"Kashgar Coffee — ئىجتىمائىي تور ھەمكارلىقى", ar:"Kashgar Coffee — حملة السوشيال", en:"Kashgar Coffee — social campaign" },
        result:{ ug:"ئىز بېسىشچىلەر 3 ھەسسە ئاشتى", ar:"تضاعف المتابعون 3 مرات", en:"3× follower growth in 6 months" } },
      { id:"w3", order:3, active:true, cat:"video", year:2025, img:"img/work-video.jpg",
        client:"Tengri Travel", featured:true,
        title:{ ug:"Tengri Travel — تېلېۋىزىيە ئىلانى", ar:"Tengri Travel — إعلان تلفزيوني", en:"Tengri Travel — TV commercial" },
        result:{ ug:"1.2 مىليون قېتىم كۆرۈلدى", ar:"1.2 مليون مشاهدة", en:"1.2M organic views" } },
      { id:"w4", order:4, active:true, cat:"ads", year:2025, img:"img/work-ads.jpg",
        client:"Alp Retail", featured:true,
        title:{ ug:"Alp Retail — رەقەملىك ئىلان باشقۇرۇش", ar:"Alp Retail — إدارة الإعلانات", en:"Alp Retail — performance ads" },
        result:{ ug:"ROAS 5.8 گە يەتتى", ar:"عائد الإنفاق 5.8", en:"ROAS scaled to 5.8×" } },
      { id:"w5", order:5, active:true, cat:"web", year:2025, img:"img/work-web.jpg",
        client:"Yulduz Bank", featured:false,
        title:{ ug:"Yulduz Bank — كۆپ تىللىق تور بېكەت", ar:"Yulduz Bank — موقع متعدد اللغات", en:"Yulduz Bank — trilingual website" },
        result:{ ug:"يۈكلىنىش ۋاقتى 0.9 سېكۇنت", ar:"زمن تحميل 0.9 ثانية", en:"0.9s load time, 98 Lighthouse" } },
      { id:"w6", order:6, active:true, cat:"print", year:2024, img:"img/work-print.jpg",
        client:"Salam Food", featured:false,
        title:{ ug:"Salam Food — سىرتقى ئېلان ھەمكارلىقى", ar:"Salam Food — حملة خارجية", en:"Salam Food — outdoor campaign" },
        result:{ ug:"شەھەردە 24 ئورۇندا ئورۇنلاشتۇرۇلدى", ar:"24 موقعاً في المدينة", en:"24 sites across the city" } },
      { id:"w7", order:7, active:true, cat:"photo", year:2024, img:"img/work-photo.jpg",
        client:"Luma Skincare", featured:false,
        title:{ ug:"Luma — مەھسۇلات فوتوگرافىيىسى", ar:"Luma — تصوير المنتجات", en:"Luma — product photography" },
        result:{ ug:"بىر كۈندە 60 رەسىم", ar:"60 صورة في يوم واحد", en:"60 assets in one shoot day" } }
    ],

    clients: [
      { id:"c1", order:1, name:"Medina Cosmetics", sector:{ ug:"گۈزەللىك", ar:"التجميل", en:"Beauty" }, color:"#7C3AED" },
      { id:"c2", order:2, name:"Kashgar Coffee",   sector:{ ug:"ئىچىملىك", ar:"المشروبات", en:"Beverage" }, color:"#4F46E5" },
      { id:"c3", order:3, name:"Tengri Travel",    sector:{ ug:"ساياھەت", ar:"السفر", en:"Travel" }, color:"#06B6D4" },
      { id:"c4", order:4, name:"Alp Retail",       sector:{ ug:"سېتىش", ar:"التجزئة", en:"Retail" }, color:"#D946EF" },
      { id:"c5", order:5, name:"Yulduz Bank",      sector:{ ug:"مالىيە", ar:"المالية", en:"Finance" }, color:"#0E1024" },
      { id:"c6", order:6, name:"Salam Food",       sector:{ ug:"يېمەكلىك", ar:"الأغذية", en:"Food" }, color:"#F59E0B" },
      { id:"c7", order:7, name:"Luma Skincare",    sector:{ ug:"گۈزەللىك", ar:"العناية", en:"Skincare" }, color:"#10B981" },
      { id:"c8", order:8, name:"Nur Logistics",    sector:{ ug:"يول ۋە توشۇش", ar:"اللوجستيات", en:"Logistics" }, color:"#3B82F6" },
      { id:"c9", order:9, name:"Oasis Tech",       sector:{ ug:"تېخنىكا", ar:"التقنية", en:"Technology" }, color:"#00E5FF" },
      { id:"c10", order:10, name:"Sultan Apparel",  sector:{ ug:"كىيىم-كېچەك", ar:"الأزياء", en:"Fashion" }, color:"#F43F5E" }
    ],

    testimonials: [
      { id:"t1", name:"ئايگۈل تۇرسۇن", nameAr:"أيجول تورسون", nameEn:"Aygul Tursun",
        role:{ ug:"Medina Cosmetics نىڭ باش دىرېكتورى", ar:"المديرة التنفيذية، Medina", en:"CEO, Medina Cosmetics" },
        rating:5, color:"#7C3AED",
        text:{ ug:"نۇر مېدىيا بىزنىڭ ماركىمىزنى پۈتۈنلەي ئۆزگەرتتى. يېڭى كىملىك چىققاندىن كېيىن سېتىشىمىز بىر پەسىلدە 42% ئاشتى. ئۇلار پەقەت لايىھىلەپلا قالماي، سانلارنىمۇ چۈشىنىدۇ.",
               ar:"غيّرت نور ميديا علامتنا بالكامل. بعد إطلاق الهوية الجديدة ارتفعت مبيعاتنا 42% في ربع واحد. لا يصمّمون فحسب، بل يفهمون الأرقام.",
               en:"NUR Media completely transformed our brand. Sales rose 42% in a single quarter after the rebrand. They don't just design — they understand the numbers." } },
      { id:"t2", name:"خالىد ئابدۇللا", nameAr:"خالد عبدالله", nameEn:"Khalid Abdullah",
        role:{ ug:"Alp Retail نىڭ بازار بۆلۈمى باشلىقى", ar:"مدير التسويق، Alp Retail", en:"Marketing Director, Alp Retail" },
        rating:5, color:"#4F46E5",
        text:{ ug:"ئىلان خىراجىتىمىزنى ئۆزگەرتمەي تۇرۇپ، قايتۇرما نىسبىتىنى 2.1 دىن 5.8 گە كۆتۈردى. ھەر ھەپتە ئېنىق ھېسابات كېلىدۇ.",
               ar:"رفعوا عائد الإنفاق من 2.1 إلى 5.8 دون زيادة الميزانية. تقرير واضح كل أسبوع.",
               en:"They lifted our ROAS from 2.1 to 5.8 without increasing budget — and we get a clear report every single week." } },
      { id:"t3", name:"Lina Haddad", nameAr:"لينا حداد", nameEn:"Lina Haddad",
        role:{ ug:"Tengri Travel نىڭ ئىجادىي دىرېكتورى", ar:"المديرة الإبداعية، Tengri Travel", en:"Creative Director, Tengri Travel" },
        rating:5, color:"#06B6D4",
        text:{ ug:"ئۇلارنىڭ ۋىدېئو گۇرۇپپىسى ھەقىقەتەن كەسپىي. بىز تەلەپ قىلغان ھېكايىنى دەل شۇنداق ئىپادىلىدى، نەتىجىسى 1.2 مىليون قېتىم كۆرۈلدى.",
               ar:"فريق الفيديو محترف جداً. جسّدوا القصة التي أردناها بالضبط، والنتيجة 1.2 مليون مشاهدة.",
               en:"Their video team is genuinely world-class. They told exactly the story we needed — 1.2 million views followed." } },
      { id:"t4", name:"مەھمۇت قاسىم", nameAr:"محمود قاسم", nameEn:"Mahmut Qasim",
        role:{ ug:"Yulduz Bank نىڭ رەقەملىك بۆلۈمى", ar:"القسم الرقمي، Yulduz Bank", en:"Digital Lead, Yulduz Bank" },
        rating:4, color:"#0E1024",
        text:{ ug:"ئۈچ تىللىق تور بېكەتنى ئۈچ ئايدا تاپشۇردى. ئۇيغۇرچە ۋە ئەرەپچە نۇسخىلىرى ئىنگلىزچىسى بىلەن تەڭ سۈپەتتە — بۇ بىز ئۈچۈن بەك مۇھىم ئىدى.",
               ar:"سلّموا موقعاً بثلاث لغات في ثلاثة أشهر، وبنفس الجودة في كل لغة — وهذا كان الأهم بالنسبة لنا.",
               en:"They shipped our trilingual site in three months, with equal quality in every language — which mattered enormously to us." } }
    ],

    posts: [
      { id:"p1", cat:"marketing", date:"2026-07-18", read:6, status:"published",
        title:{ ug:"2026-يىلدا ئىجتىمائىي تور ئىلانىدا 7 ئۆزگىرىش", ar:"7 تغييرات في إعلانات التواصل 2026", en:"7 shifts in social advertising for 2026" },
        excerpt:{ ug:"قىسقا ۋىدېئو، يەرلىك مەزمۇن ۋە سۈنئىي ئەقىل ئارقىلىق ئىشلەنگەن لايىھىلەر — بۇ يىل قايسى تېخنىكىلار ئەڭ ياخشى نەتىجە بېرىدۇ؟",
                  ar:"الفيديو القصير والمحتوى المحلي والتصاميم المولّدة بالذكاء الاصطناعي — ما الذي يعمل فعلاً هذا العام؟",
                  en:"Short video, localised creative and AI-assisted production — what is actually moving the needle this year." } },
      { id:"p2", cat:"branding", date:"2026-06-02", read:8, status:"published",
        title:{ ug:"لوگوتىپتىن كۆپرەك: ماركا كىملىكى نېمىنى ئۆز ئىچىگە ئالىدۇ", ar:"أكثر من شعار: ماذا تشمل الهوية", en:"More than a logo: what a brand identity really includes" },
        excerpt:{ ug:"لوگوتىپ پەقەت بىر قىسىم. ھەقىقىي ماركا كىملىكى ئاۋاز، رەڭ، ھەرىكەت ۋە تەجرىبىنى بىرلەشتۈرىدۇ.",
                  ar:"الشعار جزء واحد فقط. الهوية الحقيقية تجمع الصوت واللون والحركة والتجربة.",
                  en:"A logo is one piece. A real identity unifies voice, colour, motion and experience." } },
      { id:"p3", cat:"seo", date:"2026-04-25", read:5, status:"published",
        title:{ ug:"ئۈچ تىللىق تور بېكەت ئۈچۈن SEO نى قانداق قىلىمىز؟", ar:"تحسين SEO لموقع بثلاث لغات", en:"How we do SEO for a trilingual website" },
        excerpt:{ ug:"hreflang، تىل بويىچە URL قۇرۇلمىسى ۋە مەزمۇن سۈپىتى — كۆپ تىللىق تور بېكەتلەردە ئىزدەش موتورىدا چىقىشنىڭ ئاچقۇچى.",
                  ar:"hreflang وهيكل الروابط وجودة المحتوى — مفاتيح الظهور في محركات البحث للمواقع متعددة اللغات.",
                  en:"hreflang, per-language URL structure and content quality — the keys to ranking with multiple languages." } },
      { id:"p4", cat:"video", date:"2026-03-11", read:4, status:"published",
        title:{ ug:"15 سېكۇنتتا دىققەتنى تارتىشنىڭ ئۇسۇلى", ar:"كيف تخطف الانتباه في 15 ثانية", en:"How to win attention in 15 seconds" },
        excerpt:{ ug:"تۇنجى 3 سېكۇنت ھەممىنى ھەل قىلىدۇ. قىسقا ۋىدېئولاردا ئىشلەتكىلى بولىدىغان 5 قۇرۇلما.",
                  ar:"الثواني الثلاث الأولى تحسم كل شيء — 5 هياكل مجرّبة للمقاطع القصيرة.",
                  en:"The first three seconds decide everything. Five structures that work for short-form video." } }
    ],

    team: [
      { id:"tm1", initials:"NS", name:"نۇرسۇلتان ئەخمەت", nameAr:"نورسلطان أحمد", nameEn:"Nursultan Ahmad",
        role:{ ug:"باش دىرېكتور", ar:"المدير التنفيذي", en:"Founder & CEO" }, color:"#4F46E5" },
      { id:"tm2", initials:"ZA", name:"زۇھرە ئابلىز", nameAr:"زهراء أبليز", nameEn:"Zuhra Abliz",
        role:{ ug:"ئىجادىي دىرېكتور", ar:"المديرة الإبداعية", en:"Creative Director" }, color:"#7C3AED" },
      { id:"tm3", initials:"DT", name:"دىلنۇر تۆختى", nameAr:"دِلنور تُختي", nameEn:"Dilnur Tohti",
        role:{ ug:"رەقەملىك ئىستراتېگ", ar:"استراتيجية رقمية", en:"Digital Strategist" }, color:"#06B6D4" },
      { id:"tm4", initials:"MK", name:"مۇھەممەد كېرىم", nameAr:"محمد كريم", nameEn:"Muhammad Karim",
        role:{ ug:"ۋىدېئو رېژىسسورى", ar:"مخرج الفيديو", en:"Film Director" }, color:"#D946EF" }
    ],

    process: [
      { n:"01", name:{ ug:"بايقاش", ar:"الاكتشاف", en:"Discovery" },
        text:{ ug:"بازار، رىقابەتچىلەر ۋە نىشان ئاھالىنى تەھلىل قىلىمىز.", ar:"نحلّل السوق والمنافسين والجمهور المستهدف.", en:"We analyse the market, competitors and audience." } },
      { n:"02", name:{ ug:"ئىستراتېگىيە", ar:"الاستراتيجية", en:"Strategy" },
        text:{ ug:"ئېنىق نىشان ۋە ئۆلچىنىدىغان كۆرسەتكۈچلەر بېكىتىمىز.", ar:"نحدّد أهدافاً ومؤشرات قابلة للقياس.", en:"We set clear goals and measurable KPIs." } },
      { n:"03", name:{ ug:"ئىجاد", ar:"الإبداع", en:"Creation" },
        text:{ ug:"لايىھە، مەزمۇن ۋە ئىلان ماتېرىياللىرىنى ئىشلەيمىز.", ar:"نصمّم وننتج المواد الإبداعية والإعلانية.", en:"We design and produce the creative work." } },
      { n:"04", name:{ ug:"ئۆلچەش", ar:"القياس", en:"Measurement" },
        text:{ ug:"نەتىجىنى ھېسابلاپ، ئۈزلۈكسىز ئەلالاشتۇرىمىز.", ar:"نقيس النتائج ونحسّن باستمرار.", en:"We track results and optimise continuously." } }
    ],

    leads: [
      { id:"L-1042", date:"2026-08-24T10:12:00Z", name:"Rustam Yusup", email:"rustam@alp-retail.com", phone:"+966 55 111 2233",
        subject:{ ug:"يېڭى ھەمكارلىق لايىھىسى", ar:"حملة جديدة", en:"New campaign brief" },
        message:{ ug:"2026-يىللىق قىش ھەمكارلىقى ئۈچۈن تولۇق ئىلان پىلانى كېرەك. بىر ھەپتە ئىچىدە ئۇچرىشىش ئىستەيمىز.",
                  ar:"نحتاج خطة إعلانية كاملة لحملة شتاء 2026. نرغب في اجتماع خلال أسبوع.",
                  en:"We need a full plan for our winter 2026 campaign and would like to meet within the week." },
        status:"new" },
      { id:"L-1041", date:"2026-08-22T15:40:00Z", name:"Fatima Nour", email:"f.nour@lumaskin.co", phone:"+971 50 444 5566",
        subject:{ ug:"مەھسۇلات فوتوگرافىيىسى", ar:"تصوير منتجات", en:"Product shoot" },
        message:{ ug:"12 خىل يېڭى مەھسۇلات بار، ئىنتېرنېت دۇكىنى ئۈچۈن رەسىم كېرەك.",
                  ar:"لدينا 12 منتجاً جديداً ونحتاج صوراً للمتجر الإلكتروني.",
                  en:"We have 12 new SKUs and need imagery for the e-commerce store." },
        status:"read" },
      { id:"L-1040", date:"2026-08-19T09:05:00Z", name:"Omar Haddad", email:"omar@tengritravel.com", phone:"+966 55 999 8877",
        subject:{ ug:"ۋىدېئو ئىلان", ar:"إعلان فيديو", en:"Video ad" },
        message:{ ug:"يېڭى ساياھەت يۆنىلىشلىرى ئۈچۈن 30 سېكۇنتلۇق ۋىدېئو ئىلان لازىم.",
                  ar:"نحتاج إعلان فيديو 30 ثانية لوجهات سياحية جديدة.",
                  en:"We need a 30-second video ad for three new destinations." },
        status:"answered" }
    ],

    traffic: {
      months: ["01","02","03","04","05","06","07","08","09","10","11","12"],
      visits:  [2100,2650,3100,2900,3600,4150,4600,5250,4980,5600,6120,6840],
      byLang:  { ug: 46, ar: 31, en: 23 }
    }
  };

  window.SEED_CONTENT = SEED;
})();
