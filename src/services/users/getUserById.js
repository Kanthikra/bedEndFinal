import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
  try {
    if (!id || typeof id !== "string") {
      throw new Error("Invalid ID provided.");
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    throw error;
  }
};

export default getUserById;
