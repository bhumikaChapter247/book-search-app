import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AppRoutes from '../config/appRoutes';

const SearchResult = ({ title, id, author, image, description }) => {
  const navigate = useNavigate();

  // redirect to book details page
  const viewBook = (id) => {
    navigate(AppRoutes.DETAILS.replace(':id', id));
  };

  return (
    <div id='result-card'>
      <br />
      <br />
      <div className='row text-center' id='result-header'>
        <div className='col-3'>
          <h4>{title}</h4>
          <small>
            <br />
            Written By:
            <br />
            {author}
          </small>
        </div>
        <span className='col-3 offset-6'>
          <Button onClick={() => viewBook(id)}>
            <i className='fa fa-eye' /> View
          </Button>
        </span>
      </div>
      <div className='row'>
        <hr />
      </div>
      <div className='row'>
        <div className='col-3 text-center'>
          <img src={image} alt={title} />
        </div>
        <div className='col-9'>
          <p className='head'>Description: </p>
          <span
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
