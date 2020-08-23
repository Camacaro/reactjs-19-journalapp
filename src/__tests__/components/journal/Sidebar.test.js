import '@testing-library/jest-dom'
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn()
}))

jest.mock('../../../actions/notes', () => ({
  startNewNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas en <Sidebar />', () => {

  const initState = {
    auth: {
      name: 'Jesus'
    },
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      active: null,
      notes: []
    }
  };

  // State de mi Redux en la app - lo que se ve en el Redux DevsTools
  let store = mockStore(initState);
  store.dispatch = jest.fn();

  const wrapper = mount( 
    <Provider store={ store }>
      <Sidebar /> 
    </Provider>
  )
  
  test('debe de mostrarse correctamente', () => {

    expect( wrapper ).toMatchSnapshot();
  })

  test('debe de llamar el startLogout', () => {
    // debe de llamar la accion del logout
    wrapper.find('button').prop('onClick')();
    expect( startLogout ).toHaveBeenCalled();

  })

  test('debe de llamar startNewNote', () => {
    // debe de llamar la action startNewNote
    wrapper.find('.journal__new-entry').prop('onClick')();
    expect( startNewNote ).toHaveBeenCalled();
  })
  
})