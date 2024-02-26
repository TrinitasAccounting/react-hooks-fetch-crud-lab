import React from "react";

function QuestionList({ questionsToList, handleDeleteQuestion, correctAnswerChange }) {
  // const [currentQuestionPrompt, setCurrentQuestionPrompt] = useState("")

  // function currentQuestionInfo(event) {
  //   setCurrentQuestionPrompt(event.target.name)
  // }

  function handleDeleteClick(question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => handleDeleteQuestion(question))


  }



  function handleCorrectAnswerChange(event) {
    fetch(`http://localhost:4000/questions/${event.target.name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": event.target.value
      })
    })
      .then(res => res.json())
      .then(questData => correctAnswerChange(questData))

  }






  const questionsToDisplay = questionsToList.map((question) => {
    return (
      <div key={question.id}>
        <li key={question.id}>{question.prompt}</li>
        <label htmlFor={question.answers[0]}>{question.answers[0]}</label><br />
        <input type="radio" id={question.answers[0]} name={question.answers[0]} value={question.answers[0]} />
        <label htmlFor={question.answers[1]}>{question.answers[1]}</label><br />
        <input type="radio" id={question.answers[1]} name={question.answers[1]} value={question.answers[1]} />
        <label htmlFor={question.answers[2]}>{question.answers[2]}</label><br />
        <input type="radio" id={question.answers[2]} name={question.answers[2]} value={question.answers[2]} />
        <label htmlFor={question.answers[3]}>{question.answers[3]}</label><br />
        <input type="radio" id={question.answers[3]} name={question.answers[3]} value={question.answers[3]} /><br />
        <button name={question.prompt} onClick={() => handleDeleteClick(question)}>Delete Question</button>
        {/* <span>Correct Answer */}
        <select name={question.id} onChange={handleCorrectAnswerChange} value="Correct Answer" className="Correct Answer">
          <option value={question.answers.indexOf(question.answers[0])}>{question.answers[0]}</option>
          <option value={question.answers.indexOf(question.answers[1])}>{question.answers[1]}</option>
          <option value={question.answers.indexOf(question.answers[2])}>{question.answers[2]}</option>
          <option value={question.answers.indexOf(question.answers[3])}>{question.answers[3]}</option>
        </select>
        {/* </span> */}
      </div>
    )

  })



  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionsToDisplay}
      </ul>
    </section>
  );
}

export default QuestionList;
