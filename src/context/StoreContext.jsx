import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const StoreContext = createContext(null);

// let total = 0;
// if (cartItems && food_list) {
//   for (const foodItem in cartItems) {
//     if (cartItems[foodItem] > 0) {
//       let item = food_list.find((item) => item._id === foodItem);
//       total += cartItems[foodItem] * item.price;
//     }
//   }
// }
// setTotal(total);

// eslint-disable-next-line react/prop-types
export default function StoreContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(false);
  const [user, setUser] = useState(false);
  const [food_list, setFood_list] = useState(false);
  const [total, setTotal] = useState(0);

  const url = "https://delivery-web-application-api.vercel.app";

  const addToCart = async (itemId) => {
    if (user) {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
      if (res.data.success) {
        if (!cartItems[itemId]) {
          setCartItems((items) => ({ ...items, [itemId]: 1 }));
        } else {
          setCartItems((items) => ({ ...items, [itemId]: items[itemId] + 1 }));
        }
      } else {
        toast.error("Error, please try in another time");
      }
    } else {
      toast.warn("Login to add to cart");
    }
  };
  const removeFromCart = async (itemId) => {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      `${url}/api/cart/removeFromCart`,
      { itemId },
      { headers: { token } }
    );
    if (res.data.success) {
      setCartItems((items) => ({ ...items, [itemId]: items[itemId] - 1 }));
    } else {
      toast.error("Error, please try in another time");
    }
  };
  const removeItem = async (itemId) => {
    const token = localStorage.getItem("token");
    const data = await axios.post(
      `${url}/api/cart/remove`,
      { itemId },
      { headers: { token } }
    );
    if (data.data.success) {
      setCartItems((items) => ({ ...items, [itemId]: 0 }));
    } else {
      toast.error("Error");
    }
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/api/user/profile`, {
      headers: { token },
    });
    if (res.data.success) {
      setUser(res.data.data);
      fetchCartItems();
    }
  };

  const fetchFoodItems = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setFood_list(res.data.data);
    }
  };
  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${url}/api/cart/items`, {
      headers: { token },
    });
    if (res.data.success) {
      const resData = await res.data.data;
      setCartItems(resData);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchFoodItems();
    if (localStorage.getItem("token")) {
      getProfile();
      fetchCartItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cartItems) {
      let total = 0;
      if (cartItems && food_list) {
        for (const foodItem in cartItems) {
          if (cartItems[foodItem] > 0) {
            let item = food_list.find((item) => item._id === foodItem);
            if (item) {
              total += cartItems[foodItem] * item.price;
            }
          }
        }
      }
      setTotal(total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    setCartItems,
    removeFromCart,
    removeItem,
    total,
    setTotal,
    url,
    user,
    setUser,
    getProfile,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}
