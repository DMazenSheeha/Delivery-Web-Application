import { useContext, useState } from "react";
import "./loginPopup.scss";
import { assets } from "../../assests/frontend_assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";

// eslint-disable-next-line react/prop-types
function LoginPopup({ setLoginShow }) {
  const { url, getProfile } = useContext(StoreContext);
  const [curState, setCurState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((curState) => ({ ...curState, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const postData = await axios
      .post(
        `${url}/api/user/${curState === "Sign Up" ? "register" : "login"}`,
        curState === "Sign Up"
          ? data
          : {
              email: data.email,
              password: data.password,
            }
      )
      .catch(() => {
        toast.error("Error, please try in another time");
      });
    if (postData.data.success) {
      toast.success(postData.data.message);
      setLoginShow(false);
      localStorage.setItem("token", postData.data.data);
      getProfile();
      setData({
        name: "",
        email: "",
        password: "",
      });
    } else {
      toast.error(postData.data.message);
    }
  };

  return (
    <div className="login-popup-container">
      <form className="login-popup-content" onSubmit={(e) => submit(e)}>
        <div className="top">
          <h2>{curState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setLoginShow(false)}
          />
        </div>
        {curState === "Sign Up" && (
          <input
            type="text"
            placeholder="Your name"
            required
            name="name"
            value={data.name}
            onChange={(e) => handleOnChange(e)}
          />
        )}
        <input
          type="email"
          placeholder="Your email"
          required
          name="email"
          value={data.email}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={data.password}
          onChange={(e) => handleOnChange(e)}
        />
        <button>{curState}</button>
        <div className="privacy">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {curState === "Sign Up" ? (
          <p>
            Already have an account{" "}
            <span onClick={() => setCurState("Login")}>Click here</span>
          </p>
        ) : (
          <p>
            Create a new account{" "}
            <span onClick={() => setCurState("Sign Up")}>Click here</span>
          </p>
        )}
      </form>
    </div>
  );
}

export default LoginPopup;
