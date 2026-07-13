from sqlalchemy import text
from db import engine


def execute_query(sql):

    with engine.connect() as conn:

        result = conn.execute(text(sql))

        rows = result.fetchall()

        columns = result.keys()

        return {
            "columns": list(columns),
            "rows": [list(row) for row in rows]
        }