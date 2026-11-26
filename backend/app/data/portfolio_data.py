from app.models.portfolio import (
    AboutMetric,
    Certification,
    Education,
    Experience,
    PortfolioResponse,
    Project,
    SkillCategory,
)

PORTFOLIO_DATA = PortfolioResponse(
    experiences=[
        Experience(
            id="bdo",
            company="BDO Maroc",
            role="Data Scientist IA & Cybersécurité — PFE AuditScanIA",
            type="PFE",
            period="Fév 2025 – Juil 2025",
            location="Casablanca, Maroc",
            description=(
                "Conception et déploiement d'AuditScanIA, un système multi-agent IA "
                "pour l'automatisation de l'audit cybersécurité. Architecture microservices "
                "Docker, orchestration d'agents LLM avec LangChain et Gemini 2.5 Flash, "
                "moteur de scoring de risques (90/100), et pipeline RAG sur référentiels normatifs."
            ),
            metrics=["-46% temps d'audit", "14 microservices Docker", "Risk Score 90/100"],
            tags=["Gemini 2.5 Flash", "LangChain", "Docker", "FastAPI", "RAG", "PostgreSQL", "Redis"],
        ),
        Experience(
            id="snrt",
            company="SNRT",
            role="Ingénieur IA & NLP — Indexation Audiovisuelle Sémantique",
            type="Stage",
            period="Juil 2024 – Sep 2024",
            location="Rabat, Maroc",
            description=(
                "Fine-tuning de Whisper Medium avec LoRA pour la transcription automatique "
                "de contenus audiovisuels en darija marocaine. Indexation sémantique avec FAISS "
                "et MiniLM sur 2 500+ segments, interface de recherche NLP et pipeline de "
                "traitement audio end-to-end."
            ),
            metrics=["2 500+ segments indexés", "Whisper Medium LoRA fine-tuned", "WER réduit de 32%"],
            tags=["Whisper", "LoRA", "FAISS", "MiniLM", "Python", "NLP", "Transformers"],
            repo_url="https://github.com/Aabid-Mohamed-Amine/systeme-indexation-et-recherche-semantique",
        ),
        Experience(
            id="3dsf",
            company="3D SMART FACTORY",
            role="Développeur Data Science & IA — Matching CV & Chatbot RH",
            type="Stage",
            period="Avr 2024 – Juin 2024",
            location="Agadir, Maroc",
            description=(
                "Développement d'un pipeline de matching CV/offres d'emploi par similarité sémantique "
                "et d'un chatbot RAG de support RH. Extraction d'entités NLP, vectorisation de documents "
                "avec LangChain, déploiement FastAPI + PostgreSQL."
            ),
            metrics=["Pipeline CV matching déployé", "Chatbot RAG RH opérationnel"],
            tags=["RAG", "LangChain", "FastAPI", "PostgreSQL", "NLP", "Python"],
            repo_url="https://github.com/Aabid-Mohamed-Amine/nlp-recruitment-system",
        ),
        Experience(
            id="wehelp",
            company="WEHELP Group",
            role="Développeur Full-Stack — Application SMS en masse",
            type="Stage PFE",
            period="Juil 2023 – Sep 2023",
            location="Meknès, Maroc",
            description=(
                "Développement d'une application d'envoi de SMS en masse destinée aux campagnes "
                "marketing et communications d'urgence des entreprises. Interface intuitive avec "
                "gestion de contacts, création de groupes et envoi multi-destinataires. "
                "Backend PHP Laravel, frontend jQuery, déployé sous WampServer."
            ),
            metrics=["Application SMS en masse déployée", "Gestion multi-destinataires", "Interface jQuery + Laravel"],
            tags=["PHP", "Laravel", "jQuery", "MySQL", "WampServer", "Full-Stack"],
        ),
        Experience(
            id="onee",
            company="ONEE",
            role="Développeur Excel VBA — Dématérialisation documentaire",
            type="Stage d'initiation",
            period="Fév 2023 – Avr 2023",
            location="Meknès, Maroc",
            description=(
                "Conception d'une application Excel VBA intitulée « Dématérialisation des documents "
                "de gestion des contrats de sous-traitance ONEE ». L'application permet la saisie, "
                "la validation et la consultation électronique des documents, remplaçant les "
                "formulaires papier et réduisant les erreurs de traitement."
            ),
            metrics=["Application Excel VBA déployée", "Dématérialisation contrats ONEE", "Réduction des erreurs de saisie"],
            tags=["Excel", "VBA", "Microsoft Office", "Automatisation", "Gestion documentaire"],
        ),
    ],
    projects=[
        Project(
            id="auditscan",
            title="AuditScanIA",
            subtitle="Système Multi-Agent IA pour l'Audit Cybersécurité",
            domain_tags=["MULTI-AGENT AI", "DOCKER", "RAG"],
            description=(
                "Plateforme d'audit cybersécurité automatisée composée de 14 microservices Docker. "
                "Agents LLM spécialisés (collecte, analyse, scoring, rapport) orchestrés par LangChain. "
                "Moteur RAG sur référentiels ISO 27001, NIST et CIS Controls. "
                "Score de risque automatisé et génération de rapports PDF."
            ),
            architecture=(
                "14 microservices Docker · Gemini 2.5 Flash · LangChain Agents · "
                "FAISS Vector Store · FastAPI Gateway · PostgreSQL · Redis Cache"
            ),
            benchmarks=["Risk Score: 90/100", "14 microservices", "-46% audit time", "ISO 27001 / NIST"],
            tech_stack=["Gemini 2.5 Flash", "LangChain", "Docker", "FastAPI", "PostgreSQL", "Redis", "FAISS"],
            repo_url=None,
        ),
        Project(
            id="audiovisual",
            title="Indexation Audiovisuelle Sémantique",
            subtitle="Pipeline NLP/ASR pour contenus broadcast SNRT",
            domain_tags=["NLP", "RAG", "VECTOR SEARCH"],
            description=(
                "Système complet d'indexation sémantique de contenus audiovisuels. "
                "Fine-tuning Whisper Medium avec LoRA pour la transcription darija. "
                "Segmentation et vectorisation avec MiniLM + FAISS pour la recherche "
                "sémantique sur 2 500+ segments indexés."
            ),
            architecture=(
                "Whisper Medium (LoRA fine-tuned) · MiniLM embeddings · "
                "FAISS index · FastAPI · Python pipeline"
            ),
            benchmarks=["2 500+ segments indexés", "WER réduit de 32%", "Recherche < 100ms"],
            tech_stack=["Whisper", "LoRA", "FAISS", "MiniLM", "Python", "FastAPI", "Transformers"],
            repo_url=None,
        ),
        Project(
            id="arabert",
            title="Assistant NER Arabe & IA Contextuelle",
            subtitle="Reconnaissance d'entités nommées en arabe avec AraBERT",
            domain_tags=["NLP", "NER", "ARABIC NLP"],
            description=(
                "Modèle NER pour l'arabe basé sur AraBERT fine-tuné sur corpus annoté. "
                "Interface FastAPI + React pour l'annotation en temps réel. "
                "Accuracy de 97% sur entités (PER, ORG, LOC) avec F1-Score de 0.82."
            ),
            architecture=(
                "AraBERT (fine-tuned) · FastAPI backend · React frontend · "
                "Docker deployment · Hugging Face hub"
            ),
            benchmarks=["F1-Score: 0.82", "Accuracy: 97%", "AraBERT fine-tuned"],
            tech_stack=["AraBERT", "PyTorch", "FastAPI", "React", "Docker", "Hugging Face"],
            repo_url="https://github.com/Aabid-Mohamed-Amine/NER--PROJECT",
        ),
        Project(
            id="medical-rag",
            title="Chatbot Médical RAG sur Azure",
            subtitle="Assistant IA médical avec retrieval augmenté sur Azure",
            domain_tags=["RAG", "AZURE", "MLOPS"],
            description=(
                "Chatbot médical basé sur RAG avec Azure OpenAI GPT-4 et Chroma vector store. "
                "Ingestion de documents médicaux (PDF, articles), chunking sémantique, "
                "déploiement CI/CD via GitHub Actions sur Azure Container Instances."
            ),
            architecture=(
                "Azure OpenAI GPT-4 · LangChain · Chroma DB · "
                "FastAPI · Azure Container Instances · GitHub Actions CI/CD"
            ),
            benchmarks=["GPT-4 grounded responses", "Azure deployed", "CI/CD pipeline"],
            tech_stack=["LangChain", "Azure OpenAI", "Chroma", "FastAPI", "Azure", "GitHub Actions"],
            repo_url="https://github.com/Aabid-Mohamed-Amine/Health-RAG",
        ),
        Project(
            id="cv-mlops",
            title="Pipeline MLOps Computer Vision",
            subtitle="Détection et classification médicale — YOLOv8 & ResNet18",
            domain_tags=["COMPUTER VISION", "MLOPS"],
            description=(
                "Pipeline MLOps complet pour la classification d'images médicales. "
                "YOLOv8 pour la détection d'objets, ResNet18 pour la classification. "
                "Tracking d'expériences MLflow, containerisation Docker, "
                "déploiement automatisé avec GitHub Actions."
            ),
            architecture=(
                "YOLOv8 · ResNet18 · MLflow experiment tracking · "
                "Docker · GitHub Actions · FastAPI inference API"
            ),
            benchmarks=["AUC: 0.98", "YOLOv8 + ResNet18", "MLflow tracked"],
            tech_stack=["YOLOv8", "ResNet18", "PyTorch", "MLflow", "Docker", "GitHub Actions", "FastAPI"],
            repo_url=None,
        ),
    ],
    education=[
        Education(
            id="master",
            degree="Master Science et Ingénierie de Données",
            institution="Université Mohammed V — ENSIAS",
            year="2024–2026",
            location="Rabat, Maroc",
        ),
        Education(
            id="licence",
            degree="Licence d'Excellence Analyse de Données & IA",
            institution="Université Ibn Zohr — FST",
            year="2023–2024",
            location="Agadir, Maroc",
        ),
        Education(
            id="dut",
            degree="DUT Génie Informatique",
            institution="EST Meknès",
            year="2021–2023",
            location="Meknès, Maroc",
        ),
    ],
    certifications=[
        Certification(id="cert-ds", title="Data Science", issuer="365 Data Science", year="2023"),
        Certification(id="cert-ml", title="Machine Learning", issuer="365 Data Science", year="2023"),
        Certification(id="cert-dl", title="Deep Learning", issuer="365 Data Science", year="2024"),
        Certification(id="cert-sql", title="SQL", issuer="365 Data Science", year="2023"),
        Certification(
            id="cert-oracle",
            title="Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
            issuer="Oracle",
            year="2025",
        ),
    ],
    skill_categories=[
        SkillCategory(
            category="AI & Machine Learning",
            skills=["PyTorch", "TensorFlow", "Hugging Face", "LangChain", "Scikit-learn", "OpenCV"],
        ),
        SkillCategory(
            category="Data Engineering & Databases",
            skills=["Apache Spark", "PostgreSQL", "MongoDB", "Redis", "FAISS", "Power BI"],
        ),
        SkillCategory(
            category="MLOps, Backend & Cloud",
            skills=["Python", "FastAPI", "Docker", "Kubernetes", "GitHub Actions", "Azure / AWS"],
        ),
    ],
    about_metrics=[
        AboutMetric(label="Pipelines IA déployés", value="5+"),
        AboutMetric(label="Repos Open-Source", value="10+"),
        AboutMetric(label="Modèles Fine-Tunés", value="4"),
    ],
)
