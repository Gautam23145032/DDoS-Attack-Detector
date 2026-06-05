function calculateEntropy(values) {
  const freq = {};

  values.forEach((v) => {
    freq[v] = (freq[v] || 0) + 1;
  });

  const total = values.length;

  let entropy = 0;

  for (const key in freq) {
    const p = freq[key] / total;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}

module.exports = {
  calculateEntropy,
};