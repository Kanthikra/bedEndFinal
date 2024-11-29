import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import process from "process";

const prisma = new PrismaClient();

const login = async (username, password) => {
  try {
    const secretKey = process.env.AUTH_SECRET_KEY;
    if (!secretKey) {
      console.error("AUTH_SECRET_KEY is not defined.");
      throw new Error(
        "AUTH_SECRET_KEY is not defined in environment variables."
      );
    }

    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      console.log("User not found:", username);
      return { error: "Invalid username or password" };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password mismatch for user:", username);
      return { error: "Invalid username or password" };
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
    console.log("Token generated successfully:", token);
    return { token };
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Something went wrong, please try again later." };
  }
};

export default login;
