import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
] as const;

export async function createFoodLog(
  userId: number,
  foodId: number | undefined,
  name: string,
  meal: string,
  quantity: number,
  calories: number,
  protein: number,
  carbohydrates: number,
  fat: number
) {
  const foodLog = await prisma.foodLog.create({
    data: {
      userId,
      foodId,
      name,
      meal,
      quantity,
      calories,
      protein,
      carbohydrates,
      fat,
    },
  });

  return foodLog;
}

export async function getFoodLogs(userId: number) {
  return await prisma.foodLog.findMany({
    where: {
      userId,
    },
    orderBy: {
      eatenAt: "desc",
    },
  });
}

export async function getTodayFoodLogs(userId: number) {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.foodLog.findMany({
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
}