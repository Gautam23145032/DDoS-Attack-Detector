const pool = require("../config/db");

const {calculateEntropy,} = require("../services/entropyService");

const calculateRiskScore = require("../utils/riskScore");

const {setLatestMetrics,} = require("../controllers/metricsController");

async function runDetection() {
    try {
        const result = await pool.query(`
        SELECT *
        FROM traffic_logs
        WHERE created_at >= NOW() - interval '10 seconds'
        `);

        const traffic = result.rows;

        const ips = traffic.map((t) => t.source_ip);

        const ipEntropy = calculateEntropy(ips);

        const requestRate = traffic.length;

        const uniqueIps = new Set(ips).size;
        const normalizedEntropy =
            uniqueIps > 1
                ? ipEntropy / Math.log2(uniqueIps)
                : 0;
        const riskScore = calculateRiskScore({
            requestRate,
            uniqueIps,
            normalizedEntropy,
        });

        let status = "normal";

        if (riskScore > 70) {
        status = "attack";
        } else if (riskScore > 40) {
        status = "warning";
        }

        const metrics = {
        ipEntropy,
        requestRate,
        uniqueIps,
        riskScore,
        status,
        timestamp: new Date(),
        };

        setLatestMetrics(metrics);

        global.io.emit("metrics:update", metrics);
        //if(requestRate > 0)
            console.log(metrics);
    } catch (err) {
        console.log(err);
    }
    }

    setInterval(runDetection, 5000);