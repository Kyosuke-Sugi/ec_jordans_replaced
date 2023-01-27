import Image from "next/image";
import { useCookie } from "../useCookie";
import type { CartState, ShoppingCart } from "../../types";
import styles from "../../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../features/Stocks";

const CartItem_members = () => {
  const userID = useCookie();

  const { cart, loading }: {cart: ShoppingCart[], loading: boolean} = useSelector((state: {stock: CartState}) => state.stock);

  const dispatch = useDispatch();

  const handleDelete = (id: number) => {
    fetch(
      `
    /api/getCart/${id}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      dispatch(getCart(userID));
    })
  };

  const noItem = <p>カートの中身はありません</p>;

  const cartList = (
    <ul className={styles.cart_ul}>
      {cart?.map((content: ShoppingCart) => (
        <li className={styles.cart_li} key={content.id}>
          <div>
            <div>
              <Image
                src={`/${content.stocks.image1}`}
                width={200}
                height={200}
                alt={content.stocks.items.name}
                priority
              />
            </div>
            <ul className={styles.cart_ul}>
              <li className={styles.cart_li}>
                商品名　{content.stocks.items.name}
              </li>
              <li className={styles.cart_li}>
                ¥ {content.stocks.price.toLocaleString()}（税込）
              </li>
              <li className={styles.cart_quantity}>
                <label htmlFor="count" className={styles.cart_count_label}>
                  個数
                </label>
                <select id="count">
                  <option value="1">1</option>
                </select>
                <Image
                  className={styles.btn}
                  src="/images/trashbox.png"
                  alt="削除ボタン"
                  width={30}
                  height={30}
                  onClick={() => handleDelete(content.stocks.id)}
                />
              </li>
            </ul>
            <hr />
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {loading && <p>Loading...</p>}
      {cart && 
        <div>{cart?.length ? cartList : noItem}</div>
      }
    </div>
  )
};

export default CartItem_members;
