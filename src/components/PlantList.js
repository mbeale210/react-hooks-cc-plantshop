import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, updatePlant, deletePlant }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          updatePlant={updatePlant}
          deletePlant={deletePlant}
        />
      ))}
    </ul>
  );
}

export default PlantList;
