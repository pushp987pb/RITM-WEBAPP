// RoomsUpdateForm.js
import React , { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch , useSelector} from 'react-redux';
import {updateTemple} from '../../slices/templeSlice'
import { TempleContext } from '../contexts/TempleContext';

function RoomsUpdateForm(props){
   let dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    
    const {onClose} = props;
    // fetching current temple from redux 
    const {currentTemple} = useSelector(state=>state.templeLogin)

    async function updateAvailableRooms(roomObj) {
      try {
        const updatedObj = { templename:currentTemple.templename, availableRooms:roomObj }
        dispatch(updateTemple(updatedObj)).then((updatedTemple)=>{
          if(updatedTemple){
            console.log('Available Rooms updated successfully')
            onClose();
          }
        }) 
      } catch (error) {
        console.error('Error updating or fetching user data:', error.message);
        onClose();
      }
    }



  return (
    <div className="event-update-form-container">
      <form className='event-update-form' onSubmit={handleSubmit(updateAvailableRooms)}>
         <h3 className="form-heading">Update Available Rooms </h3>
          <div className="form-group mb-2">
            <label className='form-label' htmlFor="name">Single Seater Rooms</label>
            <input {...register("single_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
          </div>
          <div className="form-label mb-2">
            <label className='text-align-left' htmlFor="name">Double Seater Rooms</label>
            <input {...register("double_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
          </div>
          <div className="form-group mb-2">
            <label className='form-label' htmlFor="name">Triple Seater Rooms</label>
            <input {...register("triple_seater")} type="text" className="form-control" placeholder="Number of rooms available" required />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button onClick={onClose}>Cancel</button>
          </div>
      </form>
    </div>
  );
};

export default RoomsUpdateForm;
