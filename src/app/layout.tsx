import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/Gnb";

export const metadata: Metadata = {
  title: "Dolog",
  description: "이석찬의 개발 블로그입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/assets/favicon/favicon.ico" />
      </head>
      <body className="antialiased min-h-screen">
        <Gnb />
        {children}
      </body>
    </html>
  );
}
