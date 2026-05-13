import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { units } from '../data/lessons';
import { ArrowRight, Download } from 'lucide-react';

const LessonPage = () => {
  const { unitId } = useParams();
  const unit = units.find(u => u.id === unitId);

  if (!unit) return <div className="text-white text-center pt-20">الدرس غير موجود</div>;

  return (
    <div className="min-h-screen bg-[#060914] pt-24 px-4 text-white">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-blue-400 hover:underline">
          <ArrowRight size={20} /> <span className="arabic">العودة للرئيسية</span>
        </Link>
        
        <h1 className="arabic text-3xl font-bold mb-8 text-right">{unit.title}</h1>

        <div className="glass-shell prism-border aspect-video rounded-3xl overflow-hidden mb-8">
          <iframe 
            className="w-full h-full"
            src={unit.videoUrl}
            title="Video Player"
            allowFullScreen
          ></iframe>
        </div>

        <div className="glass-shell p-6 rounded-2xl text-right">
          <p className="arabic text-lg opacity-80 mb-6">{unit.description}</p>
          <a href={unit.pdfLink} download className="crystal-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-blue-400">
            <Download size={18} /> <span className="arabic">تحميل ملخص الدرس (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LessonPage;