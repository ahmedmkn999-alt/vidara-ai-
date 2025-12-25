"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Widget } from "@uploadcare/react-widget";

export default function Dashboard() {
  const { data: session } = useSession();
  const [freeTrials, setFreeTrials] = useState(3);
  const [imageUrl, setImageUrl] = useState("");

  const handleGenerate = () => {
    if (freeTrials > 0) {
      alert("جاري التوليد باستخدام Replicate...");
      setFreeTrials(freeTrials - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-8 text-right font-sans">
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <div className="flex items-center gap-4">
           <div className="bg-yellow-900/20 border border-yellow-500/50 px-4 py-1 rounded-full">
             <span className="text-yellow-500 font-bold text-sm">هدية التسجيل: {freeTrials} فيديوهات متبقية 🎁</span>
           </div>
           <span className="text-purple-400 font-bold underline italic">أهلاً، {session?.user?.name || "المبدع"} 👋</span>
        </div>
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent italic">استوديو Vidara</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <div className={`bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 shadow-xl transition ${freeTrials === 0 ? 'opacity-40 grayscale' : 'hover:border-purple-500'}`}>
          <h2 className="text-xl font-bold mb-6 text-purple-400">١. تحريك صورة 📸</h2>
          
          <div className="bg-gray-900 p-6 rounded-3xl border-2 border-dashed border-gray-700 mb-6 text-center">
            {/* التعديل هنا: استخدمنا onChange بدلاً من onFileSelect لتجنب الخطأ */}
            <Widget 
              publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} 
              onChange={(info) => {
                if (info) {
                  setImageUrl(info.cdnUrl);
                }
              }}
            />
            <p className="mt-2 text-sm text-gray-500">اضغط بالأعلى لرفع الصورة</p>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={freeTrials === 0 || !imageUrl}
            className="w-full bg-purple-600 py-4 rounded-2xl font-bold shadow-lg shadow-purple-900/20 disabled:bg-gray-700"
          >
            {imageUrl ? "صناعة فيديو (مجاني)" : "ارفع صورة أولاً"}
          </button>
        </div>

        <div className={`bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 shadow-xl transition ${freeTrials === 0 ? 'opacity-40 grayscale' : 'hover:border-blue-500'}`}>
          <h2 className="text-xl font-bold mb-6 text-blue-400">٢. نص إلى فيديو ✍️</h2>
          <textarea placeholder="اوصف الفيديو الذي تريده..." className="w-full bg-gray-900 rounded-2xl p-4 h-40 text-right outline-none focus:border-blue-500 transition"></textarea>
          <button 
            onClick={handleGenerate}
            disabled={freeTrials === 0}
            className="w-full bg-blue-600 py-4 rounded-2xl font-bold mt-6 shadow-lg shadow-blue-900/20 disabled:bg-gray-700"
          >
            {freeTrials > 0 ? "توليد من النص (مجاني)" : "انتهت هداياك"}
          </button>
        </div>
      </div>
    </div>
  );
             }
              
