/**
 * {
 *    notes: [],
 *    active: null,
 *    active: {
 *      id: 'xxxxxx',
 *      title: '',
 *      body: '',
 *      imageUrl: '',
 *      date: 123
 *    }
 * }
 */

import { types } from "../types/types";

const initialState = {
  notes: [],
  actice: null
}

export const notesReducer = ( state = initialState, action ) => {

  switch (action.type) {

    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }

    case types.notesLoad:
      return {
        ...state,
        notes: [ ...action.payload ]
      }

    default:
      return state;
  }
}