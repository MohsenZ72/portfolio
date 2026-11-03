// Single source of truth for the site copy. Keep in sync with
// ~/Documents/netherlands-move/jobs/Mohsen_Zare_Resume.md — no claims beyond it.

export const profile = {
  name: 'Mohsen Zare',
  role: 'Senior full-stack engineer',
  pitch: 'I build TypeScript products with LLM features that hold up in production.',
  now: 'Lead a six-person engineering team at Bayzian',
  location: 'Yerevan → Leiden',
  moving: 'Moving to Leiden, NL in February 2027',
  permit:
    'No relocation needed. Highly Skilled Migrant or EU Blue Card through the employer, switched inside the Netherlands (about two weeks with a recognised sponsor).',
  email: 'z.mohsen72@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mohsen-zare',
  github: 'https://github.com/MohsenZ72',
  resume: 'Mohsen_Zare_Resume.pdf',
}

export type Root = {
  years: string
  title: string
  place: string
  note: string
}

// A real sequence, oldest first: the order is the story.
export const roots: Root[] = [
  {
    years: 'Before code',
    title: 'Associate degree, Agriculture',
    place: 'Shahid Chamran University of Ahvaz',
    note: 'Soil, plants and growth cycles. Software came after, self-taught.',
  },
  {
    years: '2017 – 2020',
    title: 'PHP / Laravel & Vue developer',
    place: 'Tehran',
    note: 'Laravel, Vue and MySQL for several companies; teaching assistant in PHP.',
  },
  {
    years: '2020 – 2021',
    title: 'Full stack developer',
    place: 'SISHEMI · University of Tehran S&T Park',
    note: 'Production web apps end to end, API to UI. Promoted to senior.',
  },
  {
    years: '2021 – 2024',
    title: 'Full stack developer → Frontend lead',
    place: 'IREEN · Vienna (remote)',
    note: 'Promoted within eight months. Owned the frontend architecture of a real-estate valuation platform and its component system.',
  },
  {
    years: '2024',
    title: 'Full stack developer',
    place: 'Mirorim · Tehran',
    note: 'NestJS and PostgreSQL services with the matching Vue/Nuxt front end.',
  },
  {
    years: '2024 – now',
    title: 'Senior full stack developer',
    place: 'Bayzian · Tallinn (remote)',
    note: 'Lead a six-person team and act as product manager. DynamoDB → PostgreSQL migration, LLM features end to end, about 40% faster page loads.',
  },
]

export type Project = {
  name: string
  kind: string
  url?: string
  line: string
  facts: string[]
  stack: string
}

export const projects: Project[] = [
  {
    name: 'TailStory',
    kind: 'CTO & co-founder · AI pet-health record',
    url: 'https://tailstory-app.com',
    line: 'A pet photo becomes a structured health record. Questions are answered from veterinary textbooks, with citations.',
    facts: ['21 veterinary textbooks', '0.2–1.2 s keyword search in production', '21 languages'],
    stack: 'NestJS · PostgreSQL · pgvector · Expo · Next.js · Gemini',
  },
  {
    name: 'DibaMart',
    kind: 'Own venture · e-commerce for security equipment',
    url: 'https://dibamart.com',
    line: 'An AI shopping assistant grounded on the catalogue, and search that falls back to rules whenever the model fails.',
    facts: ['One API for web, admin and app', 'Voice search, self-hosted speech-to-text', '4-hour supplier SLA with SMS escalation'],
    stack: 'NestJS · Prisma · PostgreSQL · Next.js · Expo · Whisper',
  },
  {
    name: 'HamHam',
    kind: 'Client · pet-food brand platform',
    url: 'https://hamham.vip',
    line: 'Website, admin panel and API in one monorepo, sharing typed Zod contracts end to end.',
    facts: ['330+ automated tests', 'Lighthouse 100 for accessibility, best practices, SEO', 'SMS login and an AI nutrition chat'],
    stack: 'Next.js 16 · NestJS · Prisma · Zod',
  },
  {
    name: 'Bayzian',
    kind: 'Day job · B2B SaaS',
    url: 'https://bernoly.com',
    line: 'Day-to-day lead of a six-person team across frontend, backend and infrastructure, plus product management.',
    facts: ['DynamoDB → PostgreSQL', '≈40% faster page loads', 'Docs-before-code workflow'],
    stack: 'TypeScript · React · Node.js · AWS',
  },
]

export const stack: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'SQL'] },
  { group: 'Backend', items: ['Node.js', 'NestJS', 'Prisma', 'Zod', 'REST / OpenAPI'] },
  { group: 'Frontend & mobile', items: ['React', 'Next.js', 'React Native', 'Expo', 'Vue / Nuxt'] },
  { group: 'AI', items: ['RAG with citations', 'pgvector', 'Gemini', 'OpenAI API', 'Whisper'] },
  { group: 'Data & cloud', items: ['PostgreSQL', 'Supabase', 'AWS', 'Cloudflare', 'Docker', 'GitHub Actions'] },
]
