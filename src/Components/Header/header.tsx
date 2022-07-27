import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { logout } from "../../Features/Auth/authSlice";

// eslint-disable-next-line
const Header = () => {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <>
        <AppBar position="static" className="bg-secondary" style={{ boxShadow: '2px 3px 14px grey' }}>
          <Toolbar className="d-flex justify-content-between">
            <Typography variant="h6" component="div" >
              DIARIES APP
            </Typography>
            {authenticated && (
              <Button color="inherit" onClick={() => dispatch(logout())}>
                LOGOUT
              </Button>
            )}
          </Toolbar>
        </AppBar>
    </>
  );
};

export default Header;