import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // تم إضافة هذه الـ callbacks لضمان استقرار الجلسة وتجنب أخطاء السيرفر
    async session({ session }) { 
      return session; 
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/dashboard"; // يوجه المستخدم للاستوديو فور تسجيل الدخول
    }
  },
});

export { handler as GET, handler as POST };
