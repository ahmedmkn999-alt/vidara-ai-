"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; // ربط قاعدة البيانات
import { Widget } from "@uploadcare/react-widget";

export default function Dashboard() {
  const { data: session } = useSession();
  const [imageUrl, setImageUrl] = useState("");
  const [messages, setMessages] = useState([]); // لتخزين الأكواد المستلمة

  // 1. جلب الأكواد المرسلة لهذا المستخدم من قاعدة البيانات
  useEffect(() => {
    if (session?.user?.email) {
      const fetchMessages = async () => {
        const { data } = await supabase
          .from('user_inbox')
          .select('*')
          .eq('target_email', session.user.email) // جلب الرسائل الخاصة بهذا الإيميل فقط
          .order('created_at', { ascending: false });
        
        if (data) setMessages(data);
      };
      fetchMessages();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 text-right font-sans" dir="rtl">
      {/* الهيدر */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-black text-purple-500 italic">استوديو Vidara</h1>
        <span className="text-gray-400 text-sm">أهلاً، {session?.user?.name || "المبدع"} 👋</span>
      </div>

      <div className="max-w-6xl mx-auto grid gap-8">
        
        {/* قسم الرسائل (صندوق الوارد) - هيظهر هنا الكود اللي بتبتعه من الـ Admin */}
        <section className="bg-[#161b2a] p-6 rounded-[35px] border border-purple-500/30 shadow-2xl shadow-purple-900/10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">📩</span> رسائلك الواردة (أكواد التفعيل)
          </h2>
          
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm italic">لا توجد رسائل حالياً. اطلب كود تفعيل من صفحة الدفع.</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-500 mb-1">تم الاستلام في: {new Date(msg.created_at).toLocaleDateString('ar-EG')}</p>
                    <p className="text-lg font-mono font-black text-green-400 select-all cursor-pointer" title="اضغط لنسخ الكود">
                      {msg.activation_code}
                    </p>
                  </div>
                  <span className="bg-green-900/20 text-green-500 text-[10px] px-3 py-1 rounded-full border border-green-500/20">جاهز للاستخدام ✅</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* أدوات الذكاء الاصطناعي (أكوادك السابقة) */}
        <div className="grid md:grid-cols-2 gap-8">
           {/* ... (باقي كود الـ Dashboard اللي فيه التوليد) ... */}
        </div>

      </div>
    </div>
  );
}
