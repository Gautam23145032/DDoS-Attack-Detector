# DDoS Attack Detector

A real-time DDoS (Distributed Denial of Service) attack detection system built using **Node.js**, **Express**, **PostgreSQL**, **Socket.IO**, and **React**. The system continuously monitors incoming traffic, analyzes traffic behavior using statistical metrics, and generates a dynamic risk score to identify potential attacks.

---

## Overview

DDoS attacks attempt to overwhelm a server by generating a massive volume of requests from one or more sources.

This project detects suspicious traffic patterns by analyzing:

- Request Rate
- Source IP Diversity
- Shannon Entropy of Source IPs
- Normalized Entropy
- Real-time Risk Score

The system operates on a rolling **10-second observation window**, continuously updating traffic statistics and attack status.

---

## Features

### Real-Time Traffic Monitoring

- Monitors incoming requests
- Stores traffic logs in PostgreSQL
- Calculates metrics every 5 seconds

### Entropy-Based Analysis

Uses Shannon Entropy to measure the distribution of source IP addresses.

- Low entropy → Traffic concentrated from few IPs
- High entropy → Traffic distributed across many IPs

### Risk Scoring Engine

Generates a risk score between **0 and 100** using:

- Request Rate
- Traffic Concentration
- Traffic Distribution

### Attack Classification

| Risk Score | Status |
|------------|---------|
| 0 - 40 | Normal |
| 41 - 70 | Warning |
| 71 - 100 | Attack |

### Live Dashboard

Real-time dashboard updates using Socket.IO.

Displays:

- Request Rate
- Unique IP Count
- Entropy
- Risk Score
- Attack Status

---

## System Architecture

```text
Incoming Requests
        │
        ▼
Traffic Logger Middleware
        │
        ▼
PostgreSQL Database
        │
        ▼
Detection Engine
        │
        ├── Request Rate Analysis
        ├── IP Entropy Analysis
        ├── Unique IP Analysis
        │
        ▼
Risk Score Calculation
        │
        ▼
Attack Classification
        │
        ▼
Socket.IO Events
        │
        ▼
React Dashboard
```

---

## Technology Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Socket.IO

### Frontend

- React.js
- Tailwind CSS
- Recharts

### Database

- PostgreSQL

---

## Detection Methodology

### 1. Request Rate

Measures the total number of requests received during the last 10 seconds.

```text
High Request Rate ⇒ Higher Risk
```

---

### 2. Unique IP Count

Calculates the number of distinct IP addresses generating traffic.

```text
Few IPs  ⇒ Possible Flood Attack
Many IPs ⇒ Possible Distributed Attack
```

---

### 3. Shannon Entropy

Entropy measures how evenly requests are distributed among source IPs.

Formula:

```math
H = -\sum p(x)\log_2 p(x)
```

Where:

- p(x) = probability of requests coming from IP x

---

### 4. Normalized Entropy

To eliminate dependency on the number of unique IPs:

```math
H_{norm} = \frac{H}{\log_2(N)}
```

Where:

- H = Shannon Entropy
- N = Number of Unique IPs

Normalized entropy ranges between:

```text
0 ≤ Hnorm ≤ 1
```

Interpretation:

| Hnorm | Meaning |
|---------|---------|
| Near 0 | Highly concentrated traffic |
| Near 1 | Highly distributed traffic |

---

## Risk Score Formula

The final risk score combines traffic volume and traffic distribution characteristics.

```text
Risk Score =
50% Request Rate
+
25% Concentration Factor
+
25% Distribution Factor
```

Implementation:

```javascript
const score =
(
    rateFactor * 0.5 +
    concentrationFactor * 0.25 +
    distributionFactor * 0.25
) * 100;
```

---

## Why This Approach?

Traditional DDoS detection systems often rely only on request volume.

This project additionally analyzes:

- Traffic concentration
- Traffic diversity
- Source IP distribution

This allows the system to identify both:

### Single Source Floods

```text
High Request Rate
Low Entropy
Few Unique IPs
```

### Distributed Botnet Attacks

```text
High Request Rate
High Entropy
Many Unique IPs
```

---

## Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── metricsController.js
│
├── services/
│   └── entropyService.js
│
├── utils/
│   └── riskScore.js
│
├── routes/
│   └── trafficLogger.js
│
├── jobs/
│   └── detectionJob.js
│
└── server.js


frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
└── package.json
```

---

## Future Improvements

- Machine Learning Based Detection
- Geo-location Analysis
- IP Reputation Scoring
- Automatic Rate Limiting
- Alert Notifications
- Historical Analytics Dashboard
- Attack Pattern Classification

---

## Educational Objectives

This project demonstrates practical implementation of:

- Network Traffic Monitoring
- Statistical Traffic Analysis
- Shannon Entropy
- Real-Time Data Processing
- WebSocket Communication
- Full Stack Development
- DDoS Detection Fundamentals

---

## Author

**Gautam Yadav**

Full Stack Developer

Built as an internship project to explore real-time traffic analysis and DDoS attack detection techniques.
