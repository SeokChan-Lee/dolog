import type { Metadata } from "next";
import "./globals.css";
import Gnb from "@/components/Gnb";
import ProfileModal from "@/components/ProfileModal";
import { Providers } from "@/components/Providers";
import FloatingButton from "@/components/FloatingButton";
import ScrollToTopButton from "@/components/ScrollTopButton";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Dolog",
  description: "내가 하고 싶은대로 만드는 개발 블로그",
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
        <div className="bg-blue-400 w-[60vw] h-[60vw] top-1/2 left-1/2 -translate-1/2 rounded-full fixed opacity-10 blur-3xl pointer-events-none"></div>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TF3HKE3PL5"
          strategy="afterInteractive"
        />
        <Script id="ga-setup" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TF3HKE3PL5', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Providers>
          <Gnb />
          {children}
          <div className="fixed z-50 right-6 bottom-6 md:right-10 md:bottom-10 lg:right-30 lg:bottom-14 ">
            <ScrollToTopButton />
            <FloatingButton
              label="깃허브"
              iconSrc="/assets/icon/git_icon.png"
              href="https://github.com/SeokChan-Lee"
            />
            <ProfileModal />
          </div>
        </Providers>
      </body>
    </html>
  );
}
