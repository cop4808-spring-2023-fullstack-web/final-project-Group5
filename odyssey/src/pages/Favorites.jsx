import { BusinessCard, LoginBtn } from "../components";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Favorites(props) {
  //get auth token from state
  const authToken = props.token;

  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [auth, setAuth] = useState(getAuth());

  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    if (authToken) {
      setAuthorized(true);
    }
    setAuth(getAuth());
    setUser(auth.currentUser);

    const loadFavorites = () => {
      axios
        .get(`/user/${user.uid}`)
        .then((res) => {
          setFavorites(res.data.favorites);
        })
        .catch((err) => {
          console.log(err);
        })
        .then(() => {});
    };

    if (authorized) {
      loadFavorites();
    }
  }, [auth.currentUser, authToken, authorized]);

  return (
    <>
      {authorized ? (
        <div className="flex flex-col justify-center">
          <h1 className="m-3 text-center">Your favorite businesses!</h1>
          {favorites &&
            favorites.length > 0 &&
            favorites.map((biz) => <BusinessCard bizID={biz} />)}
        </div>
      ) : (
        <div>
          Please login to see your favorites!
          <LoginBtn />
        </div>
      )}
    </>
  );
}
