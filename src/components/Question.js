import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'

export default function QuestionData() {
  const [questions, setQuestions] = useState([]); // State variable to store the questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State variable to track the current question index
  const [currentAnswerWeight, setCurrentAnswerWeight] = useState(0); // State variable to track the current answer weight
  const [selectedAnswer, setSelectedAnswer] = useState(0); // State variable to store the selected answer value
  const [showResultPage, setShowResultPage] = useState(false); // State variable to control rendering of the result page

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch questions data
        const questionResponse = await fetch(`${process.env.REACT_APP_BASEURL}/questions`);
        const questionData = await questionResponse.json();

        // Fetch answers data
        const answerResponse = await fetch(`${process.env.REACT_APP_BASEURL}/answers`);
        const answerData = await answerResponse.json();

        // Associate each answer with its corresponding question
        const updatedQuestions = questionData.map((question) => {
          const associatedAnswers = answerData.filter((answer) => answer.qu === question.num);
          return { ...question, answers: associatedAnswers };
        });

        setQuestions(updatedQuestions); // Update the questions state with the updated data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleAnswerSelect = (questionId, answerValue) => {
    setSelectedAnswer(answerValue); // Store the selected answer value
    console.log("Selected answer:", questionId, answerValue);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Increment the current question index
    setCurrentAnswerWeight((prevWeight) => prevWeight + selectedAnswer); // Accumulate the answer weight
    setSelectedAnswer(""); // Reset the selected answer

    if (currentQuestionIndex === questions.length - 1) {
      setShowResultPage(true); // Show the result page when reaching the last question
    }
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // Display loading message while fetching data
  }

  const currentQuestion = questions[currentQuestionIndex]; // Get the current question based on the current index

  if (showResultPage) {
    return (
      <div>
        <h2 >Result Page</h2>
        <p>Total Answer Weight: {currentAnswerWeight}</p>
      </div>
    );
  }

  const isNextButtonDisabled = selectedAnswer === ""; // Check if an answer is selected

  return (
    <div>
      <h2 className="ui header">
        <i className="whmcs icon"></i>
        <div className="content danger">Question List</div>
      </h2>
      <div key={currentQuestion._id}>
        <h3>{currentQuestion.qu}</h3>
        <ul>
          {currentQuestion.answers.map((answer) => (
            <li key={answer._id}>
              <label>
                <input
                  type="radio"
                  name={currentQuestion.num}
                  value={answer.weight}
                  checked={selectedAnswer === answer.weight} // Check if the answer is selected
                  onChange={() => handleAnswerSelect(currentQuestion.num, answer.weight)}
                />
                {answer.answer}
              </label>
            </li>
          ))}
        </ul>
      </div>
      {currentQuestionIndex < questions.length && (
        <button className="btn btn-danger" onClick={handleNextQuestion} disabled={isNextButtonDisabled}>
          Next
        </button> // Display "Next" button if there are more questions
      )}
    </div>
  );
}

