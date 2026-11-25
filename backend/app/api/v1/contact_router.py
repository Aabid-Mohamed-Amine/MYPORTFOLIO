import structlog

from fastapi import APIRouter

from app.models.contact import ContactRequest, ContactResponse

logger = structlog.get_logger(__name__)

router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("", response_model=ContactResponse)
async def send_contact(request: ContactRequest) -> ContactResponse:
    logger.info("contact_received", name=request.name, email=request.email)
    # TODO: wire SMTP / email service here
    return ContactResponse(
        success=True,
        message="Message reçu. Je vous répondrai sous 48h.",
    )
