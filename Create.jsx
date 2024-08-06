import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Create() {
    const [values, setValues] = useState({
        Name: '',
        Email: ''
    })
    const navigate = useNavigate();

    
    const handleSubmit =(e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/app_users', values)
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 bg-warning justify-content-center align-items-center'>
            <div className='w-75 bg-white rounded p-3' style={{ fontFamily: 'Courier, monospace' }}>
                <form onSubmit={handleSubmit}>
                    <h1>Add User</h1>
                    <div className='mb-2'>
                        <label htmlFor=''><b>Name</b></label> 
                        <input type="text" placeholder='Enter Name' className='form-control' 
                        onChange={e => setValues({...values, Name: e.target.value})}/>

                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''><b>Email</b></label> 
                        <input type="text" placeholder='Enter Email' className='form-control' 
                        onChange={e => setValues({...values, Email: e.target.value})}/>

                    </div>
                    <button className='btn btn-success'>Submit</button>


                </form>
            </div>

        </div>
    )
}

export default Create