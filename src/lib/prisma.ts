// Prisma 클라이언트 설정

import { PrismaClient } from "@prisma/client/extension";

// Prisma 7 환경에서는 인스턴스 생성 시점에 설정을 주입하는 것을 권장합니다.
export const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
})

