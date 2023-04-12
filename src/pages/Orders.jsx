import React from "react";
import { useState } from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import AppContext from "../context";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://627a34994a5ef80e2c15cefe.mockapi.io/orders`
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закази</h1>
      </div>

      <div className="cartContainer">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            onAddToFavorite={(obj) => onAddToFavorite(obj)}
            // onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
