// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    async function fetchMeals() {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMeals(res.data.meals);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      }
    }

    fetchMeals();
  }, []);

  const filteredMeals =
    filterType === "All"
      ? meals
      : meals.filter(
          (meal) => meal.type.toLowerCase() === filterType.toLowerCase()
        );

  return (
    <div>
      <h2>Meals</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Filter by type: </label>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>
      </div>

      {filteredMeals.length === 0 ? (
        <p>No meals available.</p>
      ) : (
        <ul>
          {filteredMeals.map((meal) => (
            <li key={meal.id}>
              <strong>{meal.title}</strong> - {meal.description} - ${meal.price}
              <br />
              <small>Type: {meal.type}</small>
              <br />
              <small>Provided by: {meal.provider_name}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealsPage;
