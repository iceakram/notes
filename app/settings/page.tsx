'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Sparkles, Info } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white via-ice-frost to-ice-white dark:from-ice-dark-bg dark:via-ice-dark-card dark:to-ice-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card m-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/app" className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gradient">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="pt-24 pb-8 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Appearance */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-ice-navy dark:text-ice-white">
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-ice-navy dark:text-ice-white">Theme</p>
                  <p className="text-sm text-ice-navy/60 dark:text-ice-white/60">
                    Choose your preferred color scheme
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-ice-cyan" />
                  ) : (
                    <Moon className="w-5 h-5 text-ice-navy" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-ice-navy dark:text-ice-white flex items-center gap-2">
              <Info className="w-5 h-5 text-ice-cyan" />
              Keyboard Shortcuts
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-ice-navy/70 dark:text-ice-white/70">New Note</span>
                <code className="px-3 py-1.5 text-sm glass-card rounded-lg font-mono">
                  Ctrl + N
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ice-navy/70 dark:text-ice-white/70">Search</span>
                <code className="px-3 py-1.5 text-sm glass-card rounded-lg font-mono">
                  Ctrl + F
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ice-navy/70 dark:text-ice-white/70">Bold Text</span>
                <code className="px-3 py-1.5 text-sm glass-card rounded-lg font-mono">
                  Ctrl + B
                </code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ice-navy/70 dark:text-ice-white/70">Italic Text</span>
                <code className="px-3 py-1.5 text-sm glass-card rounded-lg font-mono">
                  Ctrl + I
                </code>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-ice-navy dark:text-ice-white">
              About IceNote
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-ice-cyan" />
                <div>
                  <p className="font-semibold text-ice-navy dark:text-ice-white">
                    IceNote
                  </p>
                  <p className="text-sm text-ice-navy/60 dark:text-ice-white/60">
                    Version 1.0.0
                  </p>
                </div>
              </div>
              <p className="text-ice-navy/70 dark:text-ice-white/70">
                A professional, minimalist notes application built with clarity and precision.
                All your notes are stored locally in your browser.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4 text-ice-navy dark:text-ice-white">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Auto-save</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Rich text editor</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Markdown support</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Smart search</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Tags & organization</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Pin notes</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Dark/Light mode</span>
              </div>
              <div className="flex items-center gap-2 text-ice-navy/70 dark:text-ice-white/70">
                <div className="w-2 h-2 rounded-full bg-ice-cyan"></div>
                <span>Keyboard shortcuts</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
