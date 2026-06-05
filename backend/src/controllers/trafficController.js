const pool = require("../config/db");

exports.ingestTraffic = async (req, res) => {
  try {
    const {
      sourceIp,
      path,
      method,
      statusCode,
      userAgent,
      country,
      bytesSent,
    } = req.body;

    await pool.query(
      `
      INSERT INTO traffic_logs
      (source_ip, path, method, status_code, user_agent, country, bytes_sent)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      `,
      [
        sourceIp,
        path,
        method,
        statusCode,
        userAgent,
        country,
        bytesSent,
      ]
    );

    res.json({
      success: true,
      message: "Traffic ingested",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};