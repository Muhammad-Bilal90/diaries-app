import { Outlet } from "react-router-dom";
import Login from "./Components/Login/login";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import { RootState } from "./Store/rootReducer";

export const PrivateRoutes = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);

    return authenticated === true ? <Outlet /> : <Login />;
}

export const PublicRoute = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    return authenticated === false ? <Outlet/> : <Home />       
}