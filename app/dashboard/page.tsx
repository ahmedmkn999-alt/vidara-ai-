"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminControlCenter() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("requests"); // "requests" أو "codes"
  const [requests, setRequests] = useState([]);
  const [sentCodes, setSentCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // دالة الدخول بكلمة السر
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "adminahmed") {
      setIsAdmin(true);
      fetchData();
    } else {
      alert("كلمة السر غلط يا ريس!");
    }
  };

  // جلب البيانات من Supabase
  const fetchData = async () => {
    setLoading(true);
    const { data: reqs } = await supabase.from('payment_requests').select('*').order('created_at', { ascending: false });
    const { data: codes } = await supabase.from('user_inbox').select('*').order('created_at', { ascending: false });
    if (reqs) setRequests(reqs);
    if (codes) setSentCodes(codes);
    setLoading(false);
  };

  // دالة توليد وإرسال الكود
  const sendActivationCode = async (userEmail) => {
    const newCode = "VIDARA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // 1. حفظ الكود في صندوق وارد العميل
    const { error } = await supabase.from('user_inbox').insert([
      { target_email: userEmail, activation_code: newCode }
    ]);

    if (!error) {
      alert(`تم إرسال الكود: ${newCode} بنجاح!`);
      fetchData(); // تحديث القوائم
    }
  };

  // 1. شاشة تسجيل الدخول
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-right font-sans">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-[35px] border border-gray-800 w-full max-w-sm">
          <h2 className="text-2xl font-black text-purple-500 mb-6 text-center">دخول الإدارة 🔐</h2>
          <input 
            type="password" 
            placeholder="كلمة السر الخاصة بـ Ahmed"
            className="w-full bg-black p-4 rounded-2xl mb-4 border border-gray-800 outline-none focus:border-purple-500 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold hover:bg-purple-700 transition">دخول</button>
        </form>
      </div>
    );
  }

  // 2. لوحة التحكم الأساسية بعد الدخول
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-10 text-right" dir="rtl">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-black italic text-purple-400">Vidara Admin 👑</h1>
        
        {/* أزرار التنقل بين الصفحات */}
        <div className="flex bg-gray-900 p-1 rounded-2xl border border-gray-800">
          <button 
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === "requests" ? "bg-purple-600 text-white" : "text-gray-400"}`}
          >
            طلبات الدفع 📥
          </button>
          <button 
            onClick={() => setActiveTab("codes")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition ${activeTab === "codes" ? "bg-blue-600 text-white" : "text-gray-400"}`}
          >
            الأكواد المرسلة 📑
          </button>
        </div>
      </header>

      {activeTab === "requests" ? (
        <section>
          <h2 className="text-xl font-bold mb-6 underline decoration-purple-500 underline-offset-8">طلبات بانتظار المراجعة:</h2>
          <div className="grid gap-4">
            {requests.map((req) => (
              <div key={req.id} className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-right w-full">
                  <p className="font-bold text-lg">{req.email}</p>
                  <p className="text-sm text-gray-400">رقم فودافون: <span className="text-green-500">{req.phone}</span></p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                   <a href={req.screenshot_url} target="_blank" className="bg-gray-800 px-4 py-2 rounded-xl text-xs flex-1 text-center">معاينة الصورة</a>
                   <button 
                    onClick={() => sendActivationCode(req.email)}
                    className="bg-purple-600 px-4 py-2 rounded-xl text-xs font-bold flex-1"
                   >
                     تفعيل وإرسال كود
                   </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section>
          <h2 className="text-xl font-bold mb-6 underline decoration-blue-500 underline-offset-8">سجل الأكواد المفعّلة:</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-right bg-gray-900/30 rounded-3xl border border-gray-800">
              <thead className="bg-gray-800 text-gray-400">
                <tr>
                  <th className="p-4 rounded-tr-3xl">الإيميل</th>
                  <th className="p-4">الكود</th>
                  <th className="p-4 rounded-tl-3xl">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {sentCodes.map((c) => (
                  <tr key={c.id} className="border-t border-gray-800">
                    <td className="p-4">{c.target_email}</td>
                    <td className="p-4 font-mono text-blue-400 font-bold">{c.activation_code}</td>
                    <td className="p-4"><span className="text-green-500">تم الإرسال ✅</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
