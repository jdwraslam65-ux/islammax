import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, LogOut, LayoutDashboard, Home, Calculator, Menu, X } from 'lucide-react';
 
const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [dark, setDark] = useState(true);
 
  useEffect(() => { setMenuOpen(false); setDropOpen(false); }, [location]);
 
  const handleLogout = () => { logout(); navigate('/login'); };
  const isActive = (path) => location.pathname === path;
 
  const navLinks = [
    { to: '/', label: 'الرئيسية', icon: Home },
    { to: '/calculator', label: 'حساب المعدل', icon: Calculator },
    ...(currentUser ? [{ to: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard }] : []),
  ];
 
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="relative w-full max-w-3xl"
        >
 
          {/* ═══ THE REAL iOS 26 LIQUID GLASS PILL ═══ */}
          <div
            className="relative flex items-center justify-between px-4 py-2.5 overflow-hidden"
            style={{
              borderRadius: 9999,
              /* Ultra-transparent — you see the page THROUGH it */
              background: 'rgba(255, 255, 255, 0.06)',
              /* The magic: crazy blur + saturate = iOS glass */
              backdropFilter: 'blur(80px) saturate(300%) brightness(1.08)',
              WebkitBackdropFilter: 'blur(80px) saturate(300%) brightness(1.08)',
              /* Very thin border — almost invisible */
              border: '0.5px solid rgba(255, 255, 255, 0.22)',
              /* Soft shadow — not dark */
              boxShadow: `
                0 1px 0 0 rgba(255,255,255,0.45) inset,
                0 -0.5px 0 0 rgba(255,255,255,0.08) inset,
                0 8px 32px rgba(0,0,0,0.12),
                0 1px 2px rgba(0,0,0,0.08)
              `,
            }}
          >
 
            {/* ── Chromatic refraction: thin rainbow rim (iOS 26 signature) ── */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 9999,
                pointerEvents: 'none',
                background: `linear-gradient(
                  105deg,
                  rgba(255,80,60,0.10)  0%,
                  rgba(255,160,40,0.05) 15%,
                  transparent           30%,
                  transparent           70%,
                  rgba(40,160,255,0.06) 85%,
                  rgba(60,255,200,0.08) 100%
                )`,
              }}
            />
 
            {/* ── Top specular line ── */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                left: '8%',
                right: '8%',
                height: '1px',
                borderRadius: 999,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7) 40%, rgba(255,255,255,0.7) 60%, transparent)',
                pointerEvents: 'none',
              }}
            />
 
            {/* ── LOGO ── */}
            <Link to="/" className="relative z-10 flex items-center gap-2.5 shrink-0">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.92 }}
                style={{
                  width: 34, height: 34,
                  borderRadius: 12,
                  background: 'linear-gradient(140deg, #818cf8, #c084fc)',
                  boxShadow: '0 4px 14px rgba(129,140,248,0.45), inset 0 1px 0 rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 900, fontSize: 15,
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,255,255,0.3) 0%,transparent 55%)', borderRadius:12 }} />
                <span style={{ position:'relative', zIndex:1 }}>M</span>
              </motion.div>
              <span className="hidden sm:block text-[15px] font-bold text-white/90 tracking-tight">
                إسلام ماكس
              </span>
            </Link>
 
            {/* ── NAV LINKS ── */}
            <nav className="hidden md:flex items-center gap-0.5 relative z-10" dir="rtl">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link key={to} to={to}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium cursor-pointer select-none"
                    style={
                      isActive(to)
                        ? {
                            /* Active: slightly more visible glass pill inside the bar */
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '0.5px solid rgba(255,255,255,0.3)',
                            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
                            color: 'rgba(255,255,255,0.95)',
                          }
                        : { color: 'rgba(255,255,255,0.55)' }
                    }
                  >
                    <Icon style={{ width:13, height:13 }} />
                    {label}
                  </motion.span>
                </Link>
              ))}
            </nav>
 
            {/* ── ACTIONS ── */}
            <div className="relative z-10 flex items-center gap-2">
 
              {/* Theme icon button */}
              <motion.button
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setDark(!dark)}
                style={{
                  width: 32, height: 32,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: '0.5px solid rgba(255,255,255,0.2)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {dark
                  ? <Sun style={{ width:14, height:14, color:'rgba(255,255,255,0.7)' }} />
                  : <Moon style={{ width:14, height:14, color:'rgba(255,255,255,0.7)' }} />}
              </motion.button>
 
              {currentUser ? (
                /* Avatar */
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setDropOpen(!dropOpen)}
                    style={{
                      width: 32, height: 32,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg,#6366f1,#a855f7)',
                      border: '1.5px solid rgba(255,255,255,0.35)',
                      boxShadow: '0 4px 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                    }}
                  >
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </motion.button>
 
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity:0, scale:0.9, y:6 }}
                        animate={{ opacity:1, scale:1, y:0 }}
                        exit={{ opacity:0, scale:0.9, y:6 }}
                        transition={{ duration:0.2, ease:[0.23,1,0.32,1] }}
                        dir="rtl"
                        style={{
                          position:'absolute', left:0, top:40,
                          width:200,
                          borderRadius:20,
                          background: 'rgba(255,255,255,0.06)',
                          backdropFilter: 'blur(80px) saturate(300%) brightness(1.1)',
                          WebkitBackdropFilter: 'blur(80px) saturate(300%) brightness(1.1)',
                          border: '0.5px solid rgba(255,255,255,0.22)',
                          boxShadow: '0 1px 0 rgba(255,255,255,0.4) inset, 0 16px 40px rgba(0,0,0,0.2)',
                          padding: 6,
                          overflow: 'hidden',
                        }}
                      >
                        {/* Chromatic rim */}
                        <div style={{ position:'absolute', inset:0, borderRadius:20, background:'linear-gradient(135deg,rgba(255,80,60,0.08),transparent 40%,rgba(40,160,255,0.06))', pointerEvents:'none' }} />
                        <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.65),transparent)', borderRadius:999 }} />
 
                        <div style={{ padding:'8px 12px 6px' }}>
                          <p style={{ fontSize:11, color:'rgba(255,255,255,0.35)', fontWeight:500 }}>مرحباً</p>
                          <p style={{ fontSize:13, color:'rgba(255,255,255,0.9)', fontWeight:600 }} className="truncate">{currentUser.name || currentUser.email}</p>
                        </div>
                        <div style={{ height:'0.5px', background:'rgba(255,255,255,0.1)', margin:'0 8px 4px' }} />
 
                        {[
                          { icon: LayoutDashboard, label:'لوحة التحكم', cb:() => navigate('/dashboard') },
                          { icon: Calculator, label:'حساب المعدل', cb:() => navigate('/calculator') },
                        ].map(({ icon: Icon, label, cb }) => (
                          <button key={label} onClick={cb}
                            style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:14, fontSize:13, color:'rgba(255,255,255,0.75)', background:'transparent', border:'none', cursor:'pointer', transition:'background .15s' }}
                            onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}
                            onMouseLeave={e => e.currentTarget.style.background='transparent'}
                          >
                            <Icon style={{ width:14, height:14 }} />
                            {label}
                          </button>
                        ))}
 
                        <div style={{ height:'0.5px', background:'rgba(255,255,255,0.1)', margin:'4px 8px' }} />
                        <button onClick={handleLogout}
                          style={{ width:'100%', display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:14, fontSize:13, color:'rgba(255,100,100,0.85)', background:'transparent', border:'none', cursor:'pointer', transition:'background .15s' }}
                          onMouseEnter={e => e.currentTarget.style.background='rgba(255,80,80,0.08)'}
                          onMouseLeave={e => e.currentTarget.style.background='transparent'}
                        >
                          <LogOut style={{ width:14, height:14 }} />
                          تسجيل الخروج
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link to="/login">
                    <motion.span whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                      className="cursor-pointer px-3 py-1.5 rounded-full text-[13px] font-medium"
                      style={{ color:'rgba(255,255,255,0.6)' }}>
                      دخول
                    </motion.span>
                  </Link>
                  <Link to="/signup" className="hidden sm:block">
                    <motion.span whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
                      className="cursor-pointer px-3.5 py-1.5 rounded-full text-[13px] font-semibold"
                      style={{
                        background:'rgba(255,255,255,0.13)',
                        border:'0.5px solid rgba(255,255,255,0.28)',
                        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.4)',
                        color:'rgba(255,255,255,0.9)',
                      }}>
                      تسجيل جديد
                    </motion.span>
                  </Link>
                </div>
              )}
 
              {/* Mobile toggle */}
              <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden"
                style={{ width:32, height:32, borderRadius:'50%', background:'rgba(255,255,255,0.08)', border:'0.5px solid rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.3)' }}
              >
                {menuOpen
                  ? <X style={{ width:14, height:14, color:'rgba(255,255,255,0.7)' }} />
                  : <Menu style={{ width:14, height:14, color:'rgba(255,255,255,0.7)' }} />}
              </motion.button>
            </div>
 
          </div>{/* end pill */}
 
          {/* ── Mobile menu pill ── */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity:0, y:-8, scale:0.97 }}
                animate={{ opacity:1, y:0, scale:1 }}
                exit={{ opacity:0, y:-8, scale:0.97 }}
                transition={{ duration:0.22, ease:[0.23,1,0.32,1] }}
                dir="rtl"
                style={{
                  marginTop:6,
                  borderRadius:24,
                  background:'rgba(255,255,255,0.06)',
                  backdropFilter:'blur(80px) saturate(300%) brightness(1.08)',
                  WebkitBackdropFilter:'blur(80px) saturate(300%) brightness(1.08)',
                  border:'0.5px solid rgba(255,255,255,0.22)',
                  boxShadow:'inset 0 1px 0 rgba(255,255,255,0.4), 0 8px 24px rgba(0,0,0,0.12)',
                  padding:6,
                  overflow:'hidden',
                  position:'relative',
                }}
              >
                <div style={{ position:'absolute', top:0, left:'8%', right:'8%', height:1, background:'linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)', borderRadius:999 }} />
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <Link key={to} to={to}>
                    <div style={{
                      display:'flex', alignItems:'center', gap:10,
                      padding:'11px 16px', borderRadius:18,
                      fontSize:14, fontWeight:500,
                      background: isActive(to) ? 'rgba(255,255,255,0.12)' : 'transparent',
                      color: isActive(to) ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)',
                      transition:'background .15s',
                    }}>
                      <Icon style={{ width:15, height:15 }} />
                      {label}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
 
        </motion.div>
      </header>
 
      <div className="h-20" />
    </>
  );
};
 
export default Header;