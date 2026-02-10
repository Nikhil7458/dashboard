import 'dotenv/config'
import { defineConfig } from '@prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',

  datasource: {
    url: process.env.DATABASE_URL!,
  },
})



// import { Pool } from 'pg';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@prisma/client';



// const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

// if (!connectionString) {
//   throw new Error("No database URL found");
// }

// const pool = new Pool({ connectionString });
// const adapter = new PrismaPg(pool);

// const prisma = new PrismaClient({ adapter });

// export default prisma;

// prisma.config.ts
// import 'dotenv/config'
// import { defineConfig, env } from '@prisma/config'

// export default defineConfig({
//   schema: 'prisma/schema.prisma',
//   datasource: {
//     url: env('DATABASE_URL'),
//   },
// })