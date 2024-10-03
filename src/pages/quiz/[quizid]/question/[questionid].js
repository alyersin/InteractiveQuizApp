import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/questions.json');
  const jsonData = fs.readFileSync(filePath);
  const qData = JSON.parse(jsonData);

  return {
    props: {
      qData,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'src/questions.json');
  const jsonData = fs.readFileSync(filePath);
  const qData = JSON.parse(jsonData);

  const paths = Object.keys(qData).flatMap((quizid) =>
    qData[quizid].questions.map((question) => ({
      params: { quizid, questionid: question.id.toString() },
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

export default function Question({ qData }) {
  const router = useRouter();
  const { quizid, questionid } = router.query;
  const quiz = qData[quizid];

  if (!quiz) {
    return <div>Eroare la incarcare</div>;
  }

  const question = quiz.questions.find((q) => q.id == questionid);

  if (!question) {
    return <div>Eroare la incarcare</div>;
  }

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    setFeedback('');
    setSelectedAnswer(null);
  }, [questionid]);

  const handleChange = (answer) => {
    setSelectedAnswer(answer);
    setFeedback(answer === question.correctAnswer ? 'Corect!' : `Incorect! Raspunsul corect este: ${question.correctAnswer}`);
  };

  const isLastQuestion = questionid == quiz.questions.length;

  const handleNext = () => {
    setSelectedAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

    if (isLastQuestion) {
      router.push({
        pathname: `/quiz/${quizid}/results`,
        query: { selectedAnswers: JSON.stringify([...selectedAnswers, selectedAnswer]) },
      });
    } else {

      router.push(`/quiz/${quizid}/question/${parseInt(questionid) + 1}`);
    }
  };

  return (
    <div className='container'>
      <h1>{question.question}</h1>
      <ul>
        {question.answers.map((answer) => (
          <li key={answer}>
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
        {isLastQuestion ? 'Termina Quizul' : 'Intrebarea urmatoare'}
      </button>
    </div>
  );
}
