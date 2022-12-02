import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import ItemList from "../components/itemList";
import styles from "../styles/Home.module.css";
import AddObj from "./api/stocks";
import { useState, useRef, useEffect } from "react";
import { useCookie } from "../components/useCookie";  


export default function Home() {
  const userID = useCookie();
  
  // ログインしたとき、ローカルストレージからサーバーにデータを移動
  useEffect(() => {
    if(!userID === true){
      return;
    }else{
      if(localStorage.getItem("shoppingCart")){
        const shoppingCart = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
  
        fetch(`http://localhost:8000/shoppingCart/${userID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "stock": shoppingCart[0].stock
              }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  }, [userID]);

  // 検索機能
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState([]);
  const [searchValue, setSearchValue] = useState<string | undefined>("");

  const handleSearch = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setData(initializedData);
    setSearchQuery(
      items.filter((stock: any) =>
        stock.item.name.toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch("http://localhost:8000/stock")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setSearchQuery(data);
      });
  }, []);

  const initializedData = {
    notifyFrequency: "",
  };

  // カテゴリ絞り込み機能

  const [data, setData] = useState(initializedData);

  const handleFrequencyChange = (e: any) => {
    const newValue =
      e.target.value === data.notifyFrequency ? "" : e.target.value;
    const newData = { ...data, notifyFrequency: newValue };
    setData(newData);

    if (e.target.checked) {
      setSearchQuery(
        items.filter((stock: any) => e.target.value === stock.item.series)
      );
    } else {
      setSearchQuery(items);
    }
  };

  console.log(AddObj());
  return (
      <div className={styles.container}>
        <Head>
          <title>-JORDANS-中古NIKEスニーカー販売</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main className={styles.main}>
          <div className={styles.mainFlex}>
            <Sidebar
              onChange={handleSearch}
              onClick={handleClick}
              data={data}
              handleFrequencyChange={handleFrequencyChange}
            />
            <div className={styles.gridBox}>
              <ItemList searchQuery={searchQuery} />
            </div>
          </div>
        </main>
      </div>
  );
}
