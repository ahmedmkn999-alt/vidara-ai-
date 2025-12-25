import Link from 'next/link';

export default function HomePage() {
  const plans = [
    { name: "برو 1", price: "99ج", limit: "70 فيديو", color: "from-purple-600 to-blue-600" },
    { name: "برو 2", price: "250ج", limit: "200 فيديو", color: "from-blue-500 to-cyan-500" },
    { name: "برو 3", price: "600ج", limit: "500 فيديو", color: "from-pink-600 to-purple-600" },
    { name: "الملكية (سنوي)", price: "700ج", limit: "لا نهائي", color: "from-yellow-500 to-orange-500" }
  ];

  return (
    <div className="text-white min-h-screen font-sans">
      {/* Header */}
      <nav className="p-6 flex justify-between items-center bg-[#0b0f19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">VIDARA</div>
        <Link href="/api/auth/signin" className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full font-bold shadow-xl transition hover:scale-105">سجل دخول بجوجل</Link>
      </nav>

      {/* الشرح التفصيلي الجديد بدلاً من الفيديو */}
      <section className="py-20 px-4 max-w-5xl mx-auto text-right">
        <h1 className="text-5xl font-black mb-12 text-center italic text-purple-400">كيف تبدأ مع VIDARA؟ 🚀</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">١. سجل حسابك مجاناً</h3>
            <p className="text-gray-400 leading-relaxed">
              ابدأ بالضغط على زر "سجل بجوجل" بالأعلى. لا حاجة لكلمات مرور معقدة، حسابك سيتم إنشاؤه في ثوانٍ. بعد الدخول، ستحصل على وصول فوري إلى استوديو الذكاء الاصطناعي الخاص بنا.
            </p>
          </div>

          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">٢. اختر باقتك المفضلة</h3>
            <p className="text-gray-400 leading-relaxed">
              تصفح باقات الـ PRO بالأسفل. كل باقة توفر عدداً محدداً من الثواني والفيديوهات عالية الجودة. بعد اختيار الباقة، قم بالتحويل لضمان تفعيل ميزاتك الاحترافية فوراً.
            </p>
          </div>

          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-green-400">٣. حوّل خيالك لواقع</h3>
            <p className="text-gray-400 leading-relaxed">
              داخل الاستوديو، يمكنك رفع صورة تريد تحريكها أو كتابة نص يصف مشهداً خيالياً. محرك الذكاء الاصطناعي لدينا سيقوم بمعالجة طلبك خلال أقل من دقيقة لتوليد فيديو احترافي.
            </p>
          </div>

          <div className="bg-[#161b2a] p-8 rounded-[40px] border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-yellow-400">٤. حمل وشارك فيديوهاتك</h3>
            <p className="text-gray-400 leading-relaxed">
              بمجرد انتهاء المعالجة، يمكنك معاينة الفيديو وتحميله بجودة عالية مباشرة على جهازك. شارك فيديوهاتك على تيك توك، يوتيوب، أو فيسبوك وابهر متابعيك بمحتوى لا مثيل له.
            </p>
          </div>
        </div>

        {/* تنبيه إضافي حول الدفع */}
        <div className="mt-12 p-8 bg-gradient-to-l from-purple-900/20 to-transparent border-r-4 border-purple-500 rounded-2xl">
          <p className="text-lg font-bold">⚠️ ملاحظة هامة:</p>
          <p className="text-gray-400 mt-2">بعد التحويل على رقم فودافون كاش، تأكد من رفع صورة "سكرين شوت" للتحويل من صفحة الدفع لضمان التفعيل التلقائي لحسابك في أسرع وقت.</p>
        </div>
      </section>

      {/* باقات الاشتراك */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-16 italic underline decoration-purple-500">باقات برو (PRO) المتوفرة</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {plans.map((plan, i) => (
            <div key={i} className="bg-[#161b2a] rounded-[35px] p-8 border border-gray-800 hover:scale-105 transition relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${plan.color}`}></div>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-5xl font-black mb-4">{plan.price}</p>
              <p className="text-gray-400 mb-8 font-medium">{plan.limit}</p>
              <Link href="/payment" className={`block w-full py-4 rounded-2xl font-bold bg-gradient-to-r ${plan.color} shadow-lg transition hover:brightness-110`}>اشترك الآن</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
