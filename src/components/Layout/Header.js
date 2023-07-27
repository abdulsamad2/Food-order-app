import styles from "./Header.module.css";
import React from "react";
import mealImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = (props) => {
  return (
    <>
      <nav className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton click={props.onShowCart} hide={props.hideCart} />
      </nav>

      <div className={styles["main-image"]}>
        <img src={mealImage} alt="header images" />
      </div>
    </>
  );
};

export default Header;
