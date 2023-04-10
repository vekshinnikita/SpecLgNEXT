import sqlalchemy
from sqlalchemy.orm import  sessionmaker
from sqlalchemy import create_engine 
from .base import BaseModel
from sqlalchemy.engine import URL

url = URL.create(
        'postgresql+psycopg2',
        username='postgres',
        host='localhost',
        database='postgres',
        password='postgres',
        port=5432
    )

db_engine = create_engine('sqlite:///database.db')

def get_session_maker(engine) -> sessionmaker:
    return sessionmaker(engine)

async def proccesed_schemas(engine, metadata):
    metadata.create_all(engine)