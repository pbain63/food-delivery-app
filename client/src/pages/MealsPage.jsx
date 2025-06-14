// client/src/pages/MealsPage.jsx

function MealsPage({ meals }) {
  return (
    <div>
      <h2>Meals</h2>
      {meals.length === 0 ? (
        <p>No meals yet.</p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal.id}
            style={{
              border: "1px solid gray",
              padding: "1rem",
              margin: "1rem",
            }}
          >
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p>
              <strong>Price:</strong> {meal.price} BDT
            </p>
            <p>
              <strong>Type:</strong> {meal.type}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default MealsPage;
