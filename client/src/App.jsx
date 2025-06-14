import AddMealForm from "./components/AddMealForm";
import MealsPage from "./components/MealsPage";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <AddMealForm />
      <hr style={{ margin: "2rem 0" }} />
      <MealsPage />
    </div>
  );
}

export default App;
