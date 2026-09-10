# NEXORA TECH | نكسورا تك

تطبيق Next.js 16 (App Router) + TypeScript + Prisma لموقع شركة أنظمة رقمية: صفحات تسويقية
ثنائية اللغة (عربي RTL افتراضي / إنجليزي)، معالج طلب عرض سعر تفاعلي، ولوحة تحكم إدارية
محمية بالصلاحيات.

> هذا الملف يعكس الحالة **الفعلية الحالية** للكود (تم التحقق منها بالفحص المباشر، وليس
> بالنسخ عن نسخة سابقة). آخر مراجعة: 2026-09-10 — راجع
> [`docs/03-testing-report.md`](docs/03-testing-report.md) لتفاصيل آخر دفعة تدقيق جودة.

## التقنيات

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (عبر `@theme inline`، متغيّرات CSS مخصّصة لكل من الوضع الداكن/الفاتح)
- **Prisma** + قاعدة بيانات (SQLite للتطوير المحلي، PostgreSQL للإنتاج — سطر واحد في
  `DATABASE_URL`)
- **Auth.js v5** (بيانات اعتماد + JWT) لحماية `/admin`
- **next-intl** للتدويل (`/ar` افتراضي RTL، `/en` LTR) عبر Middleware
- **Framer Motion**, **React Hook Form + Zod**, **Lucide Icons**

## البنية

```
src/
  app/
    [locale]/        الصفحات التسويقية العامة (ar/en) — الرئيسية، الخدمات، الأعمال،
                      القطاعات، المدونة، من نحن، التواصل، الوظائف، طلب عرض سعر، القانونية
    admin/            لوحة التحكم: تسجيل الدخول، الطلبات، المستخدمون، الإعدادات (محمية بالأدوار)
    api/               مسارات API: المصادقة (NextAuth)، استقبال طلبات المشاريع
  components/         مكوّنات React قابلة لإعادة الاستخدام (Header, Hero, QuoteWizard...)
  lib/                البيانات الثابتة (site-data.ts)، إعدادات الموقع، اتصال Prisma
  i18n/               إعداد next-intl (routing, navigation, request)
  auth.ts             إعداد Auth.js
  proxy.ts            Middleware توجيه اللغة
prisma/
  schema.prisma       13 نموذجًا: SiteSettings، الخدمات وتصنيفاتها، دراسات الحالة، القطاعات،
                       المقالات، الفريق، الوظائف، الشهادات، الأسئلة الشائعة، طلبات المشاريع،
                       المستخدمون، سجلّ التغييرات
  seed.ts             تعبئة أولية للبيانات (تُشغَّل تلقائيًا عند `npm start` على Railway)
docs/
  01-architecture.md      خطة المعمارية الكاملة
  02-design-tokens.md     خطة الهوية البصرية الأولية (ملاحظة: بعض القيم فيه تخطيطية ولم
                           تُنفَّذ حرفيًا في globals.css — راجع الكود الفعلي كمصدر الحقيقة)
  03-testing-report.md    تقرير آخر دفعة تدقيق جودة (تباين ألوان، حركة، أخطاء state، كود ميت)
```

## التشغيل محليًا

```bash
npm install
cp .env.example .env   # ثم عدّل AUTH_SECRET وبيانات المدير الأولي
npx prisma migrate dev --name init
npm run dev
# افتح http://localhost:3000 (يحوّلك تلقائيًا إلى /ar)
```

لإنشاء حساب المدير الأولي ومزامنة البيانات الثابتة (الخدمات، القطاعات...) إلى قاعدة البيانات:

```bash
npx prisma db seed
```

بيانات الدخول الافتراضية بعد الـseed هي `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` من
`.env` — **غيّرها فور أول دخول** عبر `/admin/settings/password`.

## البناء والتشغيل للإنتاج

```bash
npm run build
npm start   # يشغّل: prisma db push + prisma db seed + next start
```

النشر الحالي مُعدّ لـ [Railway](https://railway.com) عبر Railpack builder
(`railway.json`) و`Dockerfile` بديل متاح أيضًا للاستضافة عبر Docker.

## الفحوصات

```bash
npm run lint        # ESLint (eslint-config-next core-web-vitals + typescript)
npx tsc --noEmit     # فحص الأنواع
npx next build       # يشمل فحص الأنواع + توليد كل الصفحات الثابتة/الديناميكية
```

## ما هو منفَّذ فعليًا الآن

- الصفحات التسويقية الكاملة بالعربية والإنجليزية (رئيسية، خدمات + تفاصيل كل خدمة، قطاعات،
  أعمال + دراسات حالة، مدونة + مقالات، من نحن، وظائف، تواصل، صفحات قانونية، 404).
- معالج طلب عرض سعر تفاعلي من 7 خطوات (`QuoteWizard`) مع حفظ تلقائي للتقدّم في
  `localStorage` (آمن عبر SSR — راجع §3.2 من تقرير الاختبار للتفاصيل التقنية) ونموذج تواصل
  بسيط بديل (`ContactForm`, React Hook Form + Zod).
- Auth.js v5 مع أدوار مستخدمين، ولوحة تحكم `/admin` كاملة: طلبات المشاريع، إدارة المستخدمين،
  إعدادات الموقع، تغيير كلمة المرور.
- SEO: `sitemap.ts`، `robots.ts`، metadata لكل صفحة.
- الوضع الداكن/الفاتح (`ThemeToggle`) بحفظ التفضيل في `localStorage`، ودعم
  `prefers-reduced-motion` الفعلي عبر Framer Motion (ليس فقط CSS).
- تباين ألوان متوافق مع WCAG AA في الوضعين (راجع `docs/03-testing-report.md`).

## خطوات لاحقة معروفة (لم تُنفَّذ، ولا تدّعي هذه الوثيقة أنها منفَّذة)

- ترقية Prisma (نسخة أحدث متاحة) ومعالجة ثغرات `npm audit` (3 عالية الخطورة، لم تُراجَع بعد).
- تنظيف أخطاء `@typescript-eslint/no-explicit-any` المتبقية (خاصة في `auth.ts` ومسار
  `/admin`) — موثّقة كخارج نطاق آخر دفعة تدقيق في `docs/03-testing-report.md`.
- مزامنة `docs/02-design-tokens.md` مع القيم الفعلية المطبَّقة في `globals.css` (يحتوي حاليًا
  خطة أوسع من التنفيذ الفعلي).
