import React, { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { Cart, Dish } from "../types";
import { getLocalObject, setLocalObject } from "../utils/localStorage";
import axios from "axios";
import { omit, isEqual } from "lodash";

type CartContextType = {
  cartItems: Cart[];
  setCartItems: (arg: Cart[]) => void;
  addToCart: (arg: Cart | Dish) => void;
  deleteFromCart: (arg: Cart) => void;
  decreaseQuantity: (arg: Cart) => void;
  increaseQuantity: (arg: Cart) => void;
  numbersOfCartItems: number;
  placeOrder: (arg2: boolean) => void;
  totalCartAmount: number;
  isErrorsVisible: boolean;
  setIsErrorsVisible: (arg: boolean) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
  deleteFromCart: () => {},
  decreaseQuantity: () => {},
  increaseQuantity: () => {},
  numbersOfCartItems: 0,
  placeOrder: () => {},
  totalCartAmount: 0,
  isErrorsVisible: false,
  setIsErrorsVisible: () => {},
});
export const CartProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [numbersOfCartItems, setNumbersOfCartItems] = useState<number>(0);
  const [totalCartAmount, setTotalCartAmount] = useState<number>(0);
  const [isErrorsVisible, setIsErrorsVisible] = useState<boolean>(false);

  useEffect(() => {
    getLocalObject("cart", (cart) => setCartItems(cart));
  }, []);

  useEffect(() => {
    setLocalObject("cart", cartItems);
    setNumbersOfCartItems(cartItems.length);
  }, [cartItems]);

  const addToCart = (cartItem: Dish) => {
    let items = [...cartItems];
    if (!!cartItems.length) {
      let item: Cart = items.filter((it) =>
        isEqual(omit(it, ["quantity"]), omit(cartItem, ["quantity"]))
      )[0];
      if (item) {
        item.quantity++;
        const match = items.filter(
          (i) => !isEqual(omit(i, ["quantity"]), omit(cartItem, ["quantity"]))
        );
        setCartItems([...match, item]);
      } else {
        setCartItems([...cartItems, { ...cartItem, quantity: 1 }]);
      }
    } else {
      setCartItems([...cartItems, { ...cartItem, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (cartItem: Cart) => {
    let items = [...cartItems];
    let item: Cart = items.filter((it) =>
      isEqual(omit(it, ["quantity"]), omit(cartItem, ["quantity"]))
    )[0];
    item.quantity = item.quantity - 1;
    setCartItems(items);
  };

  const increaseQuantity = (cartItem: Cart) => {
    let items = [...cartItems];
    let item: Cart = items.filter((it) =>
      isEqual(omit(it, ["quantity"]), omit(cartItem, ["quantity"]))
    )[0];
    item.quantity = item.quantity + 1;
    setCartItems(items);
  };

  const deleteFromCart = (cartItem: Cart) => {
    cartItems.map((item) => {
      if (isEqual(omit(item, ["quantity"]), omit(cartItem, ["quantity"]))) {
        setCartItems(
          cartItems.filter(
            (item) =>
              !isEqual(omit(item, ["quantity"]), omit(cartItem, ["quantity"]))
          )
        );
      }
    });
  };

  const placeOrder = async (isErrors: boolean) => {
    if (isErrors) {
      setIsErrorsVisible(true);
      return;
    } else {
      setIsErrorsVisible(false);
      const prepareForSubmit = cartItems.map((item) => ({
        bowlId: item.bowl.id,
        sizeId: item.size.id,
        baseId: item.base.id,
        sauceId: item.sauce.id,
        ingredient: item.ingredients.map((ing) => ing.id),
        extraIngredient: item.extraIngredient.map((ing) => ing.id),
      }));
      try {
        const res = await axios.post(
          "https://fet.app.fsd.rs/api/create_order",
          prepareForSubmit,
          {
            headers: {
              Authorization:
                "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2OTQxODEyNTYsImV4cCI6MTY5NTA0NTI1Niwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImVtYWlsIjoibGlkdmFubG9sQGdtYWlsLmNvbSJ9.tTXab33fRbMaLoU-IjsRsTMkrFdMVp3DOoCJD8QYYPXwRJ9f4rObvu710g6r2YaVz9O1XNNVEQVoVTb4rt45tkSxVX-_S584dz5TBSD3hhlEWQDA1kCs0jETGaMnj1SBklbAp98AmLIFpUyVPa0uxz419LqEuBjPKXWE7MOOfEa8nRHZYW2pu9AwtZCZvTHmPaYtLO1yJhXi6-j9eZbFwKcVjqiJtqEq6E0XcZsjl4aAp68S6fKtsvXlRgn7u2Qr1c9y-X6LyrLbEArFcewCyMmym9FUf629uFlA68jnO2d9lBVj7arcTd5yHUfMIOXAzQ4l3hEmyA_5VMIw-q2xLA",
            },
          }
        );
        if (res) {
          setCartItems([]);
        }
      } catch {
        console.log("errors");
      }
    }
  };

  const sumNumbers = (numbers: number[]) => {
    return numbers.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
  };

  const cartItemsTotalHandler = () => {
    if (!!cartItems.length) {
      const allSizesPrice: number[] = [];
      const allExtraPrices: number[] = [];
      cartItems.forEach((item) => {
        allSizesPrice.push(item.size.price * item.quantity);
        item.extraIngredient.map((extra) =>
          allExtraPrices.push(extra.price * item.quantity)
        );
      });
      const sizeComplete = sumNumbers(allSizesPrice);
      const extraComplete = sumNumbers(allExtraPrices);
      const total = sizeComplete + extraComplete;
      setTotalCartAmount(+total.toFixed(2));
    } else {
      setTotalCartAmount(0);
    }
  };

  useEffect(() => {
    cartItemsTotalHandler();
  }, [cartItems, numbersOfCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        deleteFromCart,
        decreaseQuantity,
        increaseQuantity,
        numbersOfCartItems,
        placeOrder,
        totalCartAmount,
        isErrorsVisible,
        setIsErrorsVisible,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
