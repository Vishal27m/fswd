import React, { useState } from 'react';
import './TownDetails.css'; // For styling


const TownDetails = ({ onTownSelect }) => {
  const [selectedTown, setSelectedTown] = useState('');

  const handleTownChange = (e) => {
    setSelectedTown(e.target.value);
  };

  const handleProceed = () => {
    if (onTownSelect) {
      onTownSelect(selectedTown);
    } else {
      console.error('onTownSelect is not a function');
    }
  };

  return (
    <div className="town-details-container">
      <h2>Select Your Town</h2>
      <p>Explore the vibrant towns in the Community Wellness Hub! Each town profile includes essential details such as an introduction, history, distance from other locations, what the town is famous for, popular spots and temples, economy, demographics, languages spoken, and more. Please choose your desired towns to clarify and uncover their unique offerings. Your journey to wellness starts here!</p>
      <select value={selectedTown} onChange={handleTownChange}>
        <option value="" disabled>Select a town</option>
        <option value="Annur">Annur</option>
        

        {/* Add more towns as needed */}
      </select>
      <button onClick={handleProceed} disabled={!selectedTown}>Proceed</button>
    </div>
  );
};

export default TownDetails;
