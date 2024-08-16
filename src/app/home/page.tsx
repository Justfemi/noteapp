"use client";
import React, { useState } from 'react';
import NoteCard from '@/components/NoteCard'
import EditModal from '@/components/EditNote';
import Image from 'next/image';
import EmptyImg from "../../../public/images/emptynote.png";
import Link from 'next/link';
import { LogOut } from 'lucide-react';

const Home: React.FC = () => {
  const [notes, setNotes] = useState<string[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setCurrentNoteIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveNote = (value: string) => {
    if (currentNoteIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[currentNoteIndex] = value;
      setNotes(updatedNotes);
    }
  };

  const handleDelete = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, newNote]);
      setNewNote('');
    }
  };

  return (
    <>
      <header className='px-4 h-[50px] w-full flex justify-between items-center bg-[#fafafa] shadow-sm'>
        <Link href="/home">
          <h1 className='cursor-pointer text-xl'>Note<span className='text-purple'>App</span></h1>
        </Link>

        <Link href="/">
          <LogOut />
        </Link>
      </header>
      <div className="my-6 w-full flex flex-col justify-center items-center p-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your note"
          className="border rounded p-3 w-full sm:max-w-[400px] mb-2 h-24 focus:outline-none focus:border-purple resize-none"
        />
        <div className='flex items-center justify-center'>
          <button
            onClick={handleAddNote}
            className="bg-purple text-white px-3 py-2 rounded hover:bg-[#BEADFF]"
          >
            Create New Note
          </button>
        </div>
      </div>

      <div>
        {notes.length > 0 ? (
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-2">
            {notes.map((note, index) => (
              <NoteCard
                key={index}
                note={note}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        ) : (
          <div className='w-full h-[400px] flex flex-col items-center justify-center'>
            <Image 
              src={EmptyImg}
              alt="empty-note"
              width="300"
              className=""
            />
            <h2 className='text-center text-purple-600 font-semibold text-lg'>Create and edit notes in real time with no dime </h2>
            <p className='text-center mt-2'>No notes yet</p>
          </div>
        )}
      </div>
      {currentNoteIndex !== null && (
        <EditModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          initialValue={notes[currentNoteIndex]}
        />
      )}
    </>
  );
};

export default Home;