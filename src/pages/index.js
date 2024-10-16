import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';  // Import the list icon
import Link from 'next/link';

const Home = () => {
  return (
    <div className='container'>
      <h1>Bine ai venit</h1>
      <Link href="/categories" className="categorii">
        <FontAwesomeIcon icon={faList} /> Categorii
      </Link>
    </div>
  );
};

export default Home;
