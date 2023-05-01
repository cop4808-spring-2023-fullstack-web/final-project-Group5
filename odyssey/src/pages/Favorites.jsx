import { BusinessCard, LoginBtn } from "../components"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth";
import axios from "axios";

export default function Favorites(props) {
  //get auth token from state
  const authToken = props.token
  const auth = getAuth();
  //useState for checking authorization status
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  
  const [favorites, setFavorites] = useState([])
  const [user, setUser] = useState(auth.currentUser)


  useEffect(() => {
    if(authToken) {
      setAuthorized(true);
    }
    setUser(auth.currentUser)

    const loadFavorites = () => {
      axios.get(`http://localhost:8000/favorites/${user.uid}`)
      .then(res => {
        setFavorites(res.data.favorites)
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {})
    }

    loadFavorites();
  }, [auth.currentUser, authToken, user.uid])

  return(
    <>
    {authorized ? (
      <div className="flex flex-col justify-center">
        {favorites && favorites.length > 0 && 
          favorites.map((biz) => (
            <BusinessCard bizID={biz} />
          ))}
      </div>
    ) : (
      <div>
        Please login to see your favorites!
        <LoginBtn />
      </div>
    )}
    </>
  )
}