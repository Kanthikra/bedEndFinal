import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Singleton Prisma-client

const getUserById = async (id) => {
  try {
    // Valideer het ID
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided.");
    }

    // Zoek de gebruiker op basis van het unieke ID
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    // Foutafhandeling
    console.error("Error fetching user by ID:", error.message);
    throw error; // Gooi de fout door voor de foutafhandelaar in de router
  }
};

export default getUserById;
