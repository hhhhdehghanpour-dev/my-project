import "dotenv/config";
import express from "express";

import registerRoutes from "./src/routes/register.routes";
import loginRoutes from "./src/routes/login.routes";
import profileRoutes from "./src/routes/profile.routes";

const app = express();

app.use(express.json());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(profileRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "User API is running!",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});