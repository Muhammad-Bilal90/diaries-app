import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./Store/rootReducer";

export const PrivateRoutes = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);

    return authenticated === true ? <Outlet /> : <Navigate to="/login" />;
}

export const PublicRoute = () => {

    const { authenticated } = useSelector((state: RootState) => state.auth);
    
    return authenticated === false ? <Outlet/> : <Navigate to="/" />       
}