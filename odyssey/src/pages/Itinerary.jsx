import { BusinessCard, LoginBtn } from "../components";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Itinerary(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  
  const [auth, setAuth] = useState(getAuth())
  const [user, setUser] = useState(auth.currentUser)

  // get query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  
  // get destination, startDate, endDate from query parameters
  const startDate = queryParams.get("startDate");
  const endDate = queryParams.get("destination");
  
  const [destination, setDestination] = useState('' || queryParams.get("destination"))

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

    setAuth(getAuth())
    setUser(auth.currentUser)

    if(destination === ''){
      axios.get(`http://localhost:8000/user/${user.uid}`)
      .then(res => {
        if (res.data.length > 0) {
          console.log(res.data)
        }  
      })
      .catch(error => {
        console.log(error);
      });
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
      <div>
      <h1 className='text-center m-5 text-3xl'>Your Current Itinerary</h1>
      <div>
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">
            Hotel Recommendation:
            <button className="">
              <i className="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>
          </p>
          <BusinessCard bizID={hotelBizID} token={authorized}/>
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">
            Breakfast Recommendation:
            <button className="">
              <i className="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>  
          </p>
          <BusinessCard bizID={breakfastBizID} token={authorized}/>
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">
            Lunch Recommendation:
            <button className="">
              <i className="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>  
          </p>
          <BusinessCard bizID={lunchBizID} token={authorized}/>
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">
            Activity Recommendation:
            <button className="">
              <i className="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>  
          </p>
          <BusinessCard bizID={activityBizID} token={authorized}/>
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">
            Dinner Recommendation:
            <button className="">
              <i className="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>  
          </p>
          <BusinessCard bizID={dinnerBizID} token={authorized}/>
        </div>

      </div>
      </div>
    ) : (
      <div>
        Please login to see your itinerary!
        <LoginBtn />
      </div> 
    )}  
    </>
  )
}