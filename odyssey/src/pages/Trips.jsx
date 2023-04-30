import { useState } from "react"

export default function Explore(props) {
  //get auth token from state
  const authToken = props.token
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(props.token)

  return(
    <>
    </>
  )
}