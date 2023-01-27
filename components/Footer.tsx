import Link from "next/link";
import styles from "../styles/Footer.module.css";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className={styles.foot}>
      <div className={styles.left}>
        <ul className={styles.ultag}>
          <li key={"purchase"} className={styles.litag}>
            <Link href="/purchase">買取受付</Link>
          </li>
          <li key={"inquiry"} className={styles.litag}>
            <Link href="/contact">お問い合わせ</Link>
          </li>
        </ul>
        <div className={styles.images}>
          <Link href="https://bit.ly/3upDsNH">
            <Facebook className={styles.snsIcon} />
          </Link>
          <Link href="https://www.instagram.com/rakus_partners/?hl=ja">
            <Instagram className={styles.snsIcon} />
          </Link>
          <Link href="https://twitter.com/hr_rakus">
            <Twitter className={styles.snsIcon} />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <h3 className={styles.h3tag}>- 運営会社 -</h3>
        <p className={styles.ptag}>
          株式会社JORDANS
          <br />
          〒160-0022 <br />
          東京都新宿区新宿2-5-12 FORECAST新宿AVENUE8階
          <br />
          MAIL : jordans@rakus-partners.co.jp
          <br />
        </p>
      </div>
    </footer>
  );
}
