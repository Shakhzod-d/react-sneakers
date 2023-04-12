import React from "react";
import Card from "../components/Card/Card";

import AppContext from "../context";

function Favorites() {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);
  // console.log(state);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            key={index}
            {...item}
            favorited={true}
            onFavorite={(obj) => onAddToFavorite(obj)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
