# NEXORA TECH | نكسورا تك — الهندسة المعمارية وخريطة الموقع

> هذا المستند هو نقطة الانطلاق التي يُبنى عليها التنفيذ الكامل داخل Claude Code
> (Next.js + PostgreSQL + Prisma + لوحة تحكم). كل قرار هنا قابل للتعديل.

---

## 1. الحزمة التقنية (محسومة)

| الطبقة | الاختيار | السبب |
|---|---|---|
| إطار العمل | Next.js 15 (App Router) + TypeScript | Server Components + SEO ممتاز |
| التنسيق | Tailwind CSS + Design Tokens مركزية | تحكم كامل بالهوية من ملف واحد |
| المكونات | shadcn/ui مخصص بالكامل | لا يبدو كقالب جاهز بعد التخصيص |
| الحركة | Framer Motion (أساسي) + GSAP (المشاهد المتقدمة فقط) | أداء + مرونة |
| قاعدة البيانات | PostgreSQL + Prisma ORM | علاقات واضحة بين الخدمات/المشاريع/الطلبات |
| المصادقة | Auth.js (NextAuth v5) + أدوار (RBAC) | متوافق مع App Router، جلسات آمنة |
| النماذج | React Hook Form + Zod (تحقق مزدوج عميل/خادم) | أمان + تجربة مستخدم |
| التدويل | next-intl | مسارات `/ar` و `/en` مع slugs مستقلة لكل لغة |
| المخططات | Recharts | خفيف ومناسب لعروض ERP/Dashboard |
| الأيقونات | Lucide + SVG أصلية للشعار والمخططات التقنية | تجانس بصري |
| الصور | next/image + تخزين محلي `/public/uploads` قابل للاستبدال بـ S3/Cloud Storage | يبدأ بسيط، يتوسع لاحقًا |
| النشر | Docker + Railway | يوافق تفضيلات مسطفى الحالية (Railway مستخدم في مشاريع أخرى) |

---

## 2. مخطط قاعدة البيانات (Prisma Schema — مستوى المفاهيم)

```
SiteSettings        (سجل واحد singleton) — الاسم، الشعار، الألوان، SEO، التواصل، الشبكات، isDemo flags
Page                — slug, locale, title, sections(json), status(draft/published), seo
ServiceCategory      — name_ar/en, slug, icon, order
Service              — categoryId, name_ar/en, slug, summary, problem, solution,
                       benefits[], steps[], techStack[], sectors[], faqs[], cta, order
CaseStudy            — name_ar/en, slug, sector, problem, solution, techStack[],
                       expectedOutcome, isDemo=true, images[], beforeAfter, order
Sector               — name_ar/en, slug, description, relatedServices[]
Article              — title_ar/en, slug, excerpt, body, coverImage, author, status, publishedAt
TeamMember           — name, role, photo, bio, order
JobPosting           — title, department, location, type, description, status
Testimonial          — quote_ar/en, name(placeholder), role(placeholder), isDemo=true
FAQ                  — question_ar/en, answer_ar/en, scope(global|serviceId)
ProjectRequest       — referenceNumber, contactInfo, solutionType, description,
                       budgetRange, timeline, features[], briefFileUrl, status,
                       internalNotes[], createdAt
User                 — email, passwordHash, role(admin|editor|sales), lastLogin
AuditLog             — userId, action, entityType, entityId, diff(json), createdAt
```

كل نص قابل للترجمة يُخزَّن كحقلين (`_ar` / `_en`) بدل جداول ترجمة منفصلة — أبسط للوحة تحكم بحجم هذا المشروع.

---

## 3. خريطة الصفحات (Sitemap)

```
/                              الرئيسية
/services                      الخدمات (تصنيفات)
/services/[category]/[slug]    صفحة خدمة مفصّلة (×17)
/solutions/erp                 ERP
/solutions/crm                 CRM
/solutions/ai-automation       الذكاء الاصطناعي والأتمتة
/solutions/business-intelligence  ذكاء الأعمال وتحليل البيانات
/work                          أعمالنا (فلترة حسب القطاع/النوع)
/work/[slug]                   دراسة حالة (×6)
/sectors                       القطاعات
/sectors/[slug]                قطاع مفصّل
/about                         من نحن
/methodology                   منهجية العمل
/blog                          مركز المعرفة
/blog/[slug]                   مقالة (×6 تجريبية)
/careers                       الوظائف
/contact                       تواصل معنا
/quote                         اطلب عرض سعر (Wizard)
/quote/success/[ref]           صفحة نجاح بالرقم المرجعي
/privacy  /terms               صفحات قانونية
/404                           صفحة غير موجودة متحركة

/admin (محمي بمصادقة)
  /admin/dashboard
  /admin/settings/brand        الهوية والألوان والخطوط
  /admin/settings/nav-footer
  /admin/pages/home
  /admin/services
  /admin/work
  /admin/sectors
  /admin/blog
  /admin/team
  /admin/careers
  /admin/faqs
  /admin/testimonials
  /admin/media
  /admin/contact-info
  /admin/seo
  /admin/requests              (طلبات المشاريع + الحالة + الملاحظات)
  /admin/users                 (أدوار: مدير نظام / محرر محتوى / مبيعات)
  /admin/audit-log
```

كل مسار موجود بنسختين `ar` (افتراضي) و `en`، وslugs مستقلة لكل لغة (مثال: `/ar/خدماتنا/تصميم-مواقع` مقابل `/en/services/web-design` — أو نسخة مبسطة بـ slugs لاتينية موحدة إذا فُضّل تبسيط الروابط لاحقًا؛ هذا قرار نهائي يُتخذ عند البدء بـ Claude Code).

---

## 4. لوحة التحكم — الأدوار

| الدور | الصلاحيات |
|---|---|
| مدير نظام | كل شيء + المستخدمون + سجل التغييرات + الهوية |
| محرر محتوى | الخدمات/المشاريع/المقالات/القطاعات + Draft/Published، بدون إعدادات الهوية أو المستخدمين |
| موظف مبيعات | طلبات المشاريع فقط: عرض، تحديث الحالة، إضافة ملاحظات متابعة |

---

## 5. مصدر الحقيقة الواحد للهوية

ملف/جدول `SiteSettings` singleton يُقرأ عند بناء كل صفحة (Server Component) ويُمرَّر كـ context. لا يوجد أي نص "Nexora" أو لون Hex مكتوب مباشرة داخل مكونات الصفحات — كل شيء عبر:
- `siteConfig.name.ar / .en`
- `siteConfig.tagline.ar / .en`
- `siteConfig.colors.*` (تُصدَّر أيضًا كـ CSS variables وقت البناء)
- `siteConfig.contact.*`, `siteConfig.social.*`, `siteConfig.seo.*`

هذا يجعل تغيير اسم الشركة بالكامل = تعديل سجل واحد في لوحة التحكم، صفر تعديل كود.

---

## 6. خطوات التنفيذ التالية (تُنفَّذ داخل Claude Code)

1. `create-next-app` + إعداد Tailwind/TypeScript/ESLint.
2. تركيب Prisma + كتابة الـ schema أعلاه + migration أولى + seed.
3. إعداد next-intl والمسارات الثنائية اللغة.
4. بناء `SiteSettings` provider + Design Tokens (انظر الملف المرفق `02-design-tokens`).
5. بناء الصفحة الرئيسية بالكامل (أعلى أولوية بصرية).
6. بناء صفحات الخدمات/الأعمال/القطاعات من نفس القوالب الديناميكية.
7. Auth.js + لوحة التحكم بالتدريج (الإعدادات أولًا، ثم المحتوى، ثم الطلبات).
8. الحركة والتجاوب والاختبارات والـ Production Build كما في الخطة الأصلية (البنود 11، 17، 18).
