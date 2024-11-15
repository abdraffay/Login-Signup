import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Navbar from './Component/Navbar';

import AddRole from './Pages/AddRole'
import Register from './Pages/Register';
import ErrorPage from './Pages/ErrorPage';
import List from "./Pages/List"
import UpdateRole from './Pages/UpdateRole';
import Login from './Pages/Login';


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path='/' element={<AddRole/>}/>
    <Route path='/list' element={<List/>}/>
    <Route path='/UpdateRole/:id' element={<UpdateRole/>}/>
    <Route path="/registration" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path='*' element={<ErrorPage/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App