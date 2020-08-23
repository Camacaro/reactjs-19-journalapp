import '@testing-library/jest-dom'
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Pruebas <NoteScreen />', () => {

  const initState = {};

  // State de mi Redux en la app - lo que se ve en el Redux DevsTools
  let store = mockStore(initState);
  store.dispatch = jest.fn();

  const note = {
    id: 10,
    date: 0,
    title: 'lorem',
    body: 'Minim et aute ex exercitation deserunt qui aute cupidatat consequat eiusmod magna adipisicing.',
    url: 'https://algunlugar.com/foto.jpg'
  }

  const wrapper = mount( 
    <Provider store={ store }>
      <JournalEntry { ...note } /> 
    </Provider>
  )
  
  test('debe de mostrarse corectamente', () => {

    expect( wrapper ).toMatchSnapshot();
  })

  test('debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')();

    expect( store.dispatch ).toHaveBeenCalled()

    expect( store.dispatch ).toHaveBeenCalledWith(
      activeNote( note.id, { ...note } )
    )
  })
  
  
})