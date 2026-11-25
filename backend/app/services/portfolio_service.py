from app.data.portfolio_data import PORTFOLIO_DATA
from app.models.portfolio import PortfolioResponse


def get_portfolio() -> PortfolioResponse:
    return PORTFOLIO_DATA
