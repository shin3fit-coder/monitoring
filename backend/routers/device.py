from datetime import datetime

devices = [
    {
        "id": "A",
        "name": "デバイスA",
        "temperature": 25.1,
        "humidity": 41.2,
        "pump": True,
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    },
    {
        "id": "B",
        "name": "デバイスB",
        "temperature": 26.0,
        "humidity": 39.8,
        "pump": False,
        "updatedAt": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
]