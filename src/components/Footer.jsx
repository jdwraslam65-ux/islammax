import React from 'react';
import { Instagram, Phone, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full mt-auto border-t border-white/20 bg-white/10 dark:bg-black/10 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Instagram Section */}
          <a 
            href="https://instagram.com/islam_abdul_raouf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400 transition-all duration-300 hover:scale-110"
          >
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-pink-500/30 group-hover:bg-pink-500/10 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all duration-300">
              <Instagram className="w-5 h-5" />
            </div>
            <span className="font-medium tracking-wide">islam_abdul_raouf</span>
          </a>

          {/* Signature Section */}
          <div className="flex flex-col items-center gap-2 order-first sm:order-none mb-4 sm:mb-0">
             <div className="flex items-center gap-2 text-lg font-medium text-gray-700 dark:text-gray-200">
                <span>صنع من طرف</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">اسلام</span>
                <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
             </div>
             <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
          </div>

          {/* Phone Section */}
          <a 
            href="tel:0541348228"
            className="group flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
          >
            <span className="font-medium font-mono text-lg">0541348228</span>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300">
              <Phone className="w-5 h-5" />
            </div>
          </a>

        </div>
        
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} منصة الرياضيات. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;