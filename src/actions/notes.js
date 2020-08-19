import { db } from "../firebase/firebaseConfig";
import { types } from "../types/types";


export const startNewNote = () => {
  // getState, es un segundo parametro que me permite obtener el estado a traves del thunk
  return async ( dispatch, getState ) => {

    const { uid } = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    // collection where i want to save the note
    const docRef = await db.collection(`${ uid }/journal/notes`).add(newNote)

    console.log(docRef)

    dispatch( activeNote( docRef.id, newNote ) )
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})