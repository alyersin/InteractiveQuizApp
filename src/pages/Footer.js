import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <p>E-QUIZapp</p>
      <div className="social-icons">
        <FontAwesomeIcon icon={faGithub} size="2x" className="icon" />
        <FontAwesomeIcon icon={faLinkedin} size="2x" className="icon" />
        <FontAwesomeIcon icon={faFacebook} size="2x" className="icon" />
      </div>
      <p>© 2024</p>
    </footer>
  );
};

export default Footer;
