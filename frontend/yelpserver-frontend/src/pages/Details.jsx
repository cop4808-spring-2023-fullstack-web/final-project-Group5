import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {

  //let [business, setBusiness] = useState([])
  let business = React.useRef(null);

  function searchBusiness() {

    let bizID = document.getElementById('bizid').value;

    axios.get(`http://localhost:8000/biz/${bizID}`)
    .then(res => {
      console.log(res.data);
      business = res.data;
      console.log(Object.keys(business).length);
      console.log(business.name)
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {})
  }  

  return(
    <div className="text-center m-4">
      <h2 className='text-blue-500 h2'>Biz Details</h2>
      <input id='bizid' type="text" placeholder="Search by ID" className='rounded-4 m-2 input text-white'></input>
      <div>
        <button className='btn mb-2 rounded-4' onClick={searchBusiness}>Search</button>
      </div>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Name/Link</th>
            <th>Photo</th>
            <th>Phone</th>
            <th>Reviews</th>
            <th>Rating</th>
            <th>Address</th>
            <th>Coords</th>
          </tr>
        </thead>
        <tbody> 
          {//#TODO: Data seems to be in 'business' but not rendering here
          }
              <tr>
                <th><a href={business.url}>{business.name}</a></th>
                <td>{business.image_url}</td>
                <td>{business.phone}</td>
                <td>{business.review_count}</td>
                <td>{business.rating}</td>
                <td>{business.location}</td>
                <td>{business.coordinates}</td>
              </tr> 
        </tbody>
      </Table>
    </div>
  )
}

export default Details;