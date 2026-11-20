import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { productCatalog } from "../data/products";
import { CartContext } from "./cartState";

const CART_STORAGE_KEY = "aurora-cart-v1";
const productIds = new Set(productCatalog.map((product) => product.id));

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) {
      return [];
    }

    const parsedCart = JSON.parse(storedCart);
    if (!Array.isArray(parsedCart)) {
      throw new TypeError("Saved cart data must be an array.");
    }

    const validItems = parsedCart.filter(
      (item) =>
        productIds.has(item.productId) &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );

    if (validItems.length !== parsedCart.length) {
      console.warn("Invalid saved cart items were discarded.");
    }

    return validItems;
  } catch (error) {
    console.error("Unable to restore the saved shopping cart.", error);
    return [];
  }
}

function CartProvider({ children }) {
  const [cart, setCart] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error("Unable to save the shopping cart.", error);
    }
  }, [cart]);

  const addToCart = useCallback((productId) => {
    const product = productCatalog.find((item) => item.id === productId);
    if (!product || !product.isInStock) {
      return;
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.productId === productId,
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { productId, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.productId === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.productId !== productId),
    );
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const value = useMemo(
    () => ({
      cart,
      cartCount,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    }),
    [
      cart,
      cartCount,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export { CartProvider };
