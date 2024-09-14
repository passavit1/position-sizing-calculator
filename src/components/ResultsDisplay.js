import React from "react";

function ResultsDisplay({ results }) {
  return (
    <div className="results">
      <ul>
        {results.map((result) => (
          <li key={result.entry}>
            Entry {result.entry}: Risk:Reward = {result.riskReward}, Entry Price
            = {result.entryPrice}, Position Size = {result.positionSize} USD
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsDisplay;
