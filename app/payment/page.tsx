"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
// استدعاء أداة الرفع التي استخدمناها سابقاً
import { Widget } from "@uploadcare/react-widget";

export default function Payment() {
  const { data: session } = useSession();
  const [phone, setPhone] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    if (!phone || !screenshot) {
      return alert("من فضلك اكتب الرقم وارفع صورة التحويل أولاً");
    }

    // المنطق: هنا نرسل (البريد، الرقم، رابط الصورة) لقاعدة البيانات
    console.log("إرسال طلب من:", session?.user?.email);
    console.log("بيانات التحويل:", { phone, screenshot });

    setIsSent(true);
    alert("تم إرسال طلبك بنجاح! راجع 'صندوق الرسائل' في حسابك خلال دقائق للحصول على الكود.");
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6 text-right">
        <div className="bg-[#161b2a] p-10 rounded-[40px] border border-green-500 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-green-500">تم الإرسال! ✅</h2>
          <p className="text-gray-400">جاري مراجعة طلبك من قبل الإدارة. سيظهر الكود في لوحة تحكمك قريباً.</p>
          <a href="/dashboard" className="inline-block mt-6 bg-purple-600 px-8 py-3 rounded-2xl font-bold">العودة للوحة التحكم</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center p-6 text-right font-sans">
      <div className="bg-[#161b2a] p-10 rounded-[40px] border border-gray-800 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center italic text-purple-400">تأكيد الدفع 💎</h2>
        
        <div className="bg-purple-900/30 p-5 rounded-3xl mb-8 border border-purple-500/30 text-center">
          <p className="text-xs text-purple-300 mb-2 font-bold">حول فودافون كاش لـ:</p>
          <p className="text-3xl font-black italic tracking-wider text-white">01114672635</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs text-gray-500 mb-2 mr-2">الرقم الذي حوّلت منه</label>
            <input 
              type="text" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="010..." 
              className="w-full bg-gray-900 border border-gray-800 p-4 rounded-2xl outline-none text-right focus:border-purple-500 transition" 
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2 mr-2">صورة إيصال التحويل (Screenshot)</label>
            <div className="bg-gray-900 p-4 rounded-2xl border border-dashed border-gray-700 text-center">
              {/* استخدام مفتاحك المصلح في Vercel */}
              <Widget 
                publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY} 
                onChange={(info) => {
                  if (info) setScreenshot(info.cdnUrl);
                }}
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-green-600 py-4 rounded-2xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-900/20 active:scale-95"
          >
            إرسال الطلب للإدارة
          </button>
        </div>
      </div>
    </div>
  );
          }
                
