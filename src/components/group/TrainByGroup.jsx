import React from "react";
import { useParams } from "react-router-dom";
import { withLayout } from "../app/App";
import styles from "../cards/Cards.module.scss";
import Card from "../card/Card";
import { useState } from "react";
import { useSelector } from "react-redux";
function TrainByGroup() {
  const { name } = useParams();

  
  const flashcards = useSelector((state) => state.cards);

  const loading = <div className="loading">flashcard empty...</div>;

  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  const cardsByCategory = [];

  flashcards.forEach((card) => {
    if (card.group === name) {
      cardsByCategory.push(card);
    }
  });
  const cards = cardsByCategory.map((card) => {
    return <Card card={card} key={card.id} />;
  });
  return (
    <div className="container">
      <div className={styles.wrap}>
        {cardsByCategory && cardsByCategory.length > 0 ? (
          <div className={styles.cardNumber}>
            Картка №{current + 1} з {cardsByCategory.length}
          </div>
        ) : (
          ""
        )}
        {cardsByCategory && cardsByCategory.length > 0
          ? cards[current]
          : loading}

        <div className={styles.buttons}>
          {current > 0 ? (
            <button onClick={previousCard}>Попередня картка</button>
          ) : (
            <button className={styles.disabled} disabled>
              Попередня картка
            </button>
          )}
          {current < cardsByCategory.length - 1 ? (
            <button onClick={nextCard}>Наступна картка</button>
          ) : (
            <button className={styles.disabled} disabled>
              Наступна картка
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default withLayout(TrainByGroup);
