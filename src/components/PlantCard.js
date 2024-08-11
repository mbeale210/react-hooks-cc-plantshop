import React, { useState } from "react";

function PlantCard({ plant, updatePlant, deletePlant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);
  const [inStock, setInStock] = useState(plant.inStock);

  const handleSoldOut = () => { 
  setInStock(!inStock);
  updatePlant({ ...plant, inStock: !inStock });
  };

  const handlePriceUpdate = () => {
    fetch(`http://localhost:3000/plants/${plant.id}`, {
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
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <button onClick={handlePriceUpdate}>Update Price</button>
        </div>
      ) : (
        <p>Price: {plant.price}</p>
      )}
      {inStock ? (
        <button className="primary" onClick={handleSoldOut}>
          In Stock
        </button>
      ) : (
        <button onClick={handleSoldOut}>Out of Stock</button>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Cancel" : "Edit Price"}
      </button>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
