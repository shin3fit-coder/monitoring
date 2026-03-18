import { Device } from "../types/device";

function DeviceTable({
  deviceList,
  togglePump,
}: {
  deviceList: Device[];
  togglePump: () => void;
}) {
  const getRowColor = (d: Device) => {
    if (d.temperature >= 35 || d.humidity < 30) return "#ffcccc";
    if (d.temperature >= 30 || d.humidity < 40) return "#fff0b3";
    return "white";
  };

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        tableLayout: "fixed"
      }}
    >
      <thead>
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
          <th style={{ width: 80, borderRight: "1px solid #ccc", padding: "8px" }}>温 度</th>
          <th style={{ width: 80, borderRight: "1px solid #ccc", padding: "8px" }}>湿 度</th>
          <th style={{ width: 100, borderRight: "1px solid #ccc", padding: "8px" }}>ポンプ状態</th>
          <th style={{ width: 110, padding: "8px" }}>操作</th>
        </tr>
      </thead>

      <tbody>
        {deviceList.map((d) => (
          <tr key={d.id} style={{ background: getRowColor(d) }}>
            <td>{d.id}</td>

            <td style={{ textAlign: "right" }}>{d.temperature.toFixed(1)}</td>

            <td style={{ textAlign: "right" }}>{d.humidity.toFixed(1)}</td>

            <td
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: d.pump ? "#44aa44" : "#cc4444"
              }}
            >
              {d.pump ? "ON" : "OFF"}
            </td>

            <td
              style={{
                width: 110,
                borderRight: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
                whiteSpace: "nowrap"
              }}
            >
              <button
                onClick={togglePump}
                style={{
                  padding: "6px 12px",
                  width: 100,
                  background: "#f0f0f0",
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

