import { useContext } from "react";
import "./placeOrder.scss";
import { StoreContext } from "../../context/StoreContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

function PlaceOrder() {
  const { total, user, url, cartItems, setCartItems, setTotal } =
    useContext(StoreContext);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((cur) => ({ ...cur, [name]: value }));
  };

  const handleSubmit = async () => {
    for (const key in data) {
      if (data[key] === "") {
        return toast.error(
          `${
            key === "firstName"
              ? "First name"
              : key === "lastName"
              ? "Last name"
              : key === "zipCode"
              ? "Zip Code"
              : key.slice(0, 1).toUpperCase() + key.slice(1)
          } is required`
        );
      }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return toast.error("This is not email");
    }
    const addOrder = await axios.post(
      `${url}/api/order/add`,
      {
        items: cartItems,
        total,
        clientInformation: data,
      },
      {
        headers: { token },
      }
    );
    if (addOrder.data.success) {
      const deleteAllCartItems = await axios.post(
        `${url}/api/cart/removeAll`,
        {},
        {
          headers: { token: token },
        }
      );
      if (deleteAllCartItems.data.success) {
        Swal.fire({
          icon: "success",
          title: "Your Order delivered to the owner successfully",
        });
        setCartItems(false);
        setTotal(0);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          phone: "",
        });
        navigate("/orders");
      } else {
        toast.error("Error");
      }
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    toast.warn(
      "If you entered a wrong informations, your order will be ignored"
    );
  }, []);

  if (!user) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="place-order">
      <div className="left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={data.firstName}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={data.lastName}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          name="email"
          value={data.email}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="text"
          placeholder="Street"
          name="street"
          value={data.street}
          onChange={(e) => handleOnChange(e)}
        />
        <div className="multi-fields">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={data.city}
            onChange={(e) => handleOnChange(e)}
          />
          <input
            type="text"
            placeholder="State"
            name="state"
            value={data.state}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <input
          type="text"
          placeholder="Zip code"
          name="zipCode"
          value={data.zipCode}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="text"
          placeholder="Phone"
          name="phone"
          value={data.phone}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div className="right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-item">
            <p>Subtotal</p>
            <p>${total}</p>
          </div>
          <hr />
          <div className="cart-total-item">
            <p>Delivery Fee</p>
            <p>${total > 0 ? 2 : 0}</p>
          </div>
          <hr />
          <div className="cart-total-item">
            <p className="total">Total</p>
            <p>${total > 0 ? total + 2 : 0} </p>
          </div>
          <button onClick={handleSubmit}>PROCEED TO DELIVER FOOD</button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
