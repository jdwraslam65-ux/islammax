import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import { Toaster } from '@/components/ui/toaster';
import SequencesPage from '@/pages/SequencesPage';
import CalculatorPage from '@/pages/CalculatorPage';
// 1. أضفنا استيراد صفحة الفيديو هنا (تأكد من إنشاء الملف في مجلد pages)
import LessonPage from '@/pages/LessonPage';
import { Analytics } from '@vercel/analytics/react'; 

/* ─── Video Background + Theme Wrapper ─── */
function AppShell({ children }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="relative min-h-screen flex flex-col font-sans antialiased"
      style={{ transition: 'background 0.6s ease, color 0.4s ease' }}
    >
      <video
        key="bg-video"
        autoPlay
        loop
        muted
        playsInline
        src="/bg.mp4"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: isDarkMode
            ? 'brightness(0.45) saturate(1.1)'
            : 'brightness(0.85) saturate(0.8) sepia(0.15)',
          transition: 'filter 0.8s ease',
        }}
      />

      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          transition: 'background 0.7s ease',
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(6,8,24,0.55) 0%, rgba(13,16,48,0.45) 50%, rgba(8,12,32,0.55) 100%)'
            : 'linear-gradient(135deg, rgba(255,243,220,0.55) 0%, rgba(255,250,235,0.45) 50%, rgba(255,240,210,0.55) 100%)',
        }}
      />

      <div
        className="relative flex flex-col min-h-screen"
        style={{
          zIndex: 2,
          color: isDarkMode ? 'rgba(255,255,255,0.92)' : 'rgba(20,15,8,0.92)',
          transition: 'color 0.4s ease',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <AppShell>
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/"           element={<HomePage />} />
                <Route path="/login"      element={<LoginPage />} />
                <Route path="/signup"     element={<SignupPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/dashboard"  element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/sequences"  element={<ProtectedRoute><SequencesPage /></ProtectedRoute>} />
                
                {/* 2. هذا هو السطر الجديد الذي أضفناه لعرض الدروس بشكل ديناميكي */}
                <Route path="/unit/:unitId" element={<ProtectedRoute><LessonPage /></ProtectedRoute>} />
                
              </Routes>
            </main>
            <Footer />
            <Toaster />
            <Analytics />
          </AppShell>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;