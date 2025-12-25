"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AdminPanel() {
  const { data: session } = useSession();
  const [generatedCode, setGeneratedCode] = useState("");
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const ADMIN_EMAIL = "ahmed.p@gmail.com"; //

  // مثال لرسائل طلبات الاشتراك التي ستصلك
  const [requests, setRequests] = useState([
    { id: 1, email: "user1@gmail.com", phone: "01022334455", screenshot: "https://ucarecdn.com/example", date: "1:40 AM" }
  ]);

  // دالة توليد كود عشوائي فريد
  const handleGenerateCode = (email) => {
    const newCode = "VIDARA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setGeneratedCode(newCode);
    setSelectedUserEmail(email);
  };

  const handleSendToUser = () => {
    if (!generatedCode) return alert("من فضلك ولد الكود أولاً");
    // هنا سيتم إرسال الكود لقاعدة البيانات ليربط بحساب المستخدم
    alert(`تم إرسال الكود ${generatedCode} إلى رسائل المستخدم: ${selectedUserEmail}`);
    setGeneratedCode("");
  };

  if (session?.user?.email !== ADMIN_EMAIL) return <p className="text-white text-center mt-20">غير مسموح لك بالدخول</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 text-right font-sans" dir="rtl">
      <h1 className="text-3xl font-black mb-10 border-b border-gray-800 pb-4 text-purple-500">غرفة إشراف VIDARA 🕵️‍♂️</h1>

      {/* الجزء الخاص بتوليد الكود */}
      {generatedCode && (
        <div className="bg-purple-900/20 border border-purple-500 p-6 rounded-3xl mb-10 flex justify-between items-center">
          <button 
            onClick={handleSendToUser}
            className="bg-green-600 px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition"
          >
            تفعيل وإرسال الكود للمشترك
          </button>
          <div className="text-left">
            <p className="text-xs text-purple-400">الكود المولد لـ: {selectedUserEmail}</p>
            <p className="text-2xl font-mono font-black text-white">{generatedCode}</p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-6">طلبات التفعيل الجديدة:</h2>
      <div className="grid gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-gray-900 p-6 rounded-[35px] border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-3">
               <button 
                 onClick={() => handleGenerateCode(req.email)}
                 className="bg-purple-600 px-6 py-2 rounded-xl text-sm font-bold hover:scale-105 transition"
               >
                 توليد كود تفعيل
               </button>
               <a href={req.screenshot} target="_blank" className="bg-gray-800 border border-gray-700 px-6 py-2 rounded-xl text-sm font-bold">
                 معاينة الإسكرين
               </a>
            </div>
            
            <div className="text-right">
              <p className="font-bold text-lg">{req.email}</p>
              <p className="text-sm text-gray-400">رقم المحول منه: <span className="text-blue-400">{req.phone}</span></p>
              <p className="text-[10px] text-gray-600">وقت الطلب: {req.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
