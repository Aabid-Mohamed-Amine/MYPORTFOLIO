import asyncio
import logging
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import get_settings
from app.core.logging import setup_logging

logger = logging.getLogger(__name__)


async def _bootstrap_translations() -> None:
    """Auto-translate FR→EN in the background on startup if cache is missing."""
    from app.services.portfolio_service import OVERRIDE_PATH, get_portfolio, save_portfolio
    from app.services.translation_service import auto_fill_en_fields
    from app.data.portfolio_data import PORTFOLIO_DATA
    import json

    if OVERRIDE_PATH.exists():
        try:
            raw = json.loads(OVERRIDE_PATH.read_text(encoding="utf-8"))
            if raw.get("experiences") and raw["experiences"][0].get("role_en") and \
               raw["experiences"][0]["role_en"] != raw["experiences"][0].get("role"):
                return  # cache valid
        except Exception:
            pass

    logger.info("Auto-translating portfolio content FR→EN…")
    try:
        raw = PORTFOLIO_DATA.model_dump()
        raw = await asyncio.to_thread(auto_fill_en_fields, raw)
        from app.models.portfolio import PortfolioResponse
        data = PortfolioResponse.model_validate(raw)
        save_portfolio(data)
        logger.info("Translation complete — cached to portfolio_override.json")
    except Exception as e:
        logger.warning("Auto-translation failed: %s", e)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    settings = get_settings()
    setup_logging(settings.log_level)
    asyncio.create_task(_bootstrap_translations())
    yield


def create_app() -> FastAPI:
    settings = get_settings()

    application = FastAPI(
        title="Mohamed Amine Aabid — Portfolio API",
        description="AI Engineer portfolio REST API",
        version="1.0.0",
        lifespan=lifespan,
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allow_headers=["Content-Type", "Authorization"],
    )

    application.include_router(api_router)

    @application.get("/health", tags=["health"])
    async def health_check() -> dict[str, str]:
        return {"status": "ok"}

    return application


app = create_app()
