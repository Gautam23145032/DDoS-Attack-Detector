import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import MetricsChart from "../components/MetricsChart";
import SimulatorControls from "../components/SimulatorControls";
import AlertFeed from "../components/AlertFeed";

import socket from "../services/socket";

function Dashboard() {

  const [metrics, setMetrics] = useState({
    requestRate: 0,
    ipEntropy: 0,
    uniqueIps: 0,
    riskScore: 0,
    status: "normal",
  });

  const [chartData, setChartData] = useState([]);

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    socket.on("metrics:update", (data) => {

      console.log(data);

      setMetrics(data);

      setChartData((prev) => {

        const updated = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            entropy: data.ipEntropy,
            requests: data.requestRate,
            risk: data.riskScore,
          },
        ];

        return updated.slice(-20);
      });

      if (
        data.status === "warning" ||
        data.status === "attack"
      ) {

        setAlerts((prev) => [

          {
            status: data.status,
            riskScore: data.riskScore,
            time: new Date().toLocaleTimeString(),
          },

          ...prev,

        ].slice(0, 15));
      }

    });

    return () => {
      socket.off("metrics:update");
    };

  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-4xl font-bold mb-8">
        DDoS Detection Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <StatCard
          title="Request Rate"
          value={metrics.requestRate}
          color="text-blue-400"
        />

        <StatCard
          title="IP Entropy"
          value={metrics.ipEntropy?.toFixed(2)}
          color="text-green-400"
        />

        <StatCard
          title="Unique IPs"
          value={metrics.uniqueIps}
          color="text-yellow-400"
        />

        <StatCard
          title="Risk Score"
          value={metrics.riskScore}
          color="text-red-400"
        />

        <StatCard
          title="Status"
          value={metrics.status}
          color={
            metrics.status === "attack"
              ? "text-red-500"
              : metrics.status === "warning"
              ? "text-yellow-400"
              : "text-green-400"
          }
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">

        <MetricsChart
          title="Entropy"
          data={chartData}
          dataKey="entropy"
          color="#22c55e"
        />

        <MetricsChart
          title="Request Rate"
          data={chartData}
          dataKey="requests"
          color="#3b82f6"
        />

        <MetricsChart
          title="Risk Score"
          data={chartData}
          dataKey="risk"
          color="#ef4444"
        />

      </div>

      <div className="mt-10">

        <SimulatorControls />

      </div>

      <div className="mt-10">

        <AlertFeed alerts={alerts} />

      </div>

    </div>
  );
}

export default Dashboard;