import { NextResponse } from "next/server";
import Replicate from "replicate";

// ربط مكتبة Replicate باستخدام التوكن السري
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function POST(req: Request) {
  try {
    const { prompt, image_url } = await req.json();

    // التأكد من وجود التوكن لتجنب تعليق الطلب
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "عذراً، مفتاح API الخاص بـ Replicate غير مضاف في الإعدادات" },
        { status: 500 }
      );
    }

    // تشغيل موديل Luma Dream Machine (أقوى موديل فيديو حالياً)
    const output = await replicate.run(
      "lucataco/luma-dream-machine",
      {
        input: {
          prompt: prompt,
          image_url: image_url // سيتم استخدامه فقط في حالة Image-to-Video
        }
      }
    );

    // إرجاع رابط الفيديو النهائي للمستخدم
    return NextResponse.json({ success: true, video: output });

  } catch (error: any) {
    console.error("خطأ في صناعة الفيديو:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء معالجة الفيديو: " + error.message },
      { status: 500 }
    );
  }
    }
