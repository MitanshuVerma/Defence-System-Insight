import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ForceTypePieChart({ data }) {
  const COLORS = [
    "#38bdf8",
    "#22c55e",
    "#f97316",
  ];

  return (
    <PieChart width={500} height={350}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={120}
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default ForceTypePieChart;