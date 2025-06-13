import { useEffect, useState } from "react";
import axios from "axios";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/meals");
        setMeals(res.data.meal ? [res.data.meal] : []);
      } catch {
        setError("Failed to load meals");
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <h1>Meals</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <strong>{meal.title}</strong> - {meal.description} - {meal.price}৳
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealsPage;
