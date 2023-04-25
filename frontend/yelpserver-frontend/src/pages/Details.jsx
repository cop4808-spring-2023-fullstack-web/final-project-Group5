import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {

  let [business, setBusiness] = useState('')

  function searchBusiness() {

    let bizID = document.getElementById('bizid').value;

    axios.get(`http://localhost:8000/biz/${bizID}`)
    .then(res => {
      console.log(res.data);
      setBusiness(res.data)
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
            <th className='w-[150px]'>Photo</th>
            <th>Phone</th>
            <th>Reviews</th>
            <th>Rating</th>
            <th>Address</th>
            <th>Coords</th>
          </tr>
        </thead>
        <tbody> 
            <tr className='h-[200px]'>
              <th className='w-[150px]'>{business.name}</th>
              <td className='w-[250px]'><img src={business.image_url} alt="Business Photo"/></td>
              <td className='w-[100px]'>{business.phone}</td>
              <td className='w-[100px]'>{business.review_count}</td>
              <td className='w-[100px]'>{business.rating}</td>
              <td className='w-[250px]'>{business.location.address1}</td>
              <td className='w-[200px]'>
                Latitude: {business.coordinates.latitude}<br></br>
                Longitude: {business.coordinates.longitude}
              </td>
            </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Details;