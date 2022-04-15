import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './config/appRoutes';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    navigate(AppRoutes.MAIN);
  };

  useEffect(() => {
    if (!token) {
      navigate(AppRoutes.MAIN);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div className='jumbotron jumbotron-fluid bg-secondary text-white d-flex text-wrapper'>
      <h4 className='display-2'>
        <i className='fa fa-book' /> Google Book Search
      </h4>
      <Button className='logout-btn' onClick={logout}>
        <i className='fa fa-sign-out' />
        Logout
      </Button>
    </div>
  );
};
export default Header;
