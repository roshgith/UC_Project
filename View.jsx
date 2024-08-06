import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Read() {
    const {id} = useParams();
    const [user, setUser] = useState([])
    useEffect(()=> {
        axios.get('http://localhost:8081/read/'+id)
        .then(res=> {
            console.log(res)
            setUser(res.data[0]);
    })
        .catch(err => createPoolCluster.log(err))

    }, [])
    return (
      <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'> 
        <div className='w-75 bg-white rounded p-3' style={{ fontFamily: 'Courier, monospace' }}> 
            <div className='p-2'>
            <h1>User Details </h1>
            <h2>{user.ID}</h2>   
            <h2>{user.Name}</h2>
            <h2>{user.Email}</h2>     
            </div>
            <Link to="/" className='btn btn-primary me-2'>Back</Link>
            &nbsp; 
            <Link to={`/edit/${user.ID}`} className='btn btn-info'>Edit</Link>    
            
        </div>
      </div>
    )
}
export default Read