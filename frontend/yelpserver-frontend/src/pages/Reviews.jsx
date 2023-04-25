import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reviews = () => {

  let [reviews, setReviews] = useState('')

  function searchReviews() {

    let bizID = document.getElementById('bizid').value;

    axios.get(`http://localhost:8000/biz/${bizID}/reviews`)
    .then(res => {
      console.log(res.data);
      setReviews(res.data.reviews);
      console.log(reviews);
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {})
  }  

  return(
    <div className="text-center m-4">
      <h2 className='text-blue-500 h2'>Biz Reviews</h2>
      <input id='bizid' type="text" placeholder="Search by ID" className='rounded-4 m-2 input text-white'></input>
      <div>
        <button className='btn mb-2 rounded-4' onClick={searchReviews}>Search</button>
      </div>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
            <th>Rating</th>
            <th>Created</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody> 
          {reviews && reviews.length > 0 &&
            reviews.map(review => {
              return(
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.text}</td>
                  <td>{review.rating}</td>
                  <td>{review.time_created}</td>
                  <td align='center' className='place-content-center'>
                    <div className='rounded-full w-[150px]'>
                      <img className='rounded-full' src={review.user.image_url} alt="User-profile-image"/>
                    </div>{review.user.name}
                  </td>
                </tr>
              )
            })}
        </tbody>
      </Table>
    </div>
  )
}

export default Reviews;