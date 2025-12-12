import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Math Bingo",
  description: "A fun educational game for learning math",
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
