import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    // Return a proxy during build time when DATABASE_URL is not available
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === "then") return undefined
        if (prop === "$connect" || prop === "$disconnect") {
          return () => Promise.resolve()
        }
        return new Proxy(() => {}, {
          get() {
            return () => {
              throw new Error("Database not configured: DATABASE_URL is missing")
            }
          },
          apply() {
            throw new Error("Database not configured: DATABASE_URL is missing")
          },
        })
      },
    })
  }

  const pool = new Pool({ connectionString })
  const adapter = new PrismaPg(pool)

  return new PrismaClient({ adapter })
}

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
