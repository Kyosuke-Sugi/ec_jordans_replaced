import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Cart.module.css";

const CartTotalMember = () => {
  const { cart } = useSelector((state: any) => state.stock)

  const initial: number = cart
    .map((stock: any) => stock.stocks.price)
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
              <td>￥{cart?.length ? 500 : 0}</td>
            </tr>
          </tbody>
        </table>
        <h2>合計：￥{cart?.length ? total + 500 : 0}（税込）</h2>
      </div>
    </>
  );
};

export default CartTotalMember;
