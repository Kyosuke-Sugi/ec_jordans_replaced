import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/itemList.module.css";
import { AllStocks } from "../../types";
import { getAllData, jumpPage } from "../features/allStocks";

const PagingList = () => {
    const dispatch = useDispatch();

    // ページ番号の生成
    const range = (start: number, end: number) => {
        return [...Array(end - start + 1)].map((_, i) => start + i);
    }

    const page = useSelector((state: AllStocks) => state.allStocks.page);
    const dataTotal = useSelector((state: AllStocks) => state.allStocks.total)  
    const limit = useSelector((state: AllStocks) => state.allStocks.limit);

    const handlePage = (page: number) => {
        dispatch(jumpPage(page))
    }

    useEffect(() => {
        dispatch(getAllData());
    }, []);

    
    return (
        <ul className={styles.list_flex}>
            {range(1, Math.ceil(dataTotal / limit)).map((num: number, index: number) =>(
                <li key={index}>
                    <button 
                      onClick={() => handlePage(num)}
                      className={`${styles.pagingListBtn}`}
                      disabled={page === num}
                    >
                    {num}
                    </button>
                </li>
            ))
            }
        </ul>
    )
}

export default PagingList;
