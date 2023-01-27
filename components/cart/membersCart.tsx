import { useEffect } from "react";
import { useCookie } from "../useCookie";
import CartTotalMember from "./cartTotal_member";
import Router from "next/router";
import type { Stock, ShoppingCart, CartState } from "../../types";
import styles from "../../styles/Cart.module.css";
import CartItem_members from "./cartItem_member";
import { useDispatch, useSelector } from "react-redux";
import { addLocalCart, getCart } from "../features/Stocks";

const Members = () => {
  const userID = useCookie();

  // Redux storeの中のstateにカートの中身を格納

  const dispatch = useDispatch();

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    dispatch(getCart(userID));
    dispatch(addLocalCart(localCart));  
  }, [userID])

  // state(カートの中身)を取得
  const cart = useSelector((state: {stock: CartState}) => state.stock.cart);
  const localData = useSelector((state: {stock: CartState}) => state.stock.localCart);

  // ログイン前のカート内商品をログイン後のカートに移動
  const handleCombine = (cart: ShoppingCart[]) => {
    for (const localItem of localData[0]?.stock_id) {
      if (
        cart?.some((serverItem: {stock_id: any}) => serverItem.stock_id === localItem.id)
      ) {
        continue;
      }
      fetch(`/api/getCart/${localItem.id}`, {
        method: "POST",
      }).then((res) => {
        dispatch(getCart(userID));
      });
    }
    localStorage.clear();
    const localCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    dispatch(addLocalCart(localCart));
  };

  const handleClick = () => {
    return Router.push("/settlement");
  };

  // ログイン前のカート内商品をログイン後のカートに移動したくない場合
  const rejectCombine = () => {
    localStorage.clear();
    const localCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    dispatch(addLocalCart(localCart));
  };

  return (
    <>
      <div
        className={styles.attention}
        style={{
          display: localData[0]?.stock_id.length ? "block" : "none",
        }}
      >
        <div className={styles.frame}>
          <div className={styles.frame_title}>注意！</div>
          <p>
            ログイン前のカートに商品があります。
            <br /> 現在のアカウントのカートにその商品を移動しますか？
          </p>
          <ul>
            {localData[0]?.stock_id.map((cartItem: Stock) => {
              <li>{cartItem?.items.name}</li>;
            })}
          </ul>
          <button
            className={styles.yes_btn}
            onClick={() => handleCombine(cart)}
          >
            はい
          </button>
          <button className={styles.no_btn} onClick={() => rejectCombine()}>
            いいえ
          </button>
        </div>
      </div>
      <CartItem_members />
      <CartTotalMember />
      <div style={{ display: cart?.length ? "block" : "none" }}>
        <input
          type="button"
          className="idbutton"
          onClick={handleClick}
          value="購入手続きへ"
        />
      </div>
    </>
  );
};

export default Members;
