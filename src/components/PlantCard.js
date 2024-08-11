import React, { useState } from "react";

function PlantCard({ plant, updatePlant, deletePlant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  const handleSoldOut = () => {
    updatePlant({ ...plant, inStock: false });
  };

  const handleInStock = () => {
    updatePlant({ ...plant, inStock: true });
  };

  const handlePriceUpdate = () => {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: parseFloat(newPrice) }),
    })
      .then((response) => response.json())
      .then((updatedPlant) => {
        updatePlant(updatedPlant);
        setIsEditing(false);
      });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => deletePlant(plant.id));
  };

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      {isEditing ? (
        <div>
          <input
            type="number"
            step="0.01"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handlePriceUpdate}>Update Price</button>
        </div>
      ) : (
        <p>Price: ${parseFloat(plant.price || 0).toFixed(2)}</p>
      )}
      {plant.inStock !== false ? (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      ) : (
        <button onClick={handleInStock}>Out of Stock</button>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Price"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
