import React from "react";

function RiskRewardInputs({ numberOfEntries, riskRewards, setRiskRewards }) {
  const handleInputChange = (index, value) => {
    const newRiskRewards = [...riskRewards];
    newRiskRewards[index] = value;
    setRiskRewards(newRiskRewards);
  };

  return (
    <div className="form-section">
      {Array.from({ length: numberOfEntries }).map((_, index) => (
        <div key={index} className="risk-reward-row">
          <label>Position {index + 1} Risk:Reward:</label>
          <input
            type="number"
            value={riskRewards[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default RiskRewardInputs;
