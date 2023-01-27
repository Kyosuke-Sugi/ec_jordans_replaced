import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import ItemList from "../components/itemList";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import PageTop from "../components/pageTop";
import Search from "../components/Search";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import allStocksReducer from "../components/features/allStocks";

const allStocks = configureStore({
  reducer: {
    allStocks: allStocksReducer
  }
})

export default function Home() {
  return (
    <Provider store={allStocks}>
      <div className={styles.container}>
        <Head>
          <title>-JORDANS-中古NIKEスニーカー販売</title>
          <meta name="jordans" content="sneakers NIKE" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.mainFlex}>
            <Sidebar />
            <div className={styles.mains}>
              <div className={styles.search}>
                <Search />
              </div>
              <ItemList />
            </div>
          </div>
        </main>
        <Footer />
        <PageTop />
      </div>
    </Provider>
  );
}

export type RootState = ReturnType<typeof allStocks.getState>
export type AppDispatch = typeof allStocks.dispatch
