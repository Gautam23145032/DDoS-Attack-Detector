function calculateRiskScore({
    requestRate,
    uniqueIps,
    normalizedEntropy
}) {
    const rateFactor =
        Math.min(requestRate / 1000, 1);

    const concentrationFactor =
        1 - normalizedEntropy;

    const distributionFactor =
        Math.min(uniqueIps / 500, 1) *
        normalizedEntropy;

    const score =
        (
            rateFactor * 0.5 +
            concentrationFactor * 0.25 +
            distributionFactor * 0.25
        ) * 100;

    return Math.round(score);
}

module.exports = calculateRiskScore;