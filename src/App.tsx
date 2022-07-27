import './App.css';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import Home from './Components/Home/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header';
import Entries from './Components/Entries/entries';
import { PrivateRoutes, PublicRoute} from './Routers';


function App() {


  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/:id/entries/' element={<Entries />} />
            <Route path='/' element={<Home />} />
        </Route>
        <Route element={<PublicRoute />}>   
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />}/>
        </Route>    
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;