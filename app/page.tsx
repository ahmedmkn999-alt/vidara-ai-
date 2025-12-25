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
      <nav className="p-6 flex justify-between items-center bg-[#0b0f19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">VIDARA</div>
        <Link href="/api/auth/signin" className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 rounded-full font-bold shadow-xl">سجل دخول بجوجل</Link>
      </nav>

      <section className="py-20 text-center px-4">
        <h1 className="text-5xl font-black mb-10 italic text-purple-400">ازاي تشغل الموقع؟ 🎬</h1>
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-[40px] aspect-video border-4 border-gray-800 shadow-2xl overflow-hidden">
          {/* تم تعديل هذا الجزء لإضافة فيديو جمالي مؤقت */}
          <iframe 
            src="https://player.vimeo.com/video/950155601?autoplay=1&loop=1&background=1" 
            className="w-full h-full"
            allow="autoplay; fullscreen" 
          ></iframe>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-4xl font-bold mb-16">باقات برو (PRO)</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-[#161b2a] rounded-[35px] p-8 border border-gray-800 text-center relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${plan.color}`}></div>
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-5xl font-black mb-4">{plan.price}</p>
              <p className="text-gray-400 mb-8 font-medium">{plan.limit}</p>
              <Link href="/payment" className={`block w-full py-4 rounded-2xl font-bold bg-gradient-to-r ${plan.color}`}>اشترك الآن</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
