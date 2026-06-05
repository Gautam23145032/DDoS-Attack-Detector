function AlertFeed({ alerts }) {

  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">

      <h2 className="text-2xl font-bold mb-6">
        Alert Feed
      </h2>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">

        {alerts.map((alert, index) => (

          <div
            key={index}
            className={`
              p-4 rounded-xl border
              ${
                alert.status === "attack"
                  ? "border-red-500 bg-red-500/10"
                  : alert.status === "warning"
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-green-500 bg-green-500/10"
              }
            `}
          >

            <div className="flex justify-between">

              <span className="font-bold uppercase">
                {alert.status}
              </span>

              <span className="text-sm text-slate-400">
                {alert.time}
              </span>

            </div>

            <p className="mt-2 text-slate-300">
              Risk Score: {alert.riskScore}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlertFeed;