def validate_sql(sql):

    sql_upper = sql.upper().strip()

    allowed = [
        "SELECT",
        "WITH"
    ]

    forbidden = [
        "DROP",
        "DELETE",
        "UPDATE",
        "ALTER",
        "TRUNCATE",
        "INSERT"
    ]

    for keyword in forbidden:
        if keyword in sql_upper:
            raise Exception(
                f"Unsafe SQL detected: {keyword}"
            )

    if not any(sql_upper.startswith(x) for x in allowed):
        raise Exception(
            "Only SELECT queries are allowed"
        )

    return True