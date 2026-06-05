const router = require("express").Router();

const {
  ingestTraffic,
} = require("../controllers/trafficController");

router.post("/ingest", ingestTraffic);

module.exports = router;