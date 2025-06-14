import { useEffect, useState } from "react";
import AddMealForm from "./components/AddMealForm";
import MealsPage from "./pages/MealsPage";

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => setMeals(data.meals))
      .catch((err) => console.error("Failed to fetch meals:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <AddMealForm setMeals={setMeals} />
      <hr style={{ margin: "2rem 0" }} />
      <MealsPage meals={meals} />
    </div>
  );
}

export default App;
