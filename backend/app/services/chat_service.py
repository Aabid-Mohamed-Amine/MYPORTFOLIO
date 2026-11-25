from collections.abc import AsyncGenerator

from app.models.contact import ChatRequest


async def stream_chat(request: ChatRequest) -> AsyncGenerator[str, None]:
    # TODO: Replace with LangChain RAG pipeline over portfolio embeddings
    intro = (
        "Bonjour ! Je suis l'assistant IA de Mohamed Amine Aabid, "
        "AI Engineer & Data Scientist. "
    )
    details = (
        "Mohamed Amine possède une expertise en LLM, RAG, Computer Vision et MLOps. "
        "Il a notamment développé AuditScanIA (14 microservices Docker, Gemini 2.5 Flash) "
        "et fine-tuné Whisper pour l'indexation audiovisuelle à la SNRT. "
        "Comment puis-je vous aider ?"
    )

    for chunk in [intro, details]:
        yield f"data: {chunk}\n\n"

    yield "data: [DONE]\n\n"
