import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function calculateDailyCalories(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
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

  const dailyCalories = Math.round(bmr);

  return {
    dailyCalories,
    bmr: Math.round(bmr),
  };
}

export async function calculateTargetCalories(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
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

  let targetCalories: number;
  let goal: string;

  if (profile.targetWeight < profile.weight) {
    targetCalories = bmr - 500;
    goal = "weight_loss";
  } else if (profile.targetWeight > profile.weight) {
    targetCalories = bmr + 500;
    goal = "weight_gain";
  } else {
    targetCalories = bmr;
    goal = "maintain_weight";
  }

  return {
    targetCalories: Math.round(targetCalories),
    goal,
  };
}