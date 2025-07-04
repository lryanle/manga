import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

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
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <body
        className={`antialiased bg-muted`}
      >
        {children}
      </body>
    </html>
  );
}
