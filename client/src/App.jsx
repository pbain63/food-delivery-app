// client/src/App.jsx
import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
