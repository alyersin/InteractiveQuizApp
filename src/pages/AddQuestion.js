import { useState, useEffect } from 'react';

export default function AddQuestion({ quizid }) {
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: '',
    quizid: quizid, 
  });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    setQuestions(storedQuestions);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...newQuestion.answers];
    updatedAnswers[index] = value;
    setNewQuestion({ ...newQuestion, answers: updatedAnswers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || {};
    const updatedQuestions = {
      ...storedQuestions,
      [newQuestion.question]: newQuestion,  
    };

    localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    setQuestions(updatedQuestions);
    alert('Intrebare adaugata');
  };

  return (
    <form className='adauga-form' onSubmit={handleSubmit}>
      <div className='intrebare'>
        <label>Intrebare:</label>
        <input
          type="text"
          name="question"
          value={newQuestion.question}
          onChange={handleInputChange}
        />
      </div>
      <div className='variante-rasp'>
        <label>Variante de raspuns:</label>
        {newQuestion.answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className='rasp-corect'>
        <label>Raspuns corect:</label>
        <input
          type="text"
          name="correctAnswer"
          value={newQuestion.correctAnswer}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button className='adauga-btn' type="submit">Adauga Intrebarea</button>
      </div>
    </form>
  );
}
