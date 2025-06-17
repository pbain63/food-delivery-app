const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const mealsRoutes = require("./routes/meals");
const orderRoutes = require("./routes/orders");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);  // "/api/auth"
app.use("/api", protectedRoutes);
app.use("/api/meals", mealsRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api", (req, res) => {
  res.send("API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
