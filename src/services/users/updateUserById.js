import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, updatedUser) => {
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.update({
      where: { id },
      data: updatedUser,
    });

    return user ? id : null;
  } catch (error) {
    console.error("Error updating user:", error.message);
    throw error;
  }
};

export default updateUserById;
