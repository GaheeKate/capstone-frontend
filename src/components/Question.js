import { useState, useEffect } from "react";

export default function QuestionData() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
  
        const baseUrl = process.env.REACT_APP_BASEURL;
        const response = await fetch(`${baseUrl}/questions`);
       

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2 className="ui header">
        <i className="whmcs icon"></i>
        <div className="content">Question List</div>
      </h2>
      <ul style={{ marginBottom: "50px" }}>
        {questions.map((question) => (
          <li key={question._id}>{question.qu}</li>
        ))}
      </ul>
    </div>
  );
}
