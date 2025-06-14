import { useState } from "react";

function AddMealForm({ setMeals }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("lunch");
  const [message, setMessage] = useState("");

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InByb3ZpZGVyIiwiaWF0IjoxNzQ5ODg0MjY0fQ.9gdJrrLSoi1-hrfDb1srJynILs6ZX2oEuEdnqTYr0Ps"; // Replace with your actual token temporarily

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, price, type }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Meal added successfully!");

        // Add the new meal to the top of the meals list
        setMeals((prevMeals) => [data.meal, ...prevMeals]);

        setTitle("");
        setDescription("");
        setPrice("");
        setType("lunch");
      } else {
        setMessage(data.error || "Failed to add meal.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Meal</h2>
      {message && <p>{message}</p>}
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>
      <button type="submit">Add Meal</button>
    </form>
  );
}

export default AddMealForm;
