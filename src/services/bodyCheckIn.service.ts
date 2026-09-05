import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function createBodyCheckIn(
  userId: number,
  weight: number,
  waist?: number,
  bodyFat?: number,
  note?: string
) {
  const checkIn = await prisma.bodyCheckIn.create({
    data: {
      userId,
      weight,
      waist,
      bodyFat,
      note,
    },
  });

  await prisma.userProfile.update({
    where: {
      userId,
    },
    data: {
      weight,
      ...(waist !== undefined && { waist }),
      ...(bodyFat !== undefined && { bodyFat }),
    },
  });

  return checkIn;
}

export async function getBodyCheckIns(userId: number) {
  return await prisma.bodyCheckIn.findMany({
    where: {
      userId,
    },
    orderBy: {
      checkedAt: "desc",
    },
  });
}

export async function getLatestBodyCheckIn(userId: number) {
  return await prisma.bodyCheckIn.findFirst({
    where: {
      userId,
    },
    orderBy: {
      checkedAt: "desc",
    },
  });
}