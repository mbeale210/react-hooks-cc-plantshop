import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((response) => response.json())
      .then((data) => setPlants(data));
  }, []);

  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addPlant = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  const updatePlant = (updatedPlant) => {
    setPlants(
      plants.map((plant) =>
        plant.id === updatedPlant.id ? updatedPlant : plant
      )
    );
  };

  const deletePlant = (id) => {
    setPlants(plants.filter((plant) => plant.id !== id));
  };

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <PlantList
        plants={filteredPlants}
        updatePlant={updatePlant}
        deletePlant={deletePlant}
      />
    </main>
  );
}

export default PlantPage;
