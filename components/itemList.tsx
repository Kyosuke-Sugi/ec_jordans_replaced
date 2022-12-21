import Link from "next/link";
import useSWR from "swr";
import { Item, Stock } from "../types";
import Image from "next/image";
import styles from "../styles/itemList.module.css";

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function ItemList(props: any) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API}/api/getStock`,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const stock = data;

  return (
    <>
      {props.searchQuery.map((stock: Stock) => {
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
    </>
  );
}
