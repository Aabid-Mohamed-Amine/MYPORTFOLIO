from fastapi import APIRouter, Depends

from app.models.portfolio import PortfolioResponse
from app.services.portfolio_service import get_portfolio

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("", response_model=PortfolioResponse)
async def get_portfolio_endpoint(
    portfolio: PortfolioResponse = Depends(get_portfolio),
) -> PortfolioResponse:
    return portfolio
