'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  Pin,
  Trash2,
  Bold,
  Italic,
  List,
  Code,
  Hash,
  Moon,
  Sun,
} from 'lucide-react';
import { useNotes } from '@/hooks/useNotes';
import { useTheme } from '@/hooks/useTheme';
import Link from 'next/link';

export default function EditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { notes, updateNote, deleteNote, togglePinNote } = useNotes();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const [note, setNote] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [noteId, setNoteId] = useState<string>('');

  useEffect(() => {
    params.then((p) => setNoteId(p.id));
  }, [params]);

  useEffect(() => {
    if (!noteId) return;
    const foundNote = notes.find((n) => n.id === noteId);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setContent(foundNote.content);
      setTags(foundNote.tags || []);
    }
  }, [noteId, notes]);

  // Auto-save
  useEffect(() => {
    if (!note || !noteId) return;

    const timeoutId = setTimeout(() => {
      setIsSaving(true);
      updateNote(noteId, { title, content, tags });
      setTimeout(() => setIsSaving(false), 500);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [title, content, tags, noteId, note]);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
      router.push('/app');
    }
  };

  const handleTogglePin = () => {
    togglePinNote(noteId);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        break;
      case 'code':
        newText = content.substring(0, start) + `\`${selectedText}\`` + content.substring(end);
        break;
      case 'heading':
        newText = content.substring(0, start) + `## ${selectedText}` + content.substring(end);
        break;
      case 'list':
        newText = content.substring(0, start) + `- ${selectedText}` + content.substring(end);
        break;
    }

    setContent(newText);
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-ice-white via-ice-frost to-ice-white dark:from-ice-dark-bg dark:via-ice-dark-card dark:to-ice-dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-ice-navy/60 dark:text-ice-white/60 mb-4">Loading...</p>
          <Link href="/app" className="btn-secondary">
            Back to Notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ice-white via-ice-frost to-ice-white dark:from-ice-dark-bg dark:via-ice-dark-card dark:to-ice-dark-bg">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card m-4 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/app" className="p-2 rounded-xl glass-card hover:shadow-lg transition-all duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              {isSaving ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-ice-cyan flex items-center gap-2"
                >
                  <Save className="w-4 h-4 animate-pulse" />
                  Saving...
                </motion.div>
              ) : (
                <span className="text-sm text-ice-navy/60 dark:text-ice-white/60">
                  All changes saved
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePin}
              className={`p-3 rounded-xl glass-card hover:shadow-lg transition-all duration-300 ${
                note.isPinned ? 'text-ice-cyan' : ''
              }`}
            >
              <Pin className={`w-5 h-5 ${note.isPinned ? 'fill-current' : ''}`} />
            </button>
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
            <button
              onClick={handleDelete}
              className="p-3 rounded-xl glass-card hover:shadow-lg hover:bg-red-500/20 text-red-500 transition-all duration-300"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor */}
      <div className="pt-24 pb-8 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8"
        >
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="w-full text-4xl font-bold bg-transparent border-none outline-none text-ice-navy dark:text-ice-white placeholder:text-ice-navy/30 dark:placeholder:text-ice-white/30 mb-6"
          />

          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-sm rounded-lg bg-ice-cyan/10 text-ice-cyan flex items-center gap-2"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-ice-cyan/70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag..."
                className="px-3 py-1.5 text-sm glass-card rounded-lg outline-none focus:ring-2 focus:ring-ice-cyan/50"
              />
              <button onClick={addTag} className="btn-secondary py-1.5 px-4 text-sm">
                Add
              </button>
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex gap-2 mb-6 pb-6 border-b border-ice-frost/30 dark:border-ice-dark-border/50">
            <button
              onClick={() => insertFormatting('bold')}
              className="p-2 rounded-lg glass-card hover:shadow-lg transition-all duration-200"
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('italic')}
              className="p-2 rounded-lg glass-card hover:shadow-lg transition-all duration-200"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('heading')}
              className="p-2 rounded-lg glass-card hover:shadow-lg transition-all duration-200"
              title="Heading"
            >
              <Hash className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('list')}
              className="p-2 rounded-lg glass-card hover:shadow-lg transition-all duration-200"
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => insertFormatting('code')}
              className="p-2 rounded-lg glass-card hover:shadow-lg transition-all duration-200"
              title="Code"
            >
              <Code className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full h-[calc(100vh-32rem)] bg-transparent border-none outline-none text-ice-navy dark:text-ice-white placeholder:text-ice-navy/30 dark:placeholder:text-ice-white/30 resize-none text-lg leading-relaxed"
          />
        </motion.div>
      </div>
    </div>
  );
}
