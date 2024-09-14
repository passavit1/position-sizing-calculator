import React from "react";

function NumberOfEntriesInput({
  numberOfEntries,
  setNumberOfEntries,
  setRiskRewards,
}) {
  const handleNumberOfEntriesChange = (e) => {
    const numEntries = parseInt(e.target.value, 10);
    setNumberOfEntries(numEntries);

    const newRiskRewards = Array.from({ length: numEntries }, (_, i) => "");
    setRiskRewards(newRiskRewards);
  };

  return (
    <div className="form-section">
      <label>
        Number of Entries:
        <input
          type="number"
          value={numberOfEntries}
          min="1"
          onChange={handleNumberOfEntriesChange}
        />
      </label>
    </div>
  );
}

export default NumberOfEntriesInput;
