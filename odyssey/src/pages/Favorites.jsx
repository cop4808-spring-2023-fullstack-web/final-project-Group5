import { BusinessCard } from "../components"
import { useState, useEffect } from "react"

export default function Favorites(props) {
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
      <div className="flex flex-col justify-center">
        <p className="m-0 text-center"></p>
        <BusinessCard bizID='' />
      </div>
    </>
  )
}