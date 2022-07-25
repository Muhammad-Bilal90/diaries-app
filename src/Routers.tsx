import { Navigate, Outlet } from "react-router-dom";
import Login from "./Components/Login/login";
import { useSelector } from "react-redux";
import { RootState } from "./Store/rootReducer";

export const PrivateRoutes = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);

    return authenticated === true ? <Outlet /> : <Login />;
}

export const PublicRoute = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    return authenticated === false ? <Outlet/> : <Navigate to='/'/>       
}