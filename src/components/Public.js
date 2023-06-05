import { Link } from "react-router-dom";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Public = () => {
  

  return (
    <section className="container">
      <header>
        <h1>
          Welcome to <span className="danger">What If I Am An Animal</span>
        </h1>
      </header>
      <main className="public__main">
        <div className="container">
          <section
            id="main"
            
          >
            <div className="col-lg-6 col-md-8 col-sm-10 col-12 mx-auto">
              <img src="./img/main.png" alt="mainImage" className="img-fluid" />
            </div>
            <p>
              Discover your animal sign based on your personality traits. Our
              unique assessment measures your preferences across four categories
              to determine your animal sign:
            </p>

            <Link to="/QuestionData" className="btn btn-danger">
              Start
            </Link>
          </section>

        </div>
      </main>

      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
};

export default Public;
