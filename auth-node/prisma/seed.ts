import { PrismaClient } from "@prisma/client";

const load = async () => {
  const prisma = new PrismaClient();
  try {
  } catch (error) {
    console.error(error);
  }
};

load();
