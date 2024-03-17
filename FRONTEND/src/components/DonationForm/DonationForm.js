import axios from "axios";
import React from "react";
import {useForm} from 'react-hook-form';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DonationForm(props){
    
    const {onClose , currentUser , templeDetails} = props;
    const { register, handleSubmit } = useForm();

    async function onDonation(donationObj) {
        let updatedObj = { 
            user:{username:currentUser.username,fullname:currentUser.fullname,mobileNumber:currentUser.mobileNumber},
            temple:{templename:templeDetails.templename,fullname:templeDetails.fullname,mobileNumber:templeDetails.mobileNumber},
            donation:donationObj
        };
          let response = await axios.post('http://localhost:7000/temple-api/make-donation',updatedObj)
          if(response.status===201){
            toast("Donation Succesfull")
          }else{
            console.log(response.data.payload)
          }
          onClose();

      }

    return(
    <div className="event-update-form-container">
        <form className='event-update-form' onSubmit={handleSubmit(onDonation)}>
            <h3 className="form-heading">Your Donation Details</h3>
            <div className="form-group mb-3">
              <label className='text-align-left' htmlFor="name">Amount</label>
              <input {...register("amount")} type="number" className="form-control" min='0'  placeholder="Amount" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Method of Payment</label>
              <input {...register("payment_method")} type="text" className="form-control"   placeholder="e.g. NEFT/IMPS/UPI" required />
            </div>
            <div className="form-group mb-2">
              <label className='text-align-left' htmlFor="name">Transaction ID</label>
              <input {...register("transactionId")} type="text" className="form-control"   placeholder="Transaction ID" required />
            </div>
            <div className="form-buttons">
              <button className="form-buttons-btn" type="submit">Submit</button>
              <button className="form-buttons-btn"  type="button" onClick={onClose}>Cancel</button>
            </div>
        </form>
      <ToastContainer/>
    </div>
    )
}
export default DonationForm