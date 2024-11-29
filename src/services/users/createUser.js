import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient(); // Singleton Prisma-client

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  // Input validatie
  if (!username || !password || !name || !email) {
    throw new Error("Username, password, name, and email are required!");
  }

  try {
    // Hash het wachtwoord met bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Maak de nieuwe gebruiker
    const newUser = {
      username,
      password: hashedPassword, // Opslaan van gehashed wachtwoord
      name,
      email,
      phoneNumber,
      profilePicture,
    };

    const user = await prisma.user.create({
      data: newUser,
    });

    return user;
  } catch (error) {
    if (error.code === "P2002") {
      // Prisma's unieke constraint-fout (bijv. dubbele username of email)
      throw new Error("Username or email already exists!");
    }

    // Her-throw onbekende fouten
    throw error;
  }
};

export default createUser;
