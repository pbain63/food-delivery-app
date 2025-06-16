// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function MealsPage() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/meals", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Meals API response:", res.data);

        setMeals(res.data.meals); // Fix: Use res.data.meals (not res.data)
      } catch (err) {
        console.error("Failed to load meals:", err);
      }
    }

    fetchMeals();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Meals</h2>
      {meals.length === 0 ? (
        <p>No meals available.</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.id}>
              <strong>{meal.title}</strong> - {meal.description} (${meal.price})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MealsPage;
