import { Device } from "../types/device";

function DeviceTable({ devices }: { devices: Device[] }) {
  const getRowColor = (d: Device) => {
    if (d.temperature >= 35 || d.humidity < 30) return "#ffcccc";
    if (d.temperature >= 30 || d.humidity < 40) return "#fff0b3";
    return "white";
  };
 const togglePump = async (device: Device) => {
  const endpoint = device.pump
    ? `http://localhost:8000/pump/${device.id}/off`
    : `http://localhost:8000/pump/${device.id}/on`;

  await fetch(endpoint, { method: "POST" });
};

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed"   // ← ★ これが最重要！
      }}
    >
<thead>
 {/* ★ 日付・時間の行（全列にまたがる） */}
  <tr>
    <th
      colSpan={5}
      style={{
        textAlign: "left",
        padding: "6px 4px",
        fontWeight: "bold",
        background: "#fafafa",
        borderBottom: "1px solid #ccc"
      }}
    >
      {new Date().toLocaleString()}
    </th>
  </tr>
  <tr style={{ background: "#f5f5f5" }}>
    <th style={{ width: 140, borderRight: "1px solid #ccc", padding: "8px" }}>デバイス名</th>
    <th style={{ width: 80, borderRight: "1px solid #ccc", padding: "8px" }}>温度</th>
    <th style={{ width: 80, borderRight: "1px solid #ccc", padding: "8px" }}>湿度</th>
    <th style={{ width: 100, borderRight: "1px solid #ccc", padding: "8px" }}>ポンプ状態</th>
    <th style={{ width: 110, padding: "8px" }}>操作</th>  {/* ← ★ここが重要 */}
  </tr>
</thead>
<tbody>
  {devices.map((d) => (
    <tr key={d.id} style={{ background: getRowColor(d) }}>
      <td>{d.id}</td>

      <td style={{ textAlign: "right" }}>{d.temperature.toFixed(1)}</td>

      <td style={{ textAlign: "right" }}>{d.humidity.toFixed(1)}</td>

      {/* ポンプ状態 */}
      <td style={{ 
          textAlign: "center",
          fontWeight: "bold",
          color: d.pump ? "#44aa44" : "#cc4444"  // ON=緑 / OFF=赤
      }}>
          {d.pump ? "ON" : "OFF"}
      </td>

      {/* ★ 操作ボタン（専用の列に移動） */}
        <td
          style={{
          width: 110,                 // ← ★ 同じ幅を指定
          borderRight: "1px solid #ccc",
          padding: "8px",
          textAlign: "center",
          whiteSpace: "nowrap"
         }}
        >
        <button
          onClick={() => togglePump(d)}
          style={{
            padding: "6px 12px",
            width: 100,
            background: "#f0f0f0",   // ← 常に同じ色
            color: "black",
            border: "1px solid #ccc",
            cursor: "pointer",
            borderRadius: 4,
            textAlign: "center"
          }}
         >
           {d.pump ? "OFFにする" : "ONにする"}
        </button>
      </td>
    </tr>
  ))}
</tbody>
    </table>
  );
}

export default DeviceTable;
