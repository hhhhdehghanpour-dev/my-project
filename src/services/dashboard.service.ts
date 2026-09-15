import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function getDashboard(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const foodLogs = await prisma.foodLog.findMany({
    where: {
      userId,
      eatenAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      eatenAt: "desc",
    },
  });

  const waterLogs = await prisma.waterLog.findMany({
    where: {
      userId,
      drankAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    orderBy: {
      drankAt: "desc",
    },
  });

  const consumedCalories = foodLogs.reduce(
    (total, food) => total + food.calories,
    0
  );

  const consumedProtein = foodLogs.reduce(
    (total, food) => total + food.protein,
    0
  );

  const consumedCarbohydrates = foodLogs.reduce(
    (total, food) => total + food.carbohydrates,
    0
  );

  const consumedFat = foodLogs.reduce(
    (total, food) => total + food.fat,
    0
  );

  const consumedWater = waterLogs.reduce(
    (total, water) => total + water.amount,
    0
  );

  // Daily water target based on user's weight
  const waterTarget = Math.round(profile.weight * 30);

  const waterRemaining = Math.max(
    waterTarget - consumedWater,
    0
  );

  const waterPercentage =
    waterTarget > 0
      ? Math.min(
          Math.round((consumedWater / waterTarget) * 100),
          100
        )
      : 0;

  const heightInMeters = profile.height / 100;

  const bmi =
    profile.weight /
    (heightInMeters * heightInMeters);

  let bmiStatus = "";

  if (bmi < 18.5) {
    bmiStatus = "underweight";
  } else if (bmi < 25) {
    bmiStatus = "normal";
  } else if (bmi < 30) {
    bmiStatus = "overweight";
  } else {
    bmiStatus = "obese";
  }

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

  let targetCalories = bmr;

  if (profile.targetWeight < profile.weight) {
    targetCalories = bmr - 500;
  } else if (profile.targetWeight > profile.weight) {
    targetCalories = bmr + 500;
  }

  const remainingCalories =
    targetCalories - consumedCalories;

  return {
    profile: {
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      targetWeight: profile.targetWeight,
      waist: profile.waist,
      bodyFat: profile.bodyFat,
      weightChangeSpeed: profile.weightChangeSpeed,
    },

    bmi: {
      value: Number(bmi.toFixed(1)),
      status: bmiStatus,
    },

    calories: {
      target: Math.round(targetCalories),
      consumed: Math.round(consumedCalories),
      remaining: Math.round(remainingCalories),
    },

    nutrition: {
      protein: Number(consumedProtein.toFixed(1)),
      carbohydrates: Number(
        consumedCarbohydrates.toFixed(1)
      ),
      fat: Number(consumedFat.toFixed(1)),
    },

    water: {
      target: waterTarget,
      consumed: consumedWater,
      remaining: waterRemaining,
      percentage: waterPercentage,
      logs: waterLogs,
    },

    todayFoodLogs: foodLogs,
  };
}