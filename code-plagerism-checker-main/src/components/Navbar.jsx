import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upload', path: '/upload' },
    { name: 'Results', path: '/results' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 mb-8 px-6 py-4 flex items-center justify-between border-b pb-4 rounded-xl shadow-sm">
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white transition-colors">
        <ScanLine className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        <span className="hidden sm:inline-block">AutoDetect</span>
      </Link>
      
      <div className="flex items-center gap-1 sm:gap-6 bg-slate-100/50 dark:bg-slate-700/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-600">
        {navLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-300'
              }`}
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </nav>
  );
};

export default Navbar;
