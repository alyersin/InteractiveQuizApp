import { useRouter } from 'next/router';
import Link from 'next/link';
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

  const paths = Object.keys(qData).map((quizid) => ({
    params: { quizid },
  }));

  return {
    paths,
    fallback: false,
  };
}

export default function Quiz({ qData }) {
  const router = useRouter();
  const { quizid } = router.query;
  const quiz = qData[quizid];

  if (!quiz) {
    return <div>Eroare la incarcare</div>;
  }

  return (
    <div className='container'>
      <h1>{quiz.title}</h1>
      <Link href={`/quiz/${quizid}/question/1`}>Start quiz</Link>
    </div>
  );
}
