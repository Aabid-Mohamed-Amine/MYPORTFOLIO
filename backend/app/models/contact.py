from pydantic import BaseModel, EmailStr, Field


class ContactRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=10, max_length=1000)


class ContactResponse(BaseModel):
    success: bool
    message: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[dict[str, str]] = []


class ChatResponse(BaseModel):
    response: str
    sources: list[str] = []
