import { BusinessCard } from "../components"

export default function Itinerary() {
  return(
    <>
      <h1 className='text-center m-5 text-3xl'>Your Current Itinerary</h1>
      <div>
        <div className="flex flex-col justify-center">
          <p className="m-0 text-center">Hotel Recommendation:</p>
          <BusinessCard bizID='VXLcx7inE7lsdxLA-8CZIA' />
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