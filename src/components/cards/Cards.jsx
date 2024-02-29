import React, { useEffect, useState } from "react";
import { withLayout } from "../../components/app/App";
import styles from "./Cards.module.scss"
import Card from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards } from "../../share/reducers/card.reducer";

function Cards() {
  
const dispatch = useDispatch();

useEffect(() => {
  dispatch(getAllCards());
}, [dispatch]);


const flashcards = useSelector((state)=> state.cards);

  const cards = flashcards.map((card) => {
    return <Card card={card} key={card.id} />;
  });

  const noCard = <div className={styles.noCard}>Карток немає</div>;

  const [current, setCurrent] = useState(0);
  function previousCard() {
    setCurrent(current - 1);
  }
  function nextCard() {
    setCurrent(current + 1);
  }

  return (
    <div className="container">
      <div className={styles.wrap}>
        {flashcards && flashcards.length > 0 ? (
          <div className={styles.cardNumber}>
            Картка №{current + 1} з {flashcards.length}
          </div>
        ) : (
          ""
        )}
        {flashcards && flashcards.length > 0 ? cards[current] : noCard}
        <div className={styles.buttons}>
          {current > 0 ? (
            <button onClick={previousCard}>Попередня картка</button>
          ) : (
            <button className={styles.disabled} disabled>
             Попередня картка
            </button>
          )}
          {current < flashcards.length - 1 ? (
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

export default withLayout(Cards);
