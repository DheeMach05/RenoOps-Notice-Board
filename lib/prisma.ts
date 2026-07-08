import { PrismaClient } from "../generated/prisma/client";
import { PrismaTiDBCloud } from "@tidbcloud/prisma-adapter";

const adapter = new PrismaTiDBCloud({
  url: process.env.DATABASE_URL!,
});

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}