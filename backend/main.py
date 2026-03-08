from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import random
from datetime import datetime

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 単一デバイス用（既存）
pump_state = False

def get_temperature():
    return round(random.uniform(22, 35), 1)

def get_humidity():
    return round(random.uniform(35, 60), 1)

@app.get("/status")
def get_status():
    return {
        "temperature": get_temperature(),
        "humidity": get_humidity(),
        "pump": pump_state
    }

@app.post("/pump/{device_id}/{state}")
def set_pump(device_id: str, state: str):
    for d in devices:
        if d["id"] == device_id:
            d["pump"] = (state == "on")
            d["updatedAt"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            return {"id": device_id, "pump": d["pump"]}

    return {"error": "device not found"}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = {
            "temperature": get_temperature(),
            "humidity": get_humidity(),
            "pump": pump_state
        }
        await websocket.send_json(data)
        await asyncio.sleep(1)


# 🟦 ここから複数デバイス用の追加部分 ----------------------

# 複数デバイスのデータ
devices = [
    {
        "id": "A",
        "name": "デバイスA",
        "temperature": 25.1,
        "humidity": 41.2,
        "pump": True,
        "updatedAt": ""
    },
    {
        "id": "B",
        "name": "デバイスB",
        "temperature": 26.0,
        "humidity": 39.8,
        "pump": False,
        "updatedAt": ""
    }
]

@app.websocket("/devices")
async def devices_ws(websocket: WebSocket):
    await websocket.accept()
    while True:
        for d in devices:
            d["temperature"] = round(random.uniform(20, 30), 1)
            d["humidity"] = round(random.uniform(35, 50), 1)
            d["updatedAt"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        await websocket.send_json(devices)
        await asyncio.sleep(2)
