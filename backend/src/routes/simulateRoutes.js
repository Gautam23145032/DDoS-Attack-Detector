const router =  require("express").Router();

const {simulateNormalTraffic, simulateDDoSTraffic} = require("../controllers/simulateController");

router.post("/normal", simulateNormalTraffic);
router.post("/ddos", simulateDDoSTraffic);

module.exports = router;