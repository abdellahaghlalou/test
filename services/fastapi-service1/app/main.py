# main.py
from fastapi import FastAPI, HTTPException
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise
from pydantic import BaseModel
from typing import List
from models import Client, Facture

app = FastAPI()

# Pydantic models for request/response validation
class ClientSchema(BaseModel):
    client_id:int
    name: str
    email: str
    phone: str = None
    address: str = None
    city: str = None
    postal_code: str = None
    country: str = None

class FactureSchema(BaseModel):
    client_id: int
    invoice_date: str
    due_date: str
    total_amount: float
    status: str = "Unpaid"

    @classmethod
    def from_orm(cls, obj):
        return cls(
            client_id=obj.client_id,
            invoice_date=obj.invoice_date.isoformat(),  # Convert date to string
            due_date=obj.due_date.isoformat(),          # Convert date to string
            total_amount=obj.total_amount,
            status=obj.status,
        )

# CRUD for Clients
@app.post("/clients/", response_model=ClientSchema)
async def create_client(client: ClientSchema):
    client_obj = await Client.create(**client.dict())
    return client_obj

@app.get("/clients/", response_model=List[ClientSchema])
async def get_clients():
    return await Client.all()

@app.get("/clients/{client_id}", response_model=ClientSchema, responses={404: {"model": HTTPNotFoundError}})
async def get_client(client_id: int):
    client = await Client.filter(client_id=client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

# CRUD for Factures
@app.post("/factures/", response_model=FactureSchema)
async def create_facture(facture: FactureSchema):
    facture_obj = await Facture.create(**facture.dict())
    return facture_obj

@app.get("/factures/", response_model=List[FactureSchema])
async def get_factures():
    factures = await Facture.all().prefetch_related("client")  # Preload client if needed
    return [FactureSchema.from_orm(facture) for facture in factures]


@app.get("/factures/{facture_id}", response_model=FactureSchema, responses={404: {"model": HTTPNotFoundError}})
async def get_facture(facture_id: int):
    facture = await Facture.filter(facture_id=facture_id).first()
    if not facture:
        raise HTTPException(status_code=404, detail="Facture not found")
    return facture

# Tortoise ORM configuration
register_tortoise(
    app,
    db_url="mysql://user:userpassword@localhost:3306/my_database",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
