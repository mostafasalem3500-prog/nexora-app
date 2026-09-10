# NEXORA TECH — Dockerfile
# بناء متعدد المراحل: مرحلة بناء (fat, بكل أدوات التطوير) ثم مرحلة تشغيل أخف.
# ملاحظة: نُبقي node_modules كاملة في مرحلة التشغيل (وليس standalone output)
# لأن أمر start يشغّل Prisma CLI (`prisma db push` / `prisma db seed`) مباشرة
# قبل `next start` — هذه الأدوات تحتاج node_modules الكاملة لا الحزمة المُجرّدة.

FROM node:22-slim AS base
WORKDIR /app
# مكتبات نظام مطلوبة لمحرّكات Prisma وقت التشغيل
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

FROM base AS deps
COPY package.json package-lock.json* ./
# npm install بدل npm ci: أكثر تسامحًا مع فروقات طفيفة بين package.json
# وlock file (مثل تلك الناتجة عن --legacy-peer-deps محليًا)، بينما npm ci
# يتطلب تطابقًا حرفيًا صارمًا وقد يفشل بدون سبب حقيقي متعلق بصحة الحزم.
RUN npm install --ignore-scripts

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

EXPOSE 3000
ENV PORT=3000

# يشغّل: prisma db push (يزامن الجداول) ثم prisma db seed (ينشئ حساب المدير
# الأول إن لم يوجد) ثم next start — راجع package.json > scripts > start
CMD ["npm", "start"]
