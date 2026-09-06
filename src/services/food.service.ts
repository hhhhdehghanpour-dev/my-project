import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export const FOOD_CATEGORIES = [
  "breakfast",
  "main_meal",
  "snack",
  "dessert",
  "sandwich",
  "salad",
  "drink",
] as const;

export async function createFood(
  name: string,
  category: string,
  calories: number,
  protein: number,
  carbohydrates: number,
  fat: number
) {
  const food = await prisma.food.create({
    data: {
      name,
      category,
      calories,
      protein,
      carbohydrates,
      fat,
    },
  });

  return food;
}

export async function getFoods() {
  return await prisma.food.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

export async function getFoodsByCategory(category: string) {
  return await prisma.food.findMany({
    where: {
      category,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function searchFoods(name: string) {
  return await prisma.food.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    orderBy: {
      name: "asc",
    },
  });
}