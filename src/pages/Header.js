import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Function to apply the active style
  const isActive = (path) => (router.pathname === path ? 'active-link' : '');

  // Toggle the hamburger menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      {/* Logo on the left */}
      <Link href="/" className="header-link logo">
        E-QUIZapp
      </Link>

      {/* Hamburger icon for small screens */}
      <button className="hamburger" onClick={toggleMenu}>
        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faBars} />}
      </button>

      {/* Centered Navigation Links */}
      <nav className={`header-nav ${isOpen ? 'open' : ''}`}>
        <Link href="/" className={`header-link ${isActive('/')}`}>
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link href="https://resources.quizalize.com/view/quiz/capitale-si-tari-c008f973-0fad-47e9-8d3b-6e6f9358d6fd" className={`header-link ${isActive('/bibliografie')}`} target="_blank">
          Bibliografie Quiz
        </Link>
        <Link href="/AddQuestion" className={`header-link ${isActive('/AddQuestion')}`}>
          <FontAwesomeIcon icon={faPlus} /> Add Questions
        </Link>
      </nav>

      {/* Login and Register buttons on the right */}
      <div className="auth-buttons">
        <Link href="/login">
          <button className="auth-btn">Login</button>
        </Link>
        <Link href="/register">
          <button className="auth-btn">Register</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
