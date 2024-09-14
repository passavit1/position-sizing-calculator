import React, { useState, useEffect } from "react";
import PriceInput from "./components/PriceInput";
import NumberOfEntriesInput from "./components/NumberOfEntriesInput";
import RiskRewardInputs from "./components/RiskRewardInputs";
import ResultsDisplay from "./components/ResultsDisplay";
import "./App.css";

function App() {
  const [TPPrice, setTPPrice] = useState("");
  const [SLPrice, setSLPrice] = useState("");
  const [maxLoss, setMaxLoss] = useState("");
  const [numberOfEntries, setNumberOfEntries] = useState(1);
  const [riskRewards, setRiskRewards] = useState([""]);
  const [results, setResults] = useState([]);
  const [tradeSide, setTradeSide] = useState("Long");

  const calculatePositionSizing = () => {
    if (TPPrice && SLPrice && numberOfEntries) {
      const tp = parseFloat(TPPrice);
      const sl = parseFloat(SLPrice);
      const maxLossValue = parseFloat(maxLoss);

      const results = [];
      for (let i = 0; i < numberOfEntries; i++) {
        const riskRewardRatio = parseFloat(riskRewards[i]);

        const totalRange = tp - sl;
        const totalRatio = riskRewardRatio + 1;
        const oneRatioRange = totalRange / totalRatio;
        const entryPrice = sl + oneRatioRange;

        const maxLossPerEntry = maxLossValue / numberOfEntries;

        let quantity;
        if (tradeSide === "Long") {
          quantity = (maxLossPerEntry / Math.abs(sl - entryPrice)) * entryPrice;
        } else {
          quantity = (maxLossPerEntry / Math.abs(entryPrice - sl)) * entryPrice;
        }

        results.push({
          entry: i + 1,
          riskReward: riskRewardRatio,
          entryPrice: entryPrice.toFixed(2),
          positionSize: quantity.toFixed(2),
        });
      }
      setResults(results);
    }
  };

  useEffect(() => {
    calculatePositionSizing();
  }, [TPPrice, SLPrice, numberOfEntries, riskRewards, tradeSide, maxLoss]);

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Position Sizing Calculator</h2>
        <PriceInput
          TPPrice={TPPrice}
          SLPrice={SLPrice}
          maxLoss={maxLoss}
          tradeSide={tradeSide}
          setTPPrice={setTPPrice}
          setSLPrice={setSLPrice}
          setMaxLoss={setMaxLoss}
          setTradeSide={setTradeSide}
        />
        <NumberOfEntriesInput
          numberOfEntries={numberOfEntries}
          setNumberOfEntries={setNumberOfEntries}
          setRiskRewards={setRiskRewards}
        />
        <RiskRewardInputs
          numberOfEntries={numberOfEntries}
          riskRewards={riskRewards}
          setRiskRewards={setRiskRewards}
        />
      </div>
      <div className="results-container">
        <ResultsDisplay results={results} />
      </div>
    </div>
  );
}

export default App;
