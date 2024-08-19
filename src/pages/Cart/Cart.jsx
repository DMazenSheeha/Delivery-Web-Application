import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./cart.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { Fragment } from "react";

function Cart() {
  const { cartItems, food_list, removeItem, total, url, user } =
    useContext(StoreContext);
  const navigate = useNavigate();
  if (!user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="cart">
      <div className="cart-title">
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      <div className="cart-items">
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <Fragment key={item._id}>
                <div className="cart-title cart-item">
                  <img src={`${url}/api/food/image/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p
                    onClick={() => removeItem(item._id)}
                    style={{ width: "fit-content" }}
                  >
                    &times;
                  </p>
                </div>
                <hr />
              </Fragment>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
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
          {total > 0 && (
            <button onClick={() => navigate("/order")}>
              PROCEED TO CHECKOUT
            </button>
          )}
        </div>
        <div className="promo-code">
          <p>If you have a promo code, Enter it here</p>
          <div className="promo-code-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
