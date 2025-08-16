// -------------------------
// Simple Moving Average
// -------------------------
export function SMA(values, period) {
  return values.map((v, i, arr) => {
    if (i < period - 1) return null;
    const slice = arr.slice(i - period + 1, i + 1);
    return slice.reduce((a, b) => a + b, 0) / period;
  });
}

// -------------------------
// Exponential Moving Average
// -------------------------
export function EMA(values, period) {
  const k = 2 / (period + 1);
  let emaArray = [];
  let emaPrev = values[0];
  emaArray.push(emaPrev);

  for (let i = 1; i < values.length; i++) {
    const ema = values[i] * k + emaPrev * (1 - k);
    emaArray.push(ema);
    emaPrev = ema;
  }
  return emaArray;
}

// -------------------------
// Relative Strength Index (RSI)
// -------------------------
export function RSI(values, period = 14) {
  let gains = [];
  let losses = [];

  for (let i = 1; i < values.length; i++) {
    const change = values[i] - values[i - 1];
    gains.push(change > 0 ? change : 0);
    losses.push(change < 0 ? -change : 0);
  }

  let rsiArray = Array(period).fill(null); // first values are null
  for (let i = period; i < values.length; i++) {
    const avgGain =
      gains.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const avgLoss =
      losses.slice(i - period, i).reduce((a, b) => a + b, 0) / period;
    const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
    rsiArray.push(100 - 100 / (1 + rs));
  }

  return rsiArray;
}

// -------------------------
// MACD
// -------------------------
export function MACD(
  values,
  shortPeriod = 12,
  longPeriod = 26,
  signalPeriod = 9
) {
  const emaShort = EMA(values, shortPeriod);
  const emaLong = EMA(values, longPeriod);

  const macdLine = emaShort.map((v, i) => v - emaLong[i]);
  const signalLine = EMA(macdLine, signalPeriod);
  const histogram = macdLine.map((v, i) => v - signalLine[i]);

  return { macdLine, signalLine, histogram };
}

// -------------------------
// Bollinger Bands
// -------------------------
export function BollingerBands(values, period = 20, numStd = 2) {
  let sma = SMA(values, period);
  let upper = [];
  let lower = [];

  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) {
      upper.push(null);
      lower.push(null);
      continue;
    }
    const slice = values.slice(i - period + 1, i + 1);
    const mean = sma[i];
    const variance =
      slice.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / period;
    const stdDev = Math.sqrt(variance);
    upper.push(mean + numStd * stdDev);
    lower.push(mean - numStd * stdDev);
  }
  return { upper, lower };
}
