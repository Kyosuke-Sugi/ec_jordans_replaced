import styles from "../styles/Sidebar.module.css";
import React, { useState } from "react";
import Note from "./Note";
import Image from "next/image";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { getSeriesResult } from "./features/allStocks";
import { AppDispatch } from "../pages";

export default function Sidebar() {
  // 絞り込み機能
  
  const initializedData: {
    notifyFrequency: string
  } = {
    notifyFrequency: "",
  };

  const [data, setData] = useState(initializedData);

  const dispatch: AppDispatch = useDispatch();

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      e.target.value === data.notifyFrequency ? "" : e.target.value;
    const newData = { ...data, notifyFrequency: newValue };
    setData(newData);

    if (e.target.checked) {
      dispatch(getSeriesResult(newValue));
    }else{
      Router.reload();
    }
  }; 

  return (
    <div className={styles.sidebarBox}>
      <Note />
      <div className={styles.imageIcon}>
        <Image
          src="/shoplogo.png"
          alt="syoplogo"
          height={150}
          width={210}
          className={styles.imagefile}
        />
      </div>

      <h3 className={styles.title}>SERIES</h3>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="posite"
          name="interest"
          value="POSITE SERIES"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "POSITE SERIES"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="posite">POSITE SERIES</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="force"
          name="interest"
          value="AIR FORCE 1 LOW"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "AIR FORCE 1 LOW"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="force">AIR FORCE 1 LOW</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN1"
          name="JORDAN1"
          value="JORDAN BRAND 1"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "JORDAN BRAND 1"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="JORDAN1">JORDAN BRAND 1</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN5"
          name="JORDAN5"
          value="JORDAN BRAND 5"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "JORDAN BRAND 5"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="JORDAN5">JORDAN BRAND 5</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="JORDAN6"
          name="JORDAN6"
          value="JORDAN BRAND 6"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "JORDAN BRAND 6"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="JORDAN6">JORDAN BRAND 6</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="BLAZER"
          name="BLAZER"
          value="BLAZER"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "BLAZER"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="BLAZER">BLAZER</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="AIR MAX"
          name="AIR MAX"
          value="AIR MAX"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "AIR MAX"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="AIR MAX">AIR MAX</label>
      </div>
      <div className={styles.box}>
        <input
          type="checkbox"
          id="DUNK"
          name="DUNK"
          value="DUNK"
          className={styles.hideCheck}
          checked={data.notifyFrequency === "DUNK"}
          onChange={handleFrequencyChange}
        />
        <label htmlFor="DUNK">DUNK</label>
      </div>
    </div>
  );
}
