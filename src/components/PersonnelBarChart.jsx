import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function PersonnelBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 40, bottom: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />

        <XAxis
          dataKey="Force"
          tick={{ fill: "#e2e8f0", fontSize: 13 }}
          angle={-25}
          textAnchor="end"
          interval={0}
        />

        <YAxis
          tick={{ fill: "#e2e8f0", fontSize: 13 }}
        />

        <Tooltip />

        <Bar
          dataKey="Personnel"
          fill="#38bdf8"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PersonnelBarChart;