import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut } from 'lucide-react';

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.2" />
    <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.2" />
    <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconChat = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M15 17H9l-1.5 2v-2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1.5V19L15 17Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const IconGear = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" stroke="currentColor" strokeWidth="1.2" />
    <path
      d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.7 1.7 0 0 1-2.4 2.4l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1.7 1.7 0 0 1-3.4 0v-.1a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1.7 1.7 0 0 1 0-3.4h.1a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1 1 0 0 0 1.1.2h0a1 1 0 0 0 .6-.9V4a1.7 1.7 0 0 1 3.4 0v.1a1 1 0 0 0 .6.9h0a1 1 0 0 0 1.1-.2l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1 1 0 0 0-.2 1.1v0a1 1 0 0 0 .9.6H20a1.7 1.7 0 1 1 0 3.4h-.1a1 1 0 0 0-.9.6Z"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

const IconStar = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="orb orb-blue" aria-hidden />
      <div className="orb orb-orange" aria-hidden />

      <header className="topbar-liquid">
        <div className="topbar-liquid__shine" aria-hidden />
        <div className="topbar-liquid__grid" aria-hidden />
        <div className="topbar-liquid__edge" aria-hidden />

        <div className="relative z-[1] mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-[3.75rem] sm:gap-4 sm:px-6">
          <Link
            to="/"
            className="topbar-brand nav-pill crystal-btn relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2"
          >
            <IconUser />
            <span className="relative z-[1] text-sm font-medium tracking-wide text-white/95">IslamMax</span>
          </Link>

          <nav
            className="topbar-nav-scroll flex min-w-0 flex-1 items-center justify-center gap-0.5 sm:gap-1 md:justify-center"
            aria-label="التنقل الرئيسي"
          >
            <Link to="/" className="topbar-link inline-flex items-center gap-1.5">
              <span className="hidden shrink-0 opacity-80 sm:inline">
                <IconSearch />
              </span>
              <span className="arabic text-[0.8125rem]">الرئيسية</span>
            </Link>
            <Link to="/calculator" className="topbar-link inline-flex items-center gap-1.5">
              <span className="hidden shrink-0 opacity-80 sm:inline">
                <IconChat />
              </span>
              <span className="arabic text-[0.8125rem]">حساب معدل</span>
            </Link>
            <Link to="/sequences" className="topbar-link inline-flex items-center gap-1.5">
              <span className="hidden shrink-0 opacity-80 sm:inline">
                <IconGear />
              </span>
              <span className="hidden font-medium text-white/75 sm:inline">Schedule</span>
              <span className="arabic text-[0.8125rem]">الجدول</span>
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
            {currentUser ? (
              <>
                <Link
                  to="/dashboard"
                  className="nav-pill crystal-btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl px-3 py-1.5 text-xs sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
                >
                  <IconStar />
                  <span className="relative z-[1] hidden sm:inline">Portal</span>
                  <span className="relative z-[1] arabic">البوابة</span>
                  <span className="relative z-[1] hidden sm:inline">
                    <IconArrow />
                  </span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="nav-pill crystal-btn relative inline-flex items-center justify-center overflow-hidden rounded-xl p-2 text-red-300/90 sm:p-2.5"
                  title="تسجيل الخروج"
                >
                  <LogOut size={17} className="relative z-[1]" />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="nav-pill crystal-btn relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl px-3 py-1.5 text-xs sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
              >
                <IconStar />
                <span className="relative z-[1] hidden sm:inline">Portal</span>
                <span className="relative z-[1] arabic">البوابة</span>
                <IconArrow />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* يمنع تغطية المحتوى للشريط الثابت */}
      <div className="topbar-spacer shrink-0" aria-hidden />
    </>
  );
};

export default Header;
