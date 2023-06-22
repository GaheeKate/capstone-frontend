import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { userId, username, isUser, isAdmin } = useAuth();
  useTitle(`WELCOME: ${username}`);

  //New date object to get the current date and time
  const date = new Date();
  //internalization API, to display the full date and long time in the "en-US" locale.
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      {/* If isUser is ture, then render link */}
      {isUser && (
        <p>
          <Link to="/savedResult">View My Result</Link>
        </p>
      )}
      {isUser && (
        <p>
          <Link className="link-danger" to={`/dash/users/${userId}`}>
            Edit my Info
          </Link>
        </p>
      )}

      {isAdmin && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {isAdmin && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );
};

export default Welcome;
