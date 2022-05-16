import React, { useState } from "react";
import AppContext from "../context";
import axios from "axios";

import Info from "./Info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, items = [] }) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://627a34994a5ef80e2c15cefe.mockapi.io/orders",
        { items: cartItems }
      );
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://627a34994a5ef80e2c15cefe.mockapi.io/cart",
          +item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("не удалось создать заказ :(");
    }
    setIsLoading(false);
  };

  return (
    <div className="'overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between justify-between mb-30">
          <h2 className="d-flex justify-between mb-30">
            Корзина{" "}
            <img
              onClick={onClose}
              className="cu-p"
              src="img/btn-remove.svg"
              alt="Close"
            />
          </h2>
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj, index) => {
                const { id, title, price, imageUrl } = obj;
                // console.log(obj);
                return (
                  <div key={id} className="cartItem d-flex align-center mb-20">
                    <div
                      style={{ backgroundImage: `url(${imageUrl})` }}
                      className="cartItemImage"
                    ></div>

                    <div className="mr-20">
                      <p className="mb-5">{title}</p>
                      <b>{price}</b>
                    </div>
                    <img
                      onClick={() => onRemove(id)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="sneakers"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого: </span>
                  <div></div>
                  <b>21 498 руб. </b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>1074 руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="/img/arrow.svg" alt="arrows" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : `Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.`
            }
            image={
              isOrderCompleted
                ? "/img/complete-order.svg"
                : `/img/empty-cart.png`
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
