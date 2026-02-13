import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const lessons = [
  {
    id: 1,
    title: "ملخص المتتاليات العددية (شامل)",
    description: "ملخص رائع يحتوي على تعريف المتتالية، المتتالية الحسابية والهندسية، والوسط الحسابي والهندسي مع قوانين المجموع.",
    pdfUrl: "https://drive.google.com/file/d/19yYgzyzwQEKweE4kvSTBjGwZoeZya36J/view?usp=sharing" 
  },
  {
    id: 2,
    title: "تمارين تدريبية - المتتاليات",
    description: "مجموعة من التمارين المختارة لتعزيز فهمك للقوانين الأساسية وتطبيقها.",
    pdfUrl: "https://drive.google.com/file/d/19yYgzyzwQEKweE4kvSTBjGwZoeZya36J/view?usp=sharing" // يمكنك تغيير هذا الرابط لاحقاً بملف تمارين
  }
];

const SequencesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817] text-white py-12 px-6" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        {/* زر العودة */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="mb-8 text-gray-400 hover:text-white hover:bg-white/10"
          >
            <ArrowRight className="ml-2 h-4 w-4" /> العودة للوحة التحكم
          </Button>
        </motion.div>

        {/* رأس الصفحة */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 bg-blue-600/20 rounded-2xl">
              <BookOpen className="text-blue-500 w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              وحدة المتتاليات العددية
            </h1>
          </motion.div>
          <p className="text-gray-400 text-lg">
            هنا تجد جميع الملخصات والملفات الخاصة بدرس المتتاليات بصيغة PDF.
          </p>
        </header>

        {/* شبكة الدروس */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessons.map((lesson, index) => (
            <motion.div 
              key={lesson.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl h-full flex flex-col hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white text-xl">
                    <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                      <FileText className="text-blue-400 w-6 h-6" />
                    </div>
                    {lesson.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                    {lesson.description}
                  </p>
                  <Button 
                    onClick={() => window.open(lesson.pdfUrl, '_blank')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl transition-all shadow-lg shadow-blue-900/20"
                  >
                    <Download className="ml-2 h-5 w-5" /> تحميل أو عرض الملخص
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ملاحظة تذكيرية */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl text-center"
        >
          <p className="text-blue-300 text-sm">
            نعمل باستمرار على إضافة دروس وتمارين جديدة. تأكد من العودة دائماً!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SequencesPage;