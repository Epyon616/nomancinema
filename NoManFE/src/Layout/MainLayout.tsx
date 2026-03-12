import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';

import './MainLayout.css';

const MainLayout = () => (
  <>
    <Header /> 
    <div className="content">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default MainLayout;