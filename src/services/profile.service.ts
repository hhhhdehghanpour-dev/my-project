import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function createProfile(
  userId: number,
  age: number,
  gender: string,
  height: number,
  weight: number,
  targetWeight: number,
  waist?: number,
  bodyFat?: number,
  weightChangeSpeed?: number
) {
  const profile = await prisma.userProfile.create({
    data: {
      userId,
      age,
      gender,
      height,
      weight,
      targetWeight,
      waist,
      bodyFat,
      weightChangeSpeed,
    },
  });

  return profile;
}

export async function getProfile(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}