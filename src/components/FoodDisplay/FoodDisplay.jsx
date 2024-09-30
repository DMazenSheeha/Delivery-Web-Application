import { useContext } from "react";
import "./foodDisplay.scss";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

// eslint-disable-next-line react/prop-types
function FoodDisplay({ category }) {
  const { food_list, url } = useContext(StoreContext);
  return (
    <div className="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-menu-items">
        {food_list ? (
          food_list.map((item, i) => {
            if (category === "All" || item.category === category) {
              return (
                <FoodItem
                  key={i}
                  id={item._id}
                  name={item.name}
                  image={`${url}/api/food/image/${item.image}`}
                  price={item.price}
                  description={item.description}
                  category={item.category}
                />
              );
            }
          })
        ) : (
        <div className="container" style={{ display: "flex" }}>
          <span className="loader"></span>
        </div>
        )}
      </div>
    </div>
  );
}

export default FoodDisplay;
