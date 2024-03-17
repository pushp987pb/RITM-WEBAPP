import axios from "axios";
import React from "react";
import './RoomBookingFrom.css';
import { useDispatch } from "react-redux";
import {updateTemple} from '../../slices/templeSlice'
import {useForm} from 'react-hook-form';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RoomBookingFrom(props){
    
    let dispatch = useDispatch();
    const {onClose , currentUser , templeDetails} = props;
    const { register, handleSubmit } = useForm();
    let single_seater = templeDetails.availableRooms.single_seater;
    let double_seater = templeDetails.availableRooms.double_seater;
    let triple_seater = templeDetails.availableRooms.triple_seater;

    async function onRoomBooking(roomObj){
        try{
            let updatedObj = {
                user:{username:currentUser.username,fullname:currentUser.fullname,mobileNumber:currentUser.mobileNumber},
                temple:{templename:templeDetails.templename,fullname:templeDetails.fullname,mobileNumber:templeDetails.mobileNumber},
                bookedRooms:{single_seater:roomObj.single_seater, double_seater:roomObj.double_seater,triple_seater:roomObj.triple_seater},
                checkin:roomObj.checkin,
                duration : roomObj.duration
            }
            let response = await axios.post('http://localhost:7000/temple-api/save-rooms',updatedObj)
            if(response.status===201){
                console.log(response.data.message)
            // Subtracting booked rooms from available rooms
            let updatedAvailableRooms = {
                single_seater: templeDetails.availableRooms.single_seater - roomObj.single_seater,
                double_seater: templeDetails.availableRooms.double_seater - roomObj.double_seater,
                triple_seater: templeDetails.availableRooms.triple_seater - roomObj.triple_seater
            }
            // Dispatch the updated available rooms to redux
            const updatedTempleObj = { templename:templeDetails.templename, availableRooms:updatedAvailableRooms }
            dispatch(updateTemple(updatedTempleObj)).then((updatedTemple)=>{
              if(updatedTemple){
                console.log('Available Rooms updated successfully')
              }
            })
        } 
        onClose();
        }catch(err){
            console.log("Error in Booking Rooms",err.message);
            onClose();
        }
    }

    return(
    <div className="event-update-form-container">
            <form className='event-update-form' onSubmit={handleSubmit(onRoomBooking)}>
                <h3 className="form-heading">Book Rooms</h3>
                <div className="form-group mb-3">
                    <label className="">Single Seater Rooms</label>
                    <div className="input-with-span">
                    <input {...register("single_seater")} className="form-control" type="number" min='0' max={ single_seater} placeholder="No. of rooms" required />
                    <span>{single_seater}</span> 
                    </div>
                </div>
            <div className="form-group mb-3">
                <label className="">Double Seater Rooms</label>
                <div className="input-with-span">
                <input {...register("double_seater")} className="form-control" type="number" min='0' max={ double_seater} placeholder="No. of rooms" required />
                <span>{double_seater}</span> 
                </div>
            </div>
            <div className="form-group mb-3">
                <label className="">Tripe Seater Rooms</label>
                <div className="input-with-span">
                <input {...register("triple_seater")} className="form-control" type="number" min='0' max={ triple_seater} placeholder="No. of rooms" required />
                <span>{triple_seater}</span> 
                </div>
            </div>
            <div className="form-group mb-3">
                <label className="">Check In Date</label>
                <input {...register("checkin")} type='date' min={new Date().toISOString().split('T')[0]} className="form-control" required />
            </div>
            <div className="form-group mb-2">
                <label className="">Duration of Stay</label>
                <input {...register("duration")} type='text' className="form-control" placeholder="e.g. 3 Days or 5 Days" required />
            </div>
            
            <div className="form-buttons">
                <button type="submit">Submit</button>
                <button onClick={onClose}>Cancel</button>
            </div>
    </form>
    <ToastContainer/>
    </div>
    )
}
export default RoomBookingFrom