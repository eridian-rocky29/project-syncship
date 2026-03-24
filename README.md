# Project-SyncShip
Bitbucket Cloud Storage to Confluence Automation Tool

Project-SyncShip은 Bitbucket 저장소의 코드 변경 사항이나 특정 문서를 실시간으로 감지하여, 연동된 Confluence 페이지에 자동으로 동기화하고 업데이트하는 자동화 서비스입니다. 1인 개발자 및 소규모 팀의 문서화 리소스를 최소화하고 코드-문서 간의 싱크를 완벽하게 유지하기 위해 설계되었습니다.

## 🛠 Tech Stack

**Frontend & Framework**
- **Next.js 16.2.1** (App Router): 리액트 서버 컴포넌트(RSC) 및 React Compiler 활용.
- **React 19**: 최신 React 기능 및 성능 최적화 적용.
- **TypeScript**: 엄격한 타입 시스템을 통한 안정적인 코드 베이스 유지.
- **Tailwind CSS v4**: 유틸리티 기반의 빠른 UI 스타일링.

**Backend & Database**
- **Supabase** (PostgreSQL): 매핑 데이터 저장 (DB 호스팅 용도, Prisma를 통해 서버에서만 접근).
- **Prisma v7**: Type-safe한 데이터베이스 쿼리 및 스키마 관리.
- **Next.js Route Handlers**: Bitbucket Webhook 수신 및 Atlassian API 연동을 위한 백엔드 로직.

**AI Integration**
- **Gemini / OpenAI**: 코드 변경 내용을 AI가 요약하여 Confluence 문서에 자동 반영.

**AI-Augmented Development**
- **Agent-Driven Development**: `AGENTS.md` 및 AI 에이전트 지침을 활용한 고효율 개발 워크플로우 적용.

## ✨ Key Features

- **Atlassian OAuth 2.0 연동**: 사용자의 Atlassian 계정과 안전하게 연동하여 권한 획득.
- **저장소-페이지 매핑**: 특정 Bitbucket Repository와 업데이트 대상 Confluence Page를 1:1로 매핑.
- **실시간 동기화 (Webhook)**: 코드 푸시 또는 PR 완료 시 자동으로 Confluence 콘텐츠 업데이트.
- **AI 요약**: 변경된 코드의 핵심 내용을 AI(Gemini/OpenAI)가 요약하여 문서에 반영.

## 🚀 Getting Started

**Prerequisites**
- Node.js 18.x 이상
- pnpm
- Supabase Account & Project
- Atlassian Developer Account (OAuth 2.0 앱 등록)
- Gemini 또는 OpenAI API Key

**Installation**

```bash
# Clone the repository
git clone https://github.com/사용자명/project-syncship.git

# Install dependencies
pnpm install
```

**.env 설정**

```bash
# Supabase (PostgreSQL - 서버 전용)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Atlassian OAuth 2.0
ATLASSIAN_CLIENT_ID="your_client_id"
ATLASSIAN_CLIENT_SECRET="your_client_secret"

# AI
GEMINI_API_KEY="your_gemini_api_key"
# 또는
OPENAI_API_KEY="your_openai_api_key"
```

**Prisma 설정 및 실행**

```bash
# Prisma 클라이언트 생성
pnpm prisma generate

# DB 스키마 반영
pnpm prisma db push

# 개발 서버 실행
pnpm dev
```

## 📂 Project Structure

```
project-syncship/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # 인증 관련 페이지 (로그인 등)
│   │   ├── (dashboard)/        # 대시보드 페이지
│   │   └── api/
│   │       ├── ai/             # AI 요약 API Route
│   │       └── webhook/        # Bitbucket Webhook 수신 Route
│   ├── components/             # 공유 UI 컴포넌트
│   ├── lib/
│   │   ├── ai-service.ts       # Gemini/OpenAI 연동 로직
│   │   ├── atlassian.ts        # Confluence/Bitbucket API 클라이언트
│   │   └── prisma.ts           # Prisma 클라이언트 인스턴스
│   └── types/                  # 공유 TypeScript 타입 정의
├── prisma/
│   └── schema.prisma           # DB 스키마 정의
├── public/                     # 정적 파일
├── AGENTS.md                   # AI 에이전트 개발 지침
├── prisma.config.ts            # Prisma v7 설정 (datasource URL 관리)
└── next.config.ts              # Next.js 설정 (React Compiler 활성화)
```