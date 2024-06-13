import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const [data, setData] = useState([])
  useEffect(()=> {
    fetch('http://localhost:8081/user_info')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))

  }, [])
  return (
    <div style ={{padding: "50px"}}>

      <table>
        <thead>
          <th>Age</th>
          <th>Zipcode</th>
        </thead>
        <tbody>
          {data.map((d,i) => (
            <tr key={i}>
              <td>{d.Age}</td>
              <td>{d.Zipcode}</td>
            </tr>
          ))}
        </tbody>

      </table>


    </div>
  )
}

export default App