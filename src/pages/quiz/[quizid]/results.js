import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'src/questions.json');
  const jsonData = fs.readFileSync(filePath);
  const qData = JSON.parse(jsonData);
  const quiz = qData[params.quizid];

  return {
    props: {
      quiz,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'src/questions.json');
  const jsonData = fs.readFileSync(filePath);
  const qData = JSON.parse(jsonData);

  const paths = Object.keys(qData).map((quizid) => ({
    params: { quizid },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Results({ quiz }) {
  const router = useRouter();
  const { quizid } = router.query;
  const selectedAnswers = JSON.parse(router.query.selectedAnswers || '[]');

  if (!quiz) {
    return <div>Eroare la incarcare</div>;
  }

  let score = 0;
  const results = quiz.questions.map((question, index) => {
    const isCorrect = question.correctAnswer === selectedAnswers[index]; 
    if (isCorrect) score++;
    return { ...question, isCorrect };
  });

  return (
    <div className='container'>
      <h1>Rezultate pentru {quiz.title}</h1>
      <h2>Scor: {score} / {quiz.questions.length}</h2>
      <ul className='results-list'>
        {results.map((result) => (
          <li
            key={result.id}
            className={result.isCorrect ? 'rasp-corect' : 'rasp-incorect'}
          >
            {result.question} - {result.isCorrect ? 'Corect' : 'Greșit'}
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/')}>Go Home</button>
    </div>
  );
}
