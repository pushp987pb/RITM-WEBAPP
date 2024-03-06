import React, { useState } from 'react';
import './DonationList.css';
import { useEffect} from 'react';

function DonationList(props) {
    const { donations, onClose, parent } = props;
     
    let [isUser , setIsUser] = useState(false)
    let [totalDonation,setTotalDonation] = useState(0);
    useEffect(()=>{
        setTotalDonation(donations.reduce((total, donation) => total + donation.donation.amount, 0));
         setIsUser(parent.hasOwnProperty('username'));
    },[donations, parent]);
    

    return (
     <section className='modal-dontion'>
        <div className="DonationList animate-donation-table ">
            <h2 className='text-center'>{isUser ? 'Your Donation Details' : 'Received Donation Details'}</h2>
            <table className="table table-striped text-center">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>{ isUser ? 'Temple Name':'Donar Name'}</th><th>Amount</th><th>Payment Method</th>
                        <th>{ isUser ? 'Temple Phone No.':'Donar Phone No.'}</th><th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.map((donation, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{isUser ? donation.temple.fullname :donation.user.fullname }</td>
                            <td>{donation.donation.amount}</td>
                            <td>{donation.donation.payment_method}</td>
                            <td>{isUser ? donation.temple.mobileNumber :donation.user.mobileNumber }</td>
                            <td>{new Date(donation.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>d
            </table>
            <h3 className='text-center'> {isUser ? 'Total Donated Amound':'Total Donation Received'}: {totalDonation}</h3>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
     </section>
    );
}

export default DonationList;
