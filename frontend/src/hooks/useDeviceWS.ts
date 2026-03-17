import { useEffect, useState } from "react";
import { Device } from "../types/device";

export function useDeviceWS() {
  const [devices, setDevices] = useState<Device[]>([]);

  // ★ ポンプ切り替え（デモモード用）
  const togglePump = () => {
    setDevices(prev => {
      const current = prev[0];
      if (!current) return prev;

      return [{
        ...current,
        pump: !current.pump,   // ← ここで切り替える
      }];
    });
  };

  // ★ デモデータ更新（pump は上書きしない）
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString();

      setDevices(prev => {
        const current = prev[0];

        const demoDevice: Device = {
          id: "demo-1",
          name: "Demo Device",
          temperature: Number((22 + Math.random() * 10).toFixed(1)),
          humidity: Number((40 + Math.random() * 20).toFixed(1)),
          pump: current?.pump ?? false,   // ← 前回の状態を維持
          updatedAt: now,
        };

        return [demoDevice];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { devices, togglePump };
}

