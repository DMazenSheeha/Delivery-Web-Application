import { useContext, useEffect, useState } from "react";
import { assets } from "../../assests/frontend_assets/assets";
import "./orders.scss";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { url, food_list, user } = useContext(StoreContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const res = await axios.get(`${url}/api/order/clientOrders`, {
      headers: { token },
    });
    if (res.data.success) {
      const orders = await res.data.data;
      setOrders(orders);

      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {isLoaded ? (
        <div className="orders-page">
          <h2 style={{ color: "#555" }}>My Orders</h2>
          {!orders.length > 0 ? (
            <h1 style={{ marginTop: "30px" }}>
              You have not placed an order yet
            </h1>
          ) : (
            orders.map((order, i) => {
              let str = "";
              let itemsNumber = 0;
              if (food_list) {
                for (let key in order.items) {
                  itemsNumber++;
                  const foodItem = food_list.find((item) => item._id === key);
                  str += `${foodItem.name} x ${order.items[key]}, `;
                }
              }
              return (
                <div className="order" key={i}>
                  <img src={assets.parcel_icon} alt="" />
                  <p>{str.slice(0, -2)}</p>
                  <p className="quantity">Items: {itemsNumber}</p>
                  <p className="total">${order.total}</p>
                  <p className="status">
                    {order.status === "forDelivery"
                      ? "Out for delivery"
                      : order.status === "delivered"
                      ? "Delivered"
                      : "Food Processing"}
                  </p>
                  <p className="track">Track Order</p>
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="container" style={{ display: "flex" }}>
          <span className="loader"></span>
        </div>
      )}
    </>
  );
}

export default Orders;
