import React, { useState } from 'react';
import { Beaker, Ruler, Settings, ArrowRight, RotateCcw } from 'lucide-react';

const CalculatorPage = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [scores, setScores] = useState({});
  const [result, setResult] = useState(null);

  const coeffs = {
    science: { "رياضيات": 7, "علوم": 6, "فيزياء": 5, "عربية": 3, "فلسفة": 2, "إسلامية": 2, "تاريخ": 2, "فرنسية": 2, "إنجليزية": 2, "رياضة": 1 },
    math: { "رياضيات": 7, "فيزياء": 6, "علوم": 2, "عربية": 3, "فلسفة": 2, "إسلامية": 2, "تاريخ": 2, "فرنسية": 2, "إنجليزية": 2, "رياضة": 1 },
    tech: { "تكنولوجيا": 7, "رياضيات": 6, "فيزياء": 6, "عربية": 3, "فلسفة": 2, "إسلامية": 2, "تاريخ": 2, "فرنسية": 2, "إنجليزية": 2, "رياضة": 1 }
  };

  const calculate = () => {
    let p = 0, c = 0;
    Object.keys(coeffs[selectedBranch]).forEach(s => {
      p += (parseFloat(scores[s]) || 0) * coeffs[selectedBranch][s];
      c += coeffs[selectedBranch][s];
    });
    setResult((p / c).toFixed(2));
  };

  return (
    <div className="min-h-screen pt-28 pb-12 bg-transparent text-white px-4">
      <div className="max-w-6xl mx-auto">
        {!selectedBranch ? (
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-12">📉 اختر شعبتك لحساب المعدل</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BranchCard title="علوم تجريبية" icon={<Beaker size={40}/>} color="from-green-500" onClick={() => setSelectedBranch('science')} />
              <BranchCard title="رياضيات" icon={<Ruler size={40}/>} color="from-blue-500" onClick={() => setSelectedBranch('math')} />
              <BranchCard title="تقني رياضي" icon={<Settings size={40}/>} color="from-red-500" onClick={() => setSelectedBranch('tech')} />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl">
            <div className="flex justify-between items-center mb-8">
               <button onClick={() => {setSelectedBranch(null); setResult(null)}} className="p-2 hover:bg-white/10 rounded-full transition-colors"><ArrowRight /></button>
               <h2 className="text-2xl font-bold">شعبة {selectedBranch === 'science' ? 'العلوم' : selectedBranch === 'math' ? 'الرياضيات' : 'التقني'}</h2>
               <button onClick={() => setScores({})} className="p-2 hover:bg-white/10 rounded-full transition-colors"><RotateCcw size={20}/></button>
            </div>
            
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
              {Object.keys(coeffs[selectedBranch]).map(sub => (
                <div key={sub} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <span className="font-medium">{sub} <span className="text-gray-400 text-xs">(×{coeffs[selectedBranch][sub]})</span></span>
                  <input 
                    type="number" 
                    value={scores[sub] || ''}
                    onChange={(e) => setScores({...scores, [sub]: e.target.value})}
                    className="w-20 bg-black/30 border border-white/10 rounded-xl p-2 text-center focus:border-blue-500 outline-none"
                    placeholder="00"
                  />
                </div>
              ))}
            </div>

            <button onClick={calculate} className="w-full mt-8 bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20">
              إحسب المعدل النهائي
            </button>

            {result && (
              <div className="mt-8 text-center p-6 bg-white/5 rounded-3xl border border-blue-500/30">
                <p className="text-gray-400 text-sm mb-1">المعدل المتوقع</p>
                <h3 className="text-5xl font-black text-blue-400">{result}</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const BranchCard = ({ title, icon, color, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer bg-white/5 border border-white/10 backdrop-blur-lg p-10 rounded-[2.5rem] hover:bg-white/10 transition-all hover:-translate-y-2">
    <div className={`w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${color} to-purple-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-400 mt-2 text-sm">اضغط للبدء</p>
  </div>
);

export default CalculatorPage;