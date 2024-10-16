import '../pages/index.css';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Remove header and footer on quiz question pages
  const noLayoutPages = ['/quiz/[quizid]/question/[questionid]'];

  const showLayout = !noLayoutPages.includes(router.pathname);

  return (
    <>
      {showLayout && <Header />}
      <Component {...pageProps} />
      {showLayout && <Footer />}
    </>
  );
}

export default MyApp;
