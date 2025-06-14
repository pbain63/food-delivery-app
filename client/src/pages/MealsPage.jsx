import { useEffect, useState } from "react";
// import axios from "axios";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");

  const token = "your_jwt_token_here";

  useEffect(() => {
    fetch("/api/meals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMeals(data.meals);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load meals");
      });
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
