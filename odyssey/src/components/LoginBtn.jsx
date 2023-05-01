import { Button } from "react-bootstrap"
import { signOut, signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth"

import { useState, useEffect } from "react";

export default function LoginBtn() {
  const auth = getAuth();

  const loginGoogle = async (e) => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
      if (userCred) {
        window.localStorage.setItem("auth", "true");
      }
      console.log(userCred);
    });
  };

  return (
      <Button className="m-2" size="lg" variant="dark" onClick={loginGoogle}>
        Log in <i className="fa-solid fa-user"></i>
      </Button>
  )
}
