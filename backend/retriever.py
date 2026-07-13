import chromadb

client = chromadb.PersistentClient(
    path="./chroma_db"
)

collection = client.get_collection(
    name="schema_docs"
)

def retrieve_tables(question):

    result = collection.query(
        query_texts=[question],
        n_results=6
    )

    return result["documents"][0]