"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase"; // الاستدعاء الصحيح للملف الجديد
import { Widget } from "@uploadcare/react-widget";

export default function Dashboard() {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [messages, setMessages] = useState([]);

  // جلب الرسائل الخاصة بالمستخدم من قاعدة البيانات
  useEffect(() => {
    if (session?.user?.email) {
      const fetchMessages = async () => {
        const { data } = await supabase
          .from('user_inbox')
          .select('*')
          .eq('target_email', session.user.email)
          .order('created_at', { ascending: false });
        if (data) setMessages(data);
      };
      fetchMessages();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 text-right font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-black text-purple-500 italic">استوديو Vidara</h1>
        <span className="text-gray-400 text-sm italic">أهلاً، {session?.user?.name || "المبدع"} 👋</span>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        {/* قسم استلام الأكواد */}
        <section className="bg-[#161b2a] p-6 rounded-[35px] border border-purple-500/30 shadow-xl">
          <h2 className="text-xl font-bold mb-6">📩 بريدك الوارد (أكواد التفعيل)</h2>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm">لا توجد أكواد مرسلة لك حالياً.</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-900 p-5 rounded-2xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">تم الاستلام: {new Date(msg.created_at).toLocaleDateString('ar-EG')}</p>
                    <p className="text-xl font-mono font-black text-green-400 select-all tracking-widest">{msg.activation_code}</p>
                  </div>
                  <div className="bg-green-900/20 text-green-500 text-[10px] px-4 py-1 rounded-full border border-green-500/20">جاهز ✅</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* قسم صناعة الفيديو */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-purple-400">تحريك صورة 📸</h2>
            <div className="bg-gray-900 p-6 rounded-3xl border-2 border-dashed border-gray-700 mb-6 text-center">
              <Widget 
                publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} 
                onChange={(info) => { if (info) setImageUrl(info.cdnUrl); }} 
              />
            </div>
            <button disabled={!imageUrl} className="w-full bg-purple-600 py-4 rounded-2xl font-bold disabled:bg-gray-700">توليد فيديو</button>
          </div>
          
          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6 text-blue-400">نص إلى فيديو ✍️</h2>
            <textarea placeholder="اوصف المشهد هنا..." className="w-full bg-gray-900 rounded-2xl p-4 h-32 text-right outline-none border border-gray-800 focus:border-blue-500"></textarea>
            <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold mt-6">توليد من النص</button>
          </div>
        </div>
      </div>
    </div>
  );
}
