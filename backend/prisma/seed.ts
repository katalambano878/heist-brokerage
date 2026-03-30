import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("ChangeMe123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@luxuryestate.local" },
    create: {
      email: "admin@luxuryestate.local",
      passwordHash,
      name: "Super Admin",
      role: "SUPER_ADMIN",
    },
    update: { passwordHash },
  });

  await prisma.storeSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      storeName: "Luxury Estate",
      contactEmail: "admin@luxuryestate.local",
      currency: "GHS",
      taxRate: "0.125",
    },
    update: {},
  });

  const cat = await prisma.category.upsert({
    where: { slug: "residences" },
    create: { name: "Residences", slug: "residences" },
    update: {},
  });

  await prisma.product.upsert({
    where: { slug: "sample-luxury-listing" },
    create: {
      title: "Sample luxury listing",
      slug: "sample-luxury-listing",
      description: "Replace with your catalog — wired to the admin API.",
      sku: "DEMO-001",
      price: "2500000",
      status: "ACTIVE",
      categoryId: cat.id,
    },
    update: {},
  });

  if ((await prisma.shippingZone.count()) === 0) {
    await prisma.$transaction([
      prisma.shippingZone.create({
        data: {
          name: "Greater Accra",
          regions: { country: "GH", areas: ["Accra", "Tema"] },
          fee: "150",
        },
      }),
      prisma.shippingZone.create({
        data: {
          name: "Other regions",
          regions: { country: "GH", areas: ["*"] },
          fee: "350",
        },
      }),
    ]);
  }

  console.log("Seed complete. Admin login: admin@luxuryestate.local / ChangeMe123!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
