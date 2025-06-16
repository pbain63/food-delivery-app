import { useState } from "react";
import axios from "axios";

function AddMealForm({ onMealAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("lunch");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/meals",
        { title, description, price, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Meal added successfully!");
      setTitle("");
      setDescription("");
      setPrice("");
      setType("lunch");

      if (onMealAdded) {
        onMealAdded(res.data.meal); // pass the new meal to parent
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add meal.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Meal</h3>
      <input
        type="text"
        placeholder="Meal Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Meal Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <br />
      <input
        type="number"
        placeholder="Price (e.g. 99.00)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <br />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <br />
      <button type="submit">Add Meal</button>
    </form>
  );
}

export default AddMealForm;
