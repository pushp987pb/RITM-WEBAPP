import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useForm} from 'react-hook-form'
import "./TempleDetails.css"; // Import the CSS file
import { useParams, useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import ListofEvents from '../ListofEvents/ListofEvents'
import RoomBookingFrom from "../RoomBookingForm/RoomBookingFrom";
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TempleDetails() {
  const { register, handleSubmit } = useForm();

  const { id } = useParams();
  const navigate = useNavigate();
  // fetching current login user details 
  const {currentUser} = useSelector(state=>state.userLogin);
  // states.....
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [donationFrom, setDonationFrom] = useState(false);
  const [showListofEvents, setShowListofEvents] = useState(false)
  let [showAlert , setShowAlert] = useState(false);

  
  const [templeDetails, setTempleDetails] = useState(null);
  useEffect(() => {
    const fetchTempleDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/temple-api/get-temple/${id}`);
        setTempleDetails(response.data.payload);
      } catch (error) {
        console.error("Error fetching temple details", error);
      }
    };

    fetchTempleDetails();
  }, [id,templeDetails]);

  const handleBookRoomsClick = () => {
    if (Object.keys(currentUser).length === 0) {
      // User is not logged in, show alert
      setShowAlert(true);
    } else {
      // User is logged in, show booking form
      setShowBookingForm(true);
    }
  };
  function sendToLogin(){
    navigate(`/login?id=${id}`);
  }
  const handleMakeDonationClick = () => {
    if (Object.keys(currentUser).length === 0) {
      // User is not logged in, show alert
      setShowAlert(true);
    } else {
      // User is logged in, show donation form
      setDonationFrom(true);
    }
  };

  // donation function......
  async function onDonation(donationObj) {
    let updatedObj = { 
        user:{username:currentUser.username,fullname:currentUser.fullname,mobileNumber:currentUser.mobileNumber},
        temple:{templename:templeDetails.templename,fullname:templeDetails.fullname,mobileNumber:templeDetails.mobileNumber},
        donation:donationObj
    };if(currentUser.hasOwnProperty('mobileNumber')){
        toast("Donation Failed");
        toast("Update Your Profile");
    }else{
      let response = await axios.post('http://localhost:7000/temple-api/make-donation',updatedObj)
      if(response.status===201){
        toast("Donation Succesfull")
      }else{
        toast("Donation Failed")
      }
    setDonationFrom(false);}
  }
  
  

  if (!templeDetails) {
    return <p className='lead display-1 text-danger'>Loading temple details...</p>;
  }

  return (
  <div className="temple-details-container">

        <div className="temple-header">
          <h1 className="temple-name">{templeDetails.templename}</h1>
          {currentUser.username && <p className='current-user'> Username: {currentUser.username}</p>}
        </div>
        

      <div className="temple-columns">
        {/* First Column */}
          <div className="first-column">
             <div className="temple-info-row">
                <p className="temple-detail">Email: {templeDetails.email ? templeDetails.email : "Not Provided"}</p>
                <p className="temple-detail">State: {templeDetails.state  ? templeDetails.state : "Not Provided"}</p>
                <p className="temple-detail">District: {templeDetails.district  ? templeDetails.district : "Not Provided"}</p>
              </div>
            <div className="temple-image-row">
              <img className="temple-details-image"
                src={templeDetails.image ? templeDetails.image : "https://media.istockphoto.com/id/508628776/photo/sunset-over-kandariya-mahadeva-temple.webp?b=1&s=170667a&w=0&k=20&c=b8XnVpyy7hDGgHpBOpXTZ581q6Xqan0IUaGKRcgZRRM="} alt="Image of Temple" />
            </div>
            <div className="temple-about-row">
              <p className="temple-details-about"> <b>ABOUT TEMPLE</b> <br></br> {templeDetails.about ? templeDetails.about : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." }</p>
            </div>
          </div>

        {/* Second Column */}
        <div className="second-column">

          {/* Upcoming Events Card */}
          <div className="temple-details-card upcoming-events-card">
            <h3>Upcoming Events</h3>
            {templeDetails.upcomingEvent!==undefined ? (
              <>
              <p>Event Name :{templeDetails.upcomingEvent.event_name}</p>
              <p>Event Date :{templeDetails.upcomingEvent.event_date}</p>
              <p>Event Duration :{templeDetails.upcomingEvent.event_duration}</p>
              <button className="donate-button" onClick={() => setShowListofEvents(true)}>
                List of Events
              </button>
              </>
            ) : (
              <p>No upcoming events at the moment.</p>
            )}
          </div>

          {/* Stay Facilities Card */}
          <div className="temple-details-card stay-facilities-card">
            <h3>Stay Facilities</h3>
            <p>Single Bed Rooms: {templeDetails.availableRooms ? templeDetails.availableRooms.single_seater : "Not Specified"}</p>
            <p>Double Bed Rooms: {templeDetails.availableRooms ? templeDetails.availableRooms.double_seater : "Not Specified"}</p>
            <p>Triple Bed Rooms: {templeDetails.availableRooms ? templeDetails.availableRooms.triple_seater : "Not Specified"}</p>
            { templeDetails.availableRooms!== undefined && 
            <button className="book-rooms-button" onClick={handleBookRoomsClick}>
              Book Rooms
            </button> }
          </div>
          {/* Donation Card...... */}
          <div className="temple-details-card make-donations-card">
            <h3>Make Donations</h3>
            <p>
              Support the temple's development and activities. Your contribution can make a
              difference.
            </p>
            <button className="donate-button" onClick={handleMakeDonationClick}>
              Make Donation
            </button>
          </div>

        </div>

      </div>
      {/* Donation  form */}
      { donationFrom && (
        <form id='room-update-form' onSubmit={handleSubmit(onDonation)}>
          <div className="rooms-update-form">
            <h3>Donation Details</h3>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Amount</label>
              <input {...register("amount")} type="number" className="form-control" min='0'  placeholder="Amount" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Method of Payment</label>
              <input {...register("payment_method")} type="text" className="form-control"   placeholder="e.g. NEFT/IMPS/UPI" required />
            </div>
            <div className="form-buttons">
              <button className="form-buttons-btn" type="submit">Submit</button>
              <button className="form-buttons-btn"  type="button" onClick={() => setDonationFrom(false)}>Cancel</button>
            </div>
          </div>
        </form>
      )}

      {/* Alert   Box */}
      { showAlert && (
        <section className="alert-container">
          <div className="alert-box">
              <p>You need to login for Booking Rooms/Donation</p>
              <div className="alert-buttons-container">
                <button onClick={sendToLogin} className="btn btn-primary"> Login</button>
                <button onClick={() => setShowAlert(false)} className="btn btn-danger">Cancel</button>
             </div>
            </div>
        </section>
      )}

       { showBookingForm && <RoomBookingFrom currentUser={currentUser} templeDetails={templeDetails} onClose={() => setShowBookingForm(false)} /> }
       { showListofEvents && <ListofEvents templeDetails={templeDetails} onClose={() => setShowListofEvents(false)}  /> }
        <ToastContainer/>
  </div> 
  );
}

export default TempleDetails;