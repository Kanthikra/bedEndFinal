import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };

const Prisma = new PrismaClient({ log: [`query`, `info`, `warn`, `error`] });

async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  // Maak een transactie voor alle upserts
  const transaction = [];

  amenities.forEach((amenity) => {
    transaction.push(
      Prisma.amenity.upsert({
        where: { id: amenity.id },
        update: {},
        create: amenity,
      })
    );
  });

  bookings.forEach((booking) => {
    transaction.push(
      Prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: booking,
      })
    );
  });

  hosts.forEach((host) => {
    transaction.push(
      Prisma.host.upsert({
        where: { id: host.id },
        update: {},
        create: host,
      })
    );
  });

  properties.forEach((property) => {
    transaction.push(
      Prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: property,
      })
    );
  });

  reviews.forEach((review) => {
    transaction.push(
      Prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: review,
      })
    );
  });

  users.forEach((user) => {
    transaction.push(
      Prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      })
    );
  });

  // Voer de transactie uit
  await Prisma.$transaction(transaction);

  console.log("Seeding completed successfully.");
}

main()
  .catch(async (e) => {
    console.error(e);
    await Prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await Prisma.$disconnect();
  });
