"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminControl() {
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
    } else { alert("كلمة السر غلط!"); }
  };

  const fetchData = async () => {
    const { data: reqs } = await supabase.from('payment_requests').select('*').order('created_at', { ascending: false });
    const { data: codes } = await supabase.from('user_inbox').select('*').order('created_at', { ascending: false });
    if (reqs) setRequests(reqs);
    if (codes) setSentCodes(codes);
  };

  const generateCode = async (email) => {
    const code = "VIDARA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    const { error } = await supabase.from('user_inbox').insert([{ target_email: email, activation_code: code }]);
    if (!error) { alert("تم إرسال الكود: " + code); fetchData(); }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6 text-right">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-[35px] border border-gray-800 w-full max-w-sm">
          <h2 className="text-xl font-black text-purple-500 mb-6 text-center">دخول الإدارة 🔐</h2>
          <input type="password" placeholder="كلمة السر" className="w-full bg-black p-4 rounded-2xl mb-4 border border-gray-800 text-center outline-none text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-purple-600 py-4 rounded-2xl font-bold">دخول</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 text-right font-sans" dir="rtl">
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-6">
        <h1 className="text-2xl font-black text-purple-400">Vidara Admin 👑</h1>
        <div className="flex bg-gray-900 p-1 rounded-2xl">
          <button onClick={() => setActiveTab("requests")} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === "requests" ? "bg-purple-600" : "text-gray-500"}`}>الطلبات 📥</button>
          <button onClick={() => setActiveTab("codes")} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === "codes" ? "bg-blue-600" : "text-gray-500"}`}>الأكواد 📑</button>
        </div>
      </header>
      {activeTab === "requests" ? (
        <div className="grid gap-4">
          {requests.map((r) => (
            <div key={r.id} className="bg-gray-900/50 p-6 rounded-[25px] border border-gray-800 flex justify-between items-center">
              <div className="text-right w-full"><p className="font-bold">{r.email}</p><p className="text-sm text-gray-400">الرقم: {r.phone}</p></div>
              <div className="flex gap-2 mr-4">
                <a href={r.screenshot_url} target="_blank" className="bg-gray-800 px-4 py-2 rounded-xl text-xs">معاينة</a>
                <button onClick={() => generateCode(r.email)} className="bg-purple-600 px-4 py-2 rounded-xl text-xs font-bold">إرسال كود</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-800">
          <table className="w-full text-sm text-right bg-gray-900/20">
            <thead className="bg-gray-800"><tr><th className="p-4">الإيميل</th><th className="p-4">الكود</th></tr></thead>
            <tbody>{sentCodes.map((c) => (<tr key={c.id} className="border-t border-gray-800"><td className="p-4">{c.target_email}</td><td className="p-4 font-mono text-green-400">{c.activation_code}</td></tr>))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
      }
