from sqlalchemy import create_engine

DATABASE_URL = "postgresql://postgres:%40Supriya2912@localhost:5432/asksql"

engine = create_engine(DATABASE_URL)

