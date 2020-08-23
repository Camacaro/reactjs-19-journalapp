import '@testing-library/jest-dom'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../components/auth/LoginScreen';
import { types } from '../../types/types';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';

jest.mock('../../actions/auth', () => ({
  startGoogleLogin: jest.fn(),
  startLoginEmailPassword: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

// State de mi Redux en la app - lo que se ve en el Redux DevsTools
let store = mockStore(initState);
// Manejar el dispath del store para saber si se disparo
store.dispatch = jest.fn();

const wrapper = mount( 
  <Provider store={ store }>
    <MemoryRouter>
      <LoginScreen /> 
    </MemoryRouter>
  </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

  beforeEach( () => {
    // reinicializacion del store
    store = mockStore(initState);
    jest.clearAllMocks();
  })
  
  test('debe de coincidir los types', () => {
    expect( wrapper ).toMatchSnapshot();
  });

  test('debe de disparar startGoogleLogin', () => {
    
    wrapper.find('.google-btn').prop('onClick')();

    expect( startGoogleLogin ).toHaveBeenCalled();

  })

  test('debe de disparar el startLoginEmailPassword con los respectivo argumentos ', () => {
    
    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    });

    expect( startLoginEmailPassword ).toHaveBeenCalledWith('orianacmujica@mail.com', '123456');
  })
  
  
})