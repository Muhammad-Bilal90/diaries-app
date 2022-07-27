import './App.css';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header';
import Entries from './Components/Entries/entries';
import { PrivateRoutes, PublicRoute} from './Routers';
import Home from './Components/Home/Home';

function App() {


  return (
    <>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/' element={<Home />}/>
                <Route path="/:id/entries" element={<Entries />} />
        </Route>
        <Route element={<PublicRoute />}>   
            <Route path='/signup' element={<Signup />}/>
            <Route path='/login' element={<Login />} />
        </Route>    
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;