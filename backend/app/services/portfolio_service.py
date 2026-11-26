import json
from pathlib import Path

from app.data.portfolio_data import PORTFOLIO_DATA
from app.models.portfolio import PortfolioResponse

OVERRIDE_PATH = Path(__file__).parent.parent / "data" / "portfolio_override.json"


def _needs_translation(raw: dict) -> bool:
    """Return True if any translatable EN field is missing."""
    for exp in raw.get("experiences", []):
        if not exp.get("role_en") or not exp.get("description_en"):
            return True
    for proj in raw.get("projects", []):
        if not proj.get("title_en") or not proj.get("description_en"):
            return True
    for edu in raw.get("education", []):
        if not edu.get("degree_en"):
            return True
    for metric in raw.get("about_metrics", []):
        if not metric.get("label_en"):
            return True
    return False


def get_portfolio() -> PortfolioResponse:
    if OVERRIDE_PATH.exists():
        try:
            raw = json.loads(OVERRIDE_PATH.read_text(encoding="utf-8"))
            if not _needs_translation(raw):
                return PortfolioResponse.model_validate(raw)
        except Exception:
            pass

    # No valid cached translation — auto-translate and cache
    from app.services.translation_service import auto_fill_en_fields

    raw = PORTFOLIO_DATA.model_dump()
    raw = auto_fill_en_fields(raw)
    data = PortfolioResponse.model_validate(raw)
    save_portfolio(data)
    return data


def save_portfolio(data: PortfolioResponse) -> None:
    OVERRIDE_PATH.write_text(
        data.model_dump_json(indent=2),
        encoding="utf-8",
    )
