import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For Jii ❤️",
  description: "A premium surprise experience made just for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
