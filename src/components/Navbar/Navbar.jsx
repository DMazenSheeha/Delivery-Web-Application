import "./navbar.scss";
import { assets } from "../../assests/frontend_assets/assets";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function Navbar({ setLoginShow }) {
  const [menu, setMenu] = useState("home");
  const { total, user, setUser, setCartItems, setTotal } =
    useContext(StoreContext);
  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
    setCartItems(false);
    setTotal(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu == "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="/#menu"
          onClick={() => setMenu("menu")}
          className={menu == "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="/#mobile-app"
          onClick={() => setMenu("mobile-app")}
          className={menu == "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu == "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="right">
        <img src={assets.search_icon} alt="" />
        <div className="cart">
          <Link
            to={user ? "/cart" : "/"}
            onClick={() => {
              setMenu(false);
              if (!user) {
                toast.warn("Loggin to show the cart");
                setLoginShow(true);
              }
            }}
          >
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={total ? "dot" : ""}></div>
        </div>
        {user ? (
          <div className="profile">
            <img src={assets.profile_icon} alt="" />
            <div className="options">
              <div className="option">
                <img src={assets.bag_icon} alt="" />
                <Link to="/orders">
                  <span>Orders</span>
                </Link>
              </div>
              <hr />
              <div className="option" onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <span>Logout</span>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setLoginShow(true)}>sign in</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
