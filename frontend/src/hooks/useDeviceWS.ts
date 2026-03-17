import { useEffect, useState } from "react";
import { Device } from "../types/device";

export function useDeviceWS() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();

      setDevices(prev => {
        const current = prev[0]; // 前回の状態を取得

        const demoDevice: Device = {
          id: "demo-1",
          name: "Demo Device",
          temperature: Number((22 + Math.random() * 10).toFixed(1)),
          humidity: Number((40 + Math.random() * 20).toFixed(1)),
          pump: current?.pump ?? false,   // ← 前回の pump 状態を維持
          updatedAt: now,
        };

        return [demoDevice];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return devices;
}

