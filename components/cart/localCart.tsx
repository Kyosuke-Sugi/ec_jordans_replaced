import { useState, useEffect } from "react";
import CartItem from "./cartItem";
import CartTotal from "./cartTotal";
import type { Stock } from "../../types";
import Link from "next/link";
import styles from "../../styles/Cart.module.css";
import { useDispatch } from "react-redux";
import { addLocalCart } from "../features/Stocks";

const Local = () => {
  const [data, setData] = useState<[{stock_id: Stock[]}] | []>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("shoppingCart") || "{}"));
  }, []);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    dispatch(addLocalCart(localCart));  
  }, []);

  return (
    <>
      <CartItem />
      <CartTotal />
      <div
        style={{ display: data[0]?.stock_id.length ? "block" : "none" }}
        className={styles.logoutFrame}
      >
        <p style={{ color: "red", fontWeight: "bold" }}>
          購入するにはログインしてください
        </p>
        <Link href="/login/loginPage" legacyBehavior>
          <a className={styles.linkDeco}>ログインはこちら</a>
        </Link>
      </div>
    </>
  );
};

export default Local;
