// طبقة بيانات مركزية — مبنية من docs/seed-data.json.
// لاحقًا تُستبدل هذه الدوال بقراءة فعلية من Prisma (بعد ربط لوحة التحكم)
// دون تغيير أي شيء في المكونات التي تستهلكها.

export type Bilingual = { ar: string; en: string };

export type ServiceCategory = {
  slug: string;
  name: Bilingual;
};

export type Service = {
  category: string;
  slug: string;
  name: Bilingual;
  resultLine: Bilingual;
};

export type CaseStudy = {
  slug: string;
  isDemo: boolean;
  sector: Bilingual;
  name: Bilingual;
  problem: Bilingual;
  solution: Bilingual;
  expectedOutcome: Bilingual;
};

export type Faq = { q: Bilingual; a: Bilingual };

export const serviceCategories: ServiceCategory[] = [
  { slug: "digital-products", name: { ar: "منتجات رقمية", en: "Digital Products" } },
  { slug: "enterprise-solutions", name: { ar: "حلول مؤسسية", en: "Enterprise Solutions" } },
  { slug: "data-ai", name: { ar: "بيانات وذكاء اصطناعي", en: "Data & AI" } },
  { slug: "infrastructure-integration", name: { ar: "بنية تحتية وتكامل", en: "Infrastructure & Integration" } },
  { slug: "design-consulting", name: { ar: "تصميم واستشارات", en: "Design & Consulting" } },
];

export const services: Service[] = [
  { category: "digital-products", slug: "web-design-dev", name: { ar: "تصميم وبرمجة المواقع", en: "Website Design & Development" }, resultLine: { ar: "موقع يحوّل الزائر إلى عميل", en: "A website that turns visitors into customers" } },
  { category: "digital-products", slug: "mobile-apps", name: { ar: "تطوير تطبيقات الجوال", en: "Mobile App Development" }, resultLine: { ar: "تطبيق يبقى قريبًا من مستخدميك", en: "An app that stays close to your users" } },
  { category: "digital-products", slug: "saas-platforms", name: { ar: "تطوير منصات الويب وSaaS", en: "Web & SaaS Platforms" }, resultLine: { ar: "منصة تنمو مع نمو أعمالك", en: "A platform that scales as you grow" } },
  { category: "digital-products", slug: "ecommerce-booking", name: { ar: "المتاجر الإلكترونية ومنصات الحجز", en: "E-commerce & Booking Platforms" }, resultLine: { ar: "تجربة شراء بلا احتكاك", en: "A frictionless buying experience" } },
  { category: "enterprise-solutions", slug: "erp", name: { ar: "أنظمة ERP", en: "ERP Systems" }, resultLine: { ar: "ERP يوحّد العمليات والمالية", en: "One ERP that unifies operations and finance" } },
  { category: "enterprise-solutions", slug: "crm", name: { ar: "أنظمة CRM", en: "CRM Systems" }, resultLine: { ar: "علاقة عملاء لا تُفقد بين الفرق", en: "Customer relationships that never fall through the cracks" } },
  { category: "enterprise-solutions", slug: "accounting-finance", name: { ar: "الأنظمة المحاسبية والمالية", en: "Accounting & Finance Systems" }, resultLine: { ar: "دفاتر محاسبية دقيقة بلا إدخال مزدوج", en: "Accurate books without double entry" } },
  { category: "enterprise-solutions", slug: "hr-payroll", name: { ar: "أنظمة الموارد البشرية والرواتب", en: "HR & Payroll Systems" }, resultLine: { ar: "حضور ورواتب بلا أخطاء يدوية", en: "Attendance and payroll without manual errors" } },
  { category: "data-ai", slug: "dashboards-bi", name: { ar: "لوحات البيانات وذكاء الأعمال", en: "Dashboards & Business Intelligence" }, resultLine: { ar: "بيانات تتحول إلى قرار", en: "Data that becomes a decision" } },
  { category: "data-ai", slug: "ai-automation", name: { ar: "حلول الذكاء الاصطناعي والأتمتة", en: "AI & Automation Solutions" }, resultLine: { ar: "أتمتة تقلل الوقت والأخطاء", en: "Automation that cuts time and errors" } },
  { category: "data-ai", slug: "gis-mapping", name: { ar: "نظم المعلومات الجغرافية والخرائط التفاعلية", en: "GIS & Interactive Mapping" }, resultLine: { ar: "قرارات ميدانية مبنية على الموقع", en: "Field decisions grounded in location" } },
  { category: "infrastructure-integration", slug: "system-integration-api", name: { ar: "التكامل بين الأنظمة وواجهات API", en: "System Integration & APIs" }, resultLine: { ar: "أنظمتك تتحدث لغة واحدة", en: "Your systems speak one language" } },
  { category: "infrastructure-integration", slug: "cloud-devops", name: { ar: "الحلول السحابية والاستضافة وDevOps", en: "Cloud, Hosting & DevOps" }, resultLine: { ar: "بنية تحتية تتحمل النمو المفاجئ", en: "Infrastructure that absorbs sudden growth" } },
  { category: "infrastructure-integration", slug: "cybersecurity-backup", name: { ar: "الأمن السيبراني والنسخ الاحتياطي", en: "Cybersecurity & Backup" }, resultLine: { ar: "بياناتك محمية قبل وقوع الحادثة", en: "Your data protected before the incident" } },
  { category: "infrastructure-integration", slug: "support-maintenance", name: { ar: "الدعم الفني والصيانة والتطوير المستمر", en: "Support, Maintenance & Continuous Development" }, resultLine: { ar: "نظامك لا يتوقف عن التحسّن", en: "A system that never stops improving" } },
  { category: "design-consulting", slug: "ux-ui-identity", name: { ar: "تصميم تجربة المستخدم والهوية الرقمية", en: "UX/UI & Digital Identity" }, resultLine: { ar: "واجهة يفهمها المستخدم من أول نظرة", en: "An interface users understand at a glance" } },
  { category: "design-consulting", slug: "tech-consulting-feasibility", name: { ar: "الاستشارات التقنية ودراسة وتحليل المشاريع", en: "Tech Consulting & Feasibility Studies" }, resultLine: { ar: "قرار تقني مبني على تحليل، لا تخمين", en: "A tech decision built on analysis, not guesswork" } },
];

export const caseStudies: CaseStudy[] = [
  { slug: "erp-services-co", isDemo: true, sector: { ar: "قطاع الخدمات", en: "Services" }, name: { ar: "نظام ERP لشركة خدمات", en: "ERP for a Services Company" }, problem: { ar: "المبيعات والمخزون والمحاسبة في 3 أدوات منفصلة تسبب فجوات بيانات يومية.", en: "Sales, inventory, and accounting lived in 3 disconnected tools, causing daily data gaps." }, solution: { ar: "نظام ERP موحّد يربط الطلب من لحظة إنشائه حتى القيد المحاسبي.", en: "A unified ERP connecting orders from creation to the accounting entry." }, expectedOutcome: { ar: "تقليل زمن إغلاق الحسابات الشهرية وتوحيد مصدر البيانات.", en: "Faster monthly close and a single source of truth." } },
  { slug: "tourism-booking-app", isDemo: true, sector: { ar: "السياحة والضيافة", en: "Tourism & Hospitality" }, name: { ar: "تطبيق حجوزات سياحية", en: "Tourism Booking App" }, problem: { ar: "الحجوزات تتم عبر مكالمات ورسائل متفرقة بلا تتبع مركزي.", en: "Bookings happened over scattered calls and messages with no central tracking." }, solution: { ar: "تطبيق حجز وإدارة رحلات مع إشعارات لحظية للعميل والفريق.", en: "A booking and trip-management app with live notifications for customers and staff." }, expectedOutcome: { ar: "تقليل الحجوزات المكررة وتحسين تجربة العميل.", en: "Fewer double-bookings and a smoother customer experience." } },
  { slug: "learning-platform", isDemo: true, sector: { ar: "التعليم", en: "Education" }, name: { ar: "منصة تعليمية", en: "Learning Platform" }, problem: { ar: "صعوبة متابعة تقدم الطلاب عبر مواد متفرقة.", en: "Difficulty tracking student progress across scattered materials." }, solution: { ar: "منصة مسارات تعلم تفاعلية مع تقارير أداء للمعلم.", en: "An interactive learning-path platform with teacher performance reports." }, expectedOutcome: { ar: "رؤية أوضح لتقدم كل طالب لحظيًا.", en: "Clearer, real-time visibility into each student's progress." } },
  { slug: "multi-branch-store", isDemo: true, sector: { ar: "التجارة", en: "Retail" }, name: { ar: "متجر إلكتروني متعدد الفروع", en: "Multi-Branch E-commerce" }, problem: { ar: "كل فرع يدير مخزونه بشكل منفصل، ما يسبب نفاد أو تكدس غير متوقع.", en: "Each branch managed its own inventory, causing unexpected stockouts or overstock." }, solution: { ar: "متجر موحّد بمخزون مركزي وتقارير مبيعات مجمّعة.", en: "A unified store with centralized inventory and consolidated sales reporting." }, expectedOutcome: { ar: "رؤية موحّدة للمخزون عبر جميع الفروع.", en: "A unified inventory view across all branches." } },
  { slug: "gis-ops-dashboard", isDemo: true, sector: { ar: "اللوجستيات", en: "Logistics" }, name: { ar: "لوحة عمليات وخرائط GIS", en: "Operations Dashboard with GIS" }, problem: { ar: "تتبع الموارد الميدانية يعتمد على تقارير يدوية متأخرة.", en: "Field-resource tracking relied on delayed manual reports." }, solution: { ar: "لوحة تتبع جغرافي لحظي للموارد والمركبات.", en: "A live geographic dashboard for tracking resources and vehicles." }, expectedOutcome: { ar: "قرارات ميدانية أسرع مبنية على موقع فعلي.", en: "Faster field decisions based on actual location." } },
  { slug: "volunteer-events-system", isDemo: true, sector: { ar: "القطاع غير الربحي", en: "Nonprofit" }, name: { ar: "نظام تطوع وإدارة فعاليات", en: "Volunteer & Event Management System" }, problem: { ar: "تسجيل المتطوعين وجدولة المناوبات يتم يدويًا عبر جداول منفصلة.", en: "Volunteer registration and shift scheduling were handled manually across separate sheets." }, solution: { ar: "منصة تسجيل وجدولة موحّدة مع قياس أثر المشاركة.", en: "A unified registration and scheduling platform with participation-impact tracking." }, expectedOutcome: { ar: "تنظيم أوضح للمناوبات وقياس فعلي للأثر.", en: "Clearer shift organization and real impact measurement." } },
];

export const sectorsList: Bilingual[] = [
  { ar: "التجارة", en: "Retail" },
  { ar: "الخدمات", en: "Services" },
  { ar: "التعليم", en: "Education" },
  { ar: "الصحة", en: "Healthcare" },
  { ar: "السياحة والضيافة", en: "Tourism & Hospitality" },
  { ar: "اللوجستيات", en: "Logistics" },
  { ar: "القطاع غير الربحي", en: "Nonprofit" },
  { ar: "العقارات", en: "Real Estate" },
  { ar: "التصنيع", en: "Manufacturing" },
  { ar: "الجهات الحكومية", en: "Government" },
];

export const faqsGlobal: Faq[] = [
  { q: { ar: "كم تستغرق مدة تنفيذ المشروع؟", en: "How long does a project take?" }, a: { ar: "تختلف حسب نطاق المشروع، وتُحدَّد بدقة بعد مرحلة الاستكشاف الأولى.", en: "It depends on scope, and is defined precisely after the discovery phase." } },
  { q: { ar: "هل يمكن البدء بنموذج أولي قبل الالتزام الكامل؟", en: "Can we start with a prototype before full commitment?" }, a: { ar: "نعم، نبني نموذجًا تفاعليًا في مرحلة التصميم قبل الانتقال للتطوير الكامل.", en: "Yes, we build an interactive prototype during the design phase before full development." } },
  { q: { ar: "هل تقدمون الدعم بعد الإطلاق؟", en: "Do you offer support after launch?" }, a: { ar: "نعم، عبر باقات صيانة وتطوير مستمر حسب احتياجك.", en: "Yes, through maintenance and continuous-development packages tailored to your needs." } },
];

export function getServicesByCategory(categorySlug: string) {
  return services.filter((s) => s.category === categorySlug);
}

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export type Article = {
  slug: string;
  title: Bilingual;
  excerpt: Bilingual;
  body: Bilingual[]; // فقرات
  category: Bilingual;
  readMinutes: number;
};

export const articles: Article[] = [
  {
    slug: "why-erp-fails-without-process-mapping",
    category: { ar: "أنظمة مؤسسية", en: "Enterprise Systems" },
    readMinutes: 6,
    title: {
      ar: "لماذا تفشل مشاريع ERP بدون رسم العمليات أولًا؟",
      en: "Why ERP Projects Fail Without Process Mapping First",
    },
    excerpt: {
      ar: "أغلى غلطة في مشاريع ERP ليست في اختيار البرنامج، بل في تجاهل رسم العمليات الفعلية قبل البناء.",
      en: "The costliest ERP mistake isn't choosing the wrong software — it's skipping process mapping before you build.",
    },
    body: [
      {
        ar: "كثير من الشركات تبدأ مشروع ERP بسؤال: أي نظام نشتري؟ وهذا سؤال مبكر جدًا. قبل اختيار أي برنامج، يجب رسم العمليات الفعلية كما تحدث اليوم — من استلام طلب العميل إلى إصدار الفاتورة — بكل استثناءاتها.",
        en: "Many companies start an ERP project by asking: which software should we buy? That question comes too early. Before choosing any software, you need to map how processes actually happen today — from receiving a customer order to issuing the invoice — exceptions included.",
      },
      {
        ar: "بدون هذه الخطوة، يُبنى النظام على افتراضات نظرية بدل الواقع الفعلي، فتظهر الفجوات بعد الإطلاق: خطوة موافقة منسية، أو حالة استثنائية يتعامل معها الموظفون يدويًا خارج النظام بالكامل.",
        en: "Without this step, the system gets built on theoretical assumptions instead of reality, and gaps appear after launch: a forgotten approval step, or an exception case staff end up handling manually, entirely outside the system.",
      },
      {
        ar: "التوصية العملية: خصّص أسبوعين على الأقل لرسم العمليات مع الموظفين الفعليين قبل كتابة أي سطر برمجي، وستوفر أشهرًا من إعادة العمل لاحقًا.",
        en: "Practical recommendation: dedicate at least two weeks to mapping processes with the actual staff before writing a single line of code — it saves months of rework later.",
      },
    ],
  },
  {
    slug: "arabic-rtl-mistakes-in-web-design",
    category: { ar: "تصميم وتجربة مستخدم", en: "Design & UX" },
    readMinutes: 5,
    title: { ar: "5 أخطاء شائعة في تصميم واجهات عربية RTL", en: "5 Common Mistakes in Arabic RTL Interface Design" },
    excerpt: {
      ar: "ترجمة النصوص لا تكفي — التصميم العربي الصحيح يتطلب قلب الاتجاه المنطقي لا الشكلي فقط.",
      en: "Translating text isn't enough — proper Arabic design requires flipping logical direction, not just appearance.",
    },
    body: [
      {
        ar: "الخطأ الأول: استخدام left/right في CSS بدل start/end، فتنكسر الواجهة عند التبديل بين العربية والإنجليزية بدل أن تتكيف تلقائيًا.",
        en: "Mistake one: using left/right in CSS instead of start/end, which breaks the layout when switching between Arabic and English instead of adapting automatically.",
      },
      {
        ar: "الخطأ الثاني: عدم قلب أيقونات الاتجاه (كالأسهم) مع اتجاه الصفحة، ما يجعلها تشير لجهة خاطئة منطقيًا.",
        en: "Mistake two: not mirroring directional icons (like arrows) with the page direction, making them point the wrong logical way.",
      },
      {
        ar: "الخطأ الثالث: خلط الأرقام والتواريخ الإنجليزية داخل جملة عربية بدون عزل اتجاهها (unicode-bidi)، فيتشوّه الترتيب البصري.",
        en: "Mistake three: mixing English numbers and dates inside an Arabic sentence without isolating their direction (unicode-bidi), distorting the visual order.",
      },
    ],
  },
  {
    slug: "choosing-between-crm-and-spreadsheet",
    category: { ar: "مبيعات وعملاء", en: "Sales & CRM" },
    readMinutes: 4,
    title: { ar: "متى تحتاج فعلًا إلى CRM بدل جدول إكسل؟", en: "When Do You Actually Need a CRM Instead of a Spreadsheet?" },
    excerpt: {
      ar: "ليس كل فريق مبيعات يحتاج CRM فورًا. إليك العلامات الفعلية التي تدل على حاجتك الحقيقية.",
      en: "Not every sales team needs a CRM right away. Here are the real signs that indicate you actually need one.",
    },
    body: [
      {
        ar: "إذا كان فريقك أقل من 3 أشخاص وصفقاتك قليلة وواضحة، فجدول إكسل منظّم قد يكون كافيًا مؤقتًا.",
        en: "If your team is under 3 people and your deals are few and clear, a well-organized spreadsheet may be enough for now.",
      },
      {
        ar: "العلامة الحقيقية للحاجة إلى CRM: فقدان متابعة العملاء بسبب تعدد الجداول، أو عدم معرفة من يتابع أي صفقة، أو تكرار التواصل مع نفس العميل من أكثر من موظف.",
        en: "The real sign you need a CRM: losing track of customers across multiple spreadsheets, not knowing who owns which deal, or duplicate outreach to the same customer from different staff.",
      },
    ],
  },
  {
    slug: "cloud-hosting-cost-mistakes",
    category: { ar: "بنية تحتية", en: "Infrastructure" },
    readMinutes: 5,
    title: { ar: "3 أخطاء تكلفة شائعة عند اختيار الاستضافة السحابية", en: "3 Common Cost Mistakes When Choosing Cloud Hosting" },
    excerpt: {
      ar: "اختيار الاستضافة السحابية بناءً على السعر الظاهر فقط غالبًا ينتهي بفاتورة مفاجئة.",
      en: "Choosing cloud hosting based only on the sticker price often ends in a surprise bill.",
    },
    body: [
      {
        ar: "الخطأ الأول: تجاهل تكلفة نقل البيانات (Egress) التي تُحتسب منفصلة عن تكلفة التشغيل الأساسية.",
        en: "Mistake one: ignoring data-transfer (egress) costs, which are billed separately from base compute.",
      },
      {
        ar: "الخطأ الثاني: عدم إعداد حدود تلقائية لتوسّع الموارد (Auto-scaling limits)، فيتضخم الاستهلاك دون رقابة عند أي زيادة مفاجئة في الزيارات.",
        en: "Mistake two: not setting auto-scaling limits, letting usage balloon uncontrollably during any sudden traffic spike.",
      },
      {
        ar: "الخطأ الثالث: الاعتماد على منصة واحدة مغلقة دون خطة خروج، ما يصعّب التفاوض على السعر لاحقًا.",
        en: "Mistake three: relying on a single closed platform without an exit plan, which weakens your negotiating position later.",
      },
    ],
  },
  {
    slug: "gis-for-non-gis-businesses",
    category: { ar: "بيانات وذكاء اصطناعي", en: "Data & AI" },
    readMinutes: 4,
    title: { ar: "لماذا تحتاج شركتك خرائط GIS حتى لو لم تكن شركة نقل؟", en: "Why Your Company Needs GIS Even If You're Not a Logistics Business" },
    excerpt: {
      ar: "خرائط GIS ليست حكرًا على شركات النقل — أي عمل له عنصر ميداني يستفيد منها.",
      en: "GIS mapping isn't exclusive to logistics companies — any business with a field component can benefit.",
    },
    body: [
      {
        ar: "أي نشاط يتضمن مواقع فعلية — فروع، عملاء، مركبات، أو حتى متطوعين — يستفيد من رؤية هذه البيانات على خريطة بدل جدول أرقام.",
        en: "Any activity involving physical locations — branches, customers, vehicles, or even volunteers — benefits from seeing that data on a map instead of a table of numbers.",
      },
      {
        ar: "مثال عملي: شركة صيانة منزلية استخدمت خرائط تفاعلية لتوزيع الفنيين حسب أقرب موقع، فقلّلت زمن الوصول دون زيادة عدد الفنيين.",
        en: "A practical example: a home-maintenance company used interactive mapping to assign technicians by proximity, cutting response time without hiring more technicians.",
      },
    ],
  },
  {
    slug: "automation-vs-headcount",
    category: { ar: "ذكاء اصطناعي وأتمتة", en: "AI & Automation" },
    readMinutes: 5,
    title: { ar: "الأتمتة لا تعني تقليل الموظفين — بل تغيير ما يفعلونه", en: "Automation Isn't About Cutting Staff — It's About Changing What They Do" },
    excerpt: {
      ar: "أكثر خوف شائع من الأتمتة هو فقدان الوظائف. الواقع في أغلب الحالات مختلف تمامًا.",
      en: "The most common fear about automation is job loss. In most real cases, the reality is quite different.",
    },
    body: [
      {
        ar: "الأتمتة الناجحة تستهدف المهام المتكررة عالية الحجم منخفضة القيمة الفكرية — مثل إدخال البيانات المكرر — لا القرارات التي تحتاج حكمًا بشريًا.",
        en: "Successful automation targets high-volume, low-judgment repetitive tasks — like duplicate data entry — not decisions that require human judgment.",
      },
      {
        ar: "النتيجة الشائعة: نفس الموظف يتحول من إدخال بيانات يدوي إلى مراجعة استثناءات فقط، وينتقل وقته لمهام تحتاج تفكيرًا فعليًا.",
        en: "The common outcome: the same employee shifts from manual data entry to reviewing exceptions only, freeing their time for work that actually needs thinking.",
      },
    ],
  },
];

export type JobPosting = {
  slug: string;
  title: Bilingual;
  department: Bilingual;
  location: Bilingual;
  type: Bilingual;
  description: Bilingual;
};

export const jobPostings: JobPosting[] = [
  {
    slug: "frontend-developer",
    title: { ar: "مطوّر واجهات أمامية (Next.js)", en: "Frontend Developer (Next.js)" },
    department: { ar: "الهندسة", en: "Engineering" },
    location: { ar: "عن بُعد / السعودية", en: "Remote / Saudi Arabia" },
    type: { ar: "دوام كامل", en: "Full-time" },
    description: {
      ar: "نبحث عن مطوّر واجهات متمكّن من React وNext.js وTailwind، لديه خبرة عملية في بناء واجهات عربية RTL.",
      en: "We're looking for a frontend developer proficient in React, Next.js, and Tailwind, with hands-on experience building Arabic RTL interfaces.",
    },
  },
  {
    slug: "backend-developer",
    title: { ar: "مطوّر خلفي (Node.js/PostgreSQL)", en: "Backend Developer (Node.js/PostgreSQL)" },
    department: { ar: "الهندسة", en: "Engineering" },
    location: { ar: "عن بُعد / السعودية", en: "Remote / Saudi Arabia" },
    type: { ar: "دوام كامل", en: "Full-time" },
    description: {
      ar: "خبرة في تصميم قواعد بيانات علائقية وبناء واجهات API آمنة وقابلة للتوسع لأنظمة مؤسسية.",
      en: "Experience designing relational databases and building secure, scalable APIs for enterprise systems.",
    },
  },
  {
    slug: "product-designer",
    title: { ar: "مصمم منتج (UX/UI)", en: "Product Designer (UX/UI)" },
    department: { ar: "التصميم", en: "Design" },
    location: { ar: "عن بُعد / السعودية", en: "Remote / Saudi Arabia" },
    type: { ar: "دوام كامل", en: "Full-time" },
    description: {
      ar: "تصميم تجارب مستخدم واضحة لأنظمة مؤسسية معقدة، مع حس قوي بالهوية البصرية العربية.",
      en: "Design clear user experiences for complex enterprise systems, with a strong sense of Arabic visual identity.",
    },
  },
];
