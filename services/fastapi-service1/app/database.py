# database.py
from tortoise import Tortoise

async def init_db():
    await Tortoise.init(
        db_url="mysql://user:userpassword@localhost:3306/my_database",
        modules={"models": ["models"]}
    )
    await Tortoise.generate_schemas()

async def close_db():
    await Tortoise.close_connections()
