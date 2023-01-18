import { useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import { useCookie } from "../useCookie";
import type { Stock, ShoppingCart } from "../../types";
import styles from "../../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addLocalCart, deleteLocalCart } from "../features/Stocks";
import Router from "next/router";

const CartItem = () => {
  
  const cart = useSelector((state:any) => state.stock.localCart[0]);
  const dispatch = useDispatch();

  const handleDelete = (cart: any, id: number) => {
    const deleted = cart.stock_id.filter((item: Stock) => item.id !== id);
    dispatch(deleteLocalCart([{stock_id: deleted}]));
    localStorage.setItem("shoppingCart", JSON.stringify([{stock_id: deleted}]));
  };


  const noItem = <p>カートの中身はありません</p>;

  const cartList = (
    <ul className={styles.cart_ul}>
      {cart?.stock_id.map((content: any) => (
        <li className={styles.cart_li} key={content.id}>
          <div>
            <div>
              <Image
                src={`/${content.image1}`}
                width={200}
                height={200}
                alt={content.items.name}
                priority
              />
            </div>
            <ul className={styles.cart_ul}>
              <li className={styles.cart_li}>商品名　{content.items.name}</li>
              <li className={styles.cart_li}>
                ¥ {content.price.toLocaleString()}（税込）
              </li>
              <li className={styles.cart_quantity}>
                <label htmlFor="count" className={styles.cart_count_label}>
                  個数
                </label>
                <select id="count">
                  <option value="1">1</option>
                </select>
                <Image
                  className={styles.btn}
                  src="/images/trashbox.png"
                  alt="削除ボタン"
                  width={30}
                  height={30}
                  onClick={() => handleDelete(cart, content.id)}
                />
              </li>
            </ul>
            <hr />
          </div>
        </li>
      ))}
    </ul>
  );

  return <div>{cart?.stock_id.length ? cartList : noItem}</div>;
};

export default CartItem;
