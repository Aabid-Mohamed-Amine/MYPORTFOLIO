import type { Portfolio } from '../lib/schemas'

export const FALLBACK_PORTFOLIO: Portfolio = {
  experiences: [
    {
      id: 'bdo',
      company: 'BDO Maroc',
      role: 'Data Scientist IA & Cybersécurité — PFE AuditScanIA',
      roleEn: 'AI & Cybersecurity Data Scientist — Final Year Project (AuditScanIA)',
      type: 'PFE',
      typeEn: 'Final Year Project',
      period: 'Fév 2025 – Juil 2025',
      location: 'Casablanca, Maroc',
      description:
        "Conception et déploiement d'AuditScanIA, un système multi-agent IA pour l'automatisation de l'audit cybersécurité. Architecture microservices Docker, orchestration d'agents LLM avec LangChain et Gemini 2.5 Flash.",
      descriptionEn:
        'Design and deployment of AuditScanIA, a multi-agent AI system for cybersecurity audit automation. Microservices Docker architecture, LLM agent orchestration with LangChain and Gemini 2.5 Flash, risk scoring engine (90/100).',
      metrics: ["-46% temps d'audit", '14 microservices Docker', 'Risk Score 90/100'],
      tags: ['Gemini 2.5 Flash', 'LangChain', 'Docker', 'FastAPI', 'RAG'],
      repoUrl: null,
    },
    {
      id: 'snrt',
      company: 'SNRT',
      role: 'Ingénieur IA & NLP — Indexation Audiovisuelle Sémantique',
      roleEn: 'AI & NLP Engineer — Semantic Audiovisual Indexing',
      type: 'Stage',
      typeEn: 'Internship',
      period: 'Juil 2024 – Sep 2024',
      location: 'Rabat, Maroc',
      description:
        'Fine-tuning de Whisper Medium avec LoRA pour la transcription automatique. Indexation sémantique avec FAISS et MiniLM sur 2 500+ segments.',
      descriptionEn:
        'Fine-tuning of Whisper Medium with LoRA for automatic transcription. Semantic indexing with FAISS and MiniLM over 2,500+ segments, NLP search interface.',
      metrics: ['2 500+ segments indexés', 'Whisper Medium LoRA fine-tuned'],
      tags: ['Whisper', 'LoRA', 'FAISS', 'MiniLM', 'Python'],
      repoUrl: 'https://github.com/Aabid-Mohamed-Amine/systeme-indexation-et-recherche-semantique',
    },
    {
      id: '3dsf',
      company: '3D SMART FACTORY',
      role: 'Développeur Data Science & IA — Matching CV & Chatbot RH',
      roleEn: 'Data Science & AI Developer — CV Matching & HR Chatbot',
      type: 'Stage',
      typeEn: 'Internship',
      period: 'Avr 2024 – Juin 2024',
      location: 'Agadir, Maroc',
      description:
        "Développement d'un pipeline de matching CV/offres d'emploi par similarité sémantique et d'un chatbot RAG de support RH.",
      descriptionEn:
        'Development of a CV/job offer matching pipeline using semantic similarity and an HR support RAG chatbot. NLP entity extraction, FastAPI + PostgreSQL deployment.',
      metrics: ['Pipeline CV matching déployé', 'Chatbot RAG RH opérationnel'],
      tags: ['RAG', 'LangChain', 'FastAPI', 'PostgreSQL'],
      repoUrl: 'https://github.com/Aabid-Mohamed-Amine/nlp-recruitment-system',
    },
    {
      id: 'wehelp',
      company: 'WEHELP Group',
      role: 'Développeur Full-Stack — Application SMS en masse',
      roleEn: 'Full-Stack Developer — Bulk SMS Application',
      type: 'Stage PFE',
      typeEn: 'Final Year Internship',
      period: 'Juil 2023 – Sep 2023',
      location: 'Meknès, Maroc',
      description:
        "Développement d'une application d'envoi de SMS en masse pour campagnes marketing et communications d'urgence. Gestion de contacts, création de groupes, envoi multi-destinataires. Backend PHP Laravel, frontend jQuery.",
      descriptionEn:
        "During my final-year internship at WeHelp Group, I developed a bulk SMS sending application for marketing campaigns and emergency communications. Features include contact management, group creation, and multi-recipient sending. PHP Laravel back end, jQuery front end.",
      metrics: ['Application SMS en masse déployée', 'Gestion multi-destinataires', 'Interface jQuery + Laravel'],
      tags: ['PHP', 'Laravel', 'jQuery', 'MySQL', 'WampServer', 'Full-Stack'],
      repoUrl: null,
    },
    {
      id: 'onee',
      company: 'ONEE',
      role: 'Développeur Excel VBA — Dématérialisation documentaire',
      roleEn: 'Excel VBA Developer — Document Digitalisation',
      type: "Stage d'initiation",
      typeEn: 'Introductory Internship',
      period: 'Fév 2023 – Avr 2023',
      location: 'Meknès, Maroc',
      description:
        "Conception d'une application Excel VBA pour la dématérialisation des documents de gestion des contrats de sous-traitance ONEE. Saisie, validation et consultation électronique des documents.",
      descriptionEn:
        "During my introductory internship, I developed a project entitled 'Digitalisation of Outsourcing Contract Management Documents for ONEE.' I designed an Excel VBA application for electronic document completion, validation, and consultation.",
      metrics: ['Application Excel VBA déployée', 'Dématérialisation contrats ONEE', 'Réduction des erreurs de saisie'],
      tags: ['Excel', 'VBA', 'Microsoft Office', 'Automatisation', 'Gestion documentaire'],
      repoUrl: null,
    },
  ],
  projects: [
    {
      id: 'auditscan',
      title: 'AuditScanIA',
      titleEn: 'AuditScanIA',
      subtitle: "Système Multi-Agent IA pour l'Audit Cybersécurité",
      subtitleEn: 'Multi-Agent AI System for Cybersecurity Auditing',
      domainTags: ['MULTI-AGENT AI', 'DOCKER', 'RAG'],
      description:
        "Plateforme d'audit cybersécurité automatisée composée de 14 microservices Docker. Agents LLM spécialisés orchestrés par LangChain. Score de risque automatisé 90/100.",
      descriptionEn:
        'Automated cybersecurity audit platform built from 14 Docker microservices. Specialised LLM agents orchestrated by LangChain. Automated risk score 90/100.',
      architecture: '14 microservices Docker · Gemini 2.5 Flash · LangChain Agents · FAISS',
      benchmarks: ['Risk Score: 90/100', '14 microservices', '-46% audit time'],
      techStack: ['Gemini 2.5 Flash', 'LangChain', 'Docker', 'FastAPI', 'PostgreSQL', 'Redis'],
      repoUrl: null,
      demoUrl: null,
    },
    {
      id: 'audiovisual',
      title: 'Indexation Audiovisuelle Sémantique',
      titleEn: 'Semantic Audiovisual Indexing',
      subtitle: 'Pipeline NLP/ASR pour contenus broadcast SNRT',
      subtitleEn: 'NLP/ASR pipeline for SNRT broadcast content',
      domainTags: ['NLP', 'RAG', 'VECTOR SEARCH'],
      description:
        "Système complet d'indexation sémantique. Fine-tuning Whisper Medium avec LoRA. Vectorisation MiniLM + FAISS.",
      descriptionEn:
        'Full semantic indexing system. Fine-tuned Whisper Medium with LoRA. MiniLM + FAISS vectorisation.',
      architecture: 'Whisper Medium (LoRA) · MiniLM · FAISS · FastAPI',
      benchmarks: ['2 500+ segments indexés', 'WER réduit de 32%'],
      techStack: ['Whisper', 'LoRA', 'FAISS', 'MiniLM', 'Python', 'FastAPI'],
      repoUrl: null,
      demoUrl: null,
    },
    {
      id: 'arabert',
      title: 'Assistant NER Arabe & IA Contextuelle',
      titleEn: 'Arabic NER Assistant & Contextual AI',
      subtitle: "Reconnaissance d'entités nommées en arabe avec AraBERT",
      subtitleEn: 'Named Entity Recognition in Arabic with AraBERT',
      domainTags: ['NLP', 'NER', 'ARABIC NLP'],
      description:
        "Modèle NER pour l'arabe basé sur AraBERT fine-tuné. Interface FastAPI + React. Accuracy 97%, F1-Score 0.82.",
      descriptionEn:
        'NER model for Arabic based on a fine-tuned AraBERT. FastAPI + React interface. Accuracy 97%, F1-Score 0.82.',
      architecture: 'AraBERT (fine-tuned) · FastAPI · React · Docker',
      benchmarks: ['F1-Score: 0.82', 'Accuracy: 97%'],
      techStack: ['AraBERT', 'PyTorch', 'FastAPI', 'React', 'Docker'],
      repoUrl: 'https://github.com/Aabid-Mohamed-Amine/NER--PROJECT',
      demoUrl: null,
    },
    {
      id: 'medical-rag',
      title: 'Chatbot Médical RAG sur Azure',
      titleEn: 'Medical RAG Chatbot on Azure',
      subtitle: 'Assistant IA médical avec retrieval augmenté sur Azure',
      subtitleEn: 'Retrieval-augmented medical AI assistant on Azure',
      domainTags: ['RAG', 'AZURE', 'MLOPS'],
      description:
        'Chatbot médical basé sur RAG avec Azure OpenAI GPT-4. Déploiement CI/CD via GitHub Actions sur Azure Container Instances.',
      descriptionEn:
        'Medical chatbot built on RAG with Azure OpenAI GPT-4. CI/CD deployment via GitHub Actions on Azure Container Instances.',
      architecture: 'Azure OpenAI GPT-4 · LangChain · Chroma DB · Azure Container Instances',
      benchmarks: ['GPT-4 grounded responses', 'Azure deployed'],
      techStack: ['LangChain', 'Azure OpenAI', 'Chroma', 'FastAPI', 'Azure'],
      repoUrl: 'https://github.com/Aabid-Mohamed-Amine/Health-RAG',
      demoUrl: null,
    },
    {
      id: 'cv-mlops',
      title: 'Pipeline MLOps Computer Vision',
      titleEn: 'Computer Vision MLOps Pipeline',
      subtitle: 'Détection et classification médicale — YOLOv8 & ResNet18',
      subtitleEn: 'Medical detection and classification — YOLOv8 & ResNet18',
      domainTags: ['COMPUTER VISION', 'MLOPS'],
      description:
        "Pipeline MLOps complet pour la classification d'images médicales. YOLOv8 + ResNet18. MLflow, Docker, GitHub Actions.",
      descriptionEn:
        'Full MLOps pipeline for medical image classification. YOLOv8 + ResNet18. MLflow, Docker, GitHub Actions.',
      architecture: 'YOLOv8 · ResNet18 · MLflow · Docker · GitHub Actions',
      benchmarks: ['AUC: 0.98', 'YOLOv8 + ResNet18'],
      techStack: ['YOLOv8', 'ResNet18', 'PyTorch', 'MLflow', 'Docker', 'GitHub Actions'],
      repoUrl: null,
      demoUrl: null,
    },
  ],
  education: [
    {
      id: 'master',
      degree: 'Master Science et Ingénierie de Données',
      degreeEn: 'Master in Data Science & Engineering',
      institution: 'Université Mohammed V — ENSIAS',
      year: '2024–2026',
      location: 'Rabat, Maroc',
    },
    {
      id: 'licence',
      degree: "Licence d'Excellence Analyse de Données & IA",
      degreeEn: 'Bachelor of Excellence in Data Analysis & AI',
      institution: 'Université Ibn Zohr — FST',
      year: '2023–2024',
      location: 'Agadir, Maroc',
    },
    {
      id: 'dut',
      degree: 'DUT Génie Informatique',
      degreeEn: 'University Technology Diploma — Computer Engineering',
      institution: 'EST Meknès',
      year: '2021–2023',
      location: 'Meknès, Maroc',
    },
  ],
  certifications: [
    { id: 'cert-ds', title: 'Data Science', issuer: '365 Data Science', year: '2023', url: null },
    { id: 'cert-ml', title: 'Machine Learning', issuer: '365 Data Science', year: '2023', url: null },
    { id: 'cert-dl', title: 'Deep Learning', issuer: '365 Data Science', year: '2024', url: null },
    { id: 'cert-sql', title: 'SQL', issuer: '365 Data Science', year: '2023', url: null },
    {
      id: 'cert-oracle',
      title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
      issuer: 'Oracle',
      year: '2025',
      url: null,
    },
  ],
  skillCategories: [
    {
      category: 'AI & Machine Learning',
      skills: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'Scikit-learn', 'OpenCV'],
    },
    {
      category: 'Data Engineering & Databases',
      skills: ['Apache Spark', 'PostgreSQL', 'MongoDB', 'Redis', 'FAISS', 'Power BI'],
    },
    {
      category: 'MLOps, Backend & Cloud',
      skills: ['Python', 'FastAPI', 'Docker', 'Kubernetes', 'GitHub Actions', 'Azure / AWS'],
    },
  ],
  aboutMetrics: [
    { label: 'Pipelines IA déployés', labelEn: 'Deployed AI Pipelines', value: '5+' },
    { label: 'Repos Open-Source', labelEn: 'Open-Source Repos', value: '10+' },
    { label: 'Modèles Fine-Tunés', labelEn: 'Fine-Tuned Models', value: '4' },
  ],
}
