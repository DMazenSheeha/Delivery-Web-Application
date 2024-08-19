/* eslint-disable react/prop-types */
import "./exploreMenu.scss";
import { menu_list } from "../../assests/frontend_assets/assets";

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="explore-menu" id="menu">
      <h1>Explore our menu</h1>
      <p className="explore-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <hr />
      <div className="explore-menu-filter">
        {menu_list.map((item, i) => {
          return (
            <div className="menu-item" key={i}>
              <img
                src={item.menu_image}
                alt=""
                className={category === item.menu_name ? "active" : ""}
                onClick={() => {
                  setCategory((cur) =>
                    cur === item.menu_name ? "All" : item.menu_name
                  );
                }}
              />
              <p
                onClick={() => {
                  setCategory((cur) =>
                    cur === item.menu_name ? "All" : item.menu_name
                  );
                }}
              >
                {item.menu_name === "pureVeg"
                  ? "Pure Veg"
                  : item.menu_name.split("")[0].toLocaleUpperCase() +
                    item.menu_name.slice(1)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ExploreMenu;
