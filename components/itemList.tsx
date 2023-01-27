import Link from "next/link";
import Image from "next/image";
import styles from "../styles/itemList.module.css";
import { useEffect } from "react";
import PagingList from "./paging/paging";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getPagingStocks, setKeyword, nextPage, prevPage, jumpPage } from "./features/allStocks";
import Router from "next/router";
import { AllStocks, Stock } from "../types";
import { AppDispatch } from "../pages";

export default function ItemList() {

  // 1ページの商品数
  const limit = useSelector((state: AllStocks) => state.allStocks.limit);
  
  // 現在のページ
  const page = useSelector((state: AllStocks) => state.allStocks.page);

  // 検索に一致する商品数の合計
  const total = useSelector((state: AllStocks) => state.allStocks.total);

  // 全商品数の合計
  const allTotal = useSelector((state: AllStocks) => state.allStocks.allTotal);
  
  // 表示する商品データ
  const stocks = useSelector((state: AllStocks) => state.allStocks.stock);
  
  // 検索ワード
  const keyword = useSelector((state: AllStocks) => state.allStocks.keyword);

  const backPage = () => {
    dispatch(setKeyword(""));
    Router.reload();
  }
  // ページが変わるたびに表示する商品データを更新
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getPagingStocks(page, limit));
  }, [page]);

  const pagingList = (
    <div className={styles.pagingPosition}>
        <div className={styles.pagingGroup}>
          <button 
            onClick={() => dispatch(prevPage())} 
            disabled={page === 1}
            className={styles.pagingBtn}
          >
            <ArrowBackIos />
            <span>Prev</span>
          </button>
          <PagingList />          
          <button 
            onClick={() => dispatch(nextPage())} 
            disabled={page === Math.ceil(total / limit)} 
            className={styles.pagingBtn}
          >
            <span>Next</span>
            <ArrowForwardIos />
          </button>
        </div>
      </div>
  )

  
  return (
    <>
      {keyword &&
        <p className={styles.result}>「{keyword}」の検索結果: {total}件 / 全{allTotal}品</p>
      }
      <div className={styles.gridBox}>
        {stocks.map((stock: Stock) => {
          return (
              <div className={styles.itemdiv} key={`image${stock.id}`}>
                <Link legacyBehavior href={`/${stock.id}`} key={stock.id}>
                  <div className={styles.images} key={stock.items.name}>
                    <Image
                      src={`/${stock.image1}`}
                      alt="item"
                      width={140}
                      height={140}
                      className={styles.image}
                      key={stock.id}
                      priority
                    />
                  </div>
                </Link>
                <br />
                <Link legacyBehavior href={`/${stock.id}`} key={`name${stock.id}`}>
                  {stock.items.name}
                </Link>
                <br />￥{stock.price}
                <br />
                size {stock.size}
              </div>
          );
        })}
      </div>
      {keyword?
       (
       <div className={styles.result}>
        <Link href={"/"} legacyBehavior>
          <a onClick={() => backPage()}>
            全商品表示{"("}トップページ{")"}に戻る
          </a>
        </Link>
       </div>
       )
       :
       pagingList
      }
      
    </>
  );
}
