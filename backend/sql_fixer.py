import ollama
from retriever import retrieve_tables


def fix_sql(question, sql, error):

    # Get relevant schema
    relevant_tables = retrieve_tables(question)
    schema = "\n".join(relevant_tables)

    prompt = f"""
You are an expert PostgreSQL SQL fixer.

Database Schema:

{schema}

Question:
{question}

Wrong SQL:
{sql}

Database Error:
{error}

Fix the SQL.

Rules:

1. Return ONLY SQL.
2. No explanation.
3. No markdown.
4. Never invent tables.
5. Never invent columns.
6. Use ONLY columns present in the schema.
7. Customer spending is stored in orders.amount.
8. Customer name is stored in customers.name.
9. orders.customer_id references customers.id.
"""

    response = ollama.chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    fixed_sql = response["message"]["content"]

    fixed_sql = (
        fixed_sql
        .replace("```sql", "")
        .replace("```", "")
        .replace("The corrected SQL is:", "")
        .replace("Here is the corrected SQL:", "")
        .strip()
    )

    return fixed_sql