import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import process from "process";

const prisma = new PrismaClient();

const login = async (username, password) => {
  const secretKey =
    process.env.AUTH_SECRET_KEY ||
    "Vwq991L6LRFO2hBjcSwHniv2+yXlYD6xx+NAwGHFRqT1BB7y1ysPqiaZbCs=";
  const user = await prisma.user.findFirst({
    where: { username },
  });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

  return token;
};

export default login;
