import React, { useState, useEffect } from "react";
import { useDeviceWS } from "../hooks/useDeviceWS";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function ChartView() {
    const { devices: deviceList } = useDeviceWS();
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
    if (deviceList.length === 0) return;

    const now = new Date().toLocaleTimeString();

    const newEntry = {
      time: now,
      ...deviceList.reduce((acc: any, d: any) => {
        acc[`temp_${d.id}`] = d.temperature;
        acc[`hum_${d.id}`] = d.humidity;
        return acc;
      }, {})
    };
    setHistory((prev) => [...prev.slice(-59), newEntry]);
  }, [deviceList]);

  return (
    <div>
      <h2>リアルタイムチャート</h2>

      <LineChart width={700} height={350} data={history}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />

        {deviceList.map((d) => (
          <React.Fragment key={d.id}>
            <Line
              type="monotone"
              dataKey={`temp_${d.id}`}
              stroke="#ff7300"
              dot={false}
              name={`Temp ${d.id}`}
            />
            <Line
              type="monotone"
              dataKey={`hum_${d.id}`}
              stroke="#0077ff"
              dot={false}
              name={`Hum ${d.id}`}
            />
          </React.Fragment>
        ))}
      </LineChart>
    </div>
  );
}
