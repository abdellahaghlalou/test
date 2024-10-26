# models.py
from tortoise import fields
from tortoise.models import Model
from enum import Enum

class StatusEnum(str, Enum):
    PAID = "Paid"
    UNPAID = "Unpaid"
    OVERDUE = "Overdue"

class Client(Model):
    client_id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    email = fields.CharField(max_length=100, unique=True)
    phone = fields.CharField(max_length=20, null=True)
    address = fields.CharField(max_length=255, null=True)
    city = fields.CharField(max_length=100, null=True)
    postal_code = fields.CharField(max_length=20, null=True)
    country = fields.CharField(max_length=50, null=True)
    factures = fields.ReverseRelation["Facture"]

class Facture(Model):
    facture_id = fields.IntField(pk=True)
    client = fields.ForeignKeyField("models.Client", related_name="factures", on_delete=fields.CASCADE)
    invoice_date = fields.DateField()
    due_date = fields.DateField()
    total_amount = fields.DecimalField(max_digits=10, decimal_places=2)
    status = fields.CharEnumField(enum_type=StatusEnum, default=StatusEnum.UNPAID)
