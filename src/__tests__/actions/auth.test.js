import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { login, logout, startLogout, startLoginEmailPassword } from '../../actions/auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

// State de mi Redux en la app - lo que se ve en el Redux DevsTools
let store = mockStore(initState);

describe('Pruebas con las acciones de Auth', () => {

  beforeEach( () => {
    // reinicializacion del store
    store = mockStore(initState);
  })
  
  test('login y logout debes de crear la accion respectiva', () => {

    const sign = login('TESTING', 'Jesus');

    expect( sign ).toEqual({
      type: types.login,
      payload: {
        uid: 'TESTING',
        displayName: 'Jesus'
      }
    });

    expect( logout() ).toEqual({
      type: types.logout
    });
  })

  test('debe de realizar el startLogout ', async () => {
    
    await store.dispatch( startLogout() );
    const actions = store.getActions();

    expect( actions[0] ).toEqual({
      type: types.logout
    })

    expect( actions[1] ).toEqual({
      type: types.notesLogoutCleaning
    }) 
  })

  test('debe de iniciar el startLoginEmailPassword ', async () => {
    
    await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

    const actions = store.getActions();

    expect( actions[1] ).toEqual({
      type: types.login,
      payload: {
        uid: 'XLFYbEUxzOSWNKQmnEd0hiW8Wq03',
        displayName: null
      }
    })

  })
  
})