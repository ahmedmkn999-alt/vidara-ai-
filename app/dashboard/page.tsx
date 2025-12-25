"use client";
import { useState } from 'react';

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 lg:p-12 text-right font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-12 border-b border-gray-800 pb-6">
        <div className="bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30 text-purple-400 text-sm font-bold">
          باقة برو نشطة ✅
        </div>
        <h1 className="text-3xl font-black bg-gradient-to-l from-purple-400 to-blue-500 bg-clip-text text-transparent italic">
          استوديو Vidara
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* الخيار الأول: صورة إلى فيديو */}
        <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 hover:border-purple-500/50 transition shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-purple-400">١. تحريك صورة (Image to Video)</h2>
          <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-3xl p-10 text-center mb-6 cursor-pointer hover:bg-gray-800 transition">
            <p className="text-gray-500 font-bold">اضغط لرفع الصورة المراد تحريكها 📸</p>
          </div>
          <textarea 
            placeholder="اوصف الحركة هنا (مثلاً: خلي الشخص يبتسم ويحرك راسه)" 
            className="w-full bg-gray-900 rounded-2xl p-4 border border-gray-800 h-32 text-right outline-none focus:border-purple-500"
          ></textarea>
          <button 
            disabled={loading}
            className="w-full mt-6 bg-purple-600 py-4 rounded-2xl font-bold shadow-lg shadow-purple-900/20 hover:scale-105 transition"
          >
            {loading ? "جاري المعالجة..." : "صناعة فيديو من الصورة"}
          </button>
        </div>

        {/* الخيار الثاني: نص إلى فيديو */}
        <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 hover:border-blue-500/50 transition shadow-2xl">
          <h2 className="text-xl font-bold mb-6 text-blue-400">٢. نص إلى فيديو (Text to Video)</h2>
          <textarea 
            placeholder="اكتب وصف الفيديو اللي في خيالك بالتفصيل... (مثلاً: رائد فضاء يمشي على المريخ في وقت الغروب)" 
            className="w-full bg-gray-900 rounded-2xl p-4 border border-gray-800 h-64 text-right outline-none focus:border-blue-500"
          ></textarea>
          <button 
            disabled={loading}
            className="w-full mt-6 bg-blue-600 py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition"
          >
            {loading ? "جاري التخيل..." : "حول النص لفيديو خيالي"}
          </button>
        </div>
      </div>

      {/* منطقة عرض النتائج */}
      <div className="mt-16 text-center">
        <h3 className="text-gray-500 mb-8 italic">الفيديوهات اللي صنعتها هتظهر هنا 👇</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {/* هنا هيتم عرض الفيديوهات الجاهزة */}
           <div className="aspect-video bg-gray-900 rounded-2xl border border-gray-800 flex items-center justify-center text-xs text-gray-700 font-bold italic">قيد الانتظار...</div>
        </div>
      </div>
    </div>
  );
}
