import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Bell, User, Search, Menu } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const { theme, toggleTheme, user } = useStore();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/browse', label: 'Browse' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/add-item', label: 'List Item' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 dark:bg-slate-900/80 dark:border-slate-700/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RW</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ReWear
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              icon={theme.isDark ? Sun : Moon}
              onClick={toggleTheme}
            />
            
            {user && (
              <>
                <Button variant="ghost" size="sm" icon={Bell} />
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-sm font-medium text-slate-700 dark:text-slate-300">
                    {user.points} pts
                  </span>
                </div>
              </>
            )}
            
            <Button variant="ghost" size="sm" icon={Menu} className="md:hidden" />
          </div>
        </div>
      </div>
    </motion.header>
  );
};