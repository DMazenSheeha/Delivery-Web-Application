import { assets } from "../../assests/frontend_assets/assets";
import "./footer.scss";

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
          <div className="social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-456-7890</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="coded-by" style={{ textAlign: "center" }}>
        Coded By <span style={{ color: "tomato" }}>Mazen Sheeha</span>
      </p>
    </div>
  );
}

export default Footer;
