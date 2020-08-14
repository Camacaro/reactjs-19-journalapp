import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content">

        <input 
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
        >
        </textarea>

        <div className="notes__image">
          
          <img
            alt="gato"
            src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
          />

        </div>
      </div>

    </div>
  )
}
