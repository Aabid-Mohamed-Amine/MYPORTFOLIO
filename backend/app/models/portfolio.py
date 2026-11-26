from pydantic import BaseModel


class Experience(BaseModel):
    id: str
    company: str
    role: str
    role_en: str | None = None
    type: str
    type_en: str | None = None
    period: str
    location: str
    description: str
    description_en: str | None = None
    metrics: list[str]
    tags: list[str]
    repo_url: str | None = None


class Project(BaseModel):
    id: str
    title: str
    title_en: str | None = None
    subtitle: str
    subtitle_en: str | None = None
    domain_tags: list[str]
    description: str
    description_en: str | None = None
    architecture: str
    benchmarks: list[str]
    tech_stack: list[str]
    repo_url: str | None = None
    demo_url: str | None = None


class Education(BaseModel):
    id: str
    degree: str
    degree_en: str | None = None
    institution: str
    year: str
    location: str


class Certification(BaseModel):
    id: str
    title: str
    issuer: str
    year: str
    url: str | None = None


class SkillCategory(BaseModel):
    category: str
    skills: list[str]


class AboutMetric(BaseModel):
    label: str
    label_en: str | None = None
    value: str


class PortfolioResponse(BaseModel):
    experiences: list[Experience]
    projects: list[Project]
    education: list[Education]
    certifications: list[Certification]
    skill_categories: list[SkillCategory]
    about_metrics: list[AboutMetric]
