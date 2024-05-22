import './layout.scss';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { currentUser } = useContext(AuthContext);


  return !currentUser ?  (
    <Navigate to="/login" />
   ) : (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  
}

export { Layout, RequireAuth };
