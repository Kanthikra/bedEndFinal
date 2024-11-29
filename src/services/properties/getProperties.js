import { PrismaClient } from "@prisma/client";

const getProperties = async () => {
  const prisma = new PrismaClient();
  try {
    console.log("Connecting to the database...");
    const properties = await prisma.property.findMany();
    console.log("Properties fetched:", properties);
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export default getProperties;
