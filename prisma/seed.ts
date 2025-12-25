import { PrismaClient } from "@prisma/client";
import { fakerDE as faker } from "@faker-js/faker";
import { generateRandomColor } from "../utils"; // ❌ Jangan pakai '@/utils' di seed

const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding data...");

  // Contoh: create 5 patients
  for (let i = 0; i < 5; i++) {
    await prisma.patient.create({
      data: {
        id: faker.string.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        date_of_birth: faker.date.birthdate(),
        gender: i % 2 === 0 ? "MALE" : "FEMALE",
        phone: faker.phone.number(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        colorCode: generateRandomColor(),
        privacy_consent: true,
        service_consent: true,
        medical_consent: true,
      },
    });
  }

  console.log("Seeding complete!");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
