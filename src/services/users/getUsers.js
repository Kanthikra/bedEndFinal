import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Singleton Prisma-client

const getUsers = async () => {
  try {
    // Haal alle gebruikers op zonder enige beperking
    const users = await prisma.user.findMany();

    return users;
  } catch (error) {
    // Log de fout en gooi deze opnieuw
    console.error("Error fetching users:", error.message);
    throw error;
  }
};

export default getUsers;
