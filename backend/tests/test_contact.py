import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_contact_valid(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/contact",
        json={"name": "Test User", "email": "test@test.com", "message": "Hello world test message"},
    )
    assert r.status_code == 200
    assert r.json()["success"] is True


@pytest.mark.asyncio
async def test_contact_invalid_email_422(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/contact",
        json={"name": "X", "email": "not-an-email", "message": "Hello world test message"},
    )
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_contact_short_message_422(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/contact",
        json={"name": "X", "email": "x@x.com", "message": "Hi"},
    )
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_contact_missing_name_422(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/contact",
        json={"email": "x@x.com", "message": "Hello world test message"},
    )
    assert r.status_code == 422


@pytest.mark.asyncio
async def test_contact_response_message(client: AsyncClient) -> None:
    r = await client.post(
        "/api/v1/contact",
        json={"name": "Mohamed", "email": "m@example.com", "message": "Je suis intéressé par votre profil."},
    )
    assert "48h" in r.json()["message"]
