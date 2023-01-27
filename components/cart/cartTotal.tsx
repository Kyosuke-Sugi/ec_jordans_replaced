import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Cart.module.css";
import type {CartState, Stock} from "../../types"

const CartTotal = () => {

  const cart = useSelector((state:{stock: CartState}) => state.stock.localCart[0]);

  const initial: number = cart?.stock_id
    .map((stock: Stock) => stock.price)
    .reduce((prev: number, curr: number) => prev + curr, 0);
  
  const [total, setTotal] = useState(initial);

  useEffect(() => {
    setTotal(initial);
  }, [cart]);

  return (
    <>
      <div className={styles.table}>
        <table>
          <tbody>
            <tr>
              <th>
                小計{"("}税込{")"}:
              </th>
              <td>￥{total}</td>
            </tr>
            <tr>
              <th>
                送料{"("}一律{")"}:
              </th>
              <td>￥{cart?.stock_id.length ? 500 : 0}</td>
            </tr>
          </tbody>
        </table>
        <h2>合計：￥{cart?.stock_id.length ? total + 500 : 0}（税込）</h2>
      </div>
    </>
  );
};

export default CartTotal;
