import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="orb orb-blue" aria-hidden="true" />
      <div className="orb orb-orange" aria-hidden="true" />

      <div className="relative flex justify-center w-full pt-8 pb-4 z-50">
        <nav className="glass-shell prism-border flex items-center gap-2 px-3 py-2 md:px-4">
          
          {/* Logo Section */}
          <Link to="/" className="crystal-btn inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white/95">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" />
              <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="text-sm font-medium tracking-wide">IslamMax</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="crystal-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
              <span className="arabic">الرئيسية</span>
            </Link>
            <Link to="/calculator" className="crystal-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
              <span className="arabic">حساب معدل</span>
            </Link>
            <Link to="/sequences" className="crystal-btn inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/90">
              <span className="arabic">الجدول</span>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="crystal-btn flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-red-400"
              >
                <LogOut size={16} />
                <span className="arabic">خروج</span>
              </button>
            ) : (
              <Link to="/login" className="crystal-btn inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm text-white">
                <span className="arabic">البوابة</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;