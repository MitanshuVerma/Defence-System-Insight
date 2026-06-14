import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function EquipmentBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 40,
          bottom: 80,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="Force"
          angle={-25}
          textAnchor="end"
          interval={0}
          tick={{ fill: "#e2e8f0" }}
        />

        <YAxis tick={{ fill: "#e2e8f0" }} />

        <Tooltip />

        <Bar dataKey="Total" fill="#f97316" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default EquipmentBarChart;