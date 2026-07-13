from query_executor import execute_query

result = execute_query(
    "SELECT * FROM customers"
)

print(result)