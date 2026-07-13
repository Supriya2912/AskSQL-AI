from memory import get_last_result


def build_context():

    result = get_last_result()

    if result is None:
        return ""

    columns = result["columns"]
    rows = result["rows"]

    if not rows:
        return ""

    context = "Previous Query Result:\n\n"

    for i, row in enumerate(rows):

        context += f"Row {i+1}\n"

        for col, value in zip(columns, row):
            context += f"{col}: {value}\n"

        context += "\n"

    return context