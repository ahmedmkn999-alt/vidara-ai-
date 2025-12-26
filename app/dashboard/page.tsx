"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase"; // تم تصحيح المسار هنا أيضاً
import { Widget } from "@uploadcare/react-widget";

export default function Dashboard() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchMsgs = async () => {
        const { data } = await supabase.from('user_inbox').select('*').eq('target_email', session.user.email).order('created_at', { ascending: false });
        if (data) setMessages(data);
      };
      fetchMsgs();
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-10 text-right font-sans" dir="rtl">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <h1 className="text-2xl font-black text-purple-500 italic">Vidara Studio</h1>
        <span className="text-gray-400 text-[10px] italic">{session?.user?.email} 👋</span>
      </div>
      
      {/* صندوق الرسائل */}
      <section className="bg-[#161b2a] p-6 rounded-[35px] border border-purple-500/20 mb-10 shadow-2xl">
        <h2 className="text-lg font-bold mb-6 flex items-center gap-2">📬 رسائلك الواردة (الأكواد)</h2>
        {messages.length === 0 ? <p className="text-gray-500 text-xs italic">لا توجد رسائل حالياً. اطلب كود التفعيل من صفحة الدفع.</p> : 
          <div className="grid gap-3">
            {messages.map((m) => (
              <div key={m.id} className="bg-gray-900 p-5 rounded-2xl border border-gray-800 flex justify-between items-center shadow-lg">
                <p className="text-lg font-mono text-green-400 font-black tracking-[3px] select-all cursor-pointer">{m.activation_code}</p>
                <span className="text-[9px] bg-green-900/20 text-green-500 px-3 py-1 rounded-full border border-green-500/20">جاهز ✅</span>
              </div>
            ))}
          </div>
        }
      </section>

      <div className="bg-[#161b2a] p-10 rounded-[45px] border border-gray-800 text-center shadow-2xl shadow-purple-900/10">
         <h2 className="text-xl font-bold mb-6 text-purple-400">ابدأ الإبداع الآن 🎬</h2>
         <div className="bg-gray-900 p-10 rounded-3xl border-2 border-dashed border-gray-700 mb-6 flex justify-center items-center">
            <Widget publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} />
         </div>
         <p className="text-gray-500 text-[10px] italic">استخدم كود التفعيل المستلم أعلاه لفتح ميزات التوليد.</p>
      </div>
    </div>
  );
           }
