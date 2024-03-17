import { useState , useEffect } from "react";
import axios from 'axios';
import {TempleContext} from './TempleContext'
import { useSelector } from "react-redux";

function TempleContextProvider({ children }) {

  let [isTemple, setIsTemple] = useState(false);
  let [hideEditProfile,setHideEditProfile] = useState(false)
  // states for donation table
  let [totalDonation , setTotalDonation] = useState(0);
  const [donationArr, setDonationArr] = useState([]);
    useEffect(()=>{
      setIsTemple(sessionStorage.getItem('isTemple'));
    },[]);

  const [roomBookingArray, setRoomBookingArray] = useState([]);
  
 // current login temple
  const {currentTemple , templeLoginStatus} = useSelector(state=>state.templeLogin)


  // fetching room booking table
  useEffect(() => {
    const fetchRoomBookingArray = async () => {
      let res = await axios.get(`http://localhost:7000/temple-api/get-room-booking/${currentTemple.templename}`);
      setRoomBookingArray(res.data.roomBookingArray);
    };
  
    fetchRoomBookingArray();
  },[templeLoginStatus]);

    // fetching dontion details
    useEffect(() => {
      const fetchDonation = async () => {
        let response = await axios.get(`http://localhost:7000/temple-api/get-donation/${currentTemple.templename}`);
          if(response.status === 201){
            setTotalDonation(response.data.totalDonation);
            setDonationArr(response.data.donationArr);
          }
      };
      fetchDonation();
    }, [templeLoginStatus]);

  

  return (
    <TempleContext.Provider value={ {isTemple,setIsTemple,roomBookingArray ,totalDonation,donationArr,
       hideEditProfile , setHideEditProfile
    } }>

      {children}
    </TempleContext.Provider>
  );
}

export default TempleContextProvider;