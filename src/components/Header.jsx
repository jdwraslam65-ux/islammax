import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, User, LogOut, LayoutDashboard, Home, Calculator } from 'lucide-react';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4">
      <div className="mx-auto max-w-7xl relative">
        
        {/* الحاوية الكريستالية */}
        <div className="glass-shell rounded-[24px] px-6 py-2 flex items-center justify-between transition-all duration-500">
          
          {/* الإضاءة المتحركة الخلفية */}
          <div className="nav-orb-container">
            <div className="nav-orb"></div>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-10">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="text-xl font-black tracking-tight text-white hidden sm:block">
              BAC <span className="text-blue-400">MX</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8 relative z-10">
            <Link to="/" className="text-sm font-semibold text-white/70 nav-link-glow transition-all flex items-center gap-2">
              <Home className="w-4 h-4" />
              الرئيسية
            </Link>
            
            <Link to="/calculator" className="text-sm font-semibold text-white/70 nav-link-glow transition-all flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              حساب المعدل
            </Link>

            {currentUser && (
              <Link to="/dashboard" className="text-sm font-semibold text-white/70 nav-link-glow transition-all flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                لوحة التحكم
              </Link>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {currentUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full overflow-hidden border border-white/20 p-0 hover:scale-105 transition-transform">
                    <div className="h-full w-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 backdrop-blur-xl bg-black/80 border-white/10 text-white">
                  <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')} className="hover:bg-white/10">
                    <LayoutDashboard className="ml-2 h-4 w-4" />
                    <span>لوحة التحكم</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/calculator')} className="hover:bg-white/10">
                    <Calculator className="ml-2 h-4 w-4" />
                    <span>حساب المعدل</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-400 focus:text-red-400 hover:bg-red-500/10">
                    <LogOut className="ml-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10">
                    دخول
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    ابدأ الآن
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;