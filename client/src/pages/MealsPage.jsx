// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import MealCard from "../components/MealCard";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load meals");
        return res.json();
      })
      .then((data) => setMeals(data.meals))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Meals</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  );
}

export default MealsPage;
