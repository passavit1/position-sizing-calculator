import React from "react";

function ResultsDisplay({ results, calcType }) {
  return (
    <div className="results">
      <ul>
        {results.map((result) => (
          <li key={result.entry}>
            Entry {result.entry}: Risk:Reward = {result.riskReward}, Entry Price
            = {result.entryPrice}, Position Size = {result.positionSize}{" "}
            {calcType}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResultsDisplay;
