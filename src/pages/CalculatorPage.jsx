import React, { useState } from 'react';

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
        let totalPoints = 0;
        let totalCoeffs = 0;
        Object.keys(coeffs[selectedBranch]).forEach(sub => {
            const score = parseFloat(scores[sub]) || 0;
            const coeff = coeffs[selectedBranch][sub];
            totalPoints += score * coeff;
            totalCoeffs += coeff;
        });
        setResult((totalPoints / totalCoeffs).toFixed(2));
    };

    return (
        <div className="container mx-auto p-6 text-center">
            <h1 className="text-3xl font-bold mb-8">📉 اختر شعبتك لحساب المعدل</h1>
            
            {!selectedBranch ? (
                <div className="flex flex-wrap justify-center gap-6">
                    <div onClick={() => setSelectedBranch('science')} className="cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all w-64 shadow-xl">
                        <div className="text-5xl mb-4">🧪</div>
                        <h3 className="text-xl font-bold">علوم تجريبية</h3>
                    </div>
                    <div onClick={() => setSelectedBranch('math')} className="cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all w-64 shadow-xl">
                        <div className="text-5xl mb-4">📐</div>
                        <h3 className="text-xl font-bold">رياضيات</h3>
                    </div>
                    <div onClick={() => setSelectedBranch('tech')} className="cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:scale-105 transition-all w-64 shadow-xl">
                        <div className="text-5xl mb-4">⚙️</div>
                        <h3 className="text-xl font-bold">تقني رياضي</h3>
                    </div>
                </div>
            ) : (
                <div className="max-w-md mx-auto bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl">
                    <button onClick={() => {setSelectedBranch(null); setResult(null)}} className="text-sm text-blue-400 mb-4 inline-block">← العودة لاختيار الشعبة</button>
                    <h2 className="text-2xl font-bold mb-6">شعبة {selectedBranch === 'science' ? 'العلوم' : selectedBranch === 'math' ? 'الرياضيات' : 'التقني'}</h2>
                    <div className="space-y-4 text-right overflow-y-auto max-h-96 pr-2">
                        {Object.keys(coeffs[selectedBranch]).map(sub => (
                            <div key={sub} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                <span className="text-sm">{sub} (×{coeffs[selectedBranch][sub]})</span>
                                <input 
                                    type="number" 
                                    onChange={(e) => setScores({...scores, [sub]: e.target.value})}
                                    className="w-20 bg-black/20 border border-white/10 rounded-lg p-2 text-center text-white"
                                    placeholder="00"
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={calculate} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-xl font-bold transition-all">إحسب المعدل</button>
                    {result && <div className="mt-6 text-3xl font-bold text-green-400">المعدل: {result}</div>}
                </div>
            )}
        </div>
    );
};

export default CalculatorPage;