import { db } from "../firebase/firebaseConfig"



export const loadNotes = async ( uid ) => {
  
  const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
  const notes = [];

  console.log(notesSnap);

  return notes;
}