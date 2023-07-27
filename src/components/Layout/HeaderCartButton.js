import React, { useContext } from "react";
import CartIcon from "./CartIcon";
import styles from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-contenxt";
const HeaderCartButton = (props) => {
  const { items } = useContext(CartContext);
  return (
    <button className={styles.button} onClick={props.click}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{items.length}</span>
    </button>
  );
};

export default HeaderCartButton;
