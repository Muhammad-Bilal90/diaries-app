import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header';
import Home from './Components/Home/home';
import Entries from './Components/Entries/entries';
import Login from './Components/Login/login';
import Signup from './Components/Signup/signup';
import { PrivateRoutes, PublicRoute} from './Routers';

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