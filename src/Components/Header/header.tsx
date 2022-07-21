import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store";
import { RootState } from "../../Store/rootReducer";
import { logout } from "../../Features/Auth/authSlice";
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
      {/* <AppBar position="static" className="d-flex justify-content-between">
        <h4>Diaries App</h4>
        {authenticated && (
          <Button color="inherit" onClick={() => dispatch(logout())}>
            LOGOUT
          </Button>
        )}
        <p>ME</p>
      </AppBar> */}
    </>
  );
};

export default Header;

// export default function ButtonAppBar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             News
//           </Typography>
//           <Button color="inherit">Login</Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
