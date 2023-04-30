import { Button } from "react-bootstrap"
import { signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../config/config";
import { useState, useEffect } from "react";

export default function Profile() {

  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuthorized(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
          window.localStorage.setItem("token", token);
        });
      } else {
        setAuthorized(false);
        setToken("");
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("token");
      }
    });
  }, []);

  const logout = async () => {
    signOut(auth).then(() => {
      setAuthorized(false);
      setToken("");
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("token");
    });
  };

  const loginGoogle = async (e) => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
      if (userCred) {
        setAuthorized(true);
        window.localStorage.setItem("auth", "true");
      }
      console.log(userCred);
    });
  };

  return (
    <>
    {authorized ? (
      <Button className="m-2" size="lg" variant="dark" onClick={logout}>
        Logout <i className="fa-solid fa-sign-out"></i>
      </Button>
    ) : (
      <Button className="m-2" size="lg" variant="dark" onClick={loginGoogle}>
        Log in <i className="fa-solid fa-user"></i>
      </Button>
    )} 
    </>
  )
}
