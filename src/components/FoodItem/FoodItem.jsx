import "./foodItem.scss";
import { assets } from "../../assests/frontend_assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

// eslint-disable-next-line react/prop-types
function FoodItem({ id, image, name, description, price }) {
  const { removeFromCart, cartItems, addToCart } = useContext(StoreContext);
  return (
    <div className="food-item">
      <div className="image-container">
        <img src={image} alt="" className="item-image" />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            className="add"
            alt=""
            onClick={() => {
              addToCart(id);
            }}
          />
        ) : (
          <div className="item-cart-count">
            <img
              src={assets.remove_icon_red}
              alt=""
              onClick={() => {
                removeFromCart(id);
              }}
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              alt=""
              onClick={() => {
                addToCart(id);
              }}
            />
          </div>
        )}
      </div>
      <div className="details">
        <div className="rate">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="desc">{description}</p>
        <p className="price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
