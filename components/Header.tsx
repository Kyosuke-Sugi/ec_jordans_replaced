import Link from "next/link";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import { useCookieOriginal, useName } from "./useCookie";
import { HelpOutline, HowToReg, Login, Logout, Person, ShoppingBasketOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function Header() {
  const router = useRouter();
  const cookieOriginal = useCookieOriginal();
  const name = useName();

  const logout = () => {
    document.cookie = `userID=; Path=/; expires=Fri, 31-Dec-1999 23:59:59 GMT;`;
    document.cookie = `userName=; Path=/; expires=Fri, 31-Dec-1999 23:59:59 GMT;`;
    router.reload();
  };

  const login = () => {
    router.push("/login/loginPage");
  };

  const correction = () => {
    if (cookieOriginal === "" || undefined) {
      return (
        <>
          <li key="signup" className={styles.lis}>
            <Link href="/signup" className={styles.link}>
              <HowToReg className={styles.icon} />
              <span>会員登録</span>
            </Link>
          </li>
          <li key="login" className={styles.lis}>
            <Button
              style={{backgroundColor: "rgb(94, 177, 207)", color: "#fff"}} 
              className={styles.button}
              onClick={login} 
            >
              <span className={styles.loginFont}>ログイン</span>
              <Login />
            </Button>
          </li>
        </>
      );
    } else {
      return (
          <>
            <li key="signup" className={styles.lis}>
              <Link href="/mypage" className={styles.link}>
                <Person className={styles.icon} />
                <span>{decodeURI(name)}さん</span>
              </Link>
            </li>
            <li key="login" className={styles.lis}>
              <Button 
                style={{backgroundColor: "rgb(94, 177, 207)", color: "#fff"}}
                className={styles.button}
                onClick={logout} 
              >
                <span className={styles.loginFont}>ログアウト</span>
                <Logout />
              </Button>
            </li>
          </>
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
