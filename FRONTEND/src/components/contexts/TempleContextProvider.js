import { useState , useEffect } from "react";
import axios from 'axios';
import {compareSync} from 'bcryptjs'
import {TempleContext} from './TempleContext'
import { useSelector } from "react-redux";

function TempleContextProvider({ children }) {

  let [isTemple, setIsTemple] = useState(false);

  const [roomBookingArray, setRoomBookingArray] = useState([]);
  
 // current login temple
  const {currentTemple} = useSelector(state=>state.templeLogin)


  // fetching room booking table
  useEffect(() => {
    const fetchRoomBookingArray = async () => {
      let res = await axios.get(`http://localhost:7000/temple-api/get-room-booking/${currentTemple.templename}`);
      setRoomBookingArray(res.data.roomBookingArray);
    };
  
    fetchRoomBookingArray();
  }, [roomBookingArray]);

  

  return (
    <TempleContext.Provider value={ {isTemple,setIsTemple,roomBookingArray} }>

      {children}
    </TempleContext.Provider>
  );
}

export default TempleContextProvider;
