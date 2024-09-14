import React from "react";

function PriceInput({
  TPPrice,
  SLPrice,
  maxLoss,
  tradeSide,
  calcType,
  setTPPrice,
  setSLPrice,
  setMaxLoss,
  setTradeSide,
  setCalcType,
}) {
  return (
    <div className="form-section">
      <div>
        <label>TP Price:</label>
        <input
          type="number"
          value={TPPrice}
          onChange={(e) => setTPPrice(e.target.value)}
        />
      </div>
      <div>
        <label>SL Price:</label>
        <input
          type="number"
          value={SLPrice}
          onChange={(e) => setSLPrice(e.target.value)}
        />
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
        <label>Trade Side:</label>
        <select
          value={tradeSide}
          onChange={(e) => setTradeSide(e.target.value)}
        >
          <option value="Long">Long</option>
          <option value="Short">Short</option>
        </select>
      </div>
      <div>
        <label>Calculation Type:</label>
        <select value={calcType} onChange={(e) => setCalcType(e.target.value)}>
          <option value="USD">USD</option>
          <option value="Units">Units</option>
        </select>
      </div>
    </div>
  );
}

export default PriceInput;
