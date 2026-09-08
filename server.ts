import "dotenv/config";
import express from "express";

import registerRoutes from "./src/routes/register.routes";
import loginRoutes from "./src/routes/login.routes";
import profileRoutes from "./src/routes/profile.routes";
import bodyCheckInRoutes from "./src/routes/bodyCheckIn.routes.ts";
import bodyCheckInCompareRoutes from "./src/routes/bodyCheckInCompare.routes.ts";
import bmiRoutes from "./src/routes/bmi.routes.ts";
import calorieRoutes from "./src/routes/calorie.routes.ts";
import foodRoutes from "./src/routes/food.routes.ts";
import foodLogRoutes from "./src/routes/foodLog.routes.ts";
import dashboardRoutes from "./src/routes/dashboard.routes.ts";
import waterRoutes from "./src/routes/water.routes.ts";

const app = express();

app.use(express.json());

app.use(registerRoutes);
app.use(loginRoutes);
app.use(profileRoutes);
app.use(bodyCheckInRoutes);
app.use(bodyCheckInCompareRoutes);
app.use(bmiRoutes);
app.use(calorieRoutes);
app.use(foodRoutes);
app.use(foodLogRoutes);
app.use(dashboardRoutes);
app.use(waterRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "User API is running!",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});