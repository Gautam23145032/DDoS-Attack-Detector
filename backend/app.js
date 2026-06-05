const express = require("express");
const cors = require("cors");

const healthRoutes = require("./src/routes/healthRoutes");
const trafficRoutes = require("./src/routes/trafficRoutes");
const metricsRoutes = require("./src/routes/metricsRoutes");
const simulateRoutes = require("./src/routes/simulateRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/traffic", trafficRoutes);
app.use("/api/metrics", metricsRoutes);
app.use("/api/simulate", simulateRoutes);

module.exports = app;