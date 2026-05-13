import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Calculator, LayoutDashboard, LogOut, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex justify-center pt-8 pb-4">
      {/* الأضواء السائلة خلف الهيدر */}
      <div className="liquid-shadow-blue"></div>
      <div className="liquid-shadow-orange"></div>

      <nav className="glass-shell prism-border relative z-10 flex items-center gap-2 px-3 py-2 md:px-4">
        
        {/* اللوغو بتصميم الكريستال */}
        <Link to="/" className="crystal-btn flex items-center gap-2 rounded-xl px-4 py-2 text-white">
          <div className="h-6 w-6 bg-blue-500 rounded-md flex items-center justify-center font-bold text-xs">M</div>
          <span className="text-sm font-bold tracking-wide">الرياضيات</span>
        </Link>

        {/* روابط التنقل الوسطى */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className="crystal-btn flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
            <Home size={16} />
            <span className="font-arabic">الرئيسية</span>
          </Link>

          <Link to="/calculator" className="crystal-btn flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
            <Calculator size={16} />
            <span className="font-arabic">حساب المعدل</span>
          </Link>

          {currentUser && (
            <Link to="/dashboard" className="crystal-btn flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
              <LayoutDashboard size={16} />
              <span className="font-arabic">لوحة التحكم</span>
            </Link>
          )}
        </div>

        {/* زر الدخول أو البوابة */}
        {currentUser ? (
           <button onClick={logout} className="crystal-btn ml-1 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm text-red-400">
             <LogOut size={16} />
             <span>خروج</span>
           </button>
        ) : (
          <Link to="/login" className="crystal-btn ml-1 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm text-white">
            <span className="font-arabic">بوابة الدخول</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2"></path></svg>
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Header;

