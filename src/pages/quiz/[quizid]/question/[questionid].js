import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="question-page">
      {/* GO HOME button */}
      <Link href="/">
        <button className="go-home-button">GO HOME</button>
      </Link>

      <h1 className="question-title">{question.question}</h1>
      <ul className="answer-options">
        {question.answers.map((answer) => (
          <li key={answer} className="answer-option">
            <button
              className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
              onClick={() => handleChange(answer)}
              disabled={selectedAnswer !== null}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
      {feedback && <p className="feedback-text">{feedback}</p>}
      <button className="next-button" onClick={handleNext}>
        {parseInt(questionid) === quiz.questions.length ? 'Termina Quizul' : 'Intrebarea Urmatoare'}
      </button>
    </div>
  );
}
