


// import { PrismaClient } from '@prisma/client'
// import { Pool } from 'pg'
// import { PrismaPg } from '@prisma/adapter-pg'

// const DATABASE_URL = process.env.DATABASE_URL!

// const prismaClientSingleton = () => {
//   const pool = new Pool({
//     connectionString: DATABASE_URL,
//   })

//   const adapter = new PrismaPg(pool)

//   return new PrismaClient({
//     adapter,
//   })
// }

// const globalForPrisma = global as unknown as {
//   prisma?: ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }

// export { prisma }


import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const prismaClientSingleton = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  })

  const adapter = new PrismaPg(pool)

  return new PrismaClient({ adapter })
}

const globalForPrisma = global as unknown as {
  prisma?: ReturnType<typeof prismaClientSingleton>
}

export const prisma =
  globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
