import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./Store/rootReducer";
import Login from "./Components/Login/login";

const PrivateRoutes = () => {
    const { authenticated } = useSelector((state: RootState) => state.auth);

    return authenticated ? <Outlet /> : <Login />;
}

export default PrivateRoutes;