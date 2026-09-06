import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function calculateBMI(userId: number) {
  const profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  const heightInMeters = profile.height / 100;

  const bmi = profile.weight / (heightInMeters * heightInMeters);

  let status: string;

  if (bmi < 18.5) {
    status = "underweight";
  } else if (bmi < 25) {
    status = "normal";
  } else if (bmi < 30) {
    status = "overweight";
  } else {
    status = "obese";
  }

  return {
    bmi: Number(bmi.toFixed(1)),
    status,
    weight: profile.weight,
    height: profile.height,
  };
}