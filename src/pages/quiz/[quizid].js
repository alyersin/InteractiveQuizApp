// [quizid].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AddQuestion from '../AddQuestion';

export default function Quiz() {
  const router = useRouter();
  const { quizid } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (quizid) {
      fetch(`/api/questions`)
        .then((res) => res.json())
        .then((data) => {
          const predefinedQuestions = data[quizid];
          if (predefinedQuestions) {
            setQuiz(predefinedQuestions);
          } else {
            console.error('Quiz not found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching quiz:', error);
          setLoading(false);
        });
    }
  }, [quizid]);

  if (loading) {
    return <div>Se incarca...</div>;
  }

  if (!quiz) {
    return <div>Eroare la incarcare</div>;
  }

  return (
    <div className='container'>
      <h1>{quiz.title}</h1>
      <Link href={`/quiz/${quizid}/question/1`}>
        <button className='start-quiz'>Start Quiz</button>
      </Link>
      <div className='adauga-container'>
        <h2>Adauga o intrebare noua pentru categoria {quiz.title}</h2>
        <AddQuestion quizid={quizid} />
      </div>
    </div>
  );
}
