import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Singleton Prisma-client

const deleteUserById = async (id) => {
  try {
    // Probeer de gebruiker te verwijderen
    const user = await prisma.user.delete({
      where: { id },
    });

    return user.id; // Return het ID van de verwijderde gebruiker
  } catch (error) {
    if (error.code === "P2025") {
      // Prisma foutcode voor niet-bestaande record
      return null;
    }
    throw error; // Her-throw onbekende fouten
  }
};

export default deleteUserById;
