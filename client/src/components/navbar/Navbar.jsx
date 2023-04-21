import React from "react";
import classes from "./navbar.module.css";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={classes.containerBox}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/" className={classes.title}>
            Fast<span className={classes.high}>x</span>Food
          </Link>
        </div>
        <div className={classes.center}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <a href="/">Home</a>
            </li>
            <li className={classes.listItem}>
              <a href="#contacts">Contacts</a>
            </li>
            <li className={classes.listItem}>
              <a href="#foods">Foods</a>
            </li>
            <li className={classes.listItem}>
              <a href="#faq">FAQ</a>
            </li>
            <li className={classes.listItem}>
              <a href="/create">Create</a>
            </li>
          </ul>
        </div>
        <div className={classes.right}>
          <AiOutlineUser className={classes.userIcon} />
          <Link to="/cart" className={classes.cartContainer}>
            <AiOutlineShoppingCart className={classes.cartIcon} />
            <div className={classes.cartQuantity}> {products.length} </div>
          </Link>
          <button onClick={handleLogout} className={classes.Logout}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
