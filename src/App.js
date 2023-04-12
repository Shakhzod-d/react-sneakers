import { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const base_url = "https://627a34994a5ef80e2c15cefe.mockapi.io";

  useEffect(() => {
    // fetch("https://627a34994a5ef80e2c15cefe.mockapi.io/item")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      try {
        // const [cartResponse, favoriteResponse, itemResponse] =
        //   await new Promise.all([
        //     axios.get("https://627a34994a5ef80e2c15cefe.mockapi.io/cart"),
        //     axios.get("https://627a34994a5ef80e2c15cefe.mockapi.io/favorites"),
        //     axios.get("https://627a34994a5ef80e2c15cefe.mockapi.io/item"),
        //   ]);
        const cartResponse = await axios.get(`${base_url}/cart`);
        const favoriteResponse = await axios.get(`${base_url}/favorites`);
        const itemResponse = await axios.get(`${base_url}/item`);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemResponse.data);
      } catch (error) {
        alert("ошибка при запросе данных");
      }
    }

    fetchData();
  }, []);
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://627a34994a5ef80e2c15cefe.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://627a34994a5ef80e2c15cefe.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };
  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://627a34994a5ef80e2c15cefe.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("ошибка при запросе данных");
      console.error(error);
    }
    // console.log(id);
  };
  const onAddToFavorite = async (obj) => {
    // console.log(obj);
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://627a34994a5ef80e2c15cefe.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://627a34994a5ef80e2c15cefe.mockapi.io/favorites",
          obj
        );
        // console.log(data);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("не удалось добавить в favorite");
    }
  };
  const onChangeSearchValue = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpen,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={onRemoveItem}
          opened={cartOpen}
        />

        <Header onClickCart={() => setCartOpen(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchValue={onChangeSearchValue}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
