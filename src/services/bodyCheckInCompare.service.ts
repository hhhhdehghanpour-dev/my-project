import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

export async function compareBodyCheckIns(userId: number) {
  const checkIns = await prisma.bodyCheckIn.findMany({
    where: {
      userId,
    },
    orderBy: {
      checkedAt: "desc",
    },
    take: 2,
  });

  if (checkIns.length < 2) {
    return null;
  }

  const current = checkIns[0];
  const previous = checkIns[1];

  return {
    current: {
      weight: current.weight,
      waist: current.waist,
      bodyFat: current.bodyFat,
      checkedAt: current.checkedAt,
    },

    previous: {
      weight: previous.weight,
      waist: previous.waist,
      bodyFat: previous.bodyFat,
      checkedAt: previous.checkedAt,
    },

    changes: {
      weight: current.weight - previous.weight,
      waist:
        current.waist !== null &&
        previous.waist !== null
          ? current.waist - previous.waist
          : null,
      bodyFat:
        current.bodyFat !== null &&
        previous.bodyFat !== null
          ? current.bodyFat - previous.bodyFat
          : null,
    },
  };
}