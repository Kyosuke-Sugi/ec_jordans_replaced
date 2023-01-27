import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCookie, useCookieOriginal, useName } from "./useCookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSpaghettiMonsterFlying,
} from "@fortawesome/free-solid-svg-icons";
import { HelpOutline, HowToReg, Person, ShoppingBasketOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export default function Header() {
  const router = useRouter();
  const cookieOriginal = useCookieOriginal();
  const cookie = useCookie();
  const name = useName();

  const [reload, setReload] = useState(0);

  const logout = (event: React.MouseEvent<HTMLInputElement>) => {
    document.cookie = `userID=; `;
    document.cookie = `userName=; `;
    setReload((event) => reload + 1);
  };

  const login = () => {
    router.push("/login/loginPage");
  };

  const correction = () => {
    if (cookieOriginal === "" || undefined) {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
            <Link href="/signup" className={styles.link}>
              <HowToReg className={styles.icon} />
              <span>会員登録</span>
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div className={styles.headerin}>
          <li key="signup" className={styles.lis}>
              <Link href="/mypage" className={styles.link}>
                <Person className={styles.icon} />
                <span>{decodeURI(name)}さん</span>
              </Link>
            </li>
        </div>
      );
    }
  };
  return (
    <header>
      <div className={styles.header} />
      <div className={styles.header2}>
        <Link href={"/"} className={styles.titleLink}>
          JORDANS
        </Link>
        <ul className={styles.ul}>
        <li key="mypage" className={styles.lis}>
            <Link href="/cart" className={styles.link}>
              <ShoppingCartOutlined className={styles.icon} />
              <span>カート</span>
            </Link>
          </li>
          <li key="cart" className={styles.lis}>
            <Link href="/contact" className={styles.link}>
              <HelpOutline className={styles.icon} />
              <span>お問い合わせ</span>
            </Link>
          </li>
          <li key="favorit" className={styles.lis}>
            <Link href="/purchase" className={styles.link}>
              <ShoppingBasketOutlined className={styles.icon} />
              <span>買取受付</span>
            </Link>
          </li>
          {correction()}
        </ul>
      </div>
    </header>
  );
}
