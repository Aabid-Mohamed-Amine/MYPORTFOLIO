from pydantic import BaseModel


class Experience(BaseModel):
    id: str
    company: str
    role: str
    type: str
    period: str
    location: str
    description: str
    metrics: list[str]
    tags: list[str]
    repo_url: str | None = None


class Project(BaseModel):
    id: str
    title: str
    subtitle: str
    domain_tags: list[str]
    description: str
    architecture: str
    benchmarks: list[str]
    tech_stack: list[str]
    repo_url: str | None = None
    demo_url: str | None = None


class Education(BaseModel):
    id: str
    degree: str
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
    value: str


class PortfolioResponse(BaseModel):
    experiences: list[Experience]
    projects: list[Project]
    education: list[Education]
    certifications: list[Certification]
    skill_categories: list[SkillCategory]
    about_metrics: list[AboutMetric]
