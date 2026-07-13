


# from sqlalchemy import inspect
# from db import engine


# def get_schema():

#     inspector = inspect(engine)

#     schema_text = ""

#     tables = inspector.get_table_names()

#     for table in tables:

#         schema_text += f"\nTable: {table}\n"

#         columns = inspector.get_columns(table)

#         schema_text += "Columns:\n"

#         for column in columns:
#             schema_text += f"{column['name']}\n"

#         schema_text += "\n"

#     return schema_text


from sqlalchemy import inspect
from db import engine
from metadata import TABLE_METADATA


def get_schema():

    inspector = inspect(engine)

    schema_text = ""

    tables = inspector.get_table_names()

    for table in tables:

        schema_text += f"\nTable: {table}\n"

        if table in TABLE_METADATA:
            schema_text += f"Description:\n{TABLE_METADATA[table]}\n"

        schema_text += "\nColumns:\n"

        columns = inspector.get_columns(table)

        for column in columns:
            schema_text += f"- {column['name']}\n"

        foreign_keys = inspector.get_foreign_keys(table)

        if foreign_keys:

            schema_text += "\nRelationships:\n"

            for fk in foreign_keys:

                local_col = fk["constrained_columns"][0]
                ref_table = fk["referred_table"]
                ref_col = fk["referred_columns"][0]

                schema_text += (
                    f"- {local_col} references "
                    f"{ref_table}.{ref_col}\n"
                )

        schema_text += "\n"

    return schema_text