import React, { useState, useEffect } from "react";

function Tab2() {
  const [entryPrice, setEntryPrice] = useState("");
  const [calcType, setCalcType] = useState("USD");
  const [maxLoss, setMaxLoss] = useState("");
  const [option, setOption] = useState("Percent");
  const [sl, setSL] = useState("");
  const [riskReward, setRiskReward] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    calculateTPAndSL();
  }, [entryPrice, calcType, maxLoss, option, sl, riskReward]);

  const calculateTPAndSL = () => {
    if (entryPrice && maxLoss && sl && riskReward) {
      const ep = parseFloat(entryPrice);
      const maxLossValue = parseFloat(maxLoss);
      const rr = parseFloat(riskReward);
      let slPrice;

      if (option === "Percent") {
        const slPercentage = parseFloat(sl);
        slPrice = ep - ep * (slPercentage / 100);
      } else {
        slPrice = parseFloat(sl);
      }

      let positionSize;
      if (calcType === "USD") {
        positionSize = (maxLossValue / Math.abs(ep - slPrice)) * ep;
      } else {
        positionSize = maxLossValue / Math.abs(ep - slPrice);
      }

      const tpPrice = ep + Math.abs(ep - slPrice) * rr;

      setResults({
        tp: tpPrice.toFixed(8),
        sl: slPrice.toFixed(8),
        positionSize: positionSize.toFixed(2),
      });
    } else {
      setResults(null);
    }
  };

  return (
    <div className="tab2-content">
      <div className="form-section">
        <div>
          <label>Entry Price:</label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Calculation Type:</label>
          <select
            value={calcType}
            onChange={(e) => setCalcType(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="Units">Units</option>
          </select>
        </div>
        <div>
          <label>Maximum Loss ($):</label>
          <input
            type="number"
            value={maxLoss}
            onChange={(e) => setMaxLoss(e.target.value)}
          />
        </div>
        <div>
          <label>SL Option:</label>
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            <option value="Percent">Percent</option>
            <option value="Price">Price</option>
          </select>
        </div>
        <div>
          <label>{option === "Percent" ? "SL (%):" : "SL Price:"}</label>
          <input
            type="number"
            value={sl}
            onChange={(e) => setSL(e.target.value)}
          />
        </div>
        <div>
          <label>Risk:Reward (R:R):</label>
          <input
            type="number"
            value={riskReward}
            onChange={(e) => setRiskReward(e.target.value)}
          />
        </div>
      </div>
      {results && (
        <div className="results-container">
          <h2>Results</h2>
          <p>TP Price: {results.tp}</p>
          <p>SL Price: {results.sl}</p>
          <p>
            Position Size: {results.positionSize} {calcType}
          </p>
        </div>
      )}
    </div>
  );
}

export default Tab2;
