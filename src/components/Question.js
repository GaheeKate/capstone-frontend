import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function QuestionData() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswerWeight, setCurrentAnswerWeight] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [showResultPage, setShowResultPage] = useState(false);
  const [results, setResults] = useState([]);
  const [images, setImages] = useState({});

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
        const questionResponse = await fetch(
          `${process.env.REACT_APP_BASEURL}/questions`
        );
        const questionData = await questionResponse.json();

        const answerResponse = await fetch(
          `${process.env.REACT_APP_BASEURL}/answers`
        );
        const answerData = await answerResponse.json();

        const resultResponse = await fetch(
          `${process.env.REACT_APP_BASEURL}/results`
        );
        const resultData = await resultResponse.json();

        const updatedQuestions = questionData.map((question) => {
          const associatedAnswers = answerData.filter(
            (answer) => answer.qu === question.num
          );
          return { ...question, answers: associatedAnswers };
        });

        setQuestions(updatedQuestions);
        setResults(resultData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    importImages(); // Import images when the component mounts
  }, []);

  const handleAnswerSelect = (questionId, answerValue) => {
    setSelectedAnswer(answerValue);
    console.log("Selected answer:", questionId, answerValue);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Increment the current question index
    const updatedWeight = currentAnswerWeight + selectedAnswer;
    const scaledWeight = scaleWeight(updatedWeight, 10, 30, 10, 19); // Scale the answer weight from 10-30 to 10-19
    setCurrentAnswerWeight(scaledWeight); // Update the scaled answer weight
    setSelectedAnswer(""); // Reset the selected answer

    if (currentQuestionIndex === 9) {
      setShowResultPage(true); // Show the result page when reaching the last question
    }
  };

  // Function to scale a value from one range to another range
  const scaleWeight = (value, minInput, maxInput, minOutput, maxOutput) => {
    const scaledValue =
      ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
      minOutput;
    return Math.round(scaledValue);
  };

  if (questions.length === 0 || results.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (showResultPage) {
    const matchingResults = results.filter(
      (result) => currentAnswerWeight === result.weight
    );

    return (
      <div className="card">
        {console.log("Total Answer Weight:" + currentAnswerWeight)}
        {matchingResults.map((result) => (
          <div key={result._id}>
            <h3 className="card-header">{result.name}</h3>
            <img
              className="imgmax rounded mx-auto d-block"
              src={images[result.imgId]}
              alt={result.name}
            />
            <p className="rad-text">{result.desc}</p>
          </div>
        ))}
      </div>
    );
  }

  const isNextButtonDisabled = selectedAnswer === "";

  return (
    <div className="card text-center">
      <div className="card-header">{currentQuestion.num}/10</div>
      <div className="card-body" key={currentQuestion._id}>
        <h3 className="">{currentQuestion.qu}</h3>
        <ul className="">
          {currentQuestion.answers.map((answer) => (
            <li key={answer._id}>
              <label className="rad-label">
                <input
                  className="rad-input"
                  type="radio"
                  name={currentQuestion.num}
                  value={answer.weight}
                  checked={selectedAnswer === answer.weight}
                  onChange={() =>
                    handleAnswerSelect(currentQuestion.num, answer.weight)
                  }
                />
                <div className="rad-design"></div>
                <div className="rad-text">{answer.answer}</div>
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="card-footer">
        {currentQuestionIndex < questions.length && (
          <button
            className="btn btn-danger"
            onClick={handleNextQuestion}
            disabled={isNextButtonDisabled}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
