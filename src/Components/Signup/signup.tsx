import React, { useState, FC } from "react";
import { userSignup } from "../../Features/Auth/authSlice";
import { RootState } from "../../Store/rootReducer";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Store/index";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Signup: FC = () => {
  const [user, setUser] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(userSignup(user));
  };

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
          <h2
            className="font-weight-bolder p-1 mb-3 text-left"
          >
            Sign Up
          </h2>
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
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  placeholder="Email"
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
              <Link to="/login">Already have an account? Sign In.</Link>
              {loading ? 
                <Button type="submit" className="btn btn-block">
                  Loading...
                </Button>
                : 
                <Button type='submit' variant="outlined">Sign Up</Button>
              }
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;