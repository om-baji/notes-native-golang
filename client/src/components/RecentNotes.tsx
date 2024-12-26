import React from 'react'
import { useNote } from '../hooks/useNote'
import Note from './Note';

const RecentNotes: React.FC = () => {
  const { isPending, notes, error } = useNote()

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-md shadow-md">
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4 bg-red-100 text-red-600 rounded-md shadow-md">
        Something went wrong!
      </div>
    );
  }

  return (
    <div>
      Recent Notes
      {notes.slice(0,6).map((note) => {
        return <Note
          content={note.content}
          id={note.id}
          title={note.title}
        />
      })}
    </div>
  )
}

export default RecentNotes
