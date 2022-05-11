import Header from "./components/Header";
import Card from "./components/Card/Card";
import Drawer from "./components/Drawer";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch("https://627a34994a5ef80e2c15cefe.mockapi.io/item")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
    console.log(obj);
  };

  return (
    <div className="wrapper clear">
      {cartOpen && (
        <Drawer items={cartItems} onClose={() => setCartOpen(false)} />
      )}
      <Header onClickCart={() => setCartOpen(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img src="/img/search.png" alt="search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((title) => (
            <Card
              title={title.title}
              price={title.price}
              imageUrl={title.imgUrl}
              onFavorite={() => console.log("liked")}
              onPlus={(obj) => onAddToCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
