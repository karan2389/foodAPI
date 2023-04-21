import React, { useState } from "react";
import classes from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import img from "../../assets/family.jpg"; 
import { login } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        dispatch(login(data));
        setRedirect(true);
      } else {
        alert("login failed");
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  if (redirect) {
    return navigate("/");
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginWrapper}>
        <div className={classes.loginLeftSide}>
          <img src={img} alt="" className={classes.leftImg} />
        </div>
        <div className={classes.loginRightSide}>
          <h2 className={classes.title}>Login</h2>
          <form onSubmit={handleLogin} className={classes.loginForm}>
            <input
              type="email"
              placeholder="Type E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Type Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={classes.submitBtn}>Login</button>
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>{" "}
            </p>
          </form>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials! Try again...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
