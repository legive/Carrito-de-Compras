import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
export const useCart = () => {
    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };
    const [data] = useState(db);

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


    //State derivado
    //El use memo nos sirve para realizar un codigo cuando se cumpla un cambio
    const isEmpty = useMemo(() => (cart.length === 0 ? true : false), [cart]);

    //Para calcular el total
    const cartTotal = () =>
        cart.reduce(
            (total, itemCart) => total + itemCart.quantity * itemCart.price,
            0
        );

    return {
        data,
        cart,
        initialCart,
        addToCart,
        decreaseQuantity,
        increaseQuantity,
        handleDelete,
        handleEmpty,
        isEmpty,
        cartTotal


    }

}