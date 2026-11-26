import json
from pathlib import Path

from app.data.portfolio_data import PORTFOLIO_DATA
from app.models.portfolio import PortfolioResponse

OVERRIDE_PATH = Path(__file__).parent.parent / "data" / "portfolio_override.json"


def get_portfolio() -> PortfolioResponse:
    if OVERRIDE_PATH.exists():
        try:
            data = json.loads(OVERRIDE_PATH.read_text(encoding="utf-8"))
            return PortfolioResponse.model_validate(data)
        except Exception:
            pass
    return PORTFOLIO_DATA


def save_portfolio(data: PortfolioResponse) -> None:
    OVERRIDE_PATH.write_text(
        data.model_dump_json(indent=2),
        encoding="utf-8",
    )
