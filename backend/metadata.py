TABLE_METADATA = {

    "customers": """
Purpose:
Stores customer information.

Business Meaning:
Every customer can place multiple orders.

Important Columns:
- id : Primary Key
- name : Customer Name
- city : Customer City

Relationships:
- customers.id -> orders.customer_id

Business Rules:
- Customer spending is calculated from orders.amount.
- Customers are linked to orders using customer_id.

Example Questions:
- Show customers from Pune.
- Who spent the most money?
- Top 5 customers by spending.
- Which city has the most customers?
""",


    "orders": """
Purpose:
Stores every purchase made by customers.

Business Meaning:
This table represents company sales.

Important Columns:
- id
- customer_id
- product_id
- amount
- order_date

Relationships:
- customer_id -> customers.id
- product_id -> products.id

Business Rules:
- Revenue = SUM(amount)
- Customer Spending = SUM(amount)
- Product Revenue = SUM(amount)

Important:
There is NO total_amount column.
There is NO spending column.

Example Questions:
- Total revenue
- Monthly sales
- Highest spending customer
- Product with highest revenue
""",


    "products": """
Purpose:
Stores product information.

Important Columns:
- id
- product_name
- category
- price

Relationships:
- products.id -> orders.product_id

Business Rules:
- Product revenue is calculated from orders.amount.
- Products are sold through orders.

Example Questions:
- Best selling product
- Product with highest revenue
- Product sales
""",


    "payments": """
Purpose:
Stores payment information.

Important Columns:
- id
- order_id
- payment_method
- payment_status

Relationships:
- order_id -> orders.id

Business Rules:
- Payments DO NOT contain amount.
- Revenue is NOT calculated from this table.
- Payment analysis uses payment_method and payment_status only.

Example Questions:
- Most used payment method
- Successful payments
- Failed payments
""",


    "employees": """
Purpose:
Stores employee information.

Important Columns:
- id
- employee_name
- department_id
- salary

Relationships:
- department_id -> departments.id

Business Rules:
- Salary analysis uses salary column.
- Average salary = AVG(salary)

Example Questions:
- Highest paid employee
- Department with highest average salary
- Employees earning above 50000
""",


    "departments": """
Purpose:
Stores company departments.

Important Columns:
- id
- department_name

Relationships:
- departments.id -> employees.department_id

Business Rules:
- Department statistics are calculated using employees table.

Example Questions:
- Department with highest average salary
- Number of employees in each department
"""
}