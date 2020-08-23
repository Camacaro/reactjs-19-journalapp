import '@testing-library/jest-dom'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebaseConfig';

// Error en QuerySelector - No me sale
// import Swal from 'sweetalert2';
// jest.mock('sweetalert2', () => ({
//   fire: jest.fn()
// }))
// FIN

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'ABC',
    },
    notes: []
  }
};

// State de mi Redux en la app - lo que se ve en el Redux DevsTools
let store = mockStore(initState);
// Manejar el dispath del store para saber si se disparo y tambien fue
// porque se aplicaba el async en las actions 
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
  
  test('debe de llamar el login si estoy autenticado', async () => {

    let user;
    // controlar cambios que se generan dentro de el
    await act( async () => {

      const userCredentials = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
      user = userCredentials.user;

      const wrapper = mount( 
        <Provider store={ store }>
          <MemoryRouter>
            <AppRouter /> 
          </MemoryRouter>
        </Provider>
      )
    });

    expect( login ).toHaveBeenCalled();
    expect( login ).toHaveBeenCalledWith('XLFYbEUxzOSWNKQmnEd0hiW8Wq03', null)
  })
})