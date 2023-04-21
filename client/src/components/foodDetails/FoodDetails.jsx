import React, { useEffect, useState } from "react";
import classes from "./foodDetails.module.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct } from "../../redux/cartSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";

const FoodDetails = () => {
  const [foodDetails, setFoodDetails] = useState("");
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchFoodDetails = async () => {
      const res = await fetch(`http://localhost:4000/product/find/${id}`);
      const data = await res.json();
      setFoodDetails(data);
    };
    fetchFoodDetails();
  }, [id]);

  const changeQuantity = (command) => {
    if (command === "dec") {
      return setQuantity((prev) => prev - 1);
    } else if (command === "inc") {
      return setQuantity((prev) => prev + 1);
    }
  };

  const addToCart = () => {
    dispatch(addProduct({ ...foodDetails, quantity }));
  };
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <img src={`http://localhost:4000/images/${foodDetails.img}`} alt="" />
        </div>
        <div className={classes.right}>
          <h2 className={classes.title}> {foodDetails?.title} </h2>
          <div className={classes.price}>
            Price: <span>$</span> {foodDetails?.price}
          </div>
          <div className={classes.quantity}>
            <button
              disabled={quantity === 1}
              onClick={() => changeQuantity("dec")}
            >
              -
            </button>
            <span className={classes.quantityNumber}>{quantity} </span>
            <button onClick={() => changeQuantity("inc")}>+</button>
          </div>
          <div className={classes.categoryName}>
            <h3>Category:</h3>
            <span className={classes.categoryName}>
              {foodDetails?.category}
            </span>
          </div>
          <div className={classes.productDesc}>
            <div>Description: </div>
            <p> {foodDetails?.desc} </p>
          </div>
          <button onClick={addToCart} className={classes.addToCart}>
            Add To Cart <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
