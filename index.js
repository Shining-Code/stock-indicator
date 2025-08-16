import * as ccxt from "ccxt";
import { SMA, EMA, RSI, MACD, BollingerBands } from "./indicator.js";

(async () => {
  // const binance = new ccxt.binance();
  const binance = new ccxt.binanceusdm();

  // Fetch last 100 candles for BTC/USDT 1h
  // const ohlcv = await binance.fetchOHLCV("BTC/USDT", "1h", undefined, 100);

  // Fetch last 100 candles for BTCUSDT 1h Furture
  const ohlcv = await binance.fetchOHLCV("BTCUSDT", "1h", undefined, 100);

  // Extract close prices
  const closes = ohlcv.map((c) => c[4]);

  // Calculate indicators
  const sma7 = SMA(closes, 7);
  const sma25 = SMA(closes, 25);
  const sma99 = SMA(closes, 99);
  console.log("SMA7:", sma7.at(-1));
  console.log("SMA25:", sma25.at(-1));
  console.log("SMA99:", sma99.at(-1));

  const sma20 = SMA(closes, 20);
  const ema20 = EMA(closes, 20);
  const rsi14 = RSI(closes, 14);
  const { macdLine, signalLine, histogram } = MACD(closes);
  const { upper, lower } = BollingerBands(closes, 20);

  console.log("Last candle close:", closes.at(-1));
  console.log("SMA20:", sma20.at(-1));
  console.log("EMA20:", ema20.at(-1));
  console.log("RSI14:", rsi14.at(-1));
  console.log(
    "MACD:",
    macdLine.at(-1),
    "Signal:",
    signalLine.at(-1),
    "Hist:",
    histogram.at(-1)
  );
  console.log("Bollinger Upper:", upper.at(-1), "Lower:", lower.at(-1));
})();
