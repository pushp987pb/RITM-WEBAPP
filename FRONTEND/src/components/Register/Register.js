import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { hashSync } from 'bcryptjs';
import { userLoginContext } from '../contexts/userLoginContext';
import { TempleContext } from '../contexts/TempleContext';
import './Register.css'; // Import the CSS file

function Register() {
  let [error, setError] = useState('');

  let {isTemple} = useContext(TempleContext);
  
  let { register, handleSubmit } = useForm();

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
        setError(res.data.payload)
        console.log(res.data.payload)
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className='login-section'>
        <div className='wrapper'>
          <div className="title">
            {isTemple ? 'Temple Registration' : 'User Registraton'}
          </div>
          {error.length !== 0 && <p className='fs-4 text-center text-danger'>{error}</p>}

          <form onSubmit={handleSubmit(onRegisteration)} name='form1'>
            {
              isTemple ? (
            <div className="field">
              <input {...register('templename')} type="text" required/>
              <label htmlFor="templename">Templename</label>
            </div>
            
          ) : (
            <div className="field">
              <input {...register('username')} type="text" required/>
              <label htmlFor="username">Username </label>
            </div>
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