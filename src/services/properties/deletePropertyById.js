import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.delete({
    where: { id },
  });

  return property ? id : null;
};

export default deletePropertyById;
