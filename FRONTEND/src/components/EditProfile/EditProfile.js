import "./EditProfile.css";
import React, { useContext,useEffect} from "react";
import { useForm } from "react-hook-form";
import { useSelector,useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { TempleContext } from '../contexts/TempleContext';
import {updateTemple} from '../../slices/templeSlice'
import {updateUser} from '../../slices/userSlice'

function EditProfile(){
    let dispatch = useDispatch();
    
    let navigate = useNavigate();
    let {register , handleSubmit , setValue } = useForm();
    let {isTemple} = useContext(TempleContext)
    // fetching info of currntUser/temple from redux store
    let {currentUser} = useSelector(state => state.userLogin);
    let {currentTemple} = useSelector(state=>state.templeLogin);

    // to fill edit form fields by default
    useEffect(() => {
      // Set initial values for the form based on the current user's data
      if (isTemple) {
        setValue("fullname", currentTemple.fullname || "");
        setValue("diety", currentTemple.diety || "");
        setValue("email", currentTemple.email || "");
        setValue("mobileNumber", currentTemple.mobileNumber || "");
        setValue("state", currentTemple.state || "");
        setValue("district", currentTemple.district || "");
        setValue("about", currentTemple.about || "");
        setValue("image", currentTemple.image || "");
      } else {
        setValue("fullname", currentUser.fullname || "");
        setValue("email", currentUser.email || "");
        setValue("mobileNumber", currentUser.mobileNumber || "");
        setValue("dob", currentUser.dob || "");
        setValue("gender", currentUser.gender || "");
        setValue("image", currentUser.image || "");
      }
    }, [currentUser,currentTemple,  isTemple, setValue]);

    async function updateUserDetails(userObj) {
        try {
          const updatedObj = isTemple
          ? { templename:currentTemple.templename, ...userObj }
          : { username:currentUser.username, ...userObj };
         isTemple ? dispatch(updateTemple(updatedObj)): dispatch(updateUser(updatedObj) );
         isTemple ? navigate("/temple-profile") : navigate("/user-profile");
        } catch (error) {
          console.error('Error updating or fetching user data:', error.message);
        }
      }
      
      function openProfile(){
        isTemple ?  navigate("/temple-profile") :navigate("/user-profile")
      }

    return(
      <section className='edit-profile-container'>
         <div className='edit-profile-wrapper'>
            <div className="title">
              Edit Profile
            </div>
           {
            isTemple ? (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)}>
                <div className="field">
                  <label htmlFor="templename">Templename</label>
                  <input value={currentTemple.templename} type="text" disabled/>
                </div>
                <div className="field">
                  <label htmlFor="name">Name of Temple</label>
                  <input {...register("fullname")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="email">Email Address</label>
                  <input {...register("email")} type="email" required/>
                </div>
                <div className="field">
                  <label htmlFor="diety">Diety</label>
                  <input {...register("diety")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="tel">Mobile</label>
                  <input {...register("mobileNumber")} type="tel" pattern="[1-9]{1}[0-9]{9}" title="Mobile Number should of 10 digits"  required/>
                </div>
                <div className="field">
                  <label htmlFor="about">About Temple</label>
                  <textarea {...register("about")}> </textarea>
                </div>
                <div className="field">
                  <label htmlFor="image">Temple Image URL</label>
                  <input {...register("image")} type="text" />
                </div>
                <div className="field">
                  <label htmlFor="state">State</label>
                  <input {...register("state")} type="text" required/>
                </div>
                <div className="field">
                  <label htmlFor="district">District</label>
                  <input {...register("district")} type="text"  required/>
                </div>
                  <div className="edit-field">
                    <button  type="submit" className="edit-btn save">Save</button>
                    <button onClick={openProfile} type="button" className="edit-btn cancel">Cancel</button>
                  </div> 
              </form> 
   
            ) : (
              <form name='form1' onSubmit={handleSubmit(updateUserDetails)} >
              <div className="field">
                <label htmlFor="username">Username</label>
                <input value={currentUser.username} type="text" disabled/>
              </div>
              <div className="field">
                <label htmlFor="fullname">Full Name</label>
                <input {...register("fullname")} type="text" required/>
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input {...register("email")} type="email"  required/>
              </div>
              <div className="field">
                <label htmlFor="tel">Mobile</label>
                <input {...register("mobileNumber")} type="tel" pattern="[1-9]{1}[0-9]{9}" title="Mobile Number must be of 10 digits" required/>
              </div>
              <div className="field">
                <label htmlFor="dob">Date of Birth</label>
                <input {...register("dob")} type="date" required max={new Date().toISOString().split("T")[0]}/>
              </div>
                <div className="field">
                  <label htmlFor="image">Profile Image</label>
                  <input {...register("image")} type="text" />
                </div>
                <div className="field-gender">
                  <label htmlFor="gender">Gender</label>
                  <div className="gender-options">
                    <label><input {...register("gender")} type="radio" value="Male" required/> Male</label>
                    <label><input {...register("gender")} type="radio" value="Female" required/> Female</label>
                    <label><input {...register("gender")} type="radio" value="Others" required/> Others</label>
                  </div>
                </div>
               <div className="edit-field">
                <button  type="submit" className="edit-btn save">Save</button>
                <button onClick={openProfile} type="button" className="edit-btn cancel">Cancel</button>
              </div>
            </form> )
          }
        </div>    
      </section>
   
   )
}

export default EditProfile