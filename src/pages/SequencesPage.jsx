import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const lessons = [
  {
    id: 1,
    title: "ملخص المتتاليات الحسابية",
    description: "كل ما تحتاجه عن المتتالية الحسابية: الحد العام، الوسط الحسابي، والمجموع.",
    pdfUrl: "رابط_ملف_جوجل_درايف_هنا"
  },
  {
    id: 2,
    title: "ملخص المتتاليات الهندسية",
    description: "شرح مفصل للمتتالية الهندسية مع قوانين المجموع والأساس.",
    pdfUrl: "رابط_ملف_جوجل_درايف_هنا"
  }
];

const SequencesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] text-white py-12 px-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* زر العودة */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-8 text-gray-400 hover:text-white"
        >
          <ArrowRight className="ml-2 h-4 w-4" /> العودة للوحة التحكم
        </Button>

        <header className="mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            دروس المتتاليات العددية
          </h1>
          <p className="text-gray-400 mt-2">اختر الدرس وقم بتحميل الملخص بصيغة PDF</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson) => (
            <motion.div key={lesson.id} whileHover={{ y: -5 }}>
              <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <FileText className="text-blue-500" />
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                    {lesson.description}
                  </p>
                  <Button 
                    onClick={() => window.open(lesson.pdfUrl, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  >
                    <Download className="ml-2 h-4 w-4" /> فتح ملف الـ PDF
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SequencesPage;