import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import {updateTemple} from '../../slices/templeSlice'
import './EventUpdateForm.css';
import axios from "axios";
import { ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventUpdateForm(props){
     let dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { showEventForm, setShowEventForm , currentTemple } = props;

    async function onEventUpdate(dataObj){
        try{
            let updatedObj = {
                templename : currentTemple.templename , 
                event : dataObj
            }
            let response = await axios.post('http://localhost:7000/temple-api/save-event',updatedObj)
             if(response.status === 201){
                toast("Event Added successfully")
                // updating upcoming event in temple 
                let res = await axios.get(`http://localhost:7000/temple-api/get-events/${currentTemple.templename}`)
                if(res.status===201){
                    let sortedEvents = res.data.payload.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
                    const updatedObj = { templename:currentTemple.templename, upcomingEvent:sortedEvents[0] }
                    console.log(updatedObj)
                    dispatch(updateTemple(updatedObj)).then((updatedTemple)=>{
                        if(updatedTemple){
                          console.log('upcoming event updated succesfully')
                        }
                      }) 
                }
              }setShowEventForm(false)
        }
        catch(err){
            console.log("Error in saving event to DB",err.message)
            setShowEventForm(false)
        }
    }

    if (!showEventForm) {
        return null;
    }

    return(
        <div className="event-update-form-container">
            <form className="event-update-form" onSubmit={handleSubmit(onEventUpdate)}>
                <h3 className="form-heading">Update Upcoming Events </h3>
                <div className="form-group">
                    <label className="form-label">Event Name</label>
                    <input {...register("event_name")} type="text" className="form-control" placeholder="Name of Event" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Event Start Date</label>
                    <input {...register("event_date")} type="date" className="form-control" min={new Date().toISOString().split('T')[0]} placeholder="Date of Event Starting" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Event Duration</label>
                    <input {...register("event_duration")} type="text" className="form-control" placeholder="e.g. 3 Days or 5 Days" required />
                </div>
                <div className="form-buttons">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEventForm(false)}>Cancel</button>
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default EventUpdateForm
