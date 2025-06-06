import { PrismaClient } from "@prisma/client";
import { AVATARS, BACKGROUNDS } from "../constants/sprites";
import { getUserXP } from "./levelHelper";

const prisma = new PrismaClient();

export async function upsertSprites() {
  for (const avatar of AVATARS) {
    await prisma.avatar.upsert({
      where: { name: avatar.name },
      update: {},
      create: avatar,
    });
  }
  for (const background of BACKGROUNDS) {
    await prisma.background.upsert({
      where: { name: background.name },
      update: {},
      create: background,
    });
  }
}

export async function unlockAvatars(userId: string) {
  const userXP = await getUserXP(userId);

  // Unlock all eligible avatars based on XP
  const eligibleAvatars = AVATARS.filter(
    (avatar) => avatar.unlockRequirement <= userXP
  );

  // Create the records
  await prisma.avatarUnlocked.createMany({
    data: eligibleAvatars.map((avatar) => ({
      userId,
      avatarName: avatar.name,
    })),
    skipDuplicates: true, // Skip duplicates if any
  });

  // Fetch and return the created records in the desired format
  const unlockedAvatars = await prisma.avatarUnlocked.findMany({
    where: {
      userId,
    },
    select: {
      avatarName: true,
    },
  });

  return unlockedAvatars;
}

export async function unlockBackgrounds(userId: string) {
  const userXP = await getUserXP(userId);

  // Unlock all eligible backgrounds based on XP
  const eligibleBackgrounds = BACKGROUNDS.filter(
    (background) => background.unlockRequirement <= userXP
  );

  // Create the records
  await prisma.backgroundUnlocked.createMany({
    data: eligibleBackgrounds.map((background) => ({
      userId,
      backgroundName: background.name,
    })),
    skipDuplicates: true, // Skip duplicates if any
  });

  // Fetch and return the created records in the desired format
  const unlockedBackgrounds = await prisma.backgroundUnlocked.findMany({
    where: {
      userId,
    },
    select: {
      backgroundName: true,
    },
  });

  return unlockedBackgrounds;
}
