import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function getTodayMealPlan(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const heightInMeters = profile.height / 100;

  const bmi =
    profile.weight /
    (heightInMeters * heightInMeters);

  let bmr: number;

  if (profile.gender.toLowerCase() === "male") {
    bmr =
      10 * profile.weight +
      6.25 * profile.height -
      5 * profile.age +
      5;
  } else {
    bmr =
      10 * profile.weight +
      6.25 * profile.height -
      5 * profile.age -
      161;
  }

  let dailyCalories = bmr;

  if (profile.targetWeight < profile.weight) {
    dailyCalories = bmr - 500;
  } else if (profile.targetWeight > profile.weight) {
    dailyCalories = bmr + 500;
  }

  dailyCalories = Math.round(dailyCalories);

  const mealPercentages = [
    {
      meal: "breakfast",
      percentage: 25,
    },
    {
      meal: "morning_snack",
      percentage: 10,
    },
    {
      meal: "lunch",
      percentage: 30,
    },
    {
      meal: "afternoon_snack",
      percentage: 10,
    },
    {
      meal: "dinner",
      percentage: 20,
    },
    {
      meal: "after_dinner_snack",
      percentage: 5,
    },
  ];

  const meals = mealPercentages.map((item) => ({
    meal: item.meal,
    percentage: item.percentage,
    calories: Math.round(
      dailyCalories * (item.percentage / 100)
    ),
  }));

  const totalMealCalories = meals.reduce(
    (total, meal) => total + meal.calories,
    0
  );

  const difference = dailyCalories - totalMealCalories;

  if (difference !== 0) {
    meals[meals.length - 1].calories += difference;
  }

  return {
    date: new Date().toISOString().split("T")[0],
    dailyCalories,
    meals,
  };
}