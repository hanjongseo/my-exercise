import type { Metadata } from "next"
import "./globals.css"
import { SiteHeader } from "@/components/SiteHeader"
import { WorkoutProvider } from "@/components/workouts/WorkoutProvider"

export const metadata: Metadata = {
  title: "MY EXERCISE | 나의 운동 포트폴리오",
  description:
    "나의 운동 루틴과 기록, 꾸준한 성장 과정을 담은 피트니스 포트폴리오입니다.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen antialiased">
        <WorkoutProvider>
          <SiteHeader />
          {children}
        </WorkoutProvider>
      </body>
    </html>
  )
}
