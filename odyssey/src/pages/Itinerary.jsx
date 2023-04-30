import { BusinessCard } from "../components"
import { useState, useEffect } from "react"

export default function Itinerary(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    if(authToken) {
      setAuthorized(true);
    }
  }, [authToken, setAuthorized])

  return(
    <>
      <h1 className='text-center m-5 text-3xl'>Your Current Itinerary</h1>
      <div>
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Hotel Recommendation:</p>
          <BusinessCard bizID='VXLcx7inE7lsdxLA-8CZIA' token={authorized}/>
        </div>
        
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Breakfast Recommendation:</p>
          <BusinessCard bizID='' />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Lunch Recommendation:</p>
          <BusinessCard bizID='' />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Activity Recommendation:</p>
          <BusinessCard bizID='' />
        </div>

        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Dinner Recommendation:</p>
          <BusinessCard bizID='' />
        </div>

      </div>
    </>
  )
}