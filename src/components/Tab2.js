import React, { useState } from "react";

function Tab2() {
  const [entryPrice, setEntryPrice] = useState("");
  const [calcType, setCalcType] = useState("USD");
  const [maxLoss, setMaxLoss] = useState("");
  const [riskReward, setRiskReward] = useState("");
  const [results, setResults] = useState(null);

  const calculateTPAndSL = () => {
    if (entryPrice && maxLoss && riskReward) {
      const ep = parseFloat(entryPrice);
      const maxLossValue = parseFloat(maxLoss);
      const rr = parseFloat(riskReward);

      const sl = ep - maxLossValue / ep;
      const tp = ep + rr * (ep - sl);

      let positionSize;
      if (calcType === "USD") {
        positionSize = (maxLossValue / (ep - sl)) * ep;
      } else {
        positionSize = maxLossValue / (ep - sl);
      }

      setResults({
        tp: tp.toFixed(8),
        sl: sl.toFixed(8),
        positionSize: positionSize.toFixed(2),
      });
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
          <label>Risk:Reward:</label>
          <input
            type="number"
            value={riskReward}
            onChange={(e) => setRiskReward(e.target.value)}
          />
        </div>
        <button onClick={calculateTPAndSL}>Calculate</button>
      </div>
      {results && (
        <div className="results-container">
          <h2>Results</h2>
          <p>TP: {results.tp}</p>
          <p>SL: {results.sl}</p>
          <p>
            Position Size: {results.positionSize} {calcType}
          </p>
        </div>
      )}
    </div>
  );
}

export default Tab2;
