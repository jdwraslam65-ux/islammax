import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, User, LogOut, LayoutDashboard, Home, Calculator, Menu, X } from 'lucide-react';
 
const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [dark, setDark] = useState(true);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
 
  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [location]);
 
  const handleLogout = () => { logout(); navigate('/login'); };
 
  const isActive = (path) => location.pathname === path;
 
  /* ── shared pill style (like the image) ── */
  const pill = {
    background: 'rgba(255,255,255,0.13)',
    backdropFilter: 'blur(32px) saturate(200%)',
    WebkitBackdropFilter: 'blur(32px) saturate(200%)',
    border: '1px solid rgba(255,255,255,0.28)',
    boxShadow: [
      '0 2px 24px rgba(0,0,0,0.18)',
      'inset 0 1.5px 0 rgba(255,255,255,0.55)',   /* top specular */
      'inset 0 -1px 0 rgba(255,255,255,0.10)',     /* bottom rim */
      'inset 1px 0 0 rgba(255,255,255,0.18)',      /* left rim */
      'inset -1px 0 0 rgba(255,255,255,0.18)',     /* right rim */
    ].join(', '),
  };
 
  /* chromatic edge glow — the colorful border in the image */
  const chromatic = {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    background: 'linear-gradient(135deg, rgba(255,120,100,0.18) 0%, rgba(120,200,255,0.10) 50%, rgba(100,255,200,0.12) 100%)',
    mixBlendMode: 'screen',
  };
 
  const navLinks = [
    { to: '/', label: 'الرئيسية', icon: Home },
    { to: '/calculator', label: 'حساب المعدل', icon: Calculator },
    ...(currentUser ? [{ to: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard }] : []),
  ];
 
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
        <div className="mx-auto max-w-5xl">
 
          {/* ── Main pill bar ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            style={{
              ...pill,
              borderRadius: 9999,
              transition: 'box-shadow 0.3s',
              ...(scrolled && { boxShadow: '0 8px 40px rgba(0,0,0,0.35), inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.10)' }),
            }}
            className="relative flex items-center justify-between px-5 py-2.5 overflow-hidden"
          >
            {/* Chromatic aberration overlay */}
            <div style={chromatic} />
 
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 group relative z-10 shrink-0">
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 w-9 rounded-2xl flex items-center justify-center text-white font-black text-base relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                  boxShadow: '0 4px 16px rgba(129,140,248,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
                }}
              >
                <span className="relative z-10">M</span>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.25) 0%,transparent 60%)' }} />
              </motion.div>
              <span className="text-base font-bold text-white hidden sm:block tracking-tight" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
                إسلام ماكس
              </span>
            </Link>
 
            {/* ── Nav links (desktop) ── */}
            <nav className="hidden md:flex items-center gap-1 relative z-10">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 overflow-hidden"
                    style={isActive(to) ? {
                      background: 'rgba(255,255,255,0.18)',
                      border: '1px solid rgba(255,255,255,0.32)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5)',
                      color: 'white',
                    } : {
                      color: 'rgba(255,255,255,0.72)',
                    }}
                  >
                    {isActive(to) && (
                      <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.15),rgba(255,255,255,0.03))' }} />
                    )}
                    <Icon className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{label}</span>
                  </motion.div>
                </Link>
              ))}
            </nav>
 
            {/* ── Actions ── */}
            <div className="flex items-center gap-2 relative z-10">
 
              {/* Theme toggle pill */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setDark(!dark)}
                className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}
              >
                <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.2),transparent 60%)' }} />
                {dark
                  ? <Sun className="h-4 w-4 text-white/80 relative z-10" />
                  : <Moon className="h-4 w-4 text-white/80 relative z-10" />}
              </motion.button>
 
              {currentUser ? (
                /* Avatar + dropdown */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setDropOpen(!dropOpen)}
                    className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg,#6366f1,#a855f7)', boxShadow: '0 4px 14px rgba(99,102,241,0.45), inset 0 1px 0 rgba(255,255,255,0.35)', border: '1.5px solid rgba(255,255,255,0.3)' }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </motion.button>
 
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.88, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute left-0 top-12 w-52 rounded-2xl overflow-hidden p-1.5"
                        style={{ ...pill, borderRadius: 18 }}
                        dir="rtl"
                      >
                        <div style={chromatic} />
                        <div className="px-3 py-2 mb-1">
                          <p className="text-xs text-white/40 font-medium">مرحباً</p>
                          <p className="text-sm text-white font-semibold truncate">{currentUser.name || currentUser.email}</p>
                        </div>
                        <div className="h-px mx-2 mb-1" style={{ background: 'rgba(255,255,255,0.12)' }} />
                        {[
                          { icon: LayoutDashboard, label: 'لوحة التحكم', action: () => navigate('/dashboard') },
                          { icon: Calculator, label: 'حساب المعدل', action: () => navigate('/calculator') },
                        ].map(({ icon: Icon, label, action }) => (
                          <button key={label} onClick={action}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all text-right"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </button>
                        ))}
                        <div className="h-px mx-2 my-1" style={{ background: 'rgba(255,255,255,0.12)' }} />
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all text-right"
                        >
                          <LogOut className="w-4 h-4" />
                          تسجيل الخروج
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white/80 hover:text-white transition-colors">
                      دخول
                    </motion.button>
                  </Link>
                  <Link to="/signup" className="hidden sm:block">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                      className="px-4 py-2 rounded-full text-sm font-semibold text-white relative overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.32)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 14px rgba(0,0,0,0.15)' }}
                    >
                      <div className="absolute inset-0 rounded-full" style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.18),transparent 60%)' }} />
                      <span className="relative z-10">تسجيل جديد</span>
                    </motion.button>
                  </Link>
                </div>
              )}
 
              {/* Mobile menu toggle */}
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.22)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)' }}
              >
                {menuOpen ? <X className="w-4 h-4 text-white/80" /> : <Menu className="w-4 h-4 text-white/80" />}
              </motion.button>
            </div>
          </motion.div>
 
          {/* ── Mobile menu ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="mt-2 rounded-3xl p-2 overflow-hidden relative"
                style={{ ...pill, borderRadius: 24 }}
                dir="rtl"
              >
                <div style={chromatic} />
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <Link key={to} to={to}>
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${isActive(to) ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                      <Icon className="w-4 h-4" />
                      {label}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
 
        </div>
      </header>
 
      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};
 
export default Header;

