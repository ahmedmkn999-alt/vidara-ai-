"use client";
import { SessionProvider } from "next-auth/react";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0b0f19]">
        {/* هذا هو التعديل الجوهري الذي يحل مشكلة تسجيل الدخول */}
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
