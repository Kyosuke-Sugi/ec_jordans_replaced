import Link from "next/link";
import Members from "../../components/cart/membersCart";
import Local from "../../components/cart/localCart";
import { useCookie } from "../../components/useCookie";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../../styles/Cart.module.css";
import PageTop from "../../components/pageTop";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import stocksReducer from "../../components/features/Stocks";

const cartStocks = configureStore({
  reducer: {  
    stock: stocksReducer
  }
})

const ShoppingCart = () => {
  const userID = useCookie();

  return (
    <Provider store={cartStocks}>
      <Header />
      <div className={styles.cart_main_content}>
        <h1>カート</h1>
        <p>※注意</p>
        <p>
          カート内の商品は取り置きではありません。購入手続きの時点で売り切れている可能性があります。
        </p>
        {userID ? <Members /> : <Local />}
        <br />
        <Link href="/" legacyBehavior>
          トップページへ
        </Link>
      </div>
      <PageTop />
      <Footer />
    </Provider>
  );
};

export default ShoppingCart;
