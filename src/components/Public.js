import { Link } from "react-router-dom";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import mainImage from "../img/zodiac-gcbb138ebc_640.png";

const Public = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setIsSpinning(true);

    setTimeout(() => {
      setIsSpinning(false);
      window.location.href = "/QuestionData";
    }, 1000);
  };

  return (
    <section className="container">
      <header>
        <h1>
          Welcome to <span className="danger">What If I Am An Animal</span>
        </h1>
      </header>
      <main className="public__main">
        <div className="container">
          <section id="main">
            <p>
              Discover your animal sign based on your personality traits. Our
              unique assessment measures your preferences across four categories
              to determine your animal sign
            </p>
            <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
              <Link to="/QuestionData" onClick={handleClick}>
                <img
                  src={mainImage}
                  alt="mainImage"
                  className={`img-fluid ${isSpinning ? "spin" : ""}`}
                />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <Link to="/login">Login</Link>
        <Link to="/signup">signup</Link>
      </footer>
    </section>
  );
};

export default Public;
