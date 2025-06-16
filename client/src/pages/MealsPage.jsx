import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AddMealForm from "../components/AddMealForm";

function MealsPage() {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data.meals); //  Correct access
    } catch (err) {
      console.error("Error fetching meals:", err);
    }
  };

  const handleMealAdded = (newMeal) => {
    setMeals((prevMeals) => [newMeal, ...prevMeals]);
  };

  return (
    <div>
      <h2>All Meals</h2>

      {/* Only show form if user is provider */}
      {user?.role === "provider" && (
        <AddMealForm onMealAdded={handleMealAdded} />
      )}

      <ul>
        {meals.map((meal) => (
          <li key={meal.id}>
            <strong>{meal.title}</strong> - {meal.description} - ${meal.price}
            <br />
            <small>Provided by: {meal.provider_name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
