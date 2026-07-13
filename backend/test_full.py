from sql_generator import generate_sql
from query_executor import execute_query

question = "Show all customers"

sql = generate_sql(question)

print("Generated SQL:")
print(sql)

result = execute_query(sql)

print("\nResults:")
print(result)