import { types } from "../types/types"
import {firebase, googleAuthProvider } from '../firebase/firebaseConfig'

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {


    setTimeout(() => {

      dispatch( login(123, 'Pedro') );

    }, 3500);
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