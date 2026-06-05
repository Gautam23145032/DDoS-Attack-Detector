const router = require("express").Router();

const {
  getCurrentMetrics,
} = require("../controllers/metricsController");

router.get("/current", getCurrentMetrics);

module.exports = router;