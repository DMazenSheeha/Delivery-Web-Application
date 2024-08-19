import "./appDownload.scss";
import { assets } from "../../assests/frontend_assets/assets";

function AppDownload() {
  return (
    <div className="app-download" id="mobile-app">
      <p>
        For Better Experience Download <br />
        Tomato App
      </p>
      <div className="download-images">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  );
}

export default AppDownload;
