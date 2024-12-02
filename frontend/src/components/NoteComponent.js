import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoteComponent = ({title,content,id}) => {
  const navigate  = useNavigate()
  return (
    <div 
    onClick={() => navigate(`/note?id=${id}`)}
    >
      <h3 className="text-xl font-semibold text-neutral-800">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            {content}
          </p>
    </div>
  )
}

export default NoteComponent
