import React from 'react';
import { useForm } from 'react-hook-form';
import { TempleContext } from '../contexts/TempleContext';
import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./login.css"
import {userLoginPromiseStatus} from '../../slices/userSlice'
import {templeLoginPromiseStatus} from '../../slices/templeSlice'
import {useDispatch,useSelector} from 'react-redux';



function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit , reset } = useForm();
  let dispatch = useDispatch();

  const {errorMessage , userLoginStatus} = useSelector(state => state.userLogin)
  const {templeLoginError,templeLoginStatus} = useSelector(state => state.templeLogin)
  const {isTemple , setHideEditProfile} = useContext(TempleContext);

  useEffect(()=>{
      if(templeLoginStatus===true){
        navigate("/temple-profile");
      }
  },[templeLoginStatus]);

  useEffect(()=>{
      if(userLoginStatus===true){
          // getting id from url
          const searchParams = new URLSearchParams(location.search);
          const id = searchParams.get('id');
          // to go back to the TempleDetails component with the correct id
          if (id !== null) {
            navigate(`/temple-details/${id}`);
            setHideEditProfile(true)
          } else {
            navigate("/user-profile");
            setHideEditProfile(false)
          }
      }
  },[userLoginStatus]);


    const handleUserLogin = (userCredObj) => {
      dispatch(userLoginPromiseStatus(userCredObj))
    }

    function onTempleLogin(templeCredObj){
      dispatch(templeLoginPromiseStatus(templeCredObj));
    }
    
    function toRegister(){
      navigate("/register");
    }
     // reseting  form fields when isTemple changes
   useEffect(() => {
    reset();
  }, [isTemple,reset]);

  return (
   <section className='login-section'>
      <div className='wrapper'>
        <div className="title">
          {isTemple ? 'Temple Login' : 'User Login'}
        </div>
        {errorMessage.length !== 0 && <p className='fs-4 text-center text-danger'>{errorMessage}</p>}
        {templeLoginError.length !== 0 && <p className='fs-4 text-center mt-1 mb-0 text-danger'>{templeLoginError}</p>}
          <form onSubmit={ handleSubmit(isTemple ? onTempleLogin : handleUserLogin)} name='form1'>
            {
              isTemple ? (
                <div className="field">
                  <input {...register("templename")}  type="text" id="templename"  required/>
                  <label htmlFor="templename">Templename</label>
                </div>
              ) : (
                <div className="field">
                  <input {...register("username")} type="text" id="username" required/>
                  <label htmlFor="username">Username</label>
                </div>
              )
            }

            <div className="field">
              <input {...register("password")} type="password" id="password" required/>
              <label htmlFor="password">Password</label>
            </div>
            <div className="field">
              <input type="submit" value="Login"/>
            </div>
            <div className="signup-link">
              Not a member? <span onClick={toRegister}>Register now</span>
            </div> 
          </form>
      </div>
   </section>
  );
}

export default Login;