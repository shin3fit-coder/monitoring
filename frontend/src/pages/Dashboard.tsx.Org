import React, { useState } from "react";
import DeviceTable from "../components/DeviceTable";
import ChartView from "./Chartview";
import { useDeviceWS } from "../hooks/useDeviceWS";

export default function Dashboard() {
  const [page, setPage] = useState("devices");
  const [collapsed, setCollapsed] = useState(false);
  const devices = useDeviceWS();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* サイドバー */}
      <div
        style={{
          width: collapsed ? 60 : 200,
          background: "#222",
          color: "#fff",
          padding: 20,
          transition: "width 0.3s",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          height: "100vh"
        }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "#444",
            color: "#fff",
            border: "none",
            padding: "8px 10px",
            cursor: "pointer",
            marginBottom: 20
          }}
        >
          {collapsed ? "▶" : "◀"}
        </button>

        {!collapsed && (
          <>
            <button onClick={() => setPage("devices")} style={btnStyle}>
              監視画面
            </button>
            <button onClick={() => setPage("chart")} style={btnStyle}>
              チャート
            </button>
          </>
        )}
      </div>

      {/* メイン画面 */}
      <div style={{ flex: 1, padding: 40, overflowY: "auto" }}>
        {page === "devices" && <DeviceTable devices={devices} />}
        {page === "chart" && <ChartView />}
      </div>
    </div>
  );
}
const btnStyle: React.CSSProperties = {
  padding: "10px 15px",
  background: "#444",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  textAlign: "left"
} as const;