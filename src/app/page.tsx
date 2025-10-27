import styles from "./page.module.css";
import { Home_page } from "./client";

export default function Home() {
  return (
    <div className={styles.page}>
      <Home_page />
    </div>
  );
}
