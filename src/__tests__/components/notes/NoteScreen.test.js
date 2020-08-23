import '@testing-library/jest-dom'
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas <NoteScreen />', () => {

   const initState = {
    auth: {
      name: 'Jesus'
    },
    ui: {
      loading: false,
      msgError: null
    },
    notes: {
      active: {
        id: 1234,
        title: 'title Hola',
        body: 'body mundo',
        date: 0
      },
      notes: []
    }
  };

  // State de mi Redux en la app - lo que se ve en el Redux DevsTools
  let store = mockStore(initState);
  store.dispatch = jest.fn();

  const wrapper = mount( 
    <Provider store={ store }>
      <NoteScreen /> 
    </Provider>
  )
  
  test('debe de mostrarse corectamente', () => {

    expect( wrapper ).toMatchSnapshot();
  })

  test('debe de disparar el active note', () => {
    
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola de nuevo'
      }
    });

    expect(activeNote).toHaveBeenCalled();
    
    expect(activeNote).toHaveBeenCalledWith(
      1234,
      {
        title: 'title Hola',
        body: 'body mundo',
        id: 1234,
        date: 0
      }
    );

    expect(activeNote).toHaveBeenLastCalledWith(
      1234,
      {
        title: 'Hola de nuevo',
        body: 'body mundo',
        id: 1234,
        date: 0
      }
    )

  })
  
})