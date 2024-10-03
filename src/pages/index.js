import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


export default function Home() {
  return (
    <div className='container container-home'>
      <h1>Bine ai venit</h1>
      <Link href="/categories">
       Categorii
      </Link>

      <div className='bibliografie'>
        <Link className='b-link' target="_blank" href="https://resources.quizalize.com/view/quiz/capitale-si-tari-c008f973-0fad-47e9-8d3b-6e6f9358d6fd">
         Bibliografie quiz
       </Link>
      </div>

      <div className='contact'>
        <a className='a-home link-icon' href="https://www.linkedin.com/in/ersin-ali-228301107/" target="_blank" rel="noopener noreferrer">
         <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
         <a className='a-home' href="https://github.com/alyersin?tab=repositories" target="_blank" rel="noopener noreferrer">
         <FontAwesomeIcon icon={faGithub} size="2x" />
       </a>

      </div>
    </div>
    
  );
}
