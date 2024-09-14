import React, { useState, useEffect } from "react";
import PriceInput from "./components/PriceInput";
import NumberOfEntriesInput from "./components/NumberOfEntriesInput";
import RiskRewardInputs from "./components/RiskRewardInputs";
import ResultsDisplay from "./components/ResultsDisplay";
import Tab2 from "./components/Tab2";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("T1");
  const [TPPrice, setTPPrice] = useState("");
  const [SLPrice, setSLPrice] = useState("");
  const [maxLoss, setMaxLoss] = useState("");
  const [numberOfEntries, setNumberOfEntries] = useState(1);
  const [riskRewards, setRiskRewards] = useState([""]);
  const [results, setResults] = useState([]);
  const [tradeSide, setTradeSide] = useState("Long");
  const [calcType, setCalcType] = useState("USD");

  const calculatePositionSizing = () => {
    if (TPPrice && SLPrice && numberOfEntries) {
      const tp = parseFloat(TPPrice);
      const sl = parseFloat(SLPrice);
      const maxLossValue = parseFloat(maxLoss);

      const tpDecimals = TPPrice.includes(".")
        ? TPPrice.split(".")[1].length
        : 0;
      const slDecimals = SLPrice.includes(".")
        ? SLPrice.split(".")[1].length
        : 0;
      const maxDecimals = Math.max(tpDecimals, slDecimals);

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
          quantity = maxLossPerEntry / Math.abs(sl - entryPrice);
        } else {
          quantity = maxLossPerEntry / Math.abs(entryPrice - sl);
        }

        if (calcType === "USD") {
          quantity = quantity * entryPrice;
        }

        results.push({
          entry: i + 1,
          riskReward: riskRewardRatio,
          entryPrice: entryPrice.toFixed(maxDecimals),
          positionSize: quantity.toFixed(2),
        });
      }
      setResults(results);
    }
  };

  useEffect(() => {
    if (currentTab === "T1") {
      calculatePositionSizing();
    }
  }, [
    TPPrice,
    SLPrice,
    numberOfEntries,
    riskRewards,
    tradeSide,
    maxLoss,
    calcType,
    currentTab,
  ]);

  return (
    <div className="app-container">
      <div className="tab-navigation">
        <button
          onClick={() => setCurrentTab("T1")}
          className={currentTab === "T1" ? "active" : ""}
        >
          Calculate Entry Price & Position Size
        </button>
        <button
          onClick={() => setCurrentTab("T2")}
          className={currentTab === "T2" ? "active" : ""}
        >
          Calculate TP & Position Size
        </button>
      </div>
      {currentTab === "T1" && (
        <div className="main-container">
          <div className="basic-input-container">
            <h2>Basic Input</h2>
            <PriceInput
              TPPrice={TPPrice}
              SLPrice={SLPrice}
              maxLoss={maxLoss}
              tradeSide={tradeSide}
              calcType={calcType}
              setTPPrice={setTPPrice}
              setSLPrice={setSLPrice}
              setMaxLoss={setMaxLoss}
              setTradeSide={setTradeSide}
              setCalcType={setCalcType}
            />
            <NumberOfEntriesInput
              numberOfEntries={numberOfEntries}
              setNumberOfEntries={setNumberOfEntries}
              setRiskRewards={setRiskRewards}
            />
          </div>
          <div className="risk-reward-inputs-container">
            <h2>Risk Reward Inputs</h2>
            <RiskRewardInputs
              numberOfEntries={numberOfEntries}
              riskRewards={riskRewards}
              setRiskRewards={setRiskRewards}
            />
          </div>
          <div className="results-container">
            <h2>Position Sizing Results</h2>
            <ResultsDisplay results={results} calcType={calcType} />
          </div>
        </div>
      )}
      {currentTab === "T2" && (
        <div className="tab2-container">
          <Tab2 />
        </div>
      )}
    </div>
  );
}

export default App;
