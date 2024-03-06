import React, { useState, useEffect } from 'react';
import '../DonationList/DonationList.css'

function RoomBookingTable(props) {
    const { roomBookingArray, onClose, parent } = props;
     
    let [isUser , setIsUser] = useState(false)

    useEffect(()=>{
         setIsUser(parent.hasOwnProperty('username'));
    },[roomBookingArray, parent]);
    

    return (
     <section className='modal-dontion'>
        <div className="DonationList animate-donation-table ">
            <h2 className='table-headiing'>{isUser ? 'Your Upcoming Room Bookings ' : 'Room Booking Details'}</h2>
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th rowSpan="2">S.No</th>
                        <th rowSpan="2">{ isUser ? 'Temple Name':' Devotee Name'}</th>
                        <th colSpan="3">Room Booking Details</th>
                        <th rowSpan="2">Checkin Date</th>
                        <th rowSpan="2">Duration</th>
                        <th rowSpan="2">{ isUser ? 'Temple Phone No.':'Donar Phone No.'}</th>
                    </tr>
                    <tr>
                        <th>Single Seater</th>
                        <th>Double Seater</th>
                        <th>Triple Seater</th>
                    </tr>
                </thead>
                <tbody>
                    {roomBookingArray.map((booking, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{isUser ? booking.temple.fullname : booking.user.fullname }</td>
                            <td>{booking.bookedRooms.single_seater}</td>
                            <td>{booking.bookedRooms.double_seater}</td>
                            <td>{booking.bookedRooms.triple_seater}</td>
                            <td>{new Date(booking.checkin).toLocaleDateString()}</td>
                            <td>{booking.duration}</td>
                            <td>{isUser ? booking.temple.mobileNumber : booking.user.mobileNumber }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
     </section>
    );
}

export default RoomBookingTable;
