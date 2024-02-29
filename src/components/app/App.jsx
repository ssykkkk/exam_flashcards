import Header from "../header/Header";
import styles from "./App.module.scss";
function App({ children }) {

  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.child}>{children}</div>
    </div>
  );
}

export const withLayout = (Component) =>
  function wLC(props) {
    return (
      <App>
        <Component {...props} />
      </App>
    );
  };

