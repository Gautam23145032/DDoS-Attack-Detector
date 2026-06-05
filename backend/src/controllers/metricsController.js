let latestMetrics = {
  requestRate: 0,
  ipEntropy: 0,
  uniqueIps: 0,
  riskScore: 0,
  status: "normal",
};

exports.setLatestMetrics = (metrics) => {
  latestMetrics = metrics;
};

exports.getCurrentMetrics = async (req, res) => {
  try {
    res.json({
      success: true,
      data: latestMetrics,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};