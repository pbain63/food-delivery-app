// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState("");
  const { user } = useAuth();

  const fetchMeals = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/meals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setMeals(res.data);
  };

  const handleAddMeal = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/api/meals",
      { name: newMeal },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setNewMeal("");
    fetchMeals(); // refresh the list
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  return (
    <div>
      <h2>Meals</h2>

      {/* Show Add Meal only for provider */}
      {user?.role === "provider" && (
        <div>
          <input
            value={newMeal}
            onChange={(e) => setNewMeal(e.target.value)}
            placeholder="Meal name"
          />
          <button onClick={handleAddMeal}>Add Meal</button>
        </div>
      )}

      <ul>
        {meals.map((meal, i) => (
          <li key={i}>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MealsPage;
