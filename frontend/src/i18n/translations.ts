export type Lang = 'fr' | 'en'

export const translations = {
  fr: {
    nav: {
      experiences: 'Expériences',
      projects: 'Projets',
      formation: 'Formation',
      stack: 'Stack',
      contact: 'Contact',
      cta: 'Me contacter →',
    },
    hero: {
      availability: 'DISPONIBLE · CDI / ALTERNANCE',
      h1a: 'Transformer les données brutes en',
      h1b: 'systèmes intelligents',
      h1c: '.',
      subtitle:
        'Ingénieur IA, Data Engineer & Data Scientist — conception de pipelines de données scalables, fine-tuning NLP/LLM & Computer Vision, et déploiements MLOps production.',
      ctaProjects: 'Voir les projets →',
      ctaCv: 'Télécharger CV',
    },
    experience: {
      eyebrow: 'Parcours professionnel',
      title: 'Expériences',
    },
    projects: {
      eyebrow: 'Réalisations techniques',
      title: 'Projets',
      architecture: 'Architecture',
      code: 'Code',
      demo: 'Demo',
    },
    education: {
      eyebrow: 'Parcours académique',
      title: 'Formation',
      certifications: 'Certifications',
    },
    stack: {
      eyebrow: 'Outils & technologies',
      title: 'Tech Stack',
    },
    about: {
      eyebrow: 'Profil & chiffres',
      title: 'À Propos',
      p1: "Passionné par l'intersection entre l'IA, la data et le déploiement production, je construis des systèmes intelligents capables de passer du prototype à l'échelle industrielle.",
      p2: "Mon profil combine data engineering (pipelines ETL/ELT, Spark, bases vectorielles), machine learning appliqué (NLP, LLM fine-tuning, Computer Vision) et MLOps (conteneurisation, CI/CD, monitoring). Je conçois des architectures bout-en-bout : de l'ingestion des données brutes jusqu'à l'API de serving en production.",
      p3a: 'Je cherche un poste',
      p3b: 'CDI ou Alternance',
      p3c: "pour concevoir et opérer des systèmes d'IA à fort impact, au sein d'une équipe tech exigeante.",
    },
    contact: {
      eyebrow: 'Travaillons ensemble',
      title: 'Prêt à construire le prochain système intelligent ?',
      subtitle:
        "CDI ou Alternance — disponible pour des projets ambitieux en IA, Data Engineering et MLOps.",
      chatOpen: 'Poser une question',
      chatClose: 'Fermer le chat',
      chatLabel: 'AI Assistant — Mohamed Amine Aabid',
      chatPlaceholder: 'Votre question…',
      chatEmpty: 'Posez une question sur mon parcours, mes projets ou mon stack technique…',
      chatError: 'Désolé, une erreur est survenue. Réessayez plus tard.',
    },
    footer: {
      copyright: 'Mohamed Amine Aabid — AI & Data Engineer',
    },
    app: {
      loading: 'Chargement du portfolio…',
      offline: '⚡ Mode offline — données statiques',
    },
  },

  en: {
    nav: {
      experiences: 'Experience',
      projects: 'Projects',
      formation: 'Education',
      stack: 'Stack',
      contact: 'Contact',
      cta: 'Contact me →',
    },
    hero: {
      availability: 'OPEN TO OPPORTUNITIES · FULL-TIME / INTERNSHIP',
      h1a: 'Turning raw data into',
      h1b: 'intelligent',
      h1c: 'systems.',
      subtitle:
        'AI Engineer, Data Engineer & Data Scientist — building scalable data pipelines, fine-tuning NLP/LLM & Computer Vision models, and deploying production-grade MLOps.',
      ctaProjects: 'View projects →',
      ctaCv: 'Download CV',
    },
    experience: {
      eyebrow: 'Professional background',
      title: 'Experience',
    },
    projects: {
      eyebrow: 'Technical achievements',
      title: 'Projects',
      architecture: 'Architecture',
      code: 'Code',
      demo: 'Demo',
    },
    education: {
      eyebrow: 'Academic background',
      title: 'Education',
      certifications: 'Certifications',
    },
    stack: {
      eyebrow: 'Tools & technologies',
      title: 'Tech Stack',
    },
    about: {
      eyebrow: 'Profile & metrics',
      title: 'About',
      p1: 'Passionate about the intersection of AI, data, and production deployment, I build intelligent systems capable of scaling from prototype to industrial level.',
      p2: 'My profile combines data engineering (ETL/ELT pipelines, Spark, vector databases), applied machine learning (NLP, LLM fine-tuning, Computer Vision) and MLOps (containerisation, CI/CD, monitoring). I design end-to-end architectures: from raw data ingestion to the production serving API.',
      p3a: 'I am looking for a',
      p3b: 'full-time or internship',
      p3c: 'position to design and operate high-impact AI systems within a demanding tech team.',
    },
    contact: {
      eyebrow: "Let's work together",
      title: 'Ready to build the next intelligent system?',
      subtitle:
        'Full-time or internship — available for ambitious projects in AI, Data Engineering and MLOps.',
      chatOpen: 'Ask a question',
      chatClose: 'Close chat',
      chatLabel: 'AI Assistant — Mohamed Amine Aabid',
      chatPlaceholder: 'Your question…',
      chatEmpty: 'Ask about my background, projects or tech stack…',
      chatError: 'Sorry, an error occurred. Please try again later.',
    },
    footer: {
      copyright: 'Mohamed Amine Aabid — AI & Data Engineer',
    },
    app: {
      loading: 'Loading portfolio…',
      offline: '⚡ Offline mode — static data',
    },
  },
} as const

export type Translations = (typeof translations)['fr']
