import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">What If I Am An Animal</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Discover your animal sign based on your personality traits. Our unique
          assessment measures your preferences across four categories to
          determine your animal sign:
        </p>
        <ul>
          <li>
            Adventurousness: Are you daring and bold, or do you prefer to stick
            to familiar territory?
          </li>
          <li>
            Social behavior: Do you enjoy being around others, or do you prefer
            to spend time alone?
          </li>
          <li>
            Emotional expression: Are you in touch with your feelings and open
            with others, or do you tend to keep your emotions to yourself?
          </li>
          <li>
            Adaptability: Are you flexible and able to adjust to new situations,
            or do you prefer to have a routine and stick to it?
          </li>
        </ul>
        <p>
          Based on your answers, we'll determine your animal sign and provide
          you with a detailed report of its characteristics. You'll learn about
          your animal sign's strengths, weaknesses, and tendencies, as well as
          how to leverage this knowledge to improve your personal and
          professional relationships
        </p>
      </main>
      <footer>
        <Link to="/login">Login</Link>
      </footer>
    </section>
  );
  return content;
};
export default Public;
