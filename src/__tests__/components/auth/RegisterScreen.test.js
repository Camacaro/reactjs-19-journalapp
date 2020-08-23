import '@testing-library/jest-dom'
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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
// Manejar el dispath del store para saber si se disparo y manejar funciones sincrona
// store.dispatch = jest.fn();

const wrapper = mount( 
  <Provider store={ store }>
    <MemoryRouter>
      <RegisterScreen /> 
    </MemoryRouter>
  </Provider>
)

describe('Pruebas en <RegisterScreen />', () => {
  
  test('debe de coincidir los types', () => {
    expect( wrapper ).toMatchSnapshot();
  });  

  test('debe de hacer el dispatch de la accion respectiva ', () => {

    const emailField = wrapper.find('input[name="email"]');

    emailField.simulate('change', {
      target: {
        value: '',
        name: 'email'
      }
    });

    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    const actions = store.getActions();

    expect( actions[0] ).toEqual({
        type: types.uiSetError,
        payload: 'Email is not valid'
    });
  })

  test('debe de mostar la caja de alerta  con el error', () => {
    
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid'
      }
    }

    const store = mockStore(initState);

    const wrapper = mount( 
      <Provider store={ store }>
        <MemoryRouter>
          <RegisterScreen /> 
        </MemoryRouter>
      </Provider>
    );

    expect( wrapper.find('.auth__alert-error').exists()  ).toBe(true);
    expect( wrapper.find('.auth__alert-error').text().trim()  ).toBe( initState.ui.msgError );

  })
  
  
})