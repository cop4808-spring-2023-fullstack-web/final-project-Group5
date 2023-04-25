import Table from 'react-bootstrap/Table';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Auto = () => {

  let [results, setResults] = useState('')

  function searchAuto() {

    let searchTerm = document.getElementById('search').value;

    axios.get(`http://localhost:8000/auto/${searchTerm}`)
    .then(res => {
      console.log(res.data);
      setResults(res.data);
      console.log(Object.keys(results).length);
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {})
  }  

  return(
    <div className="text-center m-4">
      <h2 className='text-blue-500 h2'>Autocomplete</h2>
      <input id='search' type="text" placeholder="Search text" className='rounded-4 m-2 input text-white'></input>
      <div>
        <button className='btn mb-2 rounded-4' onClick={searchAuto}>Search</button>
      </div>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>Categories</th>
            <th>Businesses</th>
            <th>Terms</th>
          </tr>
        </thead>
        <tbody> 
          {Object.keys(results).length > 0 &&
              <tr>
                <td className='w-1/3'>
                  {results.categories.map(category => {
                    return(
                      <div className='bg-dark m-2'>{category.title}</div>
                    )
                  })}
                </td>
                <td className='w-1/3'>
                  {results.businesses.map(business => {
                    return(
                      <div className='bg-dark m-2'>{business.name}</div>
                    )
                  })}
                </td>
                <td className='w-1/3'>
                  {results.terms.map(term => {
                    return(
                      <div className='bg-dark m-2'>{term.text}</div>
                    )
                  })} 
                </td>
              </tr>
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Auto;