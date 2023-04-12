import React from "react";
import Card from "../../components/Card/Card";

import "./Home.css";

function Home({
  searchValue,
  onChangeSearchValue,
  setSearchValue,
  items,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) => {
      return item.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => {
      //console.log("2", item); //imgUrl
      return (
        <Card
          key={index}
          onAddToFavorite={onAddToFavorite}
          onPlus={(item) => onAddToCart(item)}
          // added={true} ga teng boldi shunday usuli bor
          {...item}
          loading={isLoading}
        />
      );
    });
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки`}
        </h1>
        <div className="search-block">
          <img src="/img/search.png" alt="search" />
          <input
            onChange={onChangeSearchValue}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="sneakers"
            />
          )}
        </div>
      </div>

      <div className="cartContainer">{renderItems()}</div>
    </div>
  );
}

export default Home;
