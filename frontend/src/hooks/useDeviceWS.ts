import { useEffect, useState } from "react";
import { Device } from "../types/device";

export function useDeviceWS() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();

      const demoDevice: Device = {
        id: "demo-1",
        name: "Demo Device",
        temperature: Number((22 + Math.random() * 10).toFixed(1)),
        humidity: Number((40 + Math.random() * 20).toFixed(1)),
        pump: Math.random() > 0.5, // boolean
        updatedAt: now,
      };

      setDevices([demoDevice]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return devices;
}

