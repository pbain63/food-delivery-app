// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    title: "",
    description: "",
    price: "",
    type: "breakfast",
  });
  const { user } = useAuth();

  useEffect(() => {
    async function fetchMeals() {
      const res = await axios.get("http://localhost:5000/api/meals");
      setMeals(res.data.meals);
    }

    fetchMeals();
  }, []);

  const handleAddMeal = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/meals", newMeal, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeals([res.data.meal, ...meals]);
      setNewMeal({ title: "", description: "", price: "", type: "breakfast" });
    } catch (err) {
      console.error("Failed to add meal:", err);
      alert("Failed to add meal");
    }
  };

  const handleOrder = async (mealId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/orders",
        { meal_id: mealId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div>
      <h2>Meals</h2>

      {user?.role === "provider" && (
        <form onSubmit={handleAddMeal}>
          <h3>Add a Meal</h3>
          <input
            placeholder="Title"
            value={newMeal.title}
            onChange={(e) => setNewMeal({ ...newMeal, title: e.target.value })}
          />
          <input
            placeholder="Description"
            value={newMeal.description}
            onChange={(e) =>
              setNewMeal({ ...newMeal, description: e.target.value })
            }
          />
          <input
            placeholder="Price"
            type="number"
            value={newMeal.price}
            onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
          />
          <select
            value={newMeal.type}
            onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
          <button type="submit">Add Meal</button>
        </form>
      )}

      <ul>
        {meals.map((meal) => (
          <li key={meal.id} style={{ marginBottom: "1rem" }}>
            <strong>{meal.title}</strong> - {meal.description} - ${meal.price} (
            {meal.type})
            {user?.role === "customer" && (
              <div>
                <button onClick={() => handleOrder(meal.id)}>Order</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealsPage;
