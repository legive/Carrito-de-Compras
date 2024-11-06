/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { db } from "./data/db";
import Header from "./components/Header";
import Guitar from "./components/Guitar";

function App() {
  const initialCart = () => {
    const localStorageCart = localStorage.getItem("cart");
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  };
  const [data, setData] = useState(db);

  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function increaseQuantity(id) {
    console.log("incrementar");
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
  }

  function addToCart(item) {
    const itemExist = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExist >= 0) {
      console.log("Ya existe");
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
      console.log(cart);
    } else {
      item.quantity = 1;
      //Al carrito anterior agregar la información anterior mas el nuevo Item
      setCart([...cart, item]);
    }
  }

  const handleDelete = (id) => {
    setCart(cart.filter((guitar) => guitar.id != id));
  };
  const handleEmpty = () => {
    setCart([]);
  };

  return (
    <>
      <Header
        cart={cart}
        handleDelete={handleDelete}
        handleEmpty={handleEmpty}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCart={addToCart}
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
