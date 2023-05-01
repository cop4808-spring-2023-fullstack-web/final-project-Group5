import { useState, useEffect } from "react";
import { LoginBtn } from "../components";

export default function Trips(props) {
  //get auth token from state
  const authToken = props.token;
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    if (authToken) {
      setAuthorized(true);
    }
  }, [authToken, setAuthorized]);

  return (
    <>
      {authorized ? (
        <div>My Trips</div>
      ) : (
        <div>
          Please login to see your trips!
          <LoginBtn />
        </div>
      )}
    </>
  );
}
