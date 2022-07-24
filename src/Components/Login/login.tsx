import React, { useState, FC } from "react";
import { userLogin } from "../../Features/Auth/authSlice";
import { RootState } from "../../Store/rootReducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/index";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login: FC = () => {
  const [user, setUser] = useState<{username: string, password: string}>({
    username: "",
    password: "",
  });

  const navigateto = useNavigate();

  const { loading } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userLogin(user));
    navigateto('/');
    console.log("Logged In");
  };

  // if (authenticated) {
  //   <Navigate to="/Home" />;
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  console.log(user);

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="container d-flex justify-content-center align-items-center"
      >
        <div>
          <h2 className="font-weight-bolder p-1 mb-3 text-left">Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12  form-group">
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={handleChange}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-12  form-group">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-between form-group">
              Don't have an account? <Link to='/signup'>Sign Up.</Link>
              {loading ? (
                <button type="submit" className="btn btn-block">
                  Loading...
                </button>
              ) : (
                <Button type="submit" variant="outlined">Sign In</Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
