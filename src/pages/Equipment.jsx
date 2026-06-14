import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";
import EquipmentBarChart from "../components/EquipmentBarChart";

function Equipment() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await loadCSV("/data/defence_equipment.csv");

      const formattedData = data.map((item) => ({
        ...item,
        Tanks: Number(item.Tanks),
        Aircraft: Number(item.Aircraft),
        Ships: Number(item.Ships),
        Helicopters: Number(item.Helicopters),
        Artillery: Number(item.Artillery),
        Total:
          Number(item.Tanks) +
          Number(item.Aircraft) +
          Number(item.Ships) +
          Number(item.Helicopters) +
          Number(item.Artillery),
      }));

      setEquipment(formattedData);
    }

    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "95%",
        maxWidth: "1700px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>Equipment Dashboard</h1>

      <h2>Total Equipment Comparison</h2>

      <EquipmentBarChart data={equipment} />
    </div>
  );
}

export default Equipment;