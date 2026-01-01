'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Lock, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white via-ice-frost to-ice-white dark:from-ice-dark-bg dark:via-ice-dark-card dark:to-ice-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card m-4 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Sparkles className="w-6 h-6 text-ice-cyan" />
            <span className="text-2xl font-bold text-gradient">IceNote</span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-ice-cyan" />
              ) : (
                <Moon className="w-5 h-5 text-ice-navy" />
              )}
            </button>
            <Link href="/app" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-gradient">Note-taking</span>
              <br />
              <span className="text-ice-navy dark:text-ice-white">Refined to Clarity</span>
            </h1>
            <p className="text-xl md:text-2xl text-ice-navy/70 dark:text-ice-white/70 mb-12 max-w-3xl mx-auto">
              Experience the perfect blend of minimalism and power. 
              IceNote brings professional note-taking with icy precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/app" className="btn-primary text-lg px-8 py-4">
                Start Writing Now
                <ChevronRight className="inline-block ml-2 w-5 h-5" />
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
          >
            <div className="glass-card-hover p-8">
              <div className="w-14 h-14 rounded-2xl bg-ice-cyan/20 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-7 h-7 text-ice-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-ice-navy dark:text-ice-white">Lightning Fast</h3>
              <p className="text-ice-navy/70 dark:text-ice-white/70">
                Auto-save, instant search, and blazing performance. Your thoughts, captured instantly.
              </p>
            </div>

            <div className="glass-card-hover p-8">
              <div className="w-14 h-14 rounded-2xl bg-ice-cyan/20 flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-7 h-7 text-ice-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-ice-navy dark:text-ice-white">Beautiful Design</h3>
              <p className="text-ice-navy/70 dark:text-ice-white/70">
                Glassmorphic UI with smooth animations. A workspace that inspires creativity.
              </p>
            </div>

            <div className="glass-card-hover p-8">
              <div className="w-14 h-14 rounded-2xl bg-ice-cyan/20 flex items-center justify-center mb-4 mx-auto">
                <Lock className="w-7 h-7 text-ice-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-ice-navy dark:text-ice-white">Privacy First</h3>
              <p className="text-ice-navy/70 dark:text-ice-white/70">
                Your notes, your data. Everything stored locally with no tracking.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Demo Section */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass-card p-2 shadow-2xl"
          >
            <div className="bg-gradient-to-br from-ice-frost/50 to-ice-white dark:from-ice-dark-card dark:to-ice-dark-bg rounded-xl p-12 text-center">
              <h2 className="text-4xl font-bold mb-4 text-ice-navy dark:text-ice-white">
                Crafted for Professionals
              </h2>
              <p className="text-lg text-ice-navy/70 dark:text-ice-white/70 mb-8">
                Join thousands who've upgraded their note-taking experience
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 glass-card text-sm font-medium">Markdown Support</span>
                <span className="px-4 py-2 glass-card text-sm font-medium">Rich Text Editor</span>
                <span className="px-4 py-2 glass-card text-sm font-medium">Smart Tags</span>
                <span className="px-4 py-2 glass-card text-sm font-medium">Dark Mode</span>
                <span className="px-4 py-2 glass-card text-sm font-medium">Keyboard Shortcuts</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-ice-frost/30 dark:border-ice-dark-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-ice-cyan" />
            <span className="text-xl font-bold text-gradient">IceNote</span>
          </div>
          <p className="text-ice-navy/60 dark:text-ice-white/60">
            © 2026 IceNote. Crafted with precision and clarity.
          </p>
        </div>
      </footer>
    </div>
  );
}
