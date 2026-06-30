export const profile = {
  name: 'Mohsen Zare',
  role: 'Full-Stack Software Developer',
  location: 'Yerevan, Armenia',
  phone: '+98 912 099 5490',
  whatsapp: '+989038378934',
  email: 'z.mohsen72@gmail.com',
  linkedin: 'https://linkedin.com/in/mohsen-zare',
  summary:
    'Full-Stack Software Developer with 8+ years of experience designing and shipping scalable, user-focused web applications across the stack. Specialized in Angular, Nuxt.js, Vue.js, NestJS, Node.js, and MongoDB, with strong system design and real-time API expertise.',
}

export const skills = [
  {
    title: 'Front-End',
    items: ['Angular', 'Nuxt.js', 'Vue.js', 'RxJS', 'Pinia', 'Vuex', 'SCSS', 'Vuetify', 'Material UI'],
  },
  {
    title: 'Back-End',
    items: ['NestJS', 'Node.js', 'Laravel (PHP)', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'Firebase', 'MySQL'],
  },
  {
    title: 'Architecture',
    items: ['API design', 'Data modeling', 'Real-time systems', 'Service boundaries', 'Scalability'],
  },
  {
    title: 'Cloud & Workflow',
    items: ['AWS Lambda', 'Python', 'Git', 'Agile / Scrum'],
  },
]

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  highlights: string[]
}

export const featuredExperience: ExperienceItem[] = [
  {
    company: 'Bayzian',
    role: 'Full-Stack Software Developer',
    period: 'Oct 2024 - Present',
    location: 'Tallinn, Estonia (Remote)',
    highlights: [
      'Build Angular and Nuxt.js front-ends with NestJS and Node.js services on MongoDB.',
      'Lead system design for service boundaries, API contracts, and database schemas.',
      'Deliver real-time collaboration experiences with robust WebSocket flows.',
    ],
  },
  {
    company: 'SDStudio',
    role: 'Frontend Developer (Freelance)',
    period: 'Oct 2024 - Jan 2025',
    location: 'Remote',
    highlights: [
      'Implemented pixel-accurate Vue.js and Nuxt.js interfaces with SCSS and component libraries.',
      'Created reusable UI systems and improved performance across client websites.',
    ],
  },
  {
    company: 'Mirorim',
    role: 'Full-Stack Developer',
    period: 'Apr 2024 - Sep 2024',
    location: 'Tehran, Iran',
    highlights: [
      'Built product features across Vue.js/Nuxt.js and NestJS/Node.js stacks.',
      'Designed REST APIs and real-time collaboration using WebSockets.',
    ],
  },
  {
    company: 'IREEN',
    role: 'Front-End Lead',
    period: 'May 2022 - Mar 2024',
    location: 'Vienna, Austria (Remote)',
    highlights: [
      'Led frontend architecture and standards for a real-estate intelligence platform in Angular.',
      'Partnered on system design and performance optimization across the full stack.',
    ],
  },
]

export const earlierExperience = [
  'Front-End Developer at IREEN (Oct 2021 - Apr 2022)',
  'Senior Front-End Developer at University of Tehran Science & Technology Park (Jul 2021 - Sep 2021)',
  'Front-End Developer at SISHEMI (Feb 2020 - Jun 2021)',
  'Full-Stack Laravel + Vue.js Developer at Taha Smart Communications (Jul 2018 - Jan 2020)',
  'PHP Teaching Assistant at Sharif Maktab (Sep 2019 - Jan 2020)',
  'Full-Stack Laravel Developer at Fotros Tour & Travel (Jan 2018 - May 2018)',
  'WordPress Developer (Self-Employed) (Sep 2017 - Dec 2017)',
]

export const education = [
  'B.Sc. in Computer Software Engineering (not completed), Islamic Azad University, Central Tehran Branch',
  'Computer Software Engineering, Shahid Chamran University of Ahvaz (Jundi-Shapur)',
]
