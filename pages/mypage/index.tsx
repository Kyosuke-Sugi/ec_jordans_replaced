import React, { use, useEffect } from "react";
import SignIn from "../../components/SignIn";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FavoriteItemList from "../../components/myPage/FavoriteItemList";
import UsedItemList from "../../components/myPage/UsedItemList";
import SettlementHistory from "../../components/myPage/SettlementHistory";
import styles from "../../styles/MyPage.module.css";
import PageTop from "../../components/pageTop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import favStockReducer from "../../components/features/favStocks";

const favStocks = configureStore({
  reducer: {
    favStock: favStockReducer
  }
})

const MyPage = () => {
  return (
    <>
      <SignIn>
        <Provider store={favStocks}>
          <Header />
          <div className={styles.mypage_main_content}>
            <div className={styles.main_title_wrapper}>
              <h1>マイページ</h1>
              <div className={styles.user_imfo_icon}>
                <Link href="/mypage/userimfo/">
                  <FontAwesomeIcon icon={faUser} />
                  <span> 会員情報</span>
                </Link>
              </div>
            </div>
            <hr />
            <div><SettlementHistory /></div>
            <hr />
            <div>
              <FavoriteItemList />
            </div>
            <hr />
            <div>
              <UsedItemList />
            </div>
          </div>
          <PageTop />
          <Footer />
        </Provider>
      </SignIn>
    </>
  );
};

export default MyPage;
