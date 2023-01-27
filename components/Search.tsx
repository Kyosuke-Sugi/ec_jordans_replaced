import { SearchOutlined } from "@mui/icons-material";
import React, { useState } from "react";
import styles from "../styles/Search.module.css";
import { useDispatch } from "react-redux";
import { getSearchResult } from "./features/allStocks";
import { AppDispatch } from "../pages";

export default function Search() {
  // 検索機能
  const dispatch: AppDispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    dispatch(getSearchResult(searchValue));
  };

  return (
    <form className={styles.itemSearch}>
      <input
        type="text"
        name="filter"
        className={styles.search}
        placeholder="商品名検索"
        onChange={handleSearch}
      />
      <div className={styles.searchBtn} onClick={handleClick}>
        <SearchOutlined className={styles.searchIcon} />
      </div>
    </form>
  );
}
