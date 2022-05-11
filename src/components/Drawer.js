import React from "react";

const Drawer = ({ onClose, items = [] }) => {
  return (
    <div className="'overlay">
      <div className="drawer d-flex ">
        <h2 className="d-flex justify-between mb-30">
          <div>Корзина</div>
          <div>
            <img
              onClick={onClose}
              className="cu-p"
              src="/img/btn-remove.svg"
              alt="sneakers"
            />
          </div>
        </h2>

        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImage"
              ></div>

              <div className="mr-20">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}</b>
              </div>
              <img
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="sneakers"
              />
            </div>
          ))}
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
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="arrows" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
