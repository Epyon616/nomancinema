import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

const Layout = () => (
  <>
    <nav>
      <h1>NO MAN CINEMA</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movie listings</Link></li>
      </ul>
    </nav>
    <div class="content">
      <Outlet />
    </div>
    <footer>
      <sub>Copyright &copy; No Man</sub>
    </footer>

  </>
);

export default Layout;