const pool = require("../config/db");

function randomIp() {
    return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    }

    const paths = [
    "/",
    "/home",
    "/login",
    "/products",
    "/dashboard",
    ];

    const agents = [
    "Chrome",
    "Firefox",
    "Safari",
    "Edge",
    ];

simulateNormalTraffic = async (req, res) => {
    try {

        for (let i = 0; i < 100; i++) {

        await pool.query(
            `
            INSERT INTO traffic_logs
            (
            source_ip,
            path,
            method,
            status_code,
            user_agent,
            country,
            bytes_sent
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            `,
            [
            randomIp(),
            paths[Math.floor(Math.random() * paths.length)],
            "GET",
            200,
            agents[Math.floor(Math.random() * agents.length)],
            "IN",
            1200,
            ]
        );
        }

        res.json({
        success: true,
        message: "Normal traffic generated",
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
        success: false,
        });
    }
};

simulateDDoSTraffic = async (req, res) => {
    try {


        for(let j = 0; j < 1; j++){
            for (let i = 0; i < 10000; i++) {

            await pool.query(
                `
                INSERT INTO traffic_logs
                (
                source_ip,
                path,
                method,
                status_code,
                user_agent,
                country,
                bytes_sent
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7)
                `,
                [
                randomIp(),
                "/login",
                "POST",
                429,
                "AttackBot",
                "RU",
                500,
                ]
            );
            }
        }
        

        res.json({
        success: true,
        message: "DDoS traffic generated",
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
        success: false,
        });
    }
};

module.exports = {simulateNormalTraffic, simulateDDoSTraffic};