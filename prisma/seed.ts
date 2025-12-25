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
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    date_of_birth: faker.date.birthdate(),
    gender: "MALE",
    phone: faker.phone.number({ style: "international" }),
    email: faker.internet.email(),
    address: faker.location.streetAddress(),
    colorCode: generateRandomColor(),

    marital_status: "single",
    emergency_contact_name: faker.person.firstName(),
    emergency_contact_number: faker.phone.number(),
    relation: "mother",

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
