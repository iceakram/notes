'use client';

import { useState, useEffect } from 'react';
import { Note, Folder } from '@/types';

const STORAGE_KEYS = {
  NOTES: 'icenote_notes',
  FOLDERS: 'icenote_folders',
};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem(STORAGE_KEYS.NOTES);
    const savedFolders = localStorage.getItem(STORAGE_KEYS.FOLDERS);
    
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      })));
    }
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
    
    setIsLoading(false);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
    }
  }, [notes, folders, isLoading]);

  const createNote = (title: string = 'Untitled Note', content: string = '') => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      tags: [],
      isPinned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const togglePinNote = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  const createFolder = (name: string, color?: string) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      color,
    };
    setFolders((prev) => [...prev, newFolder]);
    return newFolder;
  };

  const deleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((folder) => folder.id !== id));
    setNotes((prev) =>
      prev.map((note) =>
        note.folder === id ? { ...note, folder: undefined } : note
      )
    );
  };

  const searchNotes = (query: string): Note[] => {
    if (!query.trim()) return notes;
    
    const lowerQuery = query.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.content.toLowerCase().includes(lowerQuery) ||
        note.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  };

  const getNotesInFolder = (folderId?: string): Note[] => {
    return notes.filter((note) => note.folder === folderId);
  };

  return {
    notes,
    folders,
    isLoading,
    createNote,
    updateNote,
    deleteNote,
    togglePinNote,
    createFolder,
    deleteFolder,
    searchNotes,
    getNotesInFolder,
  };
}
