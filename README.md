# NEXORA TECH | نكسورا تك — تطبيق Next.js

## ما تم إنجازه (٣ مراحل)

**المرحلة ١ — الأساس**: Next.js 16 (App Router) + TypeScript + Tailwind CSS v4، مع تركيب
Framer Motion وZod وReact Hook Form وLucide Icons.

**المرحلة ٢ — قاعدة البيانات**: مخطط Prisma كامل (`prisma/schema.prisma`) يغطي كل الكيانات
المذكورة في `01-architecture.md`: SiteSettings، الخدمات وتصنيفاتها، دراسات الحالة، القطاعات،
المقالات، الفريق، الوظائف، الشهادات، الأسئلة الشائعة، طلبات المشاريع، المستخدمون بالأدوار،
وسجل التغييرات. جاهز بصيغة SQLite للتطوير المحلي، ويتحول إلى PostgreSQL بتغيير سطرين فقط
في `datasource db` و`DATABASE_URL`.

> ⚠️ **تنويه مهم**: بيئة التنفيذ الحالية (Sandbox) تمنع الوصول لأي نطاق شبكة غير مُدرَج في
> قائمة السماح الخاصة بها، ونطاق تحميل محركات Prisma (`binaries.prisma.sh`) ليس ضمنها.
> لذلك لم يتم تشغيل `prisma generate` / `prisma migrate` فعليًا هنا رغم أن الـSchema صحيحة
> ومكتملة. أول أمر تُشغّله في بيئتك الحقيقية (Claude Code / جهازك):
> ```bash
> npx prisma generate
> npx prisma migrate dev --name init
> ```

**المرحلة ٣ — التدويل والصفحة الرئيسية الفعلية**: `next-intl` بمسارين `/ar` (افتراضي، RTL)
و`/en` (LTR)، مع Middleware/Proxy لتوجيه اللغة تلقائيًا. الصفحة الرئيسية مبنية فعليًا كمكونات
React حقيقية (وليست نموذج HTML ثابت): Header متحول عند التمرير، Hero بمشهد أجهزة حي، خريطة
حلول تفاعلية، خدمات Editorial، معرض أعمال بفلترة حقيقية بـ React state، رحلة تنفيذ، قطاعات،
وCTA ختامية. **تم التحقق من نجاح الـProduction Build فعليًا** (`npx next build`) ومن عمل
المسارين `/ar` و`/en` بـ `curl` (200 OK، `dir` صحيح لكل لغة).

## التشغيل محليًا

```bash
npm install
npx prisma generate && npx prisma migrate dev --name init   # بعد توفر الشبكة
npm run dev
# افتح http://localhost:3000 (يحوّلك تلقائيًا إلى /ar)
```

## البناء للإنتاج

```bash
npm run build
npm start
```

## الخطوات التالية (لم تُنفَّذ بعد)

- ربط مكونات الصفحة بجدول `SiteSettings` بدل القيم الثابتة في المكونات (تفعيل "مصدر الحقيقة الواحد").
- Auth.js + لوحة التحكم بالأدوار الثلاثة (مدير نظام / محرر محتوى / مبيعات).
- بقية الصفحات (17 صفحة خدمة، 6 دراسات حالة، القطاعات، المدونة، نموذج طلب المشروع Wizard...).
- Seed فعلي لقاعدة البيانات من `docs/seed-data.json` عبر `prisma/seed.ts`.
- SEO metadata لكل صفحة، Sitemap، robots.txt، Schema.org.
- الحركة المتقدمة (GSAP) والاختبارات الشاملة المذكورة في `01-architecture.md`.

راجع `docs/01-architecture.md` و`docs/02-design-tokens.md` للخطة الكاملة.
