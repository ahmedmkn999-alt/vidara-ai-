"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [freeTrials, setFreeTrials] = useState(3); // عداد الـ 3 فيديوهات الهدية

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-8 text-right font-sans">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <div className="flex items-center gap-4">
           {/* عداد الهدايا للمسجلين الجدد */}
           <div className="bg-yellow-900/20 border border-yellow-500/50 px-4 py-1 rounded-full">
             <span className="text-yellow-500 font-bold text-sm">هدية التسجيل: {freeTrials} فيديوهات متبقية 🎁</span>
           </div>
           <span className="text-purple-400 font-bold underline italic">أهلاً، {session?.user?.name || "المبدع"} 👋</span>
        </div>
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent italic">استوديو Vidara</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* قسم تحريك الصور */}
        <div className={`bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 shadow-xl transition ${freeTrials === 0 ? 'opacity-40 grayscale' : 'hover:border-purple-500'}`}>
          <h2 className="text-xl font-bold mb-6 text-purple-400">١. تحريك صورة 📸</h2>
          <div className="bg-gray-900 h-40 rounded-3xl border-2 border-dashed border-gray-700 flex items-center justify-center mb-6 cursor-pointer">ارفع الصورة هنا</div>
          <button 
            disabled={freeTrials === 0}
            className="w-full bg-purple-600 py-4 rounded-2xl font-bold shadow-lg shadow-purple-900/20"
          >
            {freeTrials > 0 ? "صناعة فيديو (مجاني)" : "اشترك لتكمل"}
          </button>
        </div>

        {/* قسم تحويل النص لفيديو */}
        <div className={`bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 shadow-xl transition ${freeTrials === 0 ? 'opacity-40 grayscale' : 'hover:border-blue-500'}`}>
          <h2 className="text-xl font-bold mb-6 text-blue-400">٢. نص إلى فيديو ✍️</h2>
          <textarea placeholder="اوصف الفيديو الذي تريده..." className="w-full bg-gray-900 rounded-2xl p-4 h-40 text-right outline-none focus:border-blue-500 transition"></textarea>
          <button 
            disabled={freeTrials === 0}
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold mt-6 shadow-lg shadow-blue-900/20"
          >
            {freeTrials > 0 ? "توليد من النص (مجاني)" : "انتهت هداياك"}
          </button>
        </div>
      </div>

      {/* رسالة تظهر عند انتهاء الـ 3 فيديوهات */}
      {freeTrials === 0 && (
        <div className="mt-12 p-8 bg-red-900/20 border border-red-500/50 rounded-[35px] text-center max-w-2xl mx-auto">
          <p className="text-red-400 font-bold text-xl mb-4">خلصت فيديوهاتك الهدية 😢</p>
          <a href="/#pricing" className="bg-green-600 px-10 py-4 rounded-full font-bold shadow-xl shadow-green-900/20 hover:bg-green-700 transition inline-block">اشترك الآن في باقات برو</a>
        </div>
      )}
    </div>
  );
}
