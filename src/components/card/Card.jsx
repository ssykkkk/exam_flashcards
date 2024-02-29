import React, { useState } from "react";
import styles from "./Card.module.scss";
export default function Card({ card }) {
  const [side, setSide] = useState();

  function handleClick() {
    setSide(!side);
  }
  return (
        <div
          className={`${styles.card} ${side ? styles.side : ""}`}
          onClick={handleClick}
        >
          <span className={styles.id}>
            id{card.id}
          </span>
          <div className={styles.front}>{card.question}</div>
          <div className={styles.back}>{card.answer}</div>
        </div>
  );
}
