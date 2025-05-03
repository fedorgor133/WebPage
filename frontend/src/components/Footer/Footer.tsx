import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTiktok
} from 'react-icons/fa';
import Logo from '../Logo';

function Footer() {
  return (
    <footer className="container py-4 flex flex-col items-center justify-center">
      <Logo className="w-40 mb-4" />
      <p className="text-gray-400">Find Your Dream</p>
      <p className="text-gray-400">Find Your Accomodation</p>
      <nav className="mt-4 flex gap-3 text-gray-600">
        <a href="#">
          <FaTiktok />
        </a>
        <a href="#">
          <FaInstagram />
        </a>
        <a href="#">
          <FaFacebookSquare />
        </a>
        <a href="#">
          <FaLinkedin />
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
