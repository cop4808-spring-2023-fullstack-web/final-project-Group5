import { BusinessCard, LoginBtn } from "../components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Itinerary(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  
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
    if(authToken) {
      setAuthorized(true);
    }
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
  }, [authToken, setAuthorized], [destination])

  return(
    <>
    {authorized ? (
      <div className="" >
      <div className="text-center row justify-center items-center " >
        <h1 className='text-center m-5 text-3xl h1'>Your Current Itinerary</h1>
    
        <div className="row justify-center">
          <div className="col">
            <p className="m-0 text-center">Hotel Recommendation:</p>
            <BusinessCard bizID={hotelBizID} token={authorized}/>
          </div>
        </div>
    
        <div className="row justify-center">
          <div className="col">
            <p className="m-0 text-center">Breakfast Recommendation:</p>
            <BusinessCard bizID={breakfastBizID} token={authorized}/>
          </div>
        </div>
    
        <div className="row justify-center">
          <div className="col">
            <p className="m-0 text-center">Lunch Recommendation:</p>
            <BusinessCard bizID={lunchBizID} token={authorized}/>
          </div>
        </div>
    
        <div className="row justify-center">
          <div className="col">
            <p className="m-0 text-center">Activity Recommendation:</p>
            <BusinessCard bizID={activityBizID} token={authorized}/>
          </div>
        </div>
    
        <div className="row justify-center">
          <div className="col">
            <p className="m-0 text-center">Dinner Recommendation:</p>
            <BusinessCard bizID={dinnerBizID} token={authorized}/>
          </div>
        </div>
      </div>
    </div>
    ) : (
      <div className="" style={{backgroundImage: "url('../images/rainbow-hills.jpg')", backgroundSize: "cover", backgroundPosition: "center"}}>
          <div className="text-center h-screen flex flex-col justify-center items-center ">
            <h1 className="text-3xl font-bold mb-5">Please Login to start your journey</h1>
            <div className=" p-5 ">
              <LoginBtn />
            </div>
          </div>
        </div>
    )}  
    </>
  )
}