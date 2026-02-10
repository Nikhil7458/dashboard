// // // src/lib/prisma.ts
// // import { PrismaClient } from '@prisma/client';
// // import { Pool } from 'pg';
// // import { PrismaPg } from '@prisma/adapter-pg';

// // // Hardcoded for now (you can switch to process.env later)
// // const DATABASE_URL = "postgresql://fundsmamatech@localhost:5432/taskboard?schema=public";

// // const prismaClientSingleton = () => {
// //   const pool = new Pool({ connectionString: DATABASE_URL });

// //   const adapter = new PrismaPg(pool);

// //   return new PrismaClient({
// //     adapter,  // ← this fixes the "not a constructor" error in Prisma 7
// //   });
// // };

// // const globalForPrisma = global as unknown as {
// //   prisma: ReturnType<typeof prismaClientSingleton>;
// // };

// // const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// // if (process.env.NODE_ENV !== 'production') {
// //   globalForPrisma.prisma = prisma;
// // }

// // export { prisma };


// // src/lib/prisma.ts
// import { PrismaClient } from '@prisma/client';
// import { Pool } from 'pg';
// import { PrismaPg } from '@prisma/adapter-pg';

// // For local development (change this when deploying)
// const DATABASE_URL = "postgresql://fundsmamatech@localhost:5432/taskboard?schema=public";

// const prismaClientSingleton = () => {
//   const pool = new Pool({ connectionString: DATABASE_URL });
//   const adapter = new PrismaPg(pool);

//   return new PrismaClient({
//     adapter,  // Required in Prisma 7 for direct PostgreSQL connection
//   });
// };

// // Singleton to prevent multiple instances during dev hot-reload
// const globalForPrisma = global as unknown as {
//   prisma: ReturnType<typeof prismaClientSingleton>;
// };

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

// export { prisma };
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const DATABASE_URL = process.env.DATABASE_URL!

const prismaClientSingleton = () => {
  const pool = new Pool({
    connectionString: DATABASE_URL,
  })

  const adapter = new PrismaPg(pool)

  return new PrismaClient({
    adapter,
  })
}

const globalForPrisma = global as unknown as {
  prisma?: ReturnType<typeof prismaClientSingleton>
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export { prisma }
