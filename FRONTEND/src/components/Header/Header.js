import React from "react";
import './Header.css'
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TempleContext } from '../contexts/TempleContext'
import {setUserLogout} from '../../slices/userSlice'
import {setTempleLogout} from '../../slices/templeSlice'
import { useDispatch , useSelector } from "react-redux";

function Header() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let {isTemple, setIsTemple}= useContext(TempleContext)

  let {userLoginStatus} = useSelector(state => state.userLogin)
  let {templeLoginStatus} = useSelector(state=>state.templeLogin)
  // logout function.....
  function userLogout() {
    if (isTemple) {
      let actionObj = setTempleLogout();
      dispatch(actionObj);
    } else {
      let actionObj = setUserLogout();
      dispatch(actionObj);
    }
    sessionStorage.removeItem('token');
    navigate("");
  }

  return (
    <div className="header">
      <div className="navbar-item logo-container">
        <img className="logo-img" src="https://logo.com/image-cdn/images/kts928pd/production/80891627307dbfdb8f936bc7706beff68c7d5667-326x336.png?w=1080&q=72" alt="Logo" />
        <span className="app-name">TEMPLE MANAGEMENT SYSTEM</span>
      </div>
      <ul className='navbar-container mb-0'>
        {(userLoginStatus === false) && (templeLoginStatus === false) ? (
          <>
            <li className="navbar-item">
              <Link className="navbar-link active" to="">
                Home
              </Link>
            </li>
            {/* Dropdown */}
            <li className="navbar-item" >
              <span className="navbar-link">Register</span>
              <div className="dropdown-content">
                <Link className="navbar-link" to="register" onClick={() => { setIsTemple(true);}}>
                  As Temple
                </Link>
                <Link className="navbar-link" to="register" onClick={() => { setIsTemple(false);}}>
                  As Guest
                </Link>
              </div>
            </li>
            {/* Dropdown */}
            <li className="navbar-item" >
              <span className="navbar-link">Login</span>
              <div className="dropdown-content">
                <Link className="navbar-link" to="login" onClick={() => { setIsTemple(true);}}>
                  As Temple
                </Link>
                <Link className="navbar-link" to="login" onClick={() => { setIsTemple(false); }}>
                  As Guest
                </Link>
              </div>
            </li>
            <li className="navbar-item">
              <Link className="navbar-link" to="view-temples">
                Views Temples
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item"> <Link className="navbar-link" to="edit-profile">Edit Profile</Link></li>
             {/* 
            {isTemple === false && (
              <li className="navbar-item"><Link className="navbar-link" to="view-temples"> Views Temples</Link></li>
            )} */}
            <li className="navbar-item"> <Link className="navbar-link" onClick={userLogout}> Logout</Link> </li>

          </>
        )}
      </ul>
    </div>
  );
}

export default Header;