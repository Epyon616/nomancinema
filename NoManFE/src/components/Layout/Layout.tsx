import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import './Layout.css';

const Layout = () => (
  <>
    <Header /> 
    <div className="content">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default Layout;