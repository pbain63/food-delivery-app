// client/src/pages/MealsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [filterType, setFilterType] = useState("All");

  const { user } = useAuth(); // to check if user is provider

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    type: "Lunch",
  });

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

  async function handleAddMeal(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/meals",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Meal added!");
      setMeals([res.data.meal, ...meals]); // prepend new meal
      setFormData({ title: "", description: "", price: "", type: "Lunch" }); // reset form
    } catch (err) {
      console.error("Failed to add meal:", err);
      alert("Failed to add meal.");
    }
  }

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

      {user?.role === "provider" && (
        <form onSubmit={handleAddMeal} style={{ marginBottom: "2rem" }}>
          <h3>Add New Meal</h3>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <br />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          ></textarea>
          <br />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <br />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
          <br />
          <button type="submit">Add Meal</button>
        </form>
      )}

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
