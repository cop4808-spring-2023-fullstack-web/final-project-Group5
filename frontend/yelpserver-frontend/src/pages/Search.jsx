import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = () => {

  const [businesses, setBusinesses] = useState(null)

  function searchBusinesses() {
    setBusinesses(null);

    let searchTerm = document.getElementById('bizterm').value;
    let location = document.getElementById('bizlocation').value;

    console.log(searchTerm)

    axios.get(`http://localhost:8000/search/${searchTerm}/${location}`)
    .then(res => {
      setBusinesses(res.data)
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {})
  }

  return(
    <div className="text-center m-4">
      <h2 className='text-blue-500 h2'>Search Biz's:</h2>
      <input id='bizterm' type="text" placeholder="Search by term" className='rounded-4 m-2 input text-white'></input>
      <input id='bizlocation' type="text" placeholder="Location (zip, city, etc.)" className='rounded-4 m-2 input text-white'></input>
      <div>
        <button className='btn mb-2 rounded-4' onClick={searchBusinesses}>Search</button>
      </div>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Biz Name</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {businesses && businesses.length > 0 &&
            businesses.map(business => {
              return(
                <tr key={business.record_id}>
                  <th>{business.id}</th>
                  <td>{business.name}</td>
                  <td>{business.phone}</td>
                  <td>{business.rating}</td>
                  <td>{business.price}</td>
                </tr> 
              )
            })  
          } 
        </tbody>
      </Table>
    </div>
  );
}

export default Search;