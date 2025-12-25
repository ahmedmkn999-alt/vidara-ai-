"use client";
export default function Admin() {
  return (
    <div className="min-h-screen bg-black text-white p-10 text-right">
      <h1 className="text-3xl font-black text-purple-500 mb-10 italic">لوحة التحكم - Vidara</h1>
      <div className="bg-[#161b2a] p-8 rounded-[35px] border border-gray-800 flex justify-between items-center shadow-xl">
        <div className="flex-1 px-6 space-y-3 font-bold">
          <p className="text-xl font-bold text-green-400 italic">طلب جديد بانتظار الكود</p>
          <div className="flex gap-4 mt-4">
            <input type="text" placeholder="كود التفعيل" className="bg-gray-900 border border-gray-700 p-3 rounded-xl flex-1 text-right" />
            <button className="bg-purple-600 px-6 py-3 rounded-xl font-bold">إرسال</button>
          </div>
        </div>
        <div className="w-40 h-56 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700 flex items-center justify-center text-xs text-gray-500 text-center">صورة التحويل</div>
      </div>
    </div>
  );
}
