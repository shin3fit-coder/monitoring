import { useEffect, useState } from "react";
import { Device } from "../types/device";

export function useDeviceWS() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/devices");

    ws.onopen = () => console.log("WS connected");
  ws.onerror = (e) => console.log("WS error:", e);
  ws.onclose = () => console.log("WS closed");
  ws.onmessage = (event) => {
    console.log("WS message:", event.data);
    setDevices(JSON.parse(event.data) as any);
    };
    return () => ws.close();
  }, []);

  return devices;
}
