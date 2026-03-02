import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is missing in .env");
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const db = new PrismaClient({ adapter });

async function main() {
  const existing = await db.plan.findFirst({ where: { product: "SHSAT" } });
  if (existing) {
    console.log("SHSAT plan already exists:", existing.id);
    return;
  }

  const plan = await db.plan.create({
    data: {
      name: "Product Launch Plan",
      product: "SHSAT",
      phases: {
        create: [
          {
            title: "Phase 1 — Foundation",
            order: 1,
            durationDays: 5,
            steps: {
              create: [
                { order: 1, title: "Audit onboarding flow" },
                { order: 2, title: "Ensure diagnostic works end-to-end" },
                {
                  order: 3,
                  title: "Auto-generate study plan after diagnostic",
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Seeded SHSAT plan:", plan.id);
}

main()
  .then(async () => {
    await db.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    await pool.end();
    process.exit(1);
  });
