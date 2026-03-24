import { defineConfig, env } from '@prisma/config'
import { loadEnvFile } from 'node:process'

/**
 * Node.js 시스템 에러 타입을 검증하는 Type Guard
 * 예상치 못한 에러들 사이에서 '우리가 아는 에러(code가 있는 객체)'를 골라냅니다.
 */
function isNodeError(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && 'code' in error;
}

// 1. 환경 변수 로드 로직
try {
  loadEnvFile('.env')
} catch(error: unknown) {
  // CI/CD 환경 등 .env 파일이 없을 경우 시스템 환경 변수 사용
  // ENOENT: 파일이 존재하지 않을 때 발생하는 에러 코드

  // whitelist 전략 : '파일 없음(ENOENT)' 상황만 안전하게 통과 - .env가 없더라도 CI/CD나 환경 변수가 주입된 서버라면 실행 계속
  if(isNodeError(error) && error.code === 'ENOENT') {
    console.warn('.env 파일이 없습니다. 시스템 환경 변수를 사용합니다.')
  } else {
    throw error; // 다른 종류의 에러는 그대로 던져서 문제를 알 수 있도록 함
  }
  
}

/**
 * 2. CLI 전용 URL 결정 (Logic)
 * db push, migrate 등 관리 작업은 무조건 DIRECT_URL(Session Mode)을 권장합니다.
 * fallback으로 DATABASE_URL을 두어 설정 유연성을 확보합니다.
 */
const connectionUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionUrl) {
  throw new Error('❌ Prisma Config: DIRECT_URL or DATABASE_URL is required for CLI operations.');
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // Prisma v7은 directUrl 미지원 → DIRECT_URL(직접 연결)을 단일 url로 사용
    // Supabase pooled 연결(DATABASE_URL)은 @supabase/supabase-js 클라이언트가 사용
    url: env('DIRECT_URL'),
  },
})