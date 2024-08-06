import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function Update() {

    const {id} = useParams();
    const [user, setUser] = useState([])
    useEffect(()=> {
        
        axios.get('http://localhost:8081/read/'+id)
        .then(res=> {
            console.log(res)
            setValues({...values, Name: res.data[0].Name, Email: res.data[0].Email}) ;
    })
        .catch(err => createPoolCluster.log(err))

    }, [])
    const [values, setValues] = useState({
        Name: '',
        Email: ''
    })
    const navigate = useNavigate();
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id, values)
        .then(res => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err));
    }
  return (
      <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'>
        <div className='w-75 bg-white rounded p-3' style={{ fontFamily: 'Courier, monospace' }}>
            <form onSubmit={handleUpdate}>
                <h1>Update User Details</h1>
                <div className='mb-2'>
                    <label htmlFor=''><b>Name</b></label> 
                    <input type="text" placeholder='Enter Name' className='form-control' value={values.Name} 
                    onChange={e => setValues({...values, Name: e.target.value})}/>

                </div>
                <div className='mb-2'>
                    <label htmlFor=''><b>Email</b></label> 
                    <input type="text" placeholder='Enter Email' className='form-control' value={values.Email}
                    onChange={e => setValues({...values, Email: e.target.value})}/>

                </div>
                <button className='btn btn-success'>Update</button>


            </form>
        </div>

      </div>
    )
}

export default Update