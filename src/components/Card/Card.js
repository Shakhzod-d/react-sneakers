import { useState } from "react";
import React from "react";

import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

import AppContext from "../../context";

function Card(props) {
  const {
    favorited = false,
    id,
    imageUrl,
    parentId,
    price,
    title,
    onPlus = () => {},
    added = false,
    loading = false,
  } = props;
  const { isItemAdded, onAddToFavorite } = React.useContext(AppContext);

  // console.log(title, isItemAdded(id));

  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, title, parentId: id, imageUrl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };
  const onClickFavorite = () => {
    onAddToFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <div className={styles.card}>
          <div className="favorite" onClick={onClickFavorite}>
            <img
              src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
              alt="liked"
            />
          </div>
          <div>
            <img width="100%" height={135} src={imageUrl} alt="" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>{price} руб.</b>
              </div>

              {onPlus && (
                <img
                  onClick={onClickPlus}
                  className={styles.plus}
                  width={33}
                  height={33}
                  src={
                    isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"
                  }
                  alt="checked"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
