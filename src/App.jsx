import { useEffect, useState } from "react";
import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";

function App() {
  //state
  const initialCart = () => {
    return localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  };
  const [data, setData] = useState(db);
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // useEffect(() => {
  //   setData(db);
  // }, []);
  const addToCart = (item) => {
    const itemExisting = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExisting >= 0) {
      const updatedcart = [...cart];
      updatedcart[itemExisting].quantity++;
      setCart(updatedcart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const decreaseQuanity = (id) => {
    const updateCart = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updateCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuanity={decreaseQuanity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              setCart={setCart}
              key={guitar.id}
              addToCart={addToCart}
              guitar={guitar}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
