import React from 'react';
import { Header } from './Header';
import { useStore } from '../../store/useStore';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useStore();

  return (
    <div className={theme.isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-200">
        <Header />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};