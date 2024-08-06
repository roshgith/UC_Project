import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Create from './Create'
import View from './View'
import Update from './Update'
import Start from './Start'
import CampusDetail from './CampusDetail';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/' element={<Home />} /> 
        <Route path='/create' element={<Create />} />
        <Route path='/view/:id' element={<View />} />
        <Route path='/edit/:id' element={<Update />} />
        <Route path='/start' element={<Start />} />
        <Route path="/campus/:campusName" element={<CampusDetail />} />


        

        


      </Routes>
    </BrowserRouter>
  )
}

export default App