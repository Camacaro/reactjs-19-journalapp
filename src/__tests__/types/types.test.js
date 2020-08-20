import '@testing-library/jest-dom'
import { types } from '../../types/types';

describe('Pruebas con nuestros tipos', () => {
  
  test('debe de coincidir los types', () => {

    expect( types ).toEqual({
      login: '[Auth] Login',
      logout: '[Auth] Logout',
      uiSetError: '[UI] set Error',
      uiRemoveError: '[UI] Remove Error',
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] Load note',
      notesUpdated: '[Notes] Updated note saved',
      notesFileUrl: '[Notes] Updated image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout Cleaning',
    });
    
  })
})