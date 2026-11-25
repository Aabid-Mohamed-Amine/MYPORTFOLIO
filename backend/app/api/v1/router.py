from fastapi import APIRouter

from app.api.v1.chat_router import router as chat_router
from app.api.v1.contact_router import router as contact_router
from app.api.v1.portfolio_router import router as portfolio_router

api_router = APIRouter(prefix="/api/v1")

api_router.include_router(portfolio_router)
api_router.include_router(contact_router)
api_router.include_router(chat_router)
