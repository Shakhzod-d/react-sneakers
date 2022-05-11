import { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, price, imageUrl, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price }); 
    setIsAdded((isAdded) => !isAdded);
  };

  return (
    <div className={styles.card}>
      <div className="favorite" onClick={onFavorite}>
        <img src="/img/heart-liked.svg" alt="liked" />
      </div>
      <div>
        <img width={133} height={122} src={imageUrl} alt="" />
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>

          <img
            onClick={onClickPlus}
            className={styles.plus}
            width={33}
            height={33}
            src={isAdded ? "/img/btn-checked.svg" : "/img/plus.svg"}
            alt="checked"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
