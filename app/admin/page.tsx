"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase"; // الاستدعاء الصحيح

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [sentCodes, setSentCodes] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "adminahmed") {
      setIsAdmin(true);
      fetchData();
    } else {
      alert("كلمة السر خاطئة!");
    }
  };

  const fetchData = async () => {
    const { data: reqs } = await supabase.from('payment_requests').select('*').order('created_at', { ascending: false });
    const { data: codes } = await supabase.from('user_inbox').select('*').order('created_at', { ascending: false });
    if (reqs) setRequests(reqs);
    if (codes) setSentCodes(codes);
  };

  const sendCode = async (email) => {
    const code = "VIDARA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from('user_inbox').insert([{ target_email: email, activation_code: code }]);
    if (!error) {
      alert("تم إرسال الكود بنجاح: " + code);
      fetchData();
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-right">
        <form onSubmit={handleLogin} className="bg-gray-900 p-10 rounded-[40px] border border-gray-800 w-full max-w-sm">
          <h2 className="text-2xl font-black text-purple-500 mb-8 text-center">دخول المدير 👑</h2>
          <input 
            type="password" 
            className="w-full bg-black p-4 rounded-2xl mb-6 border border-gray-800 text-center outline-none focus:border-purple-500" 
            placeholder="كلمة السر"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold">دخول</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 text-right font-sans" dir="rtl">
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
        <h1 className="text-2xl font-black text-purple-400 italic underline decoration-purple-600">Vidara Admin</h1>
        <div className="flex bg-gray-900 p-1 rounded-2xl border border-gray-800">
          <button onClick={() => setActiveTab("requests")} className={`px-5 py-2 rounded-xl text-xs font-bold ${activeTab === "requests" ? "bg-purple-600" : "text-gray-500"}`}>الطلبات 📥</button>
          <button onClick={() => setActiveTab("codes")} className={`px-5 py-2 rounded-xl text-xs font-bold ${activeTab === "codes" ? "bg-blue-600" : "text-gray-500"}`}>سجل الأكواد 📑</button>
        </div>
      </header>

      {activeTab === "requests" ? (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div key={req.id} className="bg-[#161b2a] p-6 rounded-[30px] border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-right w-full">
                <p className="font-bold text-lg">{req.email}</p>
                <p className="text-sm text-blue-400">رقم الدفع: {req.phone}</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <a href={req.screenshot_url} target="_blank" className="flex-1 bg-gray-800 text-center py-3 rounded-xl text-xs font-bold">معاينة الإيصال</a>
                <button onClick={() => sendCode(req.email)} className="flex-1 bg-purple-600 py-3 rounded-xl text-xs font-bold shadow-lg shadow-purple-900/20">إرسال كود</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-gray-800">
          <table className="w-full text-sm text-right bg-gray-900/30">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="p-4">الإيميل</th>
                <th className="p-4">الكود المرسل</th>
                <th className="p-4">التاريخ</th>
              </tr>
            </thead>
            <tbody>
              {sentCodes.map((c) => (
                <tr key={c.id} className="border-t border-gray-800">
                  <td className="p-4">{c.target_email}</td>
                  <td className="p-4 font-mono text-blue-400 font-bold">{c.activation_code}</td>
                  <td className="p-4 text-[10px] text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
