# import chromadb

# from schema_loader import get_schema

# client = chromadb.PersistentClient(
#     path="./chroma_db"
# )

# collection = client.get_or_create_collection(
#     name="schema_docs"
# )

# schema = get_schema()

# tables = schema.split("Table:")

# for table in tables:

#     if table.strip():

#         name = table.split("\n")[0].strip()

#         collection.add(
#             documents=[table],
#             ids=[name]
#         )

# print("Vector Store Created")




import chromadb
from schema_loader import get_schema

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_or_create_collection(
    name="schema_docs"
)

schema = get_schema()

tables = schema.split("Table:")

for table in tables:

    if table.strip():

        table_name = table.split("\n")[0].strip()

        try:
            collection.add(
                documents=[table],
                ids=[table_name]
            )
        except:
            pass

print("Vector Store Created Successfully")