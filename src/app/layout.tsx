import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans } from 'next/font/google';
import Head from "next/head";
import MainNavbar from "@/components/navigation/MainNavbar";

// Initialize Open Sans font
const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "manga.lryanle.com",
  description: "Lryanle's personal manga viewing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body
        className={`antialiased bg-muted`}
      >
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}
