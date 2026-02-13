import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase'; // تأكد أن هذا الملف موجود وبه إعدادات Firebase التي نسختها
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile 
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // مراقبة حالة المستخدم (تسجيل دخول أو خروج)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // دالة تسجيل الدخول
  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // دالة إنشاء حساب جديد (التي كانت تسبب لك المشكلة)
  const signup = async (email, password, fullName) => {
    try {
      // 1. إنشاء المستخدم في فايربيز
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. إضافة اسم المستخدم للملف الشخصي
      await updateProfile(userCredential.user, {
        displayName: fullName
      });
      
      return userCredential.user;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // دالة تسجيل الخروج
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};