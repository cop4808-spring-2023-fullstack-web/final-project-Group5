import { BusinessCard } from "../components"

export default function Itinerary() {
  return(
    <>
      <h1 className='text-center m-5 text-3xl'>Your Current Itinerary</h1>
      <div>
        <BusinessCard bizID='VXLcx7inE7lsdxLA-8CZIA' />
        <BusinessCard bizID='gb3cOCmPVSlVfxde1wJsRA' />
      </div>
    </>
  )
}