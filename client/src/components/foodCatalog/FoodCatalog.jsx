import React, { useEffect, useState } from "react";
import classes from "./foodCatalog.module.css";
import { Link, useLocation } from "react-router-dom";


const FoodCatalog = () => {
  const location = useLocation();
  const [filteredFoods, setFilteredFoods] = useState([]);
  const foodEndpoint = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchFoodTypes = async () => {
      const res = await fetch(
        `http://localhost:4000/product?category=${foodEndpoint}`
      );
      const data = await res.json();
      console.log(data);

      setFilteredFoods(data);
    };
    fetchFoodTypes();
  }, [foodEndpoint]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
      {filteredFoods.length !== 0 &&  <h2 className={classes.title}>
          The best {foodEndpoint} in the region!!
        </h2>}

        <div className={classes.foods}>
          {filteredFoods.length !== 0 ? filteredFoods.map((food) => (
            <Link
              to={`/food/${food._id}`}
              key={food._id}
              className={classes.food}
            >
              <div className={classes.imgContainer}>
                <img src={`http://localhost:4000/images/${food.img}`} alt="" className={classes.foodImg} />
              </div>
              <div className={classes.foodDetails}>
                <h4 className={classes.foodTitle}>{food?.title}</h4>
                <span className={classes.price}>
                  <span>$</span> {food?.price}{" "}
                </span>
              </div>
            </Link>
          )) : <h1 className={classes.noQuantity}>No {foodEndpoint} right now! </h1> }
        </div>
      </div>
    </div>
  );
};

export default FoodCatalog;
