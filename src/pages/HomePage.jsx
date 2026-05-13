import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FunctionSquare, Sigma, Binary, Dice5, ArrowRight, BookOpenCheck, Sparkles, ChevronDown } from 'lucide-react';
 
const units = [
  { id: 'functions', title: 'الدوال', description: 'دراسة شاملة للدوال العددية، النهايات، والاشتقاق.', icon: FunctionSquare, orb: ['#3b82f6', '#818cf8'], finalReviewUrl: '/dashboard' },
  { id: 'sequences', title: 'المتتاليات', description: 'المتتاليات الحسابية والهندسية وتقارب المتتاليات.', icon: Sigma, orb: ['#a855f7', '#ec4899'], finalReviewUrl: '/dashboard' },
  { id: 'complex', title: 'الأعداد المركبة', description: 'العمليات الجبرية، الشكل المثلثي والأسّي، والتحويلات.', icon: Binary, orb: ['#f43f5e', '#fb923c'], finalReviewUrl: '/dashboard' },
  { id: 'probabilities', title: 'الاحتمالات', description: 'التحليل التوفيقي، الاحتمالات الشرطية، والمتغيرات العشوائية.', icon: Dice5, orb: ['#10b981', '#06b6d4'], finalReviewUrl: '/dashboard' },
];
 
function GlassCard({ unit, index }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-8, 8]), { stiffness: 300, damping: 30 });
  const glowX = useTransform(mouseX, [-150, 150], [0, 100]);
  const glowY = useTransform(mouseY, [-150, 150], [0, 100]);
 
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
  const Icon = unit.icon;
 
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 blur-2xl" style={{ background: `radial-gradient(circle, ${unit.orb[0]}55, ${unit.orb[1]}22)` }} />
      <div className="relative rounded-3xl overflow-hidden h-full" style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(40px) saturate(180%)', WebkitBackdropFilter: 'blur(40px) saturate(180%)', border: '1px solid rgba(255,255,255,0.18)', boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(255,255,255,0.05)' }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }} />
        <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl" style={{ background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, ${unit.orb[0]}33 0%, transparent 60%)`) }} />
        <div className="absolute inset-0 opacity-20 pointer-events-none rounded-3xl" style={{ background: `linear-gradient(135deg, ${unit.orb[0]}22 0%, transparent 50%, ${unit.orb[1]}22 100%)` }} />
        <div className="relative z-10 p-7 flex flex-col h-full" dir="rtl">
          <div className="flex items-start justify-between mb-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300" style={{ background: `linear-gradient(135deg, ${unit.orb[0]}55, ${unit.orb[1]}33)`, border: `1px solid ${unit.orb[0]}66`, boxShadow: `0 4px 20px ${unit.orb[0]}44` }}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <Link to={unit.finalReviewUrl} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105" style={{ background: 'rgba(250,204,21,0.12)', border: '1px solid rgba(250,204,21,0.35)', color: '#fcd34d', backdropFilter: 'blur(10px)', boxShadow: '0 2px 12px rgba(250,204,21,0.15)' }}>
              <BookOpenCheck className="w-3.5 h-3.5" />
              مراجعة نهائية
            </Link>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{unit.title}</h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{unit.description}</p>
          <Link to="/dashboard" className="mt-6 block">
            <div className="flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 group-hover:bg-white/10" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}>
              <span>تصفح الدروس</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
 
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #060818 0%, #0d1030 50%, #080c20 100%)' }} />
      <motion.div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.35) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ x: [0, 40, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div className="absolute top-1/3 -right-60 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.25) 0%, transparent 70%)', filter: 'blur(80px)' }} animate={{ x: [0, -50, 0], y: [0, 60, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />
      <motion.div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)', filter: 'blur(70px)' }} animate={{ x: [0, 80, 0], y: [0, -40, 0] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 7 }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }} />
    </div>
  );
}
 
function GlassButton({ children, to, primary }) {
  return (
    <Link to={to}>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-300" style={primary ? { background: 'rgba(255,255,255,0.95)', color: '#0d1030', boxShadow: '0 0 40px rgba(255,255,255,0.25), 0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,1)' } : { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 24px rgba(0,0,0,0.2)' }}>
        {children}
      </motion.button>
    </Link>
  );
}
 
const HomePage = () => {
  return (
    <div className="relative min-h-screen" dir="rtl">
      <BackgroundOrbs />
      <div className="relative z-10 flex flex-col gap-24 pb-32">
 
        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 relative">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)', color: 'rgba(255,255,255,0.75)' }}>
            <Sparkles className="w-4 h-4 text-yellow-300" />
            منصة البكالوريا الجزائرية #1
          </motion.div>
 
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }} className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif", textShadow: '0 0 80px rgba(99,102,241,0.4)' }}>
            إسلام
            <span className="block" style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 40%, #38bdf8 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 0 30px rgba(129,140,248,0.5))' }}>
              ماكس
            </span>
          </motion.h1>
 
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="text-xl md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            رفيقك الأمثل للتحضير لشهادة البكالوريا في مادة الرياضيات. دروس تفاعلية، تمارين محلولة، وملخصات شاملة.
          </motion.p>
 
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlassButton to="/signup" primary>ابدأ الدراسة مجاناً</GlassButton>
            <GlassButton to="/login">تسجيل الدخول</GlassButton>
          </motion.div>
 
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <span className="text-xs tracking-widest uppercase">اكتشف</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </section>
 
        {/* Units */}
        <section className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-widest uppercase" style={{ background: 'rgba(129,140,248,0.12)', border: '1px solid rgba(129,140,248,0.3)', color: '#a5b4fc' }}>
              الوحدات التعليمية
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>تغطية شاملة</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>لجميع وحدات البرنامج الدراسي للبكالوريا</p>
          </motion.div>
 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {units.map((unit, i) => <GlassCard key={unit.id} unit={unit} index={i} />)}
          </div>
        </section>
 
        {/* CTA Banner */}
        <section className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden p-12 text-center" style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)' }}>
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(129,140,248,0.3), transparent 60%)' }} />
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }} />
            <div className="relative z-10">
              <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>جاهز للانطلاق؟</p>
              <h3 className="text-4xl font-black text-white mb-6" style={{ fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>ابدأ رحلتك نحو النجاح</h3>
              <GlassButton to="/signup" primary>سجّل مجاناً الآن</GlassButton>
            </div>
          </motion.div>
        </section>
 
      </div>
    </div>
  );
};
 
export default HomePage;
 