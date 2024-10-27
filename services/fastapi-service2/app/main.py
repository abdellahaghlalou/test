# integration_api.py

from fastapi import FastAPI
import httpx
from typing import Dict , Any
from pydantic import BaseModel
from collections import defaultdict

app = FastAPI()

CRUD_API_BASE_URL = "http://127.0.0.1:8000"  # Replace with the actual CRUD API URL

@app.get("/unpaid-invoices-count-by-city")
async def get_unpaid_invoices_by_city() -> Dict[str, Any]:
    async with httpx.AsyncClient() as client:
        # Fetch all clients and invoices from the CRUD API
        clients_response = await client.get(f"{CRUD_API_BASE_URL}/clients/")
        invoices_response = await client.get(f"{CRUD_API_BASE_URL}/factures/")

        
        clients = clients_response.json()
        invoices = invoices_response.json()
        

    # Calculate unpaid invoice count by city
    unpaid_invoices_by_city = {}
    client_city_mapping = {client["client_id"]: client["city"] for client in clients}

        # Create a dictionary to hold the results
    summary = defaultdict(lambda: {'client_count': 0, 'total_unpaid_amount': 0})

    # Aggregate data
    for invoice in invoices:
        if invoice['status'] == "Unpaid":
            client_id = invoice['client_id']
            city = client_city_mapping.get(client_id)

            if city:
                summary[city]['client_count'] += 1  # Count the client
                summary[city]['total_unpaid_amount'] += invoice['total_amount']  # Sum the unpaid amounts

    # Transform summary to the desired output format
    result = {city: {'client_count': data['client_count'], 'total_unpaid_amount': data['total_unpaid_amount']}
                for city, data in summary.items()}
    return result
