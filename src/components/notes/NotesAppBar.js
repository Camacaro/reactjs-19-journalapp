import React from 'react'
import { startSaveNote, startUploading } from '../../actions/notes'
import { useDispatch, useSelector } from 'react-redux'

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector(state => state.notes)

  const handleSave = () => {
    dispatch( startSaveNote(note) );
  }

  const handlePrictureClick = () => {
    console.log('picture')
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if( file ) {
      dispatch( startUploading(file) )
    }
  }

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input 
        id="fileSelector"
        name="file"
        type="file"
        style={{ display: 'none'}}
        onChange={ handleFileChange }
      /> 

      <div>
        <button 
          className="btn"
          onClick={ handlePrictureClick }
        >
          Picture
        </button>

        <button 
          className="btn"
          onClick={ handleSave }
        >
          Save
        </button>
      </div>
    </div>
  )
}
