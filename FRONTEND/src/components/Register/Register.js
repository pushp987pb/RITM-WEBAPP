import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { TempleContext } from '../contexts/TempleContext';
import './Register.css'; // Import the CSS file

function Register() {
  let [error, setError] = useState('');

  let {isTemple} = useContext(TempleContext);
  
  let { register, handleSubmit, formState: { errors }, reset } = useForm();

  let navigate = useNavigate(); // to navigate to login page

  async function onRegisteration(credentialsObj) {
    try {
      //make http post request
      let res;
      if(isTemple){
        res = await axios.post('http://localhost:7000/temple-api/create-temple',credentialsObj);
      }else{
        res = await axios.post('http://localhost:7000/user-api/create-user',credentialsObj);
      }
      
      if(res.status === 201){
        navigate("/login");
      }
      else{
        setError(res.data.message)
      }
    } catch (err) {
      setError(err.message);
    }
  }
   // reseting  form fields when isTemple changes
   useEffect(() => {
    reset();
  }, [isTemple]);

  return (
    <section className='login-section'>
        <div className='wrapper'>
          <div className="registration-title">
            {isTemple ? 'Temple Registration' : 'User Registraton'}
          </div>
          {error.length !== 0 && <p className='fs-4 text-center text-danger'>{error}</p>}
          {errors.templename && <p className='fs-4 text-center text-danger mb-0 mt-1'>{errors.templename.message}</p>}
          {errors.username && <p className='fs-4 text-center text-danger mb-0'>{errors.username.message}</p>}

          <form onSubmit={handleSubmit(onRegisteration)} name='form1'>
            {
              isTemple ? (
            <div className="field">
              <input {...register('templename', {
                required: 'Temple name is required',
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9]{5,}$/,
                  message: 'Use Minimum 6 alphabets & numbers only'
                }
              })} type="text"/>
              <label htmlFor="templename">Templename</label>
            </div>
            
          ) : (
            <div className="field">
              <input {...register('username', {
                required: 'Username is required',
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9]{5,}$/,
                  message: 'Use Minimum 6 alphabets & numbers only'
                }
              })} minLength={6} title='Minimum length must be six' type="text"/>
              <label htmlFor="username">Username </label>
            </div>
          )}
          {errors.username?.type === 'minLength' && (
            <p>Username must be at least six characters long.</p>
          )}
          <div className="field">
            <input {...register('email')} type="email" required />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="field">
            <input {...register('password')} type="password" required />
            <label htmlFor="password">Password</label>
          </div>
            <div className="field">
              <input type="submit" value="Register"/>
            </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
