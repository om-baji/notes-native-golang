import React from 'react'

const NoteComponent = ({title,content}) => {
  return (
    <div>
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
