import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { units } from '../data/lessons';
import { FileText, ArrowRight, Video, AlertCircle } from 'lucide-react';

const LessonPage = () => {
  const { unitId } = useParams();
  const unit = units.find((u) => u.id === unitId);

  if (!unit) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">الدرس غير موجود</h1>
          <Link to="/" className="text-blue-400 hover:underline mt-4 block">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl text-white" dir="rtl">
      {/* العودة */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowRight className="w-5 h-5" />
        <span>العودة للمقرر الدراسي</span>
      </Link>

      <h1 className="text-4xl font-black mb-4">{unit.title}</h1>
      <p className="text-gray-400 mb-10 text-lg">{unit.description}</p>

      {/* مشغل الفيديو (زووم أو غيره) */}
      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black mb-8">
        <iframe
          src={unit.videoUrl}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          title={unit.title}
        ></iframe>
      </div>

      {/* الملحقات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a 
          href={unit.pdfLink} 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-500/20 text-red-500 group-hover:scale-110 transition-transform">
              <FileText />
            </div>
            <div>
              <h3 className="font-bold">ملخص الدرس (PDF)</h3>
              <p className="text-sm text-gray-400">تحميل المذكرة الشاملة</p>
            </div>
          </div>
        </a>

        <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-500">
              <Video />
            </div>
            <div>
              <h3 className="font-bold">تمارين تفاعلية</h3>
              <p className="text-sm text-gray-400">قريباً في المنصة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;