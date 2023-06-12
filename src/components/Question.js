import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function QuestionData() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswerWeight, setCurrentAnswerWeight] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [showResultPage, setShowResultPage] = useState(false);

  const navigate = useNavigate(); // Hook for programmatic navigation

  useEffect(() => {
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

        const updatedQuestions = questionData.map((question) => {
          const associatedAnswers = answerData.filter(
            (answer) => answer.qu === question.num
          );
          return { ...question, answers: associatedAnswers };
        });

        setQuestions(updatedQuestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAnswerSelect = (questionId, answerValue) => {
    setSelectedAnswer(answerValue);
    console.log("Selected answer:", questionId, answerValue);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    const updatedWeight = currentAnswerWeight + selectedAnswer;
    const scaledWeight = scaleWeight(updatedWeight, 10, 30, 10, 19);
    setCurrentAnswerWeight(scaledWeight);
    setSelectedAnswer("");

    if (currentQuestionIndex === 9) {
      // Redirect to the result page with currentAnswerWeight as a state parameter
      navigate("/Result", { state: { userResult: currentAnswerWeight } });
      return;
    }
  };

  const scaleWeight = (value, minInput, maxInput, minOutput, maxOutput) => {
    const scaledValue =
      ((value - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
      minOutput;
    return Math.round(scaledValue);
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

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
