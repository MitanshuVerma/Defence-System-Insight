import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function PersonnelPieChart({ personnel, reserve }) {
  const data = [
    {
      name: "Active Personnel",
      value: Number(personnel),
    },
    {
      name: "Reserve Personnel",
      value: Number(reserve),
    },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={100}
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

export default PersonnelPieChart;