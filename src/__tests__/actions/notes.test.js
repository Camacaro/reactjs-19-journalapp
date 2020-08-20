import '@testing-library/jest-dom'


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startDeleting } from '../../actions/notes';
import { types } from '../../types/types';
// import { db } from '../../firebase/firebaseConfig';
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// State de mi Redux en la app - lo que se ve en el Redux DevsTools
const store = mockStore({
  auth: {
    uid: 'TESTING'
  }
});

describe('Pruebas con las acciones de notes', () => {
  
  test('debe de crear una nueva nota startNewNote', async () => {

    // Disparar una action del Redux
    await store.dispatch( startNewNote() );

    const actions = store.getActions();
    // console.log(actions)

    expect( actions[0] ).toEqual({
      type: types.notesActive,
      payload: {
          id: expect.any(String),
          title: '',
          body: '',
          date: expect.any(Number)
        }
    });

    expect( actions[1] ).toEqual({
      type: types.notesAddNew,
      payload: {
          id: expect.any(String),
          title: '',
          body: '',
          date: expect.any(Number)
        }
    });

    // Borrar documento
    const docId = actions[0].payload.id;

    await store.dispatch( startDeleting(docId) );
    expect( actions[2] ).toEqual({
      type: types.notesDelete,
      payload: docId
    });

    // Ö
    // await db.doc(`/TESTING/journal/notes/${docId}`).delete();
  })
})