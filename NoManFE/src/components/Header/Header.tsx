import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <nav>
    <h1>NO MAN CINEMA</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/movies">Movie listings</Link></li>
    </ul>
  </nav>
);

export default Header;