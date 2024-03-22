import React, { useContext, useState, useEffect } from 'react';
import './TempleProfile.css';
import { TempleContext } from '../contexts/TempleContext';
import { useSelector } from 'react-redux';
import DonationList from '../DonationList/DonationList';
import RoomsUpdateForm from '../AvailableRoomsForm/AvailableRoomsForm';
import EventUpdateForm from '../EventUpdateForm/EventUpdateForm';
import RoomBookingTable from '../RoomBookingTable/RoomBookingTable';

function TempleProfile() {
  const [showDonationList, setShowDonationList] = useState(false);
  
  //state to render room booking array 
  const [showRoomBookingTable ,setShowRoomBookingTable ] = useState(false)
  const {roomBookingArray,donationArr,totalDonation} = useContext(TempleContext)

  //fetching details from redux store
  const {currentTemple} = useSelector(state=>state.templeLogin)
  // forms.....
  const [showRoomsForm, setShowRoomsForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);


  return (
    <section className="temple-profile-section">
      {/* Header Section - Name of Temple */}
      <div className="temple-header">
        <h1 className="temple-name">{ currentTemple.fullname ? currentTemple.fullname: currentTemple.templename}</h1>
      </div> 

      {/* Three Cards Section */}
      <div className="temple-cards-row">

        {/* Event card*/}
        <div className="temple-profile-card upcoming-events-card">
           <h3>Update Upcoming Event</h3>
           <p className='event-name'>Event Name: { currentTemple.hasOwnProperty('upcomingEvent') ? currentTemple.upcomingEvent.event_name : 'Not Specified' } </p>
           <p className='event-date'>Event Date: { currentTemple.hasOwnProperty('upcomingEvent') ? currentTemple.upcomingEvent.event_date : 'Not Specified' } </p>
           <p className='event-duration'>Event Duration: { currentTemple.hasOwnProperty('upcomingEvent') ? currentTemple.upcomingEvent.event_duration : 'Not Specified' } </p>
          <button onClick={() => setShowEventForm(true)} className="update-rooms-button">
            Add Events
          </button>
        </div> 

        {/* Rooms Card */}
        <div className="temple-profile-card stay-facilities-card">
          <h3>Stay Facilities</h3>
            <p>Single Seater Rooms: {currentTemple.hasOwnProperty('availableRooms') ? currentTemple.availableRooms.single_seater : "Not Specified"}</p>
            <p>Double Seater Rooms: {currentTemple.hasOwnProperty('availableRooms') ? currentTemple.availableRooms.double_seater : "Not Specified"}</p>
            <p>Triple Seater Rooms: {currentTemple.hasOwnProperty('availableRooms') ? currentTemple.availableRooms.triple_seater : "Not Specified"}</p>
           
            <button onClick={() => setShowRoomsForm(true)} className="update-rooms-button">
              Update Rooms
            </button>
            <button  onClick={() => setShowRoomBookingTable(true)} className="m-1 update-rooms-button">
              Room Book List </button>
        </div> 

        <div className="temple-profile-card home-fund-card">
          <h3>DONATION </h3>
                <p className='fs-3'>Total Donations Received:<br/>  {totalDonation} Rs</p>
                {/* Button to fetch donation table*/}
                  <button onClick={() => setShowDonationList(true)} className="update-rooms-button">
                    Donation List
                  </button>
        </div>
      </div>

      {/* Temple Details Section - Two-Column Layout */}
      <div className="temple-details-row">
        <div className="temple-details-column"> 
        <div className='temple-detail'>
          <p>Email: {currentTemple.email}</p>
          <p>Templename: {currentTemple.templename}</p>
          <p>Mobile: {currentTemple.mobileNumber}</p>
          <p>DIETY: {currentTemple.diety}</p>
          <p>State: {currentTemple.state}</p>
          <p>District: {currentTemple.district}</p></div>
        </div> 

        <div className="temple-image-column">
          <img  src={currentTemple.image ? currentTemple.image : "https://media.istockphoto.com/id/508628776/photo/sunset-over-kandariya-mahadeva-temple.webp?b=1&s=170667a&w=0&k=20&c=b8XnVpyy7hDGgHpBOpXTZ581q6Xqan0IUaGKRcgZRRM="}
             alt='Temple Image' className='temple-image' />
        </div>
      </div> 
            
        {showEventForm && <EventUpdateForm currentTemple={currentTemple} showEventForm={showEventForm} setShowEventForm={setShowEventForm}/>}
        {showRoomsForm && <RoomsUpdateForm onClose={() => setShowRoomsForm(false)}/>}
        {showDonationList && <DonationList parent={currentTemple} donations={donationArr} onClose={() => setShowDonationList(false)}  />}
        {showRoomBookingTable && <RoomBookingTable parent={currentTemple} roomBookingArray={roomBookingArray} onClose={() => setShowRoomBookingTable(false)}/>}
        
    </section>
  );
}

export default TempleProfile;