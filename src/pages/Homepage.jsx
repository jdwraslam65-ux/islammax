import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FunctionSquare, Sigma, Binary, Dice5, ArrowRight } from 'lucide-react';

const units = [
  {
    id: 'functions',
    title: 'الدوال',
    description: 'دراسة شاملة للدوال العددية، النهايات، والاشتقاق.',
    icon: FunctionSquare,
    color: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-600/5'
  },
  {
    id: 'sequences',
    title: 'المتتاليات',
    description: 'المتتاليات الحسابية والهندسية وتقارب المتتاليات.',
    icon: Sigma,
    color: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-600/5'
  },
  {
    id: 'complex',
    title: 'الأعداد المركبة',
    description: 'العمليات الجبرية، الشكل المثلثي والأسّي، والتحويلات النقطية.',
    icon: Binary,
    color: 'text-pink-400',
    gradient: 'from-pink-500/20 to-pink-600/5'
  },
  {
    id: 'probabilities',
    title: 'الاحتمالات',
    description: 'التحليل التوفيقي، الاحتمالات الشرطية، والمتغيرات العشوائية.',
    icon: Dice5,
    color: 'text-green-400',
    gradient: 'from-green-500/20 to-green-600/5'
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-col gap-16 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb" 
            alt="Mathematics Background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        
        <div className="container mx-auto relative z-20 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              منصة <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">البكالوريا</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed max-w-2xl mx-auto">
              رفيقك الأمثل للتحضير لشهادة البكالوريا في مادة الرياضيات. دروس تفاعلية، تمارين محلولة، وملخصات شاملة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-white text-blue-900 hover:bg-gray-100 shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all hover:scale-105">
                  ابدأ الدراسة مجاناً
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="lg" className="text-lg px-8 py-6 rounded-full hover:scale-105">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Units Grid */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">الوحدات التعليمية</h2>
          <p className="text-gray-400">تغطية شاملة لجميع وحدات البرنامج الدراسي</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {units.map((unit, index) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border-white/10 bg-gradient-to-br ${unit.gradient} backdrop-blur-xl hover:scale-105 hover:shadow-2xl hover:shadow-${unit.color.split('-')[1]}-500/20 transition-all duration-300 group`}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4 ${unit.color} group-hover:scale-110 transition-transform`}>
                    <unit.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl mb-2">{unit.title}</CardTitle>
                  <CardDescription className="text-gray-300 leading-relaxed">
                    {unit.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Link to="/dashboard" className="w-full">
                    <Button variant="ghost" className="w-full justify-between text-white/70 hover:text-white hover:bg-white/10 group-hover:translate-x-1 transition-all">
                      تصفح الدروس
                      <ArrowRight className="w-4 h-4 ml-2 rotate-180" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;