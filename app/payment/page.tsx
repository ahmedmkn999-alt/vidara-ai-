export default function Payment() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6 text-right">
      <div className="bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 max-w-md w-full shadow-2xl font-bold">
        <h2 className="text-2xl font-bold mb-6 text-center">تأكيد الدفع</h2>
        <div className="bg-purple-900/30 p-5 rounded-3xl mb-8 border border-purple-500/30 text-center">
          <p className="text-sm text-purple-300 mb-2">حول فودافون كاش لـ:</p>
          <p className="text-3xl font-black italic">01114672635</p>
        </div>
        <div className="space-y-5">
          <input type="text" placeholder="الرقم اللي حوّلت منه" className="w-full bg-gray-900 border border-gray-800 p-4 rounded-2xl outline-none text-right" />
          <p className="text-xs text-gray-500">ارفع سكرين شوت التحويل</p>
          <input type="file" className="w-full text-sm text-gray-500" />
          <button className="w-full bg-green-600 py-4 rounded-2xl font-bold hover:bg-green-700 transition">إرسال الطلب</button>
        </div>
      </div>
    </div>
  );
}
