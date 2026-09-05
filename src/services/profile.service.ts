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

export async function updateProfile(
  userId: number,
  age?: number,
  gender?: string,
  height?: number,
  weight?: number,
  targetWeight?: number,
  waist?: number,
  bodyFat?: number,
  weightChangeSpeed?: number
) {
  const existingProfile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  });

  if (!existingProfile) {
    const newProfile = await prisma.userProfile.create({
      data: {
        userId,
        age: age!,
        gender: gender!,
        height: height!,
        weight: weight!,
        targetWeight: targetWeight!,
        waist,
        bodyFat,
        weightChangeSpeed,
      },
    });

    return newProfile;
  }

  const profile = await prisma.userProfile.update({
    where: {
      userId,
    },
    data: {
      ...(age !== undefined && { age }),
      ...(gender !== undefined && { gender }),
      ...(height !== undefined && { height }),
      ...(weight !== undefined && { weight }),
      ...(targetWeight !== undefined && { targetWeight }),
      ...(waist !== undefined && { waist }),
      ...(bodyFat !== undefined && { bodyFat }),
      ...(weightChangeSpeed !== undefined && { weightChangeSpeed }),
    },
  });

  return profile;
}