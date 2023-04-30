import { BusinessCard } from "../components"
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Itinerary() {
  // get query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // get destination, startDate, endDate from query parameters
  const destination = queryParams.get("destination");
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("destination");

  // Initialize states for business id's of place categories
  const [hotelBizID, setHotelBizID] = useState("");
  const [breakfastBizID, setBreakfastBizID] = useState("");
  const [lunchBizID, setLunchBizID] = useState("");
  const [activityBizID, setActivityBizID] = useState("");
  const [dinnerBizID, setDinnerBizID] = useState("");

  useEffect(() => {
    // get Hotel from backend
    axios.get(`http://localhost:8000/search/Hotel/${destination}`)
      .then(response => {
        if (response.data.length > 0) {
          setHotelBizID(response.data[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });

    // get Breakfast from backend
    axios.get(`http://localhost:8000/search/Breakfast/${destination}`)
      .then(response => {
        if (response.data.length > 0) {
          setBreakfastBizID(response.data[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });
    
    // get Lunch from backend
    axios.get(`http://localhost:8000/search/Lunch/${destination}`)
      .then(response => {
        if (response.data.length > 0) {
          setLunchBizID(response.data[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });
    
    // get Activity from backend
    axios.get(`http://localhost:8000/search/Activity/${destination}`)
      .then(response => {
        if (response.data.length > 0) {
          setActivityBizID(response.data[0].id);
        }
      })
      .catch(error => {
        console.log(error);
      });

    // get Dinner from backend
    axios.get(`http://localhost:8000/search/Dinner/${destination}`)
    .then(response => {
      if (response.data.length > 0) {
        setDinnerBizID(response.data[0].id);
      }
    })
    .catch(error => {
      console.log(error);
    });

  }, [destination]);

  // render page with cards of recommended places
  return(
    <>
      <h1 className='text-center m-5 text-3xl'>Your Current Itinerary</h1>
      <div>
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Hotel Recommendation:</p>
          <BusinessCard bizID={hotelBizID} />
        </div>
        
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Breakfast Recommendation:</p>
          <BusinessCard bizID={breakfastBizID} />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Lunch Recommendation:</p>
          <BusinessCard bizID={lunchBizID} />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Activity Recommendation:</p>
          <BusinessCard bizID={activityBizID} />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Dinner Recommendation:</p>
          <BusinessCard bizID={dinnerBizID} />
        </div>

      </div>
    </>
  )
}