import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/Gnb";
import ProfileModal from "@/components/ProfileModal";
import GitLinkButton from "@/components/GitLinkButton";

export const metadata: Metadata = {
  title: "Dolog",
  description: "이석찬의 개발 블로그입니다.",
  openGraph: {
    images: "https://dolog-ten.vercel.app/assets/Logo/Dolog_Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" />
      </head>
      <body className="antialiased min-h-screen">
        <Gnb />
        {children}
        <div className="fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10 lg:right-14 lg:bottom-14 w-35">
          <GitLinkButton />
          <ProfileModal />
        </div>
      </body>
    </html>
  );
}
