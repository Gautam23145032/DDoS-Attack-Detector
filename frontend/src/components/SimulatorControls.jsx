import api from "../services/api";

function SimulatorControls() {

  const simulateNormal = async () => {

    try {

      await api.post("/simulate/normal");

    } catch (err) {

      console.log(err);

    }
  };

  const simulateDdos = async () => {

    try {

      await api.post("/simulate/ddos");

    } catch (err) {

      console.log(err);

    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Traffic Simulator
      </h2>

      <div className="flex gap-4">

        <button
          onClick={simulateNormal}
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          Simulate Normal
        </button>

        <button
          onClick={simulateDdos}
          className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition"
        >
          Simulate DDoS
        </button>

      </div>

    </div>
  );
}

export default SimulatorControls;