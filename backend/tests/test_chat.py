import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_chat_sse_content_type(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/chat",
        json={"message": "Qui est Mohamed Amine ?"},
    )
    assert r.status_code == 200
    assert "text/event-stream" in r.headers["content-type"]


@pytest.mark.asyncio
async def test_chat_non_empty_response(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/chat",
        json={"message": "Quelles sont tes compétences ?"},
    )
    assert len(r.content) > 0


@pytest.mark.asyncio
async def test_chat_response_contains_name(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/chat",
        json={"message": "Présente-toi"},
    )
    assert b"Mohamed Amine" in r.content


@pytest.mark.asyncio
async def test_chat_empty_message_422(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/chat",
        json={"message": ""},
    )
    assert r.status_code == 422
