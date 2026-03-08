from pydantic import BaseModel

class Device(BaseModel):
    id: str
    name: str
    temperature: float
    humidity: float
    pump: bool
    updatedAt: str
    