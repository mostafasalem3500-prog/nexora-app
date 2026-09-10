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
