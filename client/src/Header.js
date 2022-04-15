import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './config/appRoutes';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate(AppRoutes.MAIN);
  };
  return (
    <div className='jumbotron jumbotron-fluid bg-secondary text-white d-flex text-wrapper'>
      <h4 className='display-2'>Google Book Search</h4>
      <Button className='logout-btn' onClick={logout}>
        Logout
      </Button>
    </div>
  );
};
export default Header;
