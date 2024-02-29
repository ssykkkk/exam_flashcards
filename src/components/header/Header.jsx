import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
export default function Header() {
  return (
   
    <header>
       <div className="container">
        <div className={styles.wrap}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? styles.active : ""
        }
      >
        Головна
      </NavLink>
      <NavLink to="/group"  className={({ isActive }) =>
          isActive ? styles.active : ""
        }>
        Групи
      </NavLink>
      <NavLink to="/facts"  className={({ isActive }) =>
          isActive ? styles.active : ""
        }>
        Факти
      </NavLink>
      </div>
      </div>
    </header>
   
  );
}
