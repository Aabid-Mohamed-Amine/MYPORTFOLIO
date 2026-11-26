from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(tags=["cv"])

CV_DIR = Path(__file__).parent.parent.parent.parent / "static" / "cvs"

# Seed FR CV from frontend/public if backend copy doesn't exist yet
_FRONTEND_FR = (
    Path(__file__).parent.parent.parent.parent.parent
    / "frontend"
    / "public"
    / "CV_Mohamed_Amine_AABID_FR.pdf"
)


def _seed_cv(lang: str) -> None:
    dest = CV_DIR / f"cv_{lang}.pdf"
    if not dest.exists() and lang == "fr" and _FRONTEND_FR.exists():
        CV_DIR.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(_FRONTEND_FR.read_bytes())


@router.get("/cv/{lang}")
def download_cv(lang: str) -> FileResponse:
    if lang not in ("fr", "en"):
        raise HTTPException(status_code=400, detail="lang must be 'fr' or 'en'")
    _seed_cv(lang)
    path = CV_DIR / f"cv_{lang}.pdf"
    if not path.exists():
        raise HTTPException(status_code=404, detail="CV not found")
    return FileResponse(
        path,
        media_type="application/pdf",
        filename=f"CV_Mohamed_Amine_AABID_{lang.upper()}.pdf",
        headers={"Content-Disposition": f'attachment; filename="CV_Mohamed_Amine_AABID_{lang.upper()}.pdf"'},
    )
