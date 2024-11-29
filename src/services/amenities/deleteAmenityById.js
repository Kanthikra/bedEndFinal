import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenitiy = await prisma.amenity.delete({
    where: { id },
  });

  return amenitiy.count > 0 ? id : null;
};

export default deleteAmenityById;
