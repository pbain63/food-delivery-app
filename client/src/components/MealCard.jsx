// client/src/components/MealCard.jsx
function MealCard({ meal }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h2>{meal.title}</h2>
      <p>{meal.description}</p>
      <strong>Price:</strong> {meal.price} BDT <br />
      <em>Type: {meal.type}</em>
    </div>
  );
}

export default MealCard;
