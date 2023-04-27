import { Card, Button } from "react-bootstrap"
import { useEffect, useState,  } from "react"
import axios from 'axios';

export default function BusinessCard(props) {

  const [business, setBusiness] = useState('')

  useEffect(() => {
    function loadData() {
      axios.get(`http://localhost:8000/biz/${props.bizID}`)
      .then(res => {
        setBusiness(res.data);
      })
      .catch(err => {
        console.log(err)
      })
      .then(() => {})
    }

    loadData();
  }, [props.bizID])

  return(
    <>
      <div className="flex justify-center m-5">
        <Card className="p-4 w-[600px]">
          <h3>{business.name}</h3>
          <div className="">
            {business.rating && business.rating > 0 &&
              Array.from({length: Math.floor(business.rating)}, () =>
                <i className="fa-solid fa-star" style={{color: "#d64000",}}></i>
              )
            }
            {(business.rating - Math.floor(business.rating)) >= 0.5 && 
               <i className="fa-solid fa-star-half" style={{color: "#d64000",}}></i>
            }
            <p className="text-xs">
              ({business.rating})
              ({business.review_count} reviews)
            </p>
          </div>
          <div className="flex flex-row">
            {business.price && business.price.length > 0 &&
              Array.from({length: business.price.length}, () =>
                <i className="fa-solid fa-dollar-sign py-1" style={{color: "#1fd14c",}}></i>
              ) 
            }
            <p className="mx-4">{business.location.city}, {business.location.state}</p>
          </div>

          <div className="absolute bottom-0 right-0 m-2">
            <button >
              <i class="m-1 fa-solid fa-arrows-rotate" style={{color: '#3fc6f3',}}></i>
            </button>
            New Recommendation
          </div>
        </Card>
      </div>
    </>
  )
}