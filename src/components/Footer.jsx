import "../Styles/footer.scss";
import React from "react";
import { FaGithub, FaDiscord, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="container-footer">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          alt=""
        />
        <div className="container-icons">
          <FaGithub className="icon"/>
          <FaDiscord className="icon"/>
          <FaLinkedin className="icon"/>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
