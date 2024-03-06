import React, { useState , useContext , useEffect} from "react";
import { TempleContext } from '../contexts/TempleContext';
import axios from "axios";
import './ListofEvents.css'

function ListofEvents(props){
    const {onClose,templeDetails} = props;
    let [listofEvents , setListofEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            let res = await axios.get(`http://localhost:7000/temple-api/get-events/${templeDetails.templename}`)
            if(res.status===201){
                let sortedEvents = res.data.payload.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
                setListofEvents(sortedEvents);
            }
        }
        fetchEvents();
    },[templeDetails]);

    return(
        <section className='modal-listofEvents'>
            <div className="listofevents">
                <h2 className="mb-4">List of Upcoming Events in {templeDetails.fullname||templeDetails.templename}</h2>
                    <div className="event-box-container">
                        {listofEvents.map((event, index) => (
                            <div key={index} className="temple-card">
                                <div className="temple-card-details">
                                <h3 className="temple-card-title"> Event : {event.event_name}  </h3>
                                <h4 className="temple-card-title"> Date : {event.event_date}  </h4>
                                <h4 className="temple-card-title"> Duration : {event.event_duration}  </h4>
                                </div>
                            </div>
                        ))}
                    </div>
               <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </section>
    )
}
export default ListofEvents
