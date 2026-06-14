import { useEffect, useState } from "react";
import { loadCSV } from "../utils/csvReader";
import PersonnelBarChart from "../components/PersonnelBarChart";
import BudgetBarChart from "../components/BudgetBarChart";
import StatCard from "../components/StatCard";
import ForceTypePieChart from "../components/ForceTypePieChart";

function Analytics() {
    const [forces, setForces] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        async function fetchData() {
            const data = await loadCSV(
                "/data/indian_defence_forces.csv"
            );

            const formattedData = data.map((item) => ({
                ...item,
                Personnel: Number(item.Personnel),
                Budget_Billion_INR: Number(item.Budget_Billion_INR),
            }));

            setForces(formattedData);
        }

        fetchData();
    }, []);

    const totalForces = forces.length;

    const totalPersonnel = forces.reduce(
        (sum, force) => sum + force.Personnel,
        0
    );

    const militaryCount = forces.filter(
        (force) => force.Type === "Military"
    ).length;

    const capfCount = forces.filter(
        (force) => force.Type === "CAPF"
    ).length;

    const filteredForces = forces.filter((force) =>
        force.Force.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const specialForceCount = forces.filter(
        (force) => force.Type === "Special Force"
    ).length;

    const forceTypeData = [
        {
            name: "Military",
            value: militaryCount,
        },
        {
            name: "CAPF",
            value: capfCount,
        },
        {
            name: "Special Force",
            value: specialForceCount,
        },
    ];

    return (
        <div
            style={{
                padding: "30px",
            }}
        >
            <h1>Analytics Dashboard</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 200px)",
                    justifyContent: "center",
                    gap: "60px",
                    marginBottom: "40px",
                }}
            >
                <StatCard
                    title="Total Forces"
                    value={totalForces}
                />

                <StatCard
                    title="Personnel"
                    value={totalPersonnel.toLocaleString()}
                />

                <StatCard
                    title="Military"
                    value={militaryCount}
                />

                <StatCard
                    title="CAPF"
                    value={capfCount}
                />

                <StatCard
                    title="Special Force"
                    value={specialForceCount}
                />
            </div>

            <input
                type="text"
                placeholder="Search force..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    padding: "12px",
                    borderRadius: "8px",
                    border: "none",
                    marginBottom: "30px",
                    fontSize: "16px",
                }}
            />

            <h2>Personnel Comparison</h2>

            <PersonnelBarChart data={filteredForces} />

            <h2>Budget Comparison</h2>

            <BudgetBarChart data={filteredForces} />

            <h2>Force Type Distribution</h2>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "50px",
                }}
            >
                <ForceTypePieChart
                    data={forceTypeData}
                />
            </div>
        </div>
    );
}

export default Analytics;