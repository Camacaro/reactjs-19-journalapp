import React from 'react'
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  // Obtener el estado del redux
  const { msgError } = useSelector( state => state.ui );

  const [formValues, handleInputChange] = useForm({
    name: 'Oriana',
    email: 'orianacmujica@mail.com',
    password: '123456',
    password2: '123456',
  });

  const {
    name,
    email,
    password,
    password2,
  } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if( isFormValid() ) {
      console.log('Formulario correcto')
    }

  }

  const isFormValid = () => {

    if( name.trim().length === 0 ) {
      
      console.log('Name is required')
      dispatch( setError('Name is required') );
      return false;

    } else if ( !validator.isEmail( email ) ) {

      console.log('Email is not valid')
      dispatch( setError('Email is not valid') );
      return false;

    } else if ( password !== password2 || password.length < 5) {
      console.log('Password should be at least characters and match each other')
      dispatch( setError('Password should be at least characters and match each other') );
      return false;
    }
    
    dispatch( removeError() );
    return true
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form onSubmit={ handleRegister }>

        {

          msgError && 
          (
            <div className="auth__alert-error">
              { msgError }
            </div>
          )
        }

        <input 
          onChange={ handleInputChange }
          value={ name }
          className="auth__input"
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
        />


        <input 
          onChange={ handleInputChange }
          value={ email }
          className="auth__input"
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
        />

        <input 
          onChange={ handleInputChange }
          value={ password }
          className="auth__input"
          type="password"
          placeholder="password"
          name="password"
          autoComplete="off"
        />

        <input 
          onChange={ handleInputChange }
          value={ password2 }
          className="auth__input"
          type="password"
          placeholder="Confirm password"
          name="password2"
          autoComplete="off"
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>

        <Link
          to="/auth/login"
          className="link"
        >
          Alredy registered?
        </Link>
      </form>
    </>
  )
}
