import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Ruler, Settings, ArrowRight, RotateCcw, Calculator, CheckCircle2 } from 'lucide-react';
 
const branches = [
  { id: 'science', title: 'علوم تجريبية', icon: Beaker,   orb: ['#10b981','#06b6d4'], glow: 'rgba(16,185,129,0.4)' },
  { id: 'math',    title: 'رياضيات',      icon: Ruler,    orb: ['#3b82f6','#818cf8'], glow: 'rgba(59,130,246,0.4)'  },
  { id: 'tech',    title: 'تقني رياضي',   icon: Settings, orb: ['#f43f5e','#fb923c'], glow: 'rgba(244,63,94,0.4)'  },
];
 
const coeffs = {
  science: { رياضيات:5, علوم:6, فيزياء:5, عربية:3, فلسفة:2, إسلامية:2, تاريخ:2, فرنسية:2, إنجليزية:2, رياضة:1 },
  math:    { رياضيات:7, فيزياء:6, علوم:2, عربية:3, فلسفة:2, إسلامية:2, تاريخ:2, فرنسية:2, إنجليزية:2, رياضة:1 },
  tech:    { تكنولوجيا:7, رياضيات:6, فيزياء:6, عربية:3, فلسفة:2, إسلامية:2, تاريخ:2, فرنسية:2, إنجليزية:2, رياضة:1 },
};
 
const glassPanel = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(48px) saturate(180%)',
  WebkitBackdropFilter: 'blur(48px) saturate(180%)',
  border: '1px solid rgba(255,255,255,0.16)',
  boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1.5px 0 rgba(255,255,255,0.28)',
};
 
/* ── Branch Card ── */
function BranchCard({ branch, onClick, index }) {
  const Icon = branch.icon;
  return (
    <motion.div onClick={onClick}
      initial={{ opacity:0, y:36 }} animate={{ opacity:1, y:0 }}
      transition={{ duration:0.6, delay:index*0.1, ease:[0.23,1,0.32,1] }}
      whileHover={{ y:-8, scale:1.02 }} whileTap={{ scale:0.97 }}
      className="relative cursor-pointer group"
    >
      <div className="absolute -inset-3 rounded-[2.5rem] opacity-0 group-hover:opacity-60 transition-opacity duration-500 blur-2xl"
        style={{ background:`radial-gradient(circle,${branch.glow},transparent 70%)`, pointerEvents:'none' }} />
      <div className="relative rounded-[2.5rem] p-10 text-center overflow-hidden" style={glassPanel}>
        <div className="absolute top-0 left-10 right-10 h-px" style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)' }} />
        <div className="absolute inset-0 rounded-[2.5rem] opacity-20 pointer-events-none"
          style={{ background:`linear-gradient(135deg,${branch.orb[0]}33,transparent 50%,${branch.orb[1]}22)` }} />
        <div className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background:`linear-gradient(135deg,${branch.orb[0]}55,${branch.orb[1]}33)`, border:`1px solid ${branch.orb[0]}55`, boxShadow:`0 8px 28px ${branch.glow}` }}>
          <Icon className="w-11 h-11 text-white" />
        </div>
        <h3 className="relative z-10 text-xl font-bold text-white mb-2">{branch.title}</h3>
        <p className="relative z-10 text-sm text-white/40">اضغط للبدء</p>
        <div className="relative z-10 mt-5 flex justify-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)' }}>
            <ArrowRight className="w-4 h-4 text-white/50 rotate-180" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
 
/* ── Result Badge — رقم المعدل واضح دائماً ── */
function ResultBadge({ result }) {
  const s = parseFloat(result);
  const color  = s >= 14 ? ['#10b981','#06b6d4'] : s >= 10 ? ['#818cf8','#38bdf8'] : ['#f43f5e','#fb923c'];
  const label  = s >= 14 ? 'ممتاز 🏆' : s >= 12 ? 'جيد جداً ✨' : s >= 10 ? 'ناجح 🎉' : 'راسب — حاول مجدداً 💪';
 
  return (
    <motion.div
      initial={{ opacity:0, scale:0.85, y:16 }}
      animate={{ opacity:1, scale:1, y:0 }}
      transition={{ duration:0.5, ease:[0.23,1,0.32,1] }}
      className="mt-8 relative rounded-3xl p-8 text-center overflow-hidden"
      style={{ background:'rgba(255,255,255,0.04)', border:`1px solid ${color[0]}44`, boxShadow:`inset 0 1px 0 rgba(255,255,255,0.12), 0 8px 32px ${color[0]}22` }}
    >
      <div className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ background:`radial-gradient(ellipse at 50% 110%,${color[0]}44,transparent 65%)`, opacity:0.3 }} />
 
      <p className="text-xs font-semibold tracking-widest uppercase mb-3 text-white/40 relative z-10">
        المعدل المتوقع
      </p>
 
      {/* ✅ الرقم — لون صلب مع shadow بدل gradient text الذي يختفي */}
      <div className="relative z-10 text-7xl font-black mb-4 text-white"
        style={{ textShadow:`0 0 30px ${color[0]}, 0 0 60px ${color[0]}88` }}>
        {result}
      </div>
 
      {/* شريط ملون تحت الرقم */}
      <div className="relative z-10 h-1.5 rounded-full mx-8 mb-4 overflow-hidden" style={{ background:'rgba(255,255,255,0.08)' }}>
        <motion.div
          initial={{ width:0 }}
          animate={{ width:`${(s/20)*100}%` }}
          transition={{ duration:1, ease:[0.23,1,0.32,1], delay:0.2 }}
          className="h-full rounded-full"
          style={{ background:`linear-gradient(90deg,${color[0]},${color[1]})`, boxShadow:`0 0 12px ${color[0]}` }}
        />
      </div>
 
      <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
        style={{ background:`${color[0]}22`, border:`1px solid ${color[0]}44`, color:color[0] }}>
        {s >= 10 && <CheckCircle2 className="w-3.5 h-3.5" />}
        {label}
      </div>
    </motion.div>
  );
}
 
/* ── Main ── */
const CalculatorPage = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);
 
  const branch = branches.find(b => b.id === selectedBranch);
 
  const calculate = () => {
    let p = 0, c = 0;
    Object.entries(coeffs[selectedBranch]).forEach(([sub, coef]) => {
      p += (parseFloat(scores[sub]) || 0) * coef;
      c += coef;
    });
    setResult((p / c).toFixed(2));
  };
 
  const reset = () => { setSelectedBranch(null); setScores({}); setResult(null); };
 
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 text-white">
      {/* BG orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,#060818,#0d1030,#080c20)' }} />
        <motion.div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(99,102,241,0.3),transparent 70%)', filter:'blur(70px)' }}
          animate={{ x:[0,40,0],y:[0,30,0] }} transition={{ duration:18,repeat:Infinity,ease:'easeInOut' }} />
        <motion.div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background:'radial-gradient(circle,rgba(236,72,153,0.2),transparent 70%)', filter:'blur(80px)' }}
          animate={{ x:[0,-40,0],y:[0,-30,0] }} transition={{ duration:22,repeat:Infinity,ease:'easeInOut',delay:4 }} />
      </div>
 
      <div className="max-w-3xl mx-auto" dir="rtl">
        <AnimatePresence mode="wait">
 
          {/* Branch selection */}
          {!selectedBranch && (
            <motion.div key="select" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0,y:-20 }}>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
                  style={{ background:'rgba(129,140,248,0.12)', border:'1px solid rgba(129,140,248,0.28)', color:'#a5b4fc' }}>
                  <Calculator className="w-3.5 h-3.5" /> حاسبة المعدل
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">اختر شعبتك</h1>
                <p className="text-white/40">لحساب معدل البكالوريا التقديري</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {branches.map((b, i) => <BranchCard key={b.id} branch={b} index={i} onClick={() => setSelectedBranch(b.id)} />)}
              </div>
            </motion.div>
          )}
 
          {/* Calculator */}
          {selectedBranch && (
            <motion.div key="calc" initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }} transition={{ duration:0.5 }}>
              <div className="relative rounded-[2.5rem] p-8 overflow-hidden" style={glassPanel}>
                <div className="absolute top-0 left-12 right-12 h-px pointer-events-none"
                  style={{ background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)' }} />
                <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-15"
                  style={{ background:`linear-gradient(135deg,${branch.orb[0]}33,transparent 50%,${branch.orb[1]}22)` }} />
                <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                  style={{ background:`radial-gradient(ellipse at 50% 0%,${branch.glow}33,transparent 70%)` }} />
 
                {/* Header */}
                <div className="relative z-10 flex items-center justify-between mb-8">
                  <button onClick={reset}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                    style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)' }}>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background:`linear-gradient(135deg,${branch.orb[0]}55,${branch.orb[1]}33)`, border:`1px solid ${branch.orb[0]}55` }}>
                      {React.createElement(branch.icon, { className:'w-4 h-4 text-white' })}
                    </div>
                    <h2 className="text-xl font-bold text-white">شعبة {branch.title}</h2>
                  </div>
                  <button onClick={() => { setScores({}); setResult(null); }}
                    className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                    style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)' }}>
                    <RotateCcw className="w-4 h-4 text-white/70" />
                  </button>
                </div>
 
                {/* Subjects */}
                <div className="relative z-10 space-y-3 max-h-[420px] overflow-y-auto pl-1"
                  style={{ scrollbarWidth:'thin', scrollbarColor:'rgba(255,255,255,0.1) transparent' }}>
                  {Object.entries(coeffs[selectedBranch]).map(([sub, coef]) => (
                    <motion.div key={sub}
                      initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.3 }}
                      className="flex items-center justify-between px-5 py-4 rounded-2xl hover:bg-white/[0.06] transition-all"
                      style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                          style={{ background:`${branch.orb[0]}22`, color:branch.orb[0], border:`1px solid ${branch.orb[0]}33` }}>
                          {coef}×
                        </div>
                        <span className="font-medium text-white/85">{sub}</span>
                      </div>
                      <input type="number" min="0" max="20" step="0.25"
                        value={scores[sub] || ''}
                        onChange={e => setScores({ ...scores, [sub]: e.target.value })}
                        placeholder="—"
                        className="w-20 text-center font-bold text-white outline-none rounded-xl py-2 focus:scale-105 transition-all placeholder:text-white/20"
                        style={{ background:'rgba(0,0,0,0.25)', border:'1px solid rgba(255,255,255,0.1)' }} />
                    </motion.div>
                  ))}
                </div>
 
                {/* Calculate button */}
                <div className="relative z-10 mt-8">
                  <motion.button onClick={calculate}
                    whileHover={{ scale:1.02 }} whileTap={{ scale:0.97 }}
                    className="w-full py-4 rounded-2xl font-bold text-lg text-white flex items-center justify-center gap-2"
                    style={{ background:`linear-gradient(135deg,${branch.orb[0]},${branch.orb[1]})`, boxShadow:`0 8px 30px ${branch.glow}, inset 0 1px 0 rgba(255,255,255,0.25)` }}>
                    <Calculator className="w-5 h-5" />
                    إحسب المعدل النهائي
                  </motion.button>
                </div>
 
                {result && <div className="relative z-10"><ResultBadge result={result} /></div>}
              </div>
            </motion.div>
          )}
 
        </AnimatePresence>
      </div>
    </div>
  );
};
 
export default CalculatorPage;
