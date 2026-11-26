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
      availability: 'OPEN TO OPPORTUNITIES · CDI / ALTERNANCE',
      h1a: 'Turning raw data into',
      h1b: 'intelligent',
      h1c: 'systems.',
      subtitle:
        'AI Engineer, Data Engineer & Data Scientist — conception de pipelines de données scalables, fine-tuning NLP/LLM & Computer Vision, et déploiements MLOps production.',
      ctaProjects: 'Voir les projets →',
      ctaCv: 'Télécharger CV',
    },
    experience: {
      eyebrow: 'Parcours professionnel',
      title: 'Expériences',
      items: {
        bdo: {
          role: 'AI & Cybersecurity Data Scientist — PFE AuditScanIA',
          type: 'PFE',
          description:
            "Conception et déploiement d'AuditScanIA, un système multi-agent IA pour l'automatisation de l'audit cybersécurité. Architecture microservices Docker, orchestration d'agents LLM avec LangChain et Gemini 2.5 Flash, moteur de scoring de risques (90/100), et pipeline RAG sur référentiels normatifs.",
        },
        snrt: {
          role: 'AI & NLP Engineer — Indexation Audiovisuelle Sémantique',
          type: 'Stage',
          description:
            "Fine-tuning de Whisper Medium avec LoRA pour la transcription automatique de contenus audiovisuels en darija marocaine. Indexation sémantique avec FAISS et MiniLM sur 2 500+ segments, interface de recherche NLP et pipeline de traitement audio end-to-end.",
        },
        '3dsf': {
          role: 'Data Science & AI Developer',
          type: 'Stage',
          description:
            "Développement d'un pipeline de matching CV/offres d'emploi par similarité sémantique et d'un chatbot RAG de support RH. Extraction d'entités NLP, vectorisation de documents avec LangChain, déploiement FastAPI + PostgreSQL.",
        },
        wehelp: {
          role: 'Développeur Full-Stack — Application SMS en masse',
          type: 'Stage PFE',
          description:
            "Développement d'une application d'envoi de SMS en masse destinée aux campagnes marketing et communications d'urgence des entreprises. Interface intuitive avec gestion de contacts, création de groupes et envoi multi-destinataires. Backend PHP Laravel, frontend jQuery.",
        },
        onee: {
          role: 'Développeur Excel VBA — Dématérialisation documentaire',
          type: "Stage d'initiation",
          description:
            "Conception d'une application Excel VBA intitulée « Dématérialisation des documents de gestion des contrats de sous-traitance ONEE ». L'application permet la saisie, la validation et la consultation électronique des documents, remplaçant les formulaires papier et réduisant les erreurs de traitement.",
        },
      },
    },
    projects: {
      eyebrow: 'Réalisations techniques',
      title: 'Projets',
      architecture: 'Architecture',
      code: 'Code',
      demo: 'Demo',
      items: {
        auditscan: {
          title: 'AuditScanIA',
          subtitle: "Système Multi-Agent IA pour l'Audit Cybersécurité",
          description:
            "Plateforme d'audit cybersécurité automatisée composée de 14 microservices Docker. Agents LLM spécialisés (collecte, analyse, scoring, rapport) orchestrés par LangChain. Moteur RAG sur référentiels ISO 27001, NIST et CIS Controls. Score de risque automatisé et génération de rapports PDF.",
        },
        audiovisual: {
          title: 'Indexation Audiovisuelle Sémantique',
          subtitle: 'Pipeline NLP/ASR pour contenus broadcast SNRT',
          description:
            "Système complet d'indexation sémantique de contenus audiovisuels. Fine-tuning Whisper Medium avec LoRA pour la transcription darija. Segmentation et vectorisation avec MiniLM + FAISS pour la recherche sémantique sur 2 500+ segments indexés.",
        },
        arabert: {
          title: 'Assistant NER Arabe & IA Contextuelle',
          subtitle: "Reconnaissance d'entités nommées en arabe avec AraBERT",
          description:
            "Modèle NER pour l'arabe basé sur AraBERT fine-tuné sur corpus annoté. Interface FastAPI + React pour l'annotation en temps réel. Accuracy de 97% sur entités (PER, ORG, LOC) avec F1-Score de 0.82.",
        },
        'medical-rag': {
          title: 'Chatbot Médical RAG sur Azure',
          subtitle: 'Assistant IA médical avec retrieval augmenté sur Azure',
          description:
            "Chatbot médical basé sur RAG avec Azure OpenAI GPT-4 et Chroma vector store. Ingestion de documents médicaux (PDF, articles), chunking sémantique, déploiement CI/CD via GitHub Actions sur Azure Container Instances.",
        },
        'cv-mlops': {
          title: 'Pipeline MLOps Computer Vision',
          subtitle: 'Détection et classification médicale — YOLOv8 & ResNet18',
          description:
            "Pipeline MLOps complet pour la classification d'images médicales. YOLOv8 pour la détection d'objets, ResNet18 pour la classification. Tracking d'expériences MLflow, containerisation Docker, déploiement automatisé avec GitHub Actions.",
        },
      },
    },
    education: {
      eyebrow: 'Parcours académique',
      title: 'Formation',
      certifications: 'Certifications',
      degrees: {
        master: 'Master Science et Ingénierie de Données',
        licence: "Licence d'Excellence Analyse de Données & IA",
        dut: 'DUT Génie Informatique',
      },
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
      metricsLabels: {
        pipelines: 'Pipelines IA déployés',
        repos: 'Repos Open-Source',
        models: 'Modèles Fine-Tunés',
      },
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
      items: {
        bdo: {
          role: 'AI & Cybersecurity Data Scientist — Final Year Project (AuditScanIA)',
          type: 'Final Year Project',
          description:
            'Design and deployment of AuditScanIA, a multi-agent AI system for cybersecurity audit automation. Microservices Docker architecture, LLM agent orchestration with LangChain and Gemini 2.5 Flash, risk scoring engine (90/100), and RAG pipeline on normative repositories.',
        },
        snrt: {
          role: 'AI & NLP Engineer — Semantic Audiovisual Indexing',
          type: 'Internship',
          description:
            'Fine-tuning of Whisper Medium with LoRA for automatic transcription of audiovisual content in Moroccan darija. Semantic indexing with FAISS and MiniLM over 2,500+ segments, NLP search interface and end-to-end audio processing pipeline.',
        },
        '3dsf': {
          role: 'Data Science & AI Developer',
          type: 'Internship',
          description:
            'Development of a CV/job offer matching pipeline using semantic similarity and an HR support RAG chatbot. NLP entity extraction, document vectorisation with LangChain, FastAPI + PostgreSQL deployment.',
        },
        wehelp: {
          role: 'Full-Stack Developer — Bulk SMS Application',
          type: 'Final Year Internship',
          description:
            'During my final-year internship at WeHelp Group, I developed a bulk SMS sending application aimed at facilitating marketing campaigns and emergency communications for businesses. The project offers features such as contact management, group creation, and multi-recipient SMS sending through an intuitive interface. PHP Laravel back end, jQuery front end.',
        },
        onee: {
          role: 'Excel VBA Developer — Document Digitalisation',
          type: 'Introductory Internship',
          description:
            'During my introductory internship, I developed a project entitled "Digitalisation of Outsourcing Contract Management Documents for ONEE." I designed an Excel VBA application that allows users to complete, validate, and consult documents electronically, reducing errors and improving productivity.',
        },
      },
    },
    projects: {
      eyebrow: 'Technical achievements',
      title: 'Projects',
      architecture: 'Architecture',
      code: 'Code',
      demo: 'Demo',
      items: {
        auditscan: {
          title: 'AuditScanIA',
          subtitle: 'Multi-Agent AI System for Cybersecurity Auditing',
          description:
            'Automated cybersecurity audit platform built from 14 Docker microservices. Specialised LLM agents (collection, analysis, scoring, reporting) orchestrated by LangChain. RAG engine over ISO 27001, NIST and CIS Controls repositories. Automated risk scoring and PDF report generation.',
        },
        audiovisual: {
          title: 'Semantic Audiovisual Indexing',
          subtitle: 'NLP/ASR pipeline for SNRT broadcast content',
          description:
            'Full semantic indexing system for audiovisual content. Fine-tuned Whisper Medium with LoRA for darija transcription. Segmentation and vectorisation with MiniLM + FAISS for semantic search over 2,500+ indexed segments.',
        },
        arabert: {
          title: 'Arabic NER Assistant & Contextual AI',
          subtitle: 'Named Entity Recognition in Arabic with AraBERT',
          description:
            'NER model for Arabic based on a fine-tuned AraBERT on an annotated corpus. FastAPI + React interface for real-time annotation. 97% accuracy on entities (PER, ORG, LOC) with an F1-Score of 0.82.',
        },
        'medical-rag': {
          title: 'Medical RAG Chatbot on Azure',
          subtitle: 'Retrieval-augmented medical AI assistant on Azure',
          description:
            'Medical chatbot built on RAG with Azure OpenAI GPT-4 and Chroma vector store. Ingestion of medical documents (PDFs, articles), semantic chunking, CI/CD deployment via GitHub Actions on Azure Container Instances.',
        },
        'cv-mlops': {
          title: 'Computer Vision MLOps Pipeline',
          subtitle: 'Medical detection and classification — YOLOv8 & ResNet18',
          description:
            'Full MLOps pipeline for medical image classification. YOLOv8 for object detection, ResNet18 for classification. MLflow experiment tracking, Docker containerisation, automated deployment with GitHub Actions.',
        },
      },
    },
    education: {
      eyebrow: 'Academic background',
      title: 'Education',
      certifications: 'Certifications',
      degrees: {
        master: 'Master in Data Science & Engineering',
        licence: 'Bachelor of Excellence in Data Analysis & AI',
        dut: 'University Technology Diploma — Computer Engineering',
      },
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
      metricsLabels: {
        pipelines: 'Deployed AI Pipelines',
        repos: 'Open-Source Repos',
        models: 'Fine-Tuned Models',
      },
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
