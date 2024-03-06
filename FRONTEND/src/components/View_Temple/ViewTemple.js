import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewTemple.css"; // Import the CSS file

function ViewTemple() {
  const [templeList, setTempleList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/temple-api/get-temples");
        setTempleList(response.data.payload);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    };
    fetchData();
  }, []); // Empty array ensures the effect runs once when the component is loaded

  return (
    <div className="temple-container">
      {templeList.map((temple, index) => (
        <div key={index} className="temple-card">
          <img
            className="temple-card-image"
            src={temple.image ? temple.image : "https://media.istockphoto.com/id/508628776/photo/sunset-over-kandariya-mahadeva-temple.webp?b=1&s=170667a&w=0&k=20&c=b8XnVpyy7hDGgHpBOpXTZ581q6Xqan0IUaGKRcgZRRM="}
            alt={`Image of ${temple.fullname}`}
          />
          <div className="temple-card-details">
            <h5 className="temple-card-title">{ temple.fullname ? temple.fullname: temple.templename}</h5>
            <h6 className="temple-card-subtitle">{ temple.email ? temple.email : "Not Provided"}</h6>
            <p className="temple-card-text">State - {temple.state ? temple.state : "Not Provided"}</p>
            <p className="temple-card-text">District - {temple.district ? temple.district : "Not Provided"}</p>
            <Link to={`/temple-details/${temple._id}`} className="temple-card-link">
              Know More...
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewTemple;