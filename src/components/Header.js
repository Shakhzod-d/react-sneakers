import { Link } from "react-router-dom";

function Header({ onClickCart }) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={`/`}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img src="/img/cart.svg" alt="no" />
          <span>1205 руб.</span>
        </li>
        <li>
          <Link to={`/favorites`}>
            <img className="mr-30 cu-p" src="/img/heart.svg" alt="hear" />
          </Link>
        </li>
        <li>
          <img src="/img/Union.svg" alt="no" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
