import type { Metadata } from "next";
import "./globals.css";
import { BRAND_NAME } from "./_constants/brand";

export const metadata: Metadata = {
  title: BRAND_NAME,
  description: "A fun educational game for learning times tables",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
