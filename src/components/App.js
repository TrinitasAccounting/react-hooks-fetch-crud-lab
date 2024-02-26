import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsToList, setQuestionsToList] = useState([])


  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then(res => res.json())
      .then(data => setQuestionsToList(data))
  }, []);



  function handleAddQuestion(newQuestion) {
    const newQuestionsList = [...questionsToList, newQuestion];
    setQuestionsToList(newQuestionsList);
  }




  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestionsList = questionsToList.filter((quest) => {
      return (quest.id !== deletedQuestion.id)
    })
    setQuestionsToList(updatedQuestionsList);
  }



  function correctAnswerChange(questionToChange) {
    const updatedCorrectAnswer = questionsToList.map((quest) => {
      if (quest.id === questionToChange.id) {
        return questionToChange
      }
      else {
        return quest
      }
    })
    setQuestionsToList(updatedCorrectAnswer)
  }






  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm onAddQuestion={handleAddQuestion} /> :
        <QuestionList questionsToList={questionsToList} handleDeleteQuestion={handleDeleteQuestion} correctAnswerChange={correctAnswerChange} />}
    </main>
  );
}

export default App;
