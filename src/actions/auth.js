import Swal from 'sweetalert2'

import { types } from "../types/types"
import {firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import { startLoading, finishLoading } from "./ui"

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {

    dispatch( startLoading() );
    
    firebase.auth().signInWithEmailAndPassword( email, password )
      .then( userCredentials => {
        const { user } = userCredentials;

        dispatch( login(user.uid, user.displayName) );
        dispatch( finishLoading() );

      } )
      .catch( e => {
        console.log(e)
        dispatch( finishLoading() );

        Swal.fire('Error', e.message, 'error' );
      })

    
  }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  // Esto es gracias al thunk
  return (dispatch) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( async (userCredentials) => {
        const { user } = userCredentials;

        await user.updateProfile({ displayName: name })

        dispatch(
          login( user.uid, user.displayName )
        )
      })
      .catch( e => {
        console.log(e);
        Swal.fire('Error', e.message, 'error' );
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {

    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( userCredentials => {
        const { user } = userCredentials;
        // console.log(userCredentials)
        dispatch(
          login( user.uid, user.displayName )
        )
      })
  }
}


export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
      uid,
      displayName
    }
  }
)

export const startLogout = () => {
  // Async
  return async ( dispatch ) => {
    await firebase.auth().signOut();

    dispatch( logout() )
  }
}

export const logout = () => ({
  type: types.logout
})