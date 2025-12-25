"use client";
import { SessionProvider } from "next-auth/react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0b0f19]">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
