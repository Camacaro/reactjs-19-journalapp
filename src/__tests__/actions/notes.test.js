import '@testing-library/jest-dom'


import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startDeleting, startLoadingNotes, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';

// Mock function con su respuesta 
jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn( () => {
    // return 'https://hola-mundo.com/cosa.jpg' o
    return Promise.resolve('https://hola-mundo.com/cosa.jpg')
  } )
}) );
 
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING'
  },
  notes: {
    active: {
      id: 'CPps6C3GqiWF1mj9CGku',
      title: 'Hola 1',
      body: 'Mundo 1'
    }
  }
}

// State de mi Redux en la app - lo que se ve en el Redux DevsTools
let store = mockStore(initState);

describe('Pruebas con las acciones de notes', () => {

  beforeEach( () => {

    // reinicializacion del store
    store = mockStore(initState);

  } )
  
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

  test('startLoadingNotes deve cargar las notas ', async () => {
    
    await store.dispatch( startLoadingNotes( 'TESTING' ) );

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    })

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    }

    // Evaluar estas propiedades que les paso
    expect( actions[0].payload[0] ).toMatchObject(expected)
  });

  test('startSavenote debe de actualizar la nota', async () => {
    
    const note = {
      id: 'BiCwMNr398hVpun5Mf7P',
      title: 'titulo update',
      body: 'body update'
    }

    await store.dispatch( startSaveNote( note ) )

    const actions = store.getActions();

    expect( actions[0].type ).toBe( types.notesUpdated );

    const docRef = await db.doc(`/TESTING/journal/notes/${ note.id }`).get();

    expect( docRef.data().title ).toBe( note.title );
  });

  test('startUploading debe de actualizar el url del entry ', async () => {
    
    const file = new File([], 'foto.jpg');

    await store.dispatch( startUploading( file ) );

    const docRef = await db.doc('/TESTING/journal/notes/CPps6C3GqiWF1mj9CGku').get();
    expect( docRef.data().url ).toBe('https://hola-mundo.com/cosa.jpg');
  })
   
  
  
})