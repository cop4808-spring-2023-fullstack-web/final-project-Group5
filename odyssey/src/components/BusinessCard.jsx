import { Card } from "react-bootstrap"
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
          <div className="flex flex-row">
            <h3>{business.name}</h3>
            {business && business.hours.is_open_now &&
              <i className="m-1 mx-2 text-sm text-green-600">Open</i>
            }
            {business && !business.hours.is_open_now &&
              <i className="m-1 mx-2 text-sm text-red-600">Closed</i>
            }        
          </div>
          <div className="">
            {business && business.rating && business.rating > 0 &&
              Array.from({length: Math.floor(business.rating)}, () =>
                <i className="fa-solid fa-star" style={{color: "#d64000",}}></i>
              )
            }
            {business && (business.rating - Math.floor(business.rating)) >= 0.5 && 
              <i className="fa-solid fa-star-half" style={{color: "#d64000",}}></i>
            }
            <p className="text-xs mb-2">
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
          </div>
          {business &&
            <i className="m-0 text-gray-600">{business.location.city}, {business.location.state}</i>
          }
          <div>
            Hours:
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