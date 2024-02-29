import React from "react";
import { Link } from "react-router-dom";
import errorImg from "../../share/img/404.jpg";
import styles from "./errorPage.module.scss";
import { FaArrowLeft } from "react-icons/fa";
export default function ErrorPage() {
  return (
    <div className="container">
      <div className={styles.wrap}>
        <div>
        <img src={errorImg} alt="Error" className={styles.errorImg} />
        <div className={styles.errName}>
          <span>Помилка 404</span>-
          <span>Сторінку не знайдено</span>
        </div>
        <Link to="/"><FaArrowLeft /> <span>Повернутися на головну сторінку</span></Link>
      </div>
      </div>
    </div>
  );
}
