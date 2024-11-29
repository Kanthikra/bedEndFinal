import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  try {
    // Bijwerken van de gebruiker op basis van het id
    const user = await prisma.user.update({
      where: { id }, // Zoeken op het id van de gebruiker
      data: updatedUser, // De nieuwe gegevens die we willen updaten
    });

    // Return de updated gebruiker als succes, anders null
    return user ? id : null;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

export default updateUserById;
