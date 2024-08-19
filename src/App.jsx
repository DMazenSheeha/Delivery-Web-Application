import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Orders from "./pages/Orders/Orders";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loginShow, setLoginShow] = useState(false);
  return (
    <>
      {loginShow && <LoginPopup setLoginShow={setLoginShow} />}
      <div className="app">
        <Navbar setLoginShow={setLoginShow} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="*"
            element={
              <h1 style={{ margin: "50px auto", textAlign: "center" }}>
                404 <br /> Page Not Found
              </h1>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
