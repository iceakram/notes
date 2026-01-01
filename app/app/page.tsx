'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Pin, Trash2, Edit, Moon, Sun, Settings, Menu, X, Folder } from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import { formatDate, truncateText } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AppDashboard() {
  const { notes, createNote, deleteNote, togglePinNote, searchNotes } = useNotes();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const displayedNotes = searchQuery ? searchNotes(searchQuery) : notes;
  const pinnedNotes = displayedNotes.filter((note) => note.isPinned);
  const unpinnedNotes = displayedNotes.filter((note) => !note.isPinned);

  const handleCreateNote = () => {
    const newNote = createNote();
    router.push(`/editor/${newNote.id}`);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
    }
  };

  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    togglePinNote(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white via-ice-frost to-ice-white dark:from-ice-dark-bg dark:via-ice-dark-card dark:to-ice-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card m-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300 lg:hidden"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link href="/" className="text-2xl font-bold text-gradient">
              IceNote
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCreateNote}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">New Note</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-ice-cyan" />
              ) : (
                <Moon className="w-5 h-5 text-ice-navy" />
              )}
            </button>
            <Link
              href="/settings"
              className="p-3 rounded-xl glass-card hover:shadow-lg transition-all duration-300"
            >
              <Settings className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-8 px-4 flex gap-6 max-w-7xl mx-auto">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="fixed lg:relative top-24 left-4 w-64 glass-card p-6 h-[calc(100vh-8rem)] overflow-y-auto z-40"
            >
              <h2 className="text-lg font-semibold mb-4 text-ice-navy dark:text-ice-white">
                Folders
              </h2>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-ice-frost/30 dark:hover:bg-ice-dark-border/30 transition-colors">
                  <Folder className="w-5 h-5 text-ice-cyan" />
                  <span>All Notes</span>
                  <span className="ml-auto text-sm text-ice-navy/60 dark:text-ice-white/60">
                    {notes.length}
                  </span>
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl">
          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ice-navy/40 dark:text-ice-white/40" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
          </div>

          {/* Notes Grid */}
          {displayedNotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-ice-frost/30 dark:bg-ice-dark-border/30 flex items-center justify-center mx-auto mb-6">
                <Plus className="w-12 h-12 text-ice-cyan" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-ice-navy dark:text-ice-white">
                {searchQuery ? 'No notes found' : 'Start Your First Note'}
              </h3>
              <p className="text-ice-navy/60 dark:text-ice-white/60 mb-6">
                {searchQuery
                  ? 'Try a different search term'
                  : 'Capture your thoughts with clarity and precision'}
              </p>
              {!searchQuery && (
                <button onClick={handleCreateNote} className="btn-primary">
                  Create Note
                </button>
              )}
            </motion.div>
          ) : (
            <>
              {/* Pinned Notes */}
              {pinnedNotes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-ice-navy/60 dark:text-ice-white/60 mb-4">
                    Pinned
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {pinnedNotes.map((note, index) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        index={index}
                        onDelete={handleDeleteNote}
                        onTogglePin={handleTogglePin}
                        onClick={() => router.push(`/editor/${note.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Notes */}
              {unpinnedNotes.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-ice-navy/60 dark:text-ice-white/60 mb-4">
                    All Notes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {unpinnedNotes.map((note, index) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        index={index}
                        onDelete={handleDeleteNote}
                        onTogglePin={handleTogglePin}
                        onClick={() => router.push(`/editor/${note.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

interface NoteCardProps {
  note: any;
  index: number;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onTogglePin: (id: string, e: React.MouseEvent) => void;
  onClick: () => void;
}

function NoteCard({ note, index, onDelete, onTogglePin, onClick }: NoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={onClick}
      className="glass-card-hover p-6 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-ice-navy dark:text-ice-white line-clamp-1">
          {note.title || 'Untitled'}
        </h3>
        <button
          onClick={(e) => onTogglePin(note.id, e)}
          className={`p-1 rounded-lg transition-all duration-200 ${
            note.isPinned
              ? 'text-ice-cyan'
              : 'text-ice-navy/40 dark:text-ice-white/40 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Pin className={`w-4 h-4 ${note.isPinned ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-ice-navy/70 dark:text-ice-white/70 text-sm mb-4 line-clamp-3">
        {truncateText(note.content || 'No content', 120)}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-ice-navy/50 dark:text-ice-white/50">
          {formatDate(note.updatedAt)}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => onDelete(note.id, e)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-500 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {note.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-lg bg-ice-cyan/10 text-ice-cyan"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
