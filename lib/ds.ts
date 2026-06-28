import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT), // Aiven uses port 25060
    ssl: { rejectUnauthorized: false }, // Crucial: Aiven requires SSL
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
};

export const db = globalThis.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;