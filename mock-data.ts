import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed institutes
  const institutes = await prisma.institute.createMany({
    data: [
      {
        id: 'inst-1',
        name: 'Delhi Public School, R.K. Puram',
        type: 'SCHOOL',
        address: 'R.K. Puram, Sector 12',
        city: 'New Delhi',
        district: 'South West Delhi',
        state: 'Delhi',
        pincode: '110022',
        verified: true,
      },
      {
        id: 'inst-2',
        name: 'IIT Delhi',
        type: 'UNIVERSITY',
        address: 'Hauz Khas',
        city: 'New Delhi',
        district: 'South Delhi',
        state: 'Delhi',
        pincode: '110016',
        verified: true,
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Seeded ${institutes.count} institutes`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
