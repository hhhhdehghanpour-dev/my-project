import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function createWaterLog(
  userId: number,
  amount: number
) {
  const waterLog = await prisma.waterLog.create({
    data: {
      userId,
      amount,
    },
  });

  return waterLog;
}

export async function getWaterLogs(userId: number) {
  return await prisma.waterLog.findMany({
    where: {
      userId,
    },
    orderBy: {
      drankAt: "desc",
    },
  });
}

export async function getTodayWaterLogs(userId: number) {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return await prisma.waterLog.findMany({
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
}

export async function getTodayWaterTotal(userId: number) {
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const result = await prisma.waterLog.aggregate({
    where: {
      userId,
      drankAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return result._sum.amount ?? 0;
}