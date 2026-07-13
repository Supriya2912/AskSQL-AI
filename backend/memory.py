conversation_memory = []


def save_interaction(question, sql, results):

    conversation_memory.append({
        "question": question,
        "sql": sql,
        "results": results
    })

    # Keep last 5 conversations
    if len(conversation_memory) > 5:
        conversation_memory.pop(0)


def get_memory():
    return conversation_memory


def get_last_result():

    if not conversation_memory:
        return None

    return conversation_memory[-1]["results"]