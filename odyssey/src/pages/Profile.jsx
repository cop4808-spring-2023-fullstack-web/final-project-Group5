import { Button } from "react-bootstrap"
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../config/config";
import { useState, useEffect } from "react";
import { LoginBtn } from "../components";

export default function Profile() {

  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuthorized(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          window.localStorage.setItem("token", token);
        });
      } else {
        setAuthorized(false);
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("token");
      }
    });
  }, []);

  const logout = async () => {
    signOut(auth).then(() => {
      setAuthorized(false);
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("token");
    });
  };

  return (
    <>
    {authorized ? (
      <Button className="m-2" size="lg" variant="dark" onClick={logout}>
        Logout <i className="fa-solid fa-sign-out"></i>
      </Button>
    ) : (
      <LoginBtn />
    )} 
    </>
  )
}
