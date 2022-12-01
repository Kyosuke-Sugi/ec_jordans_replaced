import type { Stock } from "../types";
import type { FavoriteItem } from "../types";

import Router from "next/router";
import { useEffect, useState } from "react";

const AddFavorit = ({ stock }: { stock: Stock }) => {

  const [cookieName, setCookieName] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if(!cookies === true){
    }else{
    const cookiesArray = cookies.split("; ");
    const cookie = cookiesArray.filter(function (cookie) {
      return cookie.includes("email");
    });
    const cookieName = cookie[0];
    const cookieArray = cookieName.split("=");
    setCookieName(cookieArray[1]);
  }});


  // cookieNameが取得出来れば、お気に入り追加機能を使えて、取得出来なければログイン画面に遷移
  const data: FavoriteItem = {
  
    itemId: stock.id,
    cookieName: cookieName,
    name: stock.item.name,
    price: stock.price,
    size: stock.size,
    imagePath: stock.image1,
    condition: stock.condition,
    deleted: false
  };

  const sendFavo = () => {
    if (!cookieName === true) {
      Router.push("/login/loginPage")
    } else { 
    fetch('http://localhost:8000/favoriteItems', {
      method: 'POST',

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });}
  }
  return (
    <div>
      <button onClick={sendFavo}>お気に入りに追加</button>
    </div>
  )
};

export default AddFavorit;
