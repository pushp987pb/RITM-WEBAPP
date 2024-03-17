import { useState , useEffect } from "react";
import {TempleContext} from './TempleContext'
import { useSelector } from "react-redux";
import axios from "axios";


function TempleContextProvider({ children }) {
  let {currentUser} = useSelector(state=>state.userLogin)
  let {currentTemple} = useSelector(state=>state.templeLogin)
  // states......
  let [isTemple, setIsTemple] = useState(false);
  const [roomBookingArray, setRoomBookingArray] = useState([]);
  let [upcomingBooking , setUpcomingBooking] = useState(null);

  // room booking array......
  const [roomBookingArrayfortemple, setRoomBookingArrayfortemple] = useState([]);

  let [reRender , setRerender] = useState(false);
  useEffect(()=>{
    setIsTemple(sessionStorage.getItem('isTemple'));
  },[]);

   // fetching room booking details for user
   useEffect(() => {
    const fetchRoomBooking = async () => {
      let response = await axios.get(`http://localhost:7000/user-api/get-room-booking/${currentUser.username}`);
        if(response.status === 201){
          setRoomBookingArray(response.data.roomBookingArray);
          setUpcomingBooking(response.data.upcomingBooking);
          setRerender(true);
        }
    };
    fetchRoomBooking();
  }, [reRender]);

      // // fetching room booking table for temple profile
      useEffect(() => {
        const fetchRoomBookingArray = async () => {
          let res = await axios.get(`http://localhost:7000/temple-api/get-room-booking/${currentTemple.templename}`);
          setRoomBookingArrayfortemple(res.data.roomBookingArray);
          setRerender(true);
        };
      
        fetchRoomBookingArray();
      }, [reRender]);

  return (
    <TempleContext.Provider value={ {isTemple,setIsTemple,roomBookingArray,upcomingBooking , roomBookingArrayfortemple
    } }>

      {children}
    </TempleContext.Provider>
  );
}

export default TempleContextProvider;
