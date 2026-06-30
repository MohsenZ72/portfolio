export type Technology = {
  name: string
  slug: string
  color: string
  /** Override when cdn.simpleicons.org slug differs or is unavailable */
  iconSlug?: string
  logoUrl?: string
}

export const technologies: Technology[] = [
  { name: 'Angular', slug: 'angular', color: 'DD0031' },
  { name: 'Nuxt.js', slug: 'nuxt', color: '00DC82' },
  { name: 'Vue.js', slug: 'vuedotjs', color: '4FC08D' },
  { name: 'NestJS', slug: 'nestjs', color: 'E0234E' },
  { name: 'Node.js', slug: 'nodedotjs', color: '339933' },
  { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { name: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { name: 'Laravel', slug: 'laravel', color: 'FF2D20' },
  { name: 'Firebase', slug: 'firebase', color: 'DD2C00' },
  { name: 'MySQL', slug: 'mysql', color: '4479A1' },
  {
    name: 'AWS',
    slug: 'amazonaws',
    color: 'FF9900',
    logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg',
  },
  { name: 'Python', slug: 'python', color: '3776AB' },
  { name: 'Git', slug: 'git', color: 'F05032' },
  { name: 'RxJS', slug: 'reactivex', color: 'B7178C' },
  { name: 'Sass', slug: 'sass', color: 'CC6699' },
]

export function getTechnologyLogoUrl(tech: Technology) {
  if (tech.logoUrl) {
    return tech.logoUrl
  }

  return `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`
}

export function getTechnologyLogoFallbackUrl(tech: Technology) {
  const slug = tech.iconSlug ?? tech.slug
  return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${slug}.svg`
}

export function findTechnologyByName(name: string) {
  const aliases: Record<string, string> = {
    scss: 'sass',
    'laravel (php)': 'laravel',
    'aws lambda': 'aws',
    nuxtjs: 'nuxt.js',
    rxjs: 'rxjs',
  }

  const normalized = name.toLowerCase().trim()
  const aliasTarget = aliases[normalized]

  if (aliasTarget) {
    return technologies.find((tech) => tech.name.toLowerCase() === aliasTarget)
  }

  return technologies.find((tech) => {
    const techName = tech.name.toLowerCase()
    return techName === normalized || techName.replace(/\s+/g, '') === normalized.replace(/\s+/g, '')
  })
}
