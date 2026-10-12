# MY MOVE | 운동 포트폴리오 (MongoDB 없이 실행)

Next.js App Router + TypeScript + Tailwind CSS로 만든 독립 실행형 운동 포트폴리오입니다. 운동 기록은 브라우저의 `localStorage`에 저장하므로 MongoDB 계정이나 `.env.local` 설정이 필요하지 않습니다.

## 실행 방법

1. ZIP을 압축 해제합니다.
2. VS Code에서 `package.json` 파일이 들어 있는 `my-move-local` 폴더를 엽니다.
3. VS Code 터미널에서 다음 명령어를 실행합니다.

```bash
npm install
npm run dev
```

4. 브라우저에서 `http://localhost:3000`에 접속합니다.

## 운동 기록 저장 방식

- `기록 추가` 페이지에서 날짜, 운동명, 분류, 시간 등을 입력하고 `기록 저장`을 누릅니다.
- 기록은 대시보드와 전체 운동 기록 화면에 즉시 표시됩니다.
- 각 기록 오른쪽의 `삭제` 버튼을 누르고 확인하면 해당 기록이 삭제됩니다.
- 브라우저를 새로고침하거나 개발 서버를 다시 시작해도 같은 브라우저의 같은 주소에서 기록이 유지됩니다.
- 별도 데이터베이스나 MongoDB 연결 문자열은 필요하지 않습니다.

## 알아둘 점

- 기록은 현재 브라우저/기기에만 저장됩니다. 다른 컴퓨터나 휴대전화와 자동으로 동기화되지 않습니다.
- 브라우저 사이트 데이터를 삭제하거나 시크릿 창을 닫으면 기록이 사라질 수 있습니다.
- 첫 실행 시 예시 운동 기록이 표시됩니다. 예시 기록을 포함해 실제 기록도 같은 저장소에 저장됩니다.

## 주요 구조

```text
my-move-local/
├── app/
│   ├── workouts/
│   │   ├── new/page.tsx
│   │   └── page.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── home/                 # 메인 페이지의 각 영역
│   ├── workouts/             # 폼, 필터, 브라우저 저장 상태
│   ├── SiteHeader.tsx
│   └── SiteFooter.tsx
├── lib/
│   ├── date.ts
│   └── demo-workouts.ts
├── types/workout.ts
├── package.json
├── tsconfig.json
└── ... 설정 파일
```

## 저장 관련 코드

- `components/workouts/WorkoutProvider.tsx`: 기록을 React 상태로 관리하고 브라우저 `localStorage`에서 불러오거나 저장합니다.
- `components/workouts/WorkoutForm.tsx`: 기록 입력 및 검증, 저장 후 기록 페이지로 이동합니다.
- `components/workouts/WorkoutProvider.tsx`: `addWorkout`과 `deleteWorkout`으로 추가·삭제 상태를 관리하고 localStorage에 반영합니다.
- `components/home/WorkoutRecordList.tsx`: 각 기록에 삭제 버튼과 확인 대화상자를 제공합니다.
- `app/workouts/page.tsx`: 기록 목록과 종류별 필터를 표시합니다.
- `app/page.tsx`: 운동 통계를 계산하고 최근 기록을 표시합니다.

이 프로젝트는 MongoDB/Mongoose를 사용하지 않습니다.
