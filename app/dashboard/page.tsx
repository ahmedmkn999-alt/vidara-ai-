"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase"; // المسار الصحيح
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
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 text-right font-sans" dir="rtl">
      <h1 className="text-2xl font-black text-purple-500 mb-8 italic">Vidara Studio</h1>
      
      {/* صندوق الوارد للعميل */}
      <section className="bg-[#161b2a] p-6 rounded-[30px] border border-purple-500/20 mb-10 shadow-xl">
        <h2 className="text-lg font-bold mb-4">📬 رسائلك الواردة (الأكواد)</h2>
        {messages.length === 0 ? <p className="text-gray-500 text-sm italic">لا توجد رسائل حالياً.</p> : 
          <div className="grid gap-3">
            {messages.map((m) => (
              <div key={m.id} className="bg-gray-900 p-4 rounded-2xl border border-gray-800 flex justify-between items-center">
                <span className="text-lg font-mono text-green-400 font-bold tracking-widest">{m.activation_code}</span>
                <span className="text-[10px] bg-green-900/20 text-green-500 px-3 py-1 rounded-full">جاهز ✅</span>
              </div>
            ))}
          </div>
        }
      </section>

      {/* أدوات التوليد */}
      <div className="bg-[#161b2a] p-8 rounded-[35px] border border-gray-800">
         <h2 className="text-xl font-bold mb-6 text-purple-400 text-center">ابدأ الإبداع 🎬</h2>
         <div className="bg-gray-900 p-10 rounded-3xl border-2 border-dashed border-gray-700 text-center">
            <Widget publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} />
         </div>
      </div>
    </div>
  );
            }
