import { db } from "../firebase/firebaseConfig"



export const loadNotes = async ( uid ) => {
  
  const notesSnap = await db.collection(`${ uid }/journal/notes`).get();
  const notes = [];

  notesSnap.forEach( snapHijo => {
  // console.log(snapHijo.data())
  // console.log(notesSnap);
    notes.push({
      id: snapHijo.id,
      ...snapHijo.data()
    })
  })

  // console.log(notes)
  return notes;
}