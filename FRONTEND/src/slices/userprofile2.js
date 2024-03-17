import {useState ,useEffect, useContext} from 'react'
import './UserProfile.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DonationList from '../DonationList/DonationList';
import RoomBookingTable from '../RoomBookingTable/RoomBookingTable';
import { TempleContext } from '../contexts/TempleContext';

function UserProfile() {
  const {currentUser} = useSelector(state => state.userLogin)
  let {upcomingBooking,roomBookingArray} = useContext(TempleContext)
  let [reRender , setRerender] = useState(false);

  // states to handle room booking 
  const [showRoomBookingTable ,setShowRoomBookingTable ] = useState(false)

  // states to hanlde donation
  let [totalDonation , setTotalDonation] = useState(0);
  const [donationArr, setDonationArr] = useState([]);
  const [showDonationList, setShowDonationList] = useState(false);

  

  // fetching dontion details
  useEffect(() => {
    const fetchDonation = async () => {
      let response = await axios.get(`http://localhost:7000/user-api/get-donation/${currentUser.username}`);
        if(response.status === 201){
          setTotalDonation(response.data.totalDonation);
          setDonationArr(response.data.donationArr);
          setRerender(true)
        }
    };
    fetchDonation();
  }, [reRender]);

  if (!currentUser) {
    return <div className="display-4 mt-5 text-center text-danger">Loading...</div>; // or return some loading state
  }
  

  return (
    <section className="user-profile-section">
      <header className='user-profile-header'>
        <h3>Welcome <br></br>{currentUser.fullname ? currentUser.fullname : 'Mr. Anonymous' }</h3>
        <div className='user-profile-img'>
              <img src={currentUser.image ? currentUser.image : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.1.1801501137.1706076229&semt=ais'}
                alt="Profile"/> 
        </div>
      </header>
      <div className='user-profile-about'>
         <h3>About</h3>
         <div className='user-profile-about-details'>
            <p>Username: {currentUser.username ? currentUser.username : 'Not Specified' }</p>
            <p>Gender : {currentUser.gender ? currentUser.gender : 'Not Specified' }</p>
            <p>Mobile : {currentUser.mobileNumber ? currentUser.mobileNumber: 'Not Specified' }</p>
            <p>DOB : {currentUser.dob ? currentUser.dob : 'Not Specified' }</p>
            <p>Email : {currentUser.email ? currentUser.email : 'Not Specified' }</p>
          </div>
      </div>
      <div className='user-profile-cards'>
        <div className='user-profile-card'>
          <h5>Your Upcoming Room Bookings</h5>
           { upcomingBooking!==null ? (
              <>
                <p className='mb-0'>Single Seater: {upcomingBooking.bookedRooms.single_seater}</p>
                <p className='mb-0'>Double Seater: {upcomingBooking.bookedRooms.double_seater}</p>
                <p className='mb-0'>Triple Seater: {upcomingBooking.bookedRooms.triple_seater}</p>
                <p className='text-center my-1'>At {upcomingBooking.temple.hasOwnProperty('fullname')?upcomingBooking.temple.fullname:upcomingBooking.temple.templename}</p>
                <button onClick={() => setShowRoomBookingTable(true)} className="dontion-list-button">
                  All Room Bookings
                </button>
              </>
            ) : (
              <p>No Record Found</p>
            )}
        </div>
        <div className='user-profile-card'>
            <h5>Donation Details</h5>
              { totalDonation !==0 ? (
              <>
              <p className='fs-3'>You have donated:<br/>  {totalDonation} Rs</p>
                {/* Button to fetch donation table*/}
                <button onClick={() => setShowDonationList(true)} className="dontion-list-button">
                  Donation List
                </button></>
               ) : (
                  <p>No Record Found</p>
              )}
        </div>
      </div>
      {showDonationList && <DonationList parent={currentUser} donations={donationArr} onClose={() => setShowDonationList(false)}  />}
      {showRoomBookingTable && <RoomBookingTable parent={currentUser} roomBookingArray={roomBookingArray} onClose={() => setShowRoomBookingTable(false)}/>}
                
    </section>
  );
}

export default UserProfile;
