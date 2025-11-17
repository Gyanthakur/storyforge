from typing import Any

def format_response(data: Any, message: str = "", status_code: int = 200):
    return {"data": data, "message": message, "status_code": status_code}
