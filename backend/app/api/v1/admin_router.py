from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from pydantic import BaseModel

from app.core.config import get_settings
from app.core.security import create_access_token, verify_token
from app.models.portfolio import PortfolioResponse
from app.services.portfolio_service import get_portfolio, save_portfolio
from app.services.translation_service import auto_fill_en_fields

router = APIRouter(prefix="/admin", tags=["admin"])

CV_DIR = Path(__file__).parent.parent.parent.parent / "static" / "cvs"
CV_DIR.mkdir(parents=True, exist_ok=True)

bearer = HTTPBearer()


def require_admin(credentials: HTTPAuthorizationCredentials = Depends(bearer)) -> None:
    if not verify_token(credentials.credentials):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


class LoginRequest(BaseModel):
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


@router.post("/login", response_model=LoginResponse)
def admin_login(body: LoginRequest) -> LoginResponse:
    settings = get_settings()
    if body.password != settings.admin_password:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong password")
    return LoginResponse(access_token=create_access_token())


@router.get("/portfolio", response_model=PortfolioResponse, dependencies=[Depends(require_admin)])
def read_portfolio() -> PortfolioResponse:
    return get_portfolio()


@router.put("/portfolio", response_model=PortfolioResponse, dependencies=[Depends(require_admin)])
def update_portfolio(data: PortfolioResponse) -> PortfolioResponse:
    # Auto-translate any items missing English fields
    raw = data.model_dump()
    raw = auto_fill_en_fields(raw)
    data = PortfolioResponse.model_validate(raw)
    save_portfolio(data)
    return data


@router.post("/cv/{lang}", dependencies=[Depends(require_admin)])
async def upload_cv(lang: str, file: UploadFile = File(...)) -> dict[str, str]:
    if lang not in ("fr", "en"):
        raise HTTPException(status_code=400, detail="lang must be 'fr' or 'en'")
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files accepted")
    dest = CV_DIR / f"cv_{lang}.pdf"
    dest.write_bytes(await file.read())
    return {"status": "uploaded", "lang": lang}


@router.get("/cv/{lang}", dependencies=[Depends(require_admin)])
def get_cv(lang: str) -> FileResponse:
    if lang not in ("fr", "en"):
        raise HTTPException(status_code=400, detail="lang must be 'fr' or 'en'")
    path = CV_DIR / f"cv_{lang}.pdf"
    if not path.exists():
        raise HTTPException(status_code=404, detail="CV not found")
    return FileResponse(path, media_type="application/pdf", filename=f"CV_Mohamed_Amine_AABID_{lang.upper()}.pdf")
