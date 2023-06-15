import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useUpdateUserMutation } from "../features/users/usersApiSlice";

export default function Result() {
  const [results, setResults] = useState([]);
  const [images, setImages] = useState({});
  const location = useLocation();
  const userResult = location.state?.userResult;
  const saveResult = userResult;
  const user = location.state?.user; // Assuming the user object is passed as location state
  const [username, setUsername] = useState(""); // Add username state

  useEffect(() => {
    const importImages = async () => {
      const imagePaths = {
        "ani-1": import("../img/img/ani-1.jpg"),
        "ani-2": import("../img/img/ani-2.jpg"),
        "ani-3": import("../img/img/ani-3.jpg"),
        "ani-4": import("../img/img/ani-4.jpg"),
        "ani-5": import("../img/img/ani-5.jpg"),
        "ani-6": import("../img/img/ani-6.jpg"),
        "ani-7": import("../img/img/ani-7.jpg"),
        "ani-8": import("../img/img/ani-8.jpg"),
        "ani-9": import("../img/img/ani-9.jpg"),
        "ani-10": import("../img/img/ani-10.jpg"),
      };

      const importedImages = {};

      for (const imageName in imagePaths) {
        importedImages[imageName] = (await imagePaths[imageName]).default;
      }
      setImages(importedImages); // Update the images state with the imported images
    };

    const fetchData = async () => {
      try {
        const resultResponse = await fetch(
          `${process.env.REACT_APP_BASEURL}/results`
        );
        const resultData = await resultResponse.json();

        setResults(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    importImages(); // Import images when the component mounts
  }, []);

  const EditUserForm = () => {
    const [updateUser] = useUpdateUserMutation();

    const matchingResults = results.filter(
      (result) => userResult === result.weight
    );

    const canSave = [userResult].every(Boolean);

    const onSaveResultClicked = async () => {
      const updatedUser = { ...user, result: userResult, username };
      await updateUser(updatedUser);
    };

    const onUsernameChange = (e) => {
      setUsername(e.target.value);
    };

    return (
      <div>
        <div className="card">
          {console.log("Total Answer Weight:" + userResult)}
          {matchingResults.map((result) => (
            <div key={result._id}>
              <h3 className="card-header">{result.name}</h3>
              <img
                className="imgmax rounded mx-auto d-block"
                src={images[result.imgId]}
                alt={result.name}
              />

              <form className="form" onSubmit={onSaveResultClicked}>
                <button
                  className="icon-button"
                  title="Save"
                  disabled={!canSave}
                >
                  <FontAwesomeIcon icon={faSave} />
                  save my result
                </button>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={onUsernameChange}
                />
              </form>

              <div className="card-body text-center">
                <p className="rad-text">{result.desc}</p>
                <Link className="btn btn-danger" to="/QuestionData">
                  Again
                </Link>
              </div>
            </div>
          ))}
        </div>

        <footer>
          <Link className="link-body-emphasis" to="/login">
            Login
          </Link>
        </footer>
      </div>
    );
  };

  return (
    <div>
      {/* Render EditUserForm component */}
      {user && <EditUserForm />}
    </div>
  );
}
