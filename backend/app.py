from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from sql_generator import generate_sql
from sql_fixer import fix_sql
from sql_explainer import explain_sql
from validator import validate_sql
from query_executor import execute_query
from memory import save_interaction, get_memory

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QueryRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return {"message": "AskSQL API Running"}


@app.get("/memory")
def memory():
    return get_memory()


@app.post("/ask")
def ask(request: QueryRequest):

    # -------------------------
    # STEP 1 - Generate SQL
    # -------------------------

    sql = generate_sql(request.question)

    validate_sql(sql)

    corrected = False

    # -------------------------
    # STEP 2 - Execute SQL
    # -------------------------

    try:

        results = execute_query(sql)

    except Exception as db_error:

        print("\nOriginal SQL Failed\n")
        print(db_error)

        # -------------------------
        # STEP 3 - Fix SQL
        # -------------------------

        fixed_sql = fix_sql(
            request.question,
            sql,
            str(db_error)
        )

        validate_sql(fixed_sql)

        try:

            results = execute_query(fixed_sql)

        except Exception as second_error:

            raise HTTPException(
                status_code=400,
                detail=f"""
Original SQL:

{sql}

Corrected SQL:

{fixed_sql}

Still Failed:

{second_error}
"""
            )

        sql = fixed_sql
        corrected = True

    # -------------------------
    # STEP 4 - Explain SQL
    # -------------------------

    explanation = explain_sql(
        request.question,
        sql
    )

    # -------------------------
    # STEP 5 - Save Conversation
    # -------------------------

    save_interaction(
        request.question,
        sql,
        results
    )

    # -------------------------
    # STEP 6 - Return Response
    # -------------------------

    return {
        "question": request.question,
        "sql": sql,
        "corrected": corrected,
        "explanation": explanation,
        "results": results
    }