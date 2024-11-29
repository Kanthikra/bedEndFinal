import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomcount,
  maxGuestCount,
  hostId,
  rating
) => {
  const newProperty = {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomcount,
    maxGuestCount,
    hostId,
    rating,
  };

  const prisma = new PrismaClient();
  const property = await prisma.property.create({
    data: newProperty,
  });

  return property;
};

export default createProperty;
