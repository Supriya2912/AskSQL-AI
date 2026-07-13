
# import ollama
# from schema_loader import get_schema


# def generate_sql(question):

#     # schema = get_schema()
#     schema = "\n".join(
#     retrieve_tables(question))

#     prompt = f"""
# You are an expert PostgreSQL SQL generator.

# Database Schema:

# {schema}

# Rules:
# 1. Generate only PostgreSQL SQL.
# 2. Return ONLY the SQL query.
# 3. Do not explain anything.
# 4. Do not use markdown.
# 5. Do not write ```sql.

# User Question:
# {question}
# """

#     response = ollama.chat(
#         model="llama3.2",
#         messages=[
#             {
#                 "role": "user",
#                 "content": prompt
#             }
#         ]
#     )

#     sql = response["message"]["content"]

#     # Cleanup
#     sql = sql.replace("```sql", "")
#     sql = sql.replace("```", "")
#     sql = sql.replace("Here is the SQL query:", "")
#     sql = sql.strip()

#     return sql

import ollama
from retriever import retrieve_tables
from memory import get_memory
from context_builder import build_context


def generate_sql(question):

    # Retrieve relevant schema from ChromaDB
    relevant_tables = retrieve_tables(question)
    schema = "\n".join(relevant_tables)

    # Get previous conversation memory
    memory = get_memory()

    memory_text = ""

    previous_result_context = build_context()      

    if memory:
        memory_text = "Previous Conversation:\n\n"

        for item in memory:
            memory_text += f"""

   

Question:
{item['question']}

Generated SQL:
{item['sql']}

Results:
{item['results']}

----------------------------------------
"""

    prompt = f"""
You are an expert PostgreSQL SQL generator.

Your job is to convert natural language into accurate PostgreSQL SQL queries.

==============================
Conversation History
==============================

{memory_text}

==============================
Previous Query Result
==============================

{previous_result_context}

==============================
Database Schema
==============================

{schema}

==============================
Rules
==============================

1. Generate ONLY PostgreSQL SQL.
2. Return ONLY SQL.
3. Do NOT explain anything.
4. Do NOT use markdown.
5. Do NOT use ```sql.
6. Never invent tables.
7. Never invent columns.
8. Use ONLY relationships defined in the schema.
9. Never generate DELETE, UPDATE, INSERT, DROP or ALTER statements.

==============================
Business Rules
==============================
- Customer spending is stored in orders.amount.
- Revenue comes from orders.amount.
- payments table does NOT contain amount.
- customers.name stores customer names.
- products.product_name stores product names.
- employees.salary stores salary.
- departments.department_name stores department names.
==============================
Conversation Rules
==============================

If the current question refers to:

- first customer
- second customer
- last customer
- first product
- last department
- that customer
- his
- her
- those orders

Use the Previous Query Result to resolve the reference.

Never guess.

Always use the previous query result if available.

Performance Rules

- Prefer JOIN + GROUP BY over correlated subqueries.
- Avoid nested SELECT statements when a JOIN can be used.
- Use aggregate aliases like total_spent or total_revenue.
==============================
Current Question
==============================

{question}

Return ONLY SQL.
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

    sql = response["message"]["content"]

    # Clean up LLM output
    sql = sql.replace("```sql", "")
    sql = sql.replace("```", "")
    sql = sql.replace("Here is the SQL query:", "")
    sql = sql.strip()

    return sql