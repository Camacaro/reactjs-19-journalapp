import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote } from '../../actions/notes'

export const NoteScreen = () => {

  const dispatch = useDispatch();

  const { active: note } = useSelector(state => state.notes)
  const [formValues, handleInputChange, reset ] = useForm( note );
  const { body, title } = formValues;

  const activeId = useRef( note.id );

  useEffect(() => {

    if( note.id !== activeId.current ) {
      reset( note );
      activeId.current = note.id;
    }
    
  }, [note, reset])

  useEffect(() => {

    dispatch( activeNote(formValues.id, {...formValues}) )

  }, [formValues, dispatch])

  return (
    <div className="notes__main-content">
      
      <NotesAppBar />

      <div className="notes__content">

        <input 
          value={ title }
          name="title"
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          onChange={ handleInputChange }
        />

        <textarea
          name="body"
          value={ body }
          placeholder="What happened today"
          className="notes__textarea"
          onChange={ handleInputChange }
        >
        </textarea>

        {
          (note.url)
          && (<div className="notes__image">
            <img
              alt="gato"
              src="https://cdn.iconscout.com/icon/free/png-512/avatar-370-456322.png"
            />
          </div>)
        }
      </div>

    </div>
  )
}
