import React from 'react';
import './App.css';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import Home from './Components/Home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header';
import Entries from './Components/Entries/entries';
import PrivateRoutes from './Routers';

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Signup /> */}
      <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/'>
            <Route path=':id/entries/' element={<Entries />} />
            <Route path='' element={<Home />} />
          </Route>
        </Route>   
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />} />   
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;