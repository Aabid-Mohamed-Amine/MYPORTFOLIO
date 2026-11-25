from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.models.contact import ChatRequest
from app.services.chat_service import stream_chat

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("")
async def chat_endpoint(request: ChatRequest) -> StreamingResponse:
    return StreamingResponse(
        stream_chat(request),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )
