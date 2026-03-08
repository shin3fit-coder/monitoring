import DeviceTable from "../components/DeviceTable";
import { useDeviceWS } from "../hooks/useDeviceWS";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import React, { useState, useEffect } from "react";

function DeviceList() {
  const devices = useDeviceWS(); // WebSocketで複数デバイスを受信
  const [history, setHistory] = useState<any[]>([]);

  // ★ WebSocket で受け取った devices を元に history を更新する
  useEffect(() => {
    if (devices.length === 0) return;

    const now = new Date().toLocaleTimeString();

    const newEntry = {
      time: now,
      ...devices.reduce((acc: any, d: any) => {
        acc[`temp_${d.id}`] = d.temperature;
        acc[`hum_${d.id}`] = d.humidity;
        return acc;
      }, {})
    };

    setHistory((prev) => [...prev.slice(-59), newEntry]); // 過去60秒だけ保持
  }, [devices]); // ★ devices が更新されるたびに実行

  return (
    <div style={{ padding: 40 }}>
      <h2>デバイス一覧</h2>
      <DeviceTable devices={devices} />

      <LineChart width={700} height={350} data={history}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />

  {devices.map((d) => (
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

export default DeviceList;