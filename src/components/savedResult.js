import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Result() {
  const [results, setResults] = useState([]);
  const [images, setImages] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the value from local storage
  const Totalresult = localStorage.getItem("Totalresult");
  console.log("Passed result: " + Totalresult);

  // console.log(userResult);
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

  const matchingResults = results.filter(
    (result) => parseInt(Totalresult) === parseInt(result.weight)
  );

  return (
    <div>
      <div className="card">
        {matchingResults.map((result) => (
          <div key={result._id}>
            <h3 className="card-header">{result.name}</h3>
            <img
              className="imgmax rounded mx-auto d-block"
              src={images[result.imgId]}
              alt={result.name}
            />
            <div className="card-body text-center">
              <p className="rad-text">{result.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <footer>
        <div className=""></div>
      </footer>
    </div>
  );
}
