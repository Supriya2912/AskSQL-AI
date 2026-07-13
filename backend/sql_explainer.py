import ollama


def explain_sql(question, sql):

    prompt = f"""
You are a SQL teacher.

Explain this SQL query in very simple English.

Question:
{question}

SQL:
{sql}

Rules:
- Maximum 5 bullet points.
- Simple language.
- Do not explain SQL syntax.
- Explain what the query does.
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

    return response["message"]["content"].strip()