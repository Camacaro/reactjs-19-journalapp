import '@testing-library/jest-dom'
import { types } from '../../types/types';
import { authReducer } from '../../reducers/authReducer';

describe('Pruebas en authReducer', () => {
  
  test('debe de realizar el login', () => {

    const initialState = {};
    const action = {
      type: types.login,
      payload: {
        uid: 'abc',
        displayName: 'Jesus'
      }
    }

    const state = authReducer(initialState, action);

    expect( state ).toEqual({
      uid: 'abc',
      name: 'Jesus'
    });
  });

  test('debe de realizar el logout', () => {

    const initialState = {};
    const action = {
      type: types.logout,
      payload: {
        uid: 'abc',
        displayName: 'Jesus'
      }
    }

    const state = authReducer(initialState, action);

    expect( state ).toEqual({});
  });

  test('no debe de hacer cambios en el state', () => {

    const initialState = {
      uid: 'abc',
      name: 'Jesus'
    };

    const action = {
      type: 'xxx',
      payload: {
        uid: 'abc',
        displayName: 'Alejandro'
      }
    }

    const state = authReducer(initialState, action);

    expect( state ).toEqual(initialState);
  });
})