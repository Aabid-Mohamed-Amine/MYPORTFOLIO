import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_portfolio_200(client: AsyncClient) -> None:
    r = await client.get("/api/v1/portfolio")
    assert r.status_code == 200


@pytest.mark.asyncio
async def test_portfolio_has_5_experiences(client: AsyncClient) -> None:
    data = (await client.get("/api/v1/portfolio")).json()
    assert len(data["experiences"]) == 5


@pytest.mark.asyncio
async def test_portfolio_has_5_projects(client: AsyncClient) -> None:
    data = (await client.get("/api/v1/portfolio")).json()
    assert len(data["projects"]) == 5


@pytest.mark.asyncio
async def test_portfolio_has_3_skill_categories(client: AsyncClient) -> None:
    data = (await client.get("/api/v1/portfolio")).json()
    assert len(data["skill_categories"]) == 3


@pytest.mark.asyncio
async def test_portfolio_first_experience_is_bdo(client: AsyncClient) -> None:
    data = (await client.get("/api/v1/portfolio")).json()
    assert data["experiences"][0]["id"] == "bdo"
    assert "-46% temps d'audit" in data["experiences"][0]["metrics"]
