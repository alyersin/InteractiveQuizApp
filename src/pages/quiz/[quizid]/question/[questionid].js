// [questionid].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Question() {
  const router = useRouter();
  const { quizid, questionid } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    if (quizid) {
      fetch(`/api/questions`)
        .then((res) => res.json())
        .then((data) => {
          const quizData = data[quizid];
          const currentQuestion = quizData?.questions.find((q) => q.id == questionid);
          setQuiz(quizData);
          setQuestion(currentQuestion);
          setLoading(false);
          setSelectedAnswer(null);
          setFeedback('');
        })
        .catch((error) => {
          console.error('Error fetching question:', error);
          setLoading(false);
        });
    }
  }, [quizid, questionid]);

  const handleChange = (answer) => {
    setSelectedAnswer(answer);
    setFeedback(answer === question.correctAnswer ? 'Corect!' : `Incorect! Raspunsul corect este: ${question.correctAnswer}`);
  };

  const handleNext = () => {
    const updatedAnswers = [...selectedAnswers, selectedAnswer];
    setSelectedAnswers(updatedAnswers);
    const nextQuestionId = parseInt(questionid) + 1;
    const isLastQuestion = nextQuestionId > quiz.questions.length;

    if (isLastQuestion) {
      router.push({
        pathname: `/quiz/${quizid}/results`,
        query: { selectedAnswers: JSON.stringify(updatedAnswers) },
      });
    } else {
      router.push(`/quiz/${quizid}/question/${nextQuestionId}`);
    }
  };

  if (loading) {
    return <div>Se incarca...</div>;
  }

  if (!question) {
    return <div>Eroare la incarcare</div>;
  }

  return (
    <div className='container'>
      <h1>{question.question}</h1>
      <ul className='question-ul'>
        {question.answers.map((answer) => (
          <li className='question-li' key={answer}>
            <label className='answer-list'>
              <input
                type="checkbox"
                value={answer}
                checked={selectedAnswer === answer}
                onChange={() => handleChange(answer)}
                disabled={selectedAnswer !== null}
              />
              {answer}
            </label>
          </li>
        ))}
      </ul>
      {feedback && <p>{feedback}</p>}
      <button onClick={handleNext}>
        {parseInt(questionid) === quiz.questions.length ? 'Termina Quizul' : 'Intrebarea Urmatoare'}
      </button>
    </div>
  );
}
